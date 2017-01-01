import GPGPUComplexIncludes from 'gpgpu/GPGPUComplexIncludes.js';
import GPGPUManager from 'gpgpu/GPGPUManager.js';

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
    res += unpackFloat(arrGet(uArr, ivec2(threadId.x, i))) *
        complexExp(vec2(0.0, -2.0 * PI * float(uDims.y - threadId.y) * float(i) / float(uDims.y)));
}
gl_FragData[0] = packFloat(length(res) / sqrt(float(uDims.y)));
gl_FragData[1] = packFloat(atan(res.y, res.x));
`,
        ['uArr'], [], 2, GPGPUManager.PACK_FLOAT_INCLUDE + GPGPUComplexIncludes.PI + GPGPUComplexIncludes.LIB);
    }
    parallelDFT(arr, asGPUArr = false){
        const gpuArr = this.manager.arrToGPUArr(arr);
        const resGPUArrs = this.manager.runKernel(this.dftKernel, [gpuArr], arr.dims);
        this.manager.disposeGPUArr(resGPUArrs[1]);
        this.manager.disposeGPUArr(gpuArr);
        if(asGPUArr) return resGPUArrs[0];
        else{
            const resArr = this.manager.gpuArrToArr(resGPUArrs[0]);
            this.manager.disposeGPUArr(resGPUArrs[0]);
            return resArr;
        }
    }
    dispose(){
        this.manager.disposeKernel(this.dftKernel);
    }
};

module.exports = GPUDFT;
