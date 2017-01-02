import GPGPUComplexIncludes from 'gpgpu/GPGPUComplexIncludes.js';
import GPGPUManager from 'gpgpu/GPGPUManager.js';
import {Utils} from 'utils/Utils.js';

/*

With reference to Understanding the FFT Algorithm by Jake Vanderplas
Source: https://jakevdp.github.io/blog/2013/08/28/understanding-the-fft/
License: BSD

*/

class GPUFFTPacked{
    constructor(manager){
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
    unpackFloat(arrGet(uReal, refPos1, uDims)),
    unpackFloat(arrGet(uImg, refPos1, uDims))
);
vec2 ref2 = vec2(
    unpackFloat(arrGet(uReal, refPos2, uDims)),
    unpackFloat(arrGet(uImg, refPos2, uDims))
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
    parallelFFT(arr, fromGPUArr = false, toGPUArr = false){
        const fftWidth = arr.dims.height;
        if((fftWidth & (fftWidth - 1)) != 0){
            throw 'Cannot do FFT on non-power of two width.';
        }
        let realArr = fromGPUArr ? arr : this.manager.arrToGPUArr(arr);
        let imgArr = this.manager.runKernel(this.zeroKernel, [], arr.dims)[0];
        for(let butterflyWidth = 1; butterflyWidth < fftWidth; butterflyWidth *= 2){
            const stepResGPUArrs = this.manager.runKernel(
                this.fftKernel, [realArr, imgArr], arr.dims, {
                    uButterflyWidth: butterflyWidth
                }
            );
            if(!(fromGPUArr && butterflyWidth == 1)){
                this.manager.disposeGPUArr(realArr);
            }
            this.manager.disposeGPUArr(imgArr);
            realArr = stepResGPUArrs[0];
            imgArr = stepResGPUArrs[1];
        }
        const resGPUArrs = this.manager.runKernel(
            this.normAndPolarKernel, [realArr, imgArr], arr.dims
        );
        this.manager.disposeGPUArr(realArr);
        this.manager.disposeGPUArr(imgArr);
        this.manager.disposeGPUArr(resGPUArrs[1]);
        if(toGPUArr) return resGPUArrs[0];
        else{
            const resArr = this.manager.gpuArrToArr(resGPUArrs[0]);
            this.manager.disposeGPUArr(resGPUArrs[0]);
            return resArr;
        }
    }
    dispose(){
        this.manager.disposeKernel(this.zeroKernel);
        this.manager.disposeKernel(this.fftKernel);
        this.manager.disposeKernel(this.normAndPolarKernel);
    }
};

class GPUFFTFloat{
    constructor(manager){
        this.manager = manager;
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
// Note: not setting initial imaginary part to zero
// unless tests fail somewhere.
vec2 ref1 = arrGet(uArr, refPos1, uDims).ar;
vec2 ref2 = arrGet(uArr, refPos2, uDims).ar;
vec2 res = ref1 + complexMult(twiddle, ref2);
gl_FragData[0] = vec4(res.y, 0.0, 0.0, res.x);
`,
        ['uArr'], [{
            type: 'int',
            name: 'uButterflyWidth'
        }], 1, GPGPUComplexIncludes.PI + GPGPUComplexIncludes.LIB);
        this.normAndPolarKernel = manager.createKernel(
`vec2 val = texture2D(uArr, vCoord).ar;
gl_FragData[0] = vec4(
    length(val) / sqrt(float(uDims.y)),
    atan(val.y, val.x),
    0.0, 0.0);
`,
        ['uArr'], [], 1, GPGPUComplexIncludes.LIB);
    }
    parallelFFT(arr, fromGPUArr = false, toGPUArr = false){
        const fftWidth = arr.dims.height;
        if((fftWidth & (fftWidth - 1)) != 0){
            throw 'Cannot do FFT on non-power of two width.';
        }
        let stepArr = fromGPUArr ?
            arr :
            this.manager.flatArrToGPUArr(
                Utils.flatten(arr.data), arr.dims, 1
            );
        for(let butterflyWidth = 1; butterflyWidth < fftWidth; butterflyWidth *= 2){
            const stepResGPUArr = this.manager.runKernel(
                this.fftKernel, [stepArr], arr.dims, {
                    uButterflyWidth: butterflyWidth
                }
            );
            if(!(fromGPUArr && butterflyWidth == 1)){
                this.manager.disposeGPUArr(stepArr);
            }
            stepArr = stepResGPUArr[0];
        }
        const resGPUArr = this.manager.runKernel(
            this.normAndPolarKernel, [stepArr], arr.dims
        )[0];
        this.manager.disposeGPUArr(stepArr);
        if(toGPUArr) return resGPUArr;
        else{
            const resArr = this.manager.gpuArrToArr(resGPUArr);
            this.manager.disposeGPUArr(resGPUArr);
            return resArr;
        }
    }
    dispose(){
        this.manager.disposeKernel(this.fftKernel);
        this.manager.disposeKernel(this.normAndPolarKernel);
    }
};

class GPUFFT{
    constructor(manager){
        this.fftManager = manager.useFloat ?
            new GPUFFTFloat(manager) :
            new GPUFFTPacked(manager);
    }
    parallelFFT(arr, fromGPUArr = false, toGPUArr = false){
        return this.fftManager.parallelFFT(arr, fromGPUArr, toGPUArr);
    }
    dispose(){
        this.fftManager.dispose();
    }
};

module.exports = GPUFFT;
