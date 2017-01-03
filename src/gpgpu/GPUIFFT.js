import GPGPUComplexIncludes from 'gpgpu/GPGPUComplexIncludes.js';
import GPGPUManager from 'gpgpu/GPGPUManager.js';
import {Utils} from 'utils/Utils.js';
import ComplexArray2D from 'gpgpu/ComplexArray2D.js';

class GPUIFFT{
    constructor(manager){
        if(!manager.useFloat){
            throw 'GPUIFFT only supports floating-point textures.';
        }
        this.manager = manager;
        this.fftKernel = this.manager.createKernel(
`//factor of two cancels out for 2PI and period
vec2 twiddle = complexExp(vec2(0.0,
    PI * float(threadId.y) / float(uButterflyWidth)
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
    }
    parallelIFFT(arr){
        const fftWidth = arr.dims.height;
        if((fftWidth & (fftWidth - 1)) != 0){
            throw 'Cannot do FFT on non-power of two width.';
        }
        let stepArr = arr.getGPUArr(this.manager);
        for(let butterflyWidth = 1; butterflyWidth < fftWidth; butterflyWidth *= 2){
            const stepResGPUArr = this.manager.runKernel(
                this.fftKernel, [stepArr], arr.dims, {
                    uButterflyWidth: butterflyWidth
                }
            );
            if(butterflyWidth != 1){
                this.manager.disposeGPUArr(stepArr);
            }
            stepArr = stepResGPUArr[0];
        }
        return ComplexArray2D.fromGPUArr(stepArr);
    }
    dispose(){
        this.manager.disposeKernel(this.fftKernel);
    }
};

module.exports = GPUIFFT;
