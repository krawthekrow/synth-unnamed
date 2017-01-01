import GPGPUManager from 'gpgpu/GPGPUManager.js';
import {Utils, Dimensions} from 'utils/Utils.js';

class FFTTimingTestManager{
    static run(){
        const manager = new GPGPUManager(
            GPGPUManager.createGPGPUCanvasContext(),
            false
        );
        const testDims = new Dimensions(1, 4096);
        const randArr = Utils.compute2DArrayAsArray2D(
            testDims,
            pos => Math.random()
        );
        const gpuDFT = new GPUDFT(manager);
        const dftArr = gpuDFT.parallelDFT(randArr);
        gpuDFT.dispose();
        const gpuFFT = new GPUFFT(manager);
        const fftArr = gpuFFT.parallelFFT(randArr);
        gpuFFT.dispose();
    }
};

module.exports = FFTTimingTestManager;
