import GPGPUComplexIncludes from 'gpgpu/GPGPUComplexIncludes.js';
import GPGPUManager from 'gpgpu/GPGPUManager.js';
import ComplexArray2D from 'gpgpu/ComplexArray2D.js';

class GPUDFT{
    constructor(manager){
        if(manager.useFloat){
            throw 'GPUDFT does not support floating point textures yet.';
        }
        this.manager = manager;
        this.dftKernel = manager.createKernel(
`vec2 res = vec2(0.0, 0.0);
for(int i = 0; i < 4096; i++){
    if(i >= uDims.y) break;
    res += unpackFloat(arrGet(uArr, ivec2(threadId.x, i), uDims)) *
        complexExp(vec2(0.0, -2.0 * PI * float(threadId.y) * float(i) / float(uDims.y)));
}
gl_FragData[0] = packFloat(res.x);
gl_FragData[1] = packFloat(res.y);
`,
        ['uArr'], [], 2, GPGPUManager.PACK_FLOAT_INCLUDE + GPGPUComplexIncludes.PI + GPGPUComplexIncludes.LIB);
    }
    parallelDFT(arr){
        const gpuArr = arr.getGPUArrs(this.manager)[0];
        const resGPUArrs = this.manager.runKernel(this.dftKernel, [gpuArr], arr.dims);
        return ComplexArray2D.fromGPUArrs(resGPUArrs[0], resGPUArrs[1]);
    }
    dispose(){
        this.manager.disposeKernel(this.dftKernel);
    }
};

module.exports = GPUDFT;
