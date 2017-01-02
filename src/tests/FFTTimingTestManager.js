import WebGLStateManager from 'webgl/WebGLStateManager.js';
import GPGPUManager from 'gpgpu/GPGPUManager.js';
import {Utils, Dimensions} from 'utils/Utils.js';
import EventLoop from 'utils/EventLoop.js';
import GPUDFT from 'gpgpu/GPUDFT.js';
import GPUFFT from 'gpgpu/GPUFFT.js';

class FFTTimingTestManager{
    static run(){
        const stateManager = GPGPUManager.createWebGLStateManager();
        const manager = new GPGPUManager(stateManager, false);
        const managerFloat = new GPGPUManager(stateManager, true);
        const testDims = new Dimensions(500, 2048);
        const randArr = Utils.compute2DArrayAsArray2D(
            testDims,
            pos => Math.random()
        );
        const gpuDFT = new GPUDFT(manager);
        const gpuFFT = new GPUFFT(manager);
        const gpuFFTFloat = new GPUFFT(managerFloat);
        const eventLoop = new EventLoop();
        let dftTime = 0, fftTime = 0, fftFloatTime = 0;
        eventLoop.addTask(() => {
            const startTime = performance.now();
            const dftArr = gpuDFT.parallelDFT(randArr, true);
            const endTime = performance.now();
            dftTime = endTime - startTime;
        });
        eventLoop.addTask(() => {
            const startTime = performance.now();
            const fftArr = gpuFFT.parallelFFT(randArr, true);
            const endTime = performance.now();
            fftTime = endTime - startTime;
        });
        eventLoop.addTask(() => {
            const startTime = performance.now();
            const fftFloatArr = gpuFFTFloat.parallelFFT(randArr, true);
            const endTime = performance.now();
            fftFloatTime = endTime - startTime;
        });
        eventLoop.addTask(() => {
            gpuDFT.dispose();
            gpuFFT.dispose();
            console.log('DFT: ' + Math.floor(dftTime).toString() + 'ms; FFT (packed): ' + Math.floor(fftTime).toString() + 'ms; FFT (float): ' + Math.floor(fftFloatTime).toString() + 'ms.');
            manager.dispose();
            managerFloat.dispose();
        });
        eventLoop.start();
    }
};

module.exports = FFTTimingTestManager;
