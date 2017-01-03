import WebGLStateManager from 'webgl/WebGLStateManager.js';
import GPGPUManager from 'gpgpu/GPGPUManager.js';
import {Utils, Dimensions} from 'utils/Utils.js';
import EventLoop from 'utils/EventLoop.js';
import GPUDFT from 'gpgpu/GPUDFT.js';
import GPUFFT from 'gpgpu/GPUFFT.js';
import ComplexArray2D from 'gpgpu/ComplexArray2D.js';

class FFTTimingTestManager{
    static run(){
        const stateManager = GPGPUManager.createWebGLStateManager();
        const manager = new GPGPUManager(stateManager, false);
        const managerFloat = new GPGPUManager(stateManager, true);
        const testDims = new Dimensions(500, 2048);
        const randArr1 = ComplexArray2D.fromRealArr(
            Utils.compute2DArrayAsArray2D(
                testDims,
                pos => Math.random()
            )
        );
        const randArr2 = ComplexArray2D.fromRealArr(
            randArr1.getCPUArrs()[0]
        );
        const randArr3 = ComplexArray2D.fromRealArr(
            randArr2.getCPUArrs()[0]
        );
        const gpuDFT = new GPUDFT(manager);
        const gpuFFT = new GPUFFT(manager);
        const gpuFFTFloat = new GPUFFT(managerFloat);
        const eventLoop = new EventLoop();
        let dftTime = 0, fftTime = 0, fftFloatTime = 0;
        eventLoop.addTask(() => {
            randArr1.getGPUArrs(manager);
            manager.ctx.finish();
            const startTime = performance.now();
            const dftArr = gpuDFT.parallelDFT(randArr1, true);
            manager.ctx.finish();
            const endTime = performance.now();
            dftTime = endTime - startTime;
            dftArr.dispose(manager);
            randArr1.dispose(manager);
        });
        eventLoop.addTask(() => {
            randArr2.getGPUArrs(manager);
            manager.ctx.finish();
            const startTime = performance.now();
            const fftArr = gpuFFT.parallelFFT(randArr2, true);
            manager.ctx.finish();
            const endTime = performance.now();
            fftTime = endTime - startTime;
            fftArr.dispose(manager);
            randArr2.dispose(manager);
        });
        eventLoop.addTask(() => {
            randArr3.getGPUArrs(managerFloat);
            managerFloat.ctx.finish();
            const startTime = performance.now();
            const fftFloatArr = gpuFFTFloat.parallelFFT(randArr3, true);
            managerFloat.ctx.finish();
            const endTime = performance.now();
            fftFloatTime = endTime - startTime;
            fftFloatArr.dispose(managerFloat);
            randArr3.dispose(managerFloat);
        });
        eventLoop.addTask(() => {
            gpuDFT.dispose();
            gpuFFT.dispose();
            gpuFFTFloat.dispose();
            console.log('DFT: ' + Math.floor(dftTime).toString() + 'ms; FFT (packed): ' + Math.floor(fftTime).toString() + 'ms; FFT (float): ' + Math.floor(fftFloatTime).toString() + 'ms.');
            manager.dispose();
            managerFloat.dispose();
        });
        eventLoop.start();
    }
};

module.exports = FFTTimingTestManager;
