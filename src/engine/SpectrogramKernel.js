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
        if(data.length % wrapWidth != 0){
            const paddedData = new Float32Array(
                Math.floor(data.length / wrapWidth + 1) * wrapWidth
            );
            paddedData.set(data);
            data = paddedData;
        }
        const halfWindSz = windSz / 2;
        const spectrum = this.gpuSTFT.stft(data, windSz, false, true, wrapWidth);
        const resGPUArr = this.manager.runKernel(
            this.postprocessKernel, [spectrum.getGPUArr()],
            new Dimensions(spectrum.dims.width, halfWindSz), {
                magRange: magRange,
                magOffset: magOffset
            }, true
        )[0];
        spectrum.dispose(this.manager);
        return resGPUArr;
    }
    dispose(){
        this.gpuSTFT.dispose();
        this.manager.disposeKernel(this.postprocessKernel);
    }
    static createPostprocessKernel(manager){
        return manager.createKernel(
`float mag = length(arrGet(uArr, threadId, ivec2(uDims.x, uDims.y * 2)).ar) / sqrt(float(uDims.y * 2));
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
        ], 1, '');
    }
};

module.exports = SpectrogramKernel;
