import GPGPUManager from 'gpgpu/GPGPUManager.js';
import {Dimensions, Utils} from 'utils/Utils.js';
import GPUDFT from 'gpgpu/GPUDFT.js';
import GPUFFT from 'gpgpu/GPUFFT.js';

class TestUtils{
    static compareArray2D(arr1, arr2, cmpFunc = TestUtils.defaultEquals){
        if(!arr1.dims.equals(arr2.dims)){
            return false;
        }
        for(let i = 0; i < arr1.dims.height; i++){
            for(let i2 = 0; i2 < arr1.dims.width; i2++){
                if(!cmpFunc(arr1.data[i][i2], arr2.data[i][i2])){
                    //console.log(i.toString() + ' ' + i2.toString() + ' ' + arr1.data[i][i2].toString() + ' ' + arr2.data[i][i2].toString());
                    return false;
                }
            }
        }
        return true;
    }
    static defaultEquals(x, y){
        return x == y;
    }
    static floatEquals(x, y, rtol = 1e-5, atol = 1e-9){
        const absX = Math.abs(x);
        const absY = Math.abs(y);
        const diff = Math.abs(x - y);
        if(x == y) return true;
        if(x == 0 || y == 0 || diff < atol) return true;
        return diff / (absX + absY) < rtol;
    }
    static processTestResult(testName, assertVal){
        //console.log(assertVal);
        console.log(testName + ': ' + (assertVal ? 'OK' : 'FAILED'));
        //if(!assertVal) console.log('Test failed: ' + testName);
    }
};

