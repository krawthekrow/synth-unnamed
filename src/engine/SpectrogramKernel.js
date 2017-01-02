import GPUSTFT from 'gpgpu/GPUSTFT.js';
import {Dimensions} from 'utils/Utils.js';

class SpectrogramKernel{
    constructor(manager){
        this.manager = manager;
        this.gpuSTFT = new GPUSTFT(this.manager);
        this.postprocessKernel = SpectrogramKernel.createPostprocessKernel(this.manager);
    }
    get ctx(){
        return this.manager.ctx;
    }
    run(data, windSz, magRange, magOffset, wrapWidth = windSz / 2){
        const halfWindSz = windSz / 2;
        const spectrum = this.gpuSTFT.stft(data, windSz, false, true, wrapWidth);
        const resGPUArr = this.manager.runKernel(
            this.postprocessKernel, [spectrum],
            new Dimensions(spectrum.dims.width, halfWindSz), {
                magRange: magRange,
                magOffset: magOffset
            }
        )[0];
        this.manager.disposeGPUArr(spectrum);
        return resGPUArr;
    }
    dispose(){
        this.gpuSTFT.dispose();
        this.manager.disposeKernel(this.postprocessKernel);
    }
    static createPostprocessKernel(manager){
        return manager.createKernel(
`float mag = arrGet(uArr, threadId, ivec2(uDims.x, uDims.y * 2)).x;
gl_FragData[0] = vec4(
    log(mag) / magRange + magOffset,
    0.0, 0.0, 1.0
);
`,
            ['uArr'], [{
                type: 'float',
                name: 'magRange'
            }, {
                type: 'float',
                name: 'magOffset'
            }
        ], 1, '', true);
    }
};

module.exports = SpectrogramKernel;
