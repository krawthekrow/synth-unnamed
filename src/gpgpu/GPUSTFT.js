import GPUFFT from 'gpgpu/GPUFFT.js';
import GPGPUComplexIncludes from 'gpgpu/GPGPUComplexIncludes.js';
import {Utils, Dimensions} from 'utils/Utils.js';
import ComplexArray2D from 'gpgpu/ComplexArray2D.js';

class GPUSTFT{
    constructor(manager){
        if(!manager.useFloat){
            throw 'GPUSTFT only supports floating-point textures.';
        }
        this.manager = manager;
        this.fftManager = new GPUFFT(this.manager);
        this.windowKernel = this.manager.createKernel(
`float windVal = 0.5 * (1.0 - cos(2.0 * PI * float(threadId.y) / float(uDims.y - 1)));
int arrIndex = threadId.x * uDims.y / 2 + threadId.y;
float res = windVal * arrGet(uArr, ivec2(
    int(mod(float(arrIndex), float(uSrcDims.x))),
    arrIndex / uSrcDims.x
), uSrcDims).a;
gl_FragData[0] = vec4(0.0, 0.0, 0.0, res);
`,
        ['uArr'], [{
            type: 'ivec2',
            name: 'uSrcDims'
        }], 1, GPGPUComplexIncludes.PI);
    }
    stft(arr, windSz = 1024, fromGPUArr = false, toGPUArr = false, wrapWidth = windSz / 2){
        if(!fromGPUArr && arr.length % wrapWidth != 0){
            throw 'Array length must be a multiple of the wrap width.';
        }
        const gpuArrDims = fromGPUArr ? arr.dims :
            new Dimensions(wrapWidth, arr.length / wrapWidth);
        const gpuArr = fromGPUArr ? arr :
            this.manager.flatArrToGPUArr(arr, gpuArrDims, 1);
        const fftInputArr = ComplexArray2D.fromGPUArr(
            this.manager.runKernel(
                this.windowKernel, [gpuArr],
                new Dimensions(arr.length / (windSz / 2) - 1, windSz), {
                    uSrcDims: gpuArrDims.toArray()
                }
            )[0]
        );
        if(!fromGPUArr) this.manager.disposeGPUArr(gpuArr);
        const resGPUArr = this.fftManager.parallelFFT(fftInputArr);
        fftInputArr.dispose(this.manager);
        return resGPUArr;
    }
    dispose(){
        this.manager.disposeKernel(this.windowKernel);
    }
};
GPUSTFT.DEFAULT_WRAP_WIDTH = 2048;

module.exports = GPUSTFT;
