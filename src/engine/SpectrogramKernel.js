import GPUSTFT from 'gpgpu/GPUSTFT.js';
import {Dimensions} from 'utils/Utils.js';

class SpectrogramKernel{
    constructor(manager){
        this.manager = manager;
        this.postprocessKernel = SpectrogramKernel.createPostprocessKernel(this.manager);
    }
    get ctx(){
        return this.manager.ctx;
    }
    run(data, magRange, magOffset){
        const resGPUArr = this.manager.runKernel(
            this.postprocessKernel, [data.getGPUArr(this.manager)],
            new Dimensions(data.dims.width, data.dims.height / 2), {
                magRange: magRange,
                magOffset: magOffset
            }, true
        )[0];
        return resGPUArr;
    }
    dispose(){
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
