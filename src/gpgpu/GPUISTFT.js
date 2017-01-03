import GPUIFFT from 'gpgpu/GPUIFFT.js';
import GPGPUComplexIncludes from 'gpgpu/GPGPUComplexIncludes.js';
import {Dimensions, Utils} from 'utils/Utils.js';

class GPUISTFT{
    constructor(manager){
        if(!manager.useFloat){
            throw 'GPUSTFT only supports floating-point textures.';
        }
        this.manager = manager;
        this.fftManager = new GPUIFFT(this.manager);
        this.windowKernel = this.manager.createKernel(
`int arrIndex = threadId.y * uDims.x + threadId.x;
int halfWindSz = uSrcDims.y / 2;
int chunkIndex = arrIndex / halfWindSz;
int offset = int(mod(float(arrIndex), float(halfWindSz)));
ivec2 ref1 = ivec2(chunkIndex, offset);
ivec2 ref2 = ivec2(chunkIndex - 1, offset + halfWindSz);
float res = ((ref1.x < uSrcDims.x) ? arrGet(uArr, ref1, uSrcDims).a : 0.0) +
    ((ref2.x >= 0) ? arrGet(uArr, ref2, uSrcDims).a : 0.0);
gl_FragData[0] = vec4(res, 0.0, 0.0, 0.0);
`,
        ['uArr'], [{
            type: 'ivec2',
            name: 'uSrcDims'
        }], 1, GPGPUComplexIncludes.PI);
    }
    istft(arr, toGPUArr = false, wrapWidth = 2048){
        const windowedArr = this.fftManager.parallelIFFT(arr);
        const windSz = windowedArr.dims.height;
        const resArrLength = (windSz / 2) * (windowedArr.dims.width + 1);
        const resGPUArr = this.manager.runKernel(
            this.windowKernel, [windowedArr.getGPUArr(this.manager)],
            new Dimensions(wrapWidth, Math.ceil(resArrLength / wrapWidth)),
            {
                uSrcDims: windowedArr.dims.toArray()
            }
        )[0];
        windowedArr.dispose(this.manager);
        if(toGPUArr) return resGPUArr;
        else{
            const resPixelArr = this.manager.gpuArrToFlatArr(resGPUArr);
            this.manager.disposeGPUArr(resGPUArr);
            const resArr = [];
            for(let i = 0; i < resArrLength; i++){
                resArr.push(resPixelArr[i * 4]);
            }
            return resArr;
        }
    }
    dispose(){
        this.manager.disposeKernel(this.windowKernel);
        this.fftManager.dispose();
    }
};

module.exports = GPUISTFT;