class GPGPUUnitTests{
    static run(){
        const ctx = GPGPUManager.createGPGPUCanvasContext();
        const testDims = new Dimensions(5, 6);
        const randArr = Utils.compute2DArrayAsArray2D(
            testDims,
            pos => Math.random()
        );
        const randArr2 = Utils.compute2DArrayAsArray2D(
            testDims,
            pos => Math.random()
        );
        const toGPUAndBack = (manager, arr, singleChannel = true) => {
            const gpuArr = manager.arrToGPUArr(arr, singleChannel);
            const resArr = manager.gpuArrToArr(gpuArr, singleChannel);
            manager.disposeGPUArr(gpuArr);
            return resArr;
        };
        (() => {
            const manager = new GPGPUManager(ctx, true);
            (() => {
                const resArr = toGPUAndBack(manager, randArr);
                TestUtils.processTestResult(
                    'Data transfer (float, single channel)',
                    TestUtils.compareArray2D(randArr, resArr, TestUtils.floatEquals)
                );
            })();
            (() => {
                const packedRandArr = Utils.compute2DArrayAsArray2D(
                    testDims,
                    pos => [randArr.data[pos.y][pos.x], randArr2.data[pos.y][pos.x], 0, 0]
                );
                const resArr = toGPUAndBack(manager, packedRandArr, false);
                TestUtils.processTestResult(
                    'Data transfer (float, multichannel)',
                    TestUtils.compareArray2D(packedRandArr, resArr,
                        (arr1, arr2) => TestUtils.floatEquals(arr1[0], arr2[0]) && TestUtils.floatEquals(arr1[1], arr2[1])
                    )
                );
            })();
        })();
        (() => {
            const manager = new GPGPUManager(ctx, false);
            (() => {
                const resArr = toGPUAndBack(manager, randArr);
                TestUtils.processTestResult(
                    'Data transfer (packed)',
                    TestUtils.compareArray2D(randArr, resArr, TestUtils.floatEquals)
                );
            })();
            (() => {
                const gpuArr1 = manager.arrToGPUArr(randArr);
                const gpuArr2 = manager.arrToGPUArr(randArr2);
                (() => {
                    const addKernel = manager.createKernel(
`gl_FragData[0] = packFloat(
    unpackFloat(texture2D(uArr1, vCoord)) +
    unpackFloat(texture2D(uArr2, vCoord))
);
`,
                        ['uArr1', 'uArr2'], [], 1,
                        GPGPUManager.PACK_FLOAT_INCLUDE
                    );
                    const resGPUArr = manager.runKernel(addKernel, [
                        gpuArr1,
                        gpuArr2
                    ], testDims)[0];
                    manager.disposeKernel(addKernel);
                    const resArr = manager.gpuArrToArr(resGPUArr);
                    manager.disposeGPUArr(resGPUArr);
                    const cmpArr = Utils.compute2DArrayAsArray2D(testDims,
                        pos => randArr.data[pos.y][pos.x] + randArr2.data[pos.y][pos.x]
                    );
                    TestUtils.processTestResult(
                        'Kernel run',
                        TestUtils.compareArray2D(cmpArr, resArr, TestUtils.floatEquals)
                    );
                })();
                (() => {
                    const addsubKernel = manager.createKernel(
`gl_FragData[0] = packFloat(
    unpackFloat(texture2D(uArr1, vCoord)) +
    unpackFloat(texture2D(uArr2, vCoord))
);
gl_FragData[1] = packFloat(
    unpackFloat(texture2D(uArr1, vCoord)) -
    unpackFloat(texture2D(uArr2, vCoord))
);
`,
                        ['uArr1', 'uArr2'], [], 2,
                        GPGPUManager.PACK_FLOAT_INCLUDE
                    );
                    const resGPUArrs = manager.runKernel(addsubKernel, [
                        gpuArr1,
                        gpuArr2
                    ], testDims);
                    manager.disposeKernel(addsubKernel);
                    const resArr1 = manager.gpuArrToArr(resGPUArrs[0]);
                    const resArr2 = manager.gpuArrToArr(resGPUArrs[1]);
                    manager.disposeGPUArr(resGPUArrs[0]);
                    manager.disposeGPUArr(resGPUArrs[1]);
                    const cmpArr1 = Utils.compute2DArrayAsArray2D(testDims,
                        pos => randArr.data[pos.y][pos.x] + randArr2.data[pos.y][pos.x]
                    );
                    const cmpArr2 = Utils.compute2DArrayAsArray2D(testDims,
                        pos => randArr.data[pos.y][pos.x] - randArr2.data[pos.y][pos.x]
                    );
                    TestUtils.processTestResult(
                        'Kernal multiple outputs',
                        TestUtils.compareArray2D(cmpArr1, resArr1, TestUtils.floatEquals) &&
                        TestUtils.compareArray2D(cmpArr2, resArr2, TestUtils.floatEquals)
                    );
                })();
                (() => {
                    const multKernel = manager.createKernel(
`gl_FragData[0] = packFloat(
    unpackFloat(texture2D(uArr, vCoord)) * uMult
);
`,
                    ['uArr'], [
                        {
                            type: 'float',
                            name: 'uMult'
                        }
                    ], 1, GPGPUManager.PACK_FLOAT_INCLUDE);
                    const mult = Math.random();
                    const resGPUArr = manager.runKernel(multKernel, [
                        gpuArr1
                    ], testDims, {
                        uMult: mult
                    })[0];
                    manager.disposeKernel(multKernel);
                    const resArr = manager.gpuArrToArr(resGPUArr);
                    manager.disposeGPUArr(resGPUArr);
                    const cmpArr = Utils.compute2DArrayAsArray2D(testDims,
                        pos => randArr.data[pos.y][pos.x] * mult
                    );
                    TestUtils.processTestResult(
                        'Kernel uniform',
                        TestUtils.compareArray2D(cmpArr, resArr, TestUtils.floatEquals)
                    );
                })();
                manager.disposeGPUArr(gpuArr1);
                manager.disposeGPUArr(gpuArr2);
            })();
        })();
        (() => {
            const manager = new GPGPUManager(ctx, true);
            (() => {
                const gpuArr = manager.flatArrToGPUArr(
                    Utils.flatten(randArr.data),
                    randArr.dims, 1
                );
                const aToRKernel = manager.createKernel(
`gl_FragData[0] = vec4(texture2D(uArr, vCoord).a, 0.0, 0.0, 0.0);
`,
                ['uArr'], [], 1);
                const resGPUArr = manager.runKernel(aToRKernel, [
                    gpuArr
                ], testDims)[0];
                manager.disposeKernel(aToRKernel);
                const resArr = manager.gpuArrToArr(resGPUArr);
                manager.disposeGPUArr(resGPUArr);
                TestUtils.processTestResult(
                    'Data transfer (float, flat alpha)',
                    TestUtils.compareArray2D(randArr, resArr, TestUtils.floatEquals)
                );
            })();
        })();
    }
};

class FFTUnitTests{
    static run(){
        const ctx = GPGPUManager.createGPGPUCanvasContext();
        const manager = new GPGPUManager(ctx, false);
        const managerFloat = new GPGPUManager(ctx, true);
        const testDims = new Dimensions(1, 128);
        const randArr = Utils.compute2DArrayAsArray2D(
            testDims,
            pos => Math.random()
        );
        const gpuDFT = new GPUDFT(manager);
        const gpuFFT = new GPUFFT(manager);
        const gpuFFTFloat = new GPUFFT(managerFloat);
        const dftArr = gpuDFT.parallelDFT(randArr);
        const fftArr = gpuFFT.parallelFFT(randArr);
        const fftFloatArr = gpuFFTFloat.parallelFFT(randArr);
        gpuDFT.dispose();
        gpuFFT.dispose();
        gpuFFTFloat.dispose();
        TestUtils.processTestResult(
            'GPU FFT vs DFT',
            TestUtils.compareArray2D(dftArr, fftArr, (x, y) => TestUtils.floatEquals(x, y, 1e-3))
        );
        TestUtils.processTestResult(
            'GPU FFT packed vs float',
            TestUtils.compareArray2D(fftArr, fftFloatArr, (x, y) => TestUtils.floatEquals(x, y, 1e-3))
        );
    }
};

class UnitTestsManager{
    static runAllTests(){
        GPGPUUnitTests.run();
        FFTUnitTests.run();
    }
};

module.exports = UnitTestsManager;
