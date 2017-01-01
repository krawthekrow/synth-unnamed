import GPGPUManager from 'gpgpu/GPGPUManager.js';
import {Utils, Dimensions} from 'utils/Utils.js';
import EventLoop from 'utils/EventLoop.js';
import GPUDFT from 'gpgpu/GPUDFT.js';
import GPUFFT from 'gpgpu/GPUFFT.js';

class FFTTimingTestManager{
    static run(){
        const manager = new GPGPUManager(
            GPGPUManager.createGPGPUCanvasContext(),
            false
        );
        const testDims = new Dimensions(4000, 1024);
        const randArr = Utils.compute2DArrayAsArray2D(
            testDims,
            pos => Math.random()
        );
        const gpuDFT = new GPUDFT(manager);
        const gpuFFT = new GPUFFT(manager);
        const eventLoop = new EventLoop();
        let dftTime = 0, fftTime = 0;
        eventLoop.addTask(() => {
            const startTime = performance.now();
            const dftArr = gpuDFT.parallelDFT(randArr);
            const endTime = performance.now();
            dftTime = endTime - startTime;
        });
        eventLoop.addTask(() => {
            const startTime = performance.now();
            const fftArr = gpuFFT.parallelFFT(randArr);
            const endTime = performance.now();
            fftTime = endTime - startTime;
        });
        eventLoop.addTask(() => {
            gpuDFT.dispose();
            gpuFFT.dispose();
            console.log('DFT: ' + Math.floor(dftTime).toString() + 'ms; FFT: ' + Math.floor(fftTime).toString() + 'ms.');
        });
        eventLoop.start();
    }
};

module.exports = FFTTimingTestManager;
