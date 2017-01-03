import {Utils} from 'utils/Utils.js';

class GPUFFTUtils{
    static nullableArray2DsToARGPUArray(manager, arrs){
        return manager.flatArrToGPUArr(
            (arrs[1] == null) ?
            Utils.flatten(arrs[0].data) :
            array2DsToARFlat(arrs),
            arrs[0].dims, (arrs[1] == null) ? 1 : 4
        );
    }
    static array2DsToARFlat(arrs){
        const flatArrs = arrs.map(arr => Utils.flatten(arr));
        return Utils.compute1DArray(
            flatArrs[0].length,
            pos => [arrs[1][pos], 0, 0, arrs[0].pos]
        );
    }
};

module.exports = GPUFFTUtils;
