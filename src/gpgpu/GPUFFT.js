import GPGPUComplexIncludes from 'gpgpu/GPGPUComplexIncludes.js';
import GPGPUManager from 'gpgpu/GPGPUManager.js';
import {Utils} from 'utils/Utils.js';

/*

With reference to Understanding the FFT Algorithm by Jake Vanderplas
Source: https://jakevdp.github.io/blog/2013/08/28/understanding-the-fft/
License: BSD

*/

class GPUFFT{
    constructor(manager){
        if(manager.useFloat){
            throw 'GPUDFT does not support floating point textures yet.';
        }
        this.manager = manager;
        this.zeroKernel = manager.createKernel(
`gl_FragData[0] = packFloat(0.0);
`,
        [], [], 1, GPGPUManager.PACK_FLOAT_INCLUDE);
        this.fftKernel = manager.createKernel(
`//factor of two cancels out for 2PI and period
vec2 twiddle = complexExp(vec2(0.0,
    -PI * float(threadId.y) / float(uButterflyWidth)
));
int column = threadId.y / uButterflyWidth;
int row = threadId.y - column * uButterflyWidth;
int refIndex1 = (column / 2) * uButterflyWidth + row;
ivec2 refPos1 = ivec2(threadId.x, refIndex1);
int refIndex2 = refIndex1 + uDims.y / 2;
ivec2 refPos2 = ivec2(threadId.x, refIndex2);
vec2 ref1 = vec2(
    unpackFloat(arrGet(uReal, refPos1)),
    unpackFloat(arrGet(uImg, refPos1))
);
vec2 ref2 = vec2(
    unpackFloat(arrGet(uReal, refPos2)),
    unpackFloat(arrGet(uImg, refPos2))
);
vec2 res = ref1 + complexMult(twiddle, ref2);
gl_FragData[0] = packFloat(res.x);
gl_FragData[1] = packFloat(res.y);
`,
        ['uReal', 'uImg'], [{
            type: 'int',
            name: 'uButterflyWidth'
        }], 2, GPGPUManager.PACK_FLOAT_INCLUDE + GPGPUComplexIncludes.PI + GPGPUComplexIncludes.LIB);
        this.normAndPolarKernel = manager.createKernel(
`vec2 val = vec2(
    unpackFloat(texture2D(uReal, vCoord)),
    unpackFloat(texture2D(uImg, vCoord))
);
gl_FragData[0] = packFloat(length(val) / sqrt(float(uDims.y)));
gl_FragData[1] = packFloat(atan(val.y, val.x));
`,
        ['uReal', 'uImg'], [], 2, GPGPUManager.PACK_FLOAT_INCLUDE + GPGPUComplexIncludes.LIB);
    }
    parallelFFT(arr){
        const fftWidth = arr.dims.height;
        if((fftWidth & (fftWidth - 1)) != 0){
            throw 'Cannot do FFT on non-power of two width.';
        }
        let realArr = this.manager.arrToGPUArr(arr);
        let imgArr = this.manager.runKernel(this.zeroKernel, [], arr.dims)[0];
        for(let butterflyWidth = 1; butterflyWidth < fftWidth; butterflyWidth *= 2){
            const stepResGPUArrs = this.manager.runKernel(
                this.fftKernel, [realArr, imgArr], arr.dims, {
                    uButterflyWidth: butterflyWidth
                }
            );
            this.manager.disposeGPUArr(realArr);
            this.manager.disposeGPUArr(imgArr);
            realArr = stepResGPUArrs[0];
            imgArr = stepResGPUArrs[1];
        }
        const resGPUArrs = this.manager.runKernel(
            this.normAndPolarKernel, [realArr, imgArr], arr.dims
        );
        const resArr = this.manager.gpuArrToArr(resGPUArrs[0]);
        this.manager.disposeGPUArr(realArr);
        this.manager.disposeGPUArr(imgArr);
        this.manager.disposeGPUArr(resGPUArrs[0]);
        this.manager.disposeGPUArr(resGPUArrs[1]);
        return resArr;
    }
    dispose(){
        this.manager.disposeKernel(this.zeroKernel);
        this.manager.disposeKernel(this.fftKernel);
        this.manager.disposeKernel(this.normAndPolarKernel);
    }
};

module.exports = GPUFFT;
