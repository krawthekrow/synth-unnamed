import React from 'react';
import ReactDOM from 'react-dom';
import SoundUploader from 'reactComponents/SoundUploader.jsx';
import SpectrogramCanvas from 'reactComponents/SpectrogramCanvas.jsx';
import Canvas from 'reactComponents/Canvas.jsx';
import TestCanvas from 'reactComponents/TestCanvas.jsx';
import {Utils, Dimensions, Vector, Rect} from 'utils/Utils.js';
import UnitTestsManager from 'tests/UnitTestsManager.js';
import FFTTimingTestManager from 'tests/FFTTimingTestManager.js';
import GPGPUManager from 'gpgpu/GPGPUManager.js';
import GPUDFT from 'gpgpu/GPUDFT.js';
import GPUFFT from 'gpgpu/GPUFFT.js';
import GPUSTFT from 'gpgpu/GPUSTFT.js';
import GPUISTFT from 'gpgpu/GPUISTFT.js';
import SpectrogramKernel from 'engine/SpectrogramKernel.js';
import QuadDrawingKernel from 'webgl/QuadDrawingKernel.js';
import ComplexArray2D from 'gpgpu/ComplexArray2D.js';

class SynthApp extends React.Component {
    constructor(props){
        super(props);
        this.sound = null;
        this.webglStateManager = null;
        this.CANVAS_DIMS = new Dimensions(1800, 1024);
    }
    componentDidMount(){
        UnitTestsManager.runAllTests();
        //FFTTimingTestManager.run();
        this.webglStateManager = GPGPUManager.createWebGLStateManager(this.mainCanvas);
        this.gpgpuManager = new GPGPUManager(this.webglStateManager);
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    handleSoundUpload(data){
        this.audioCtx.decodeAudioData(data).then((buffer) =>{
            this.setSound(buffer);
            //const bufferView = buffer.getChannelData(0);
            //for(let i = 0; i < buffer.length; i++){
            //    bufferView[i] /= 6;
            //}
            //const source = ctx.createBufferSource();
            //source.buffer = buffer;
            //source.connect(ctx.destination);
            //source.start();
        });
    }
    setSound(buffer){
        this.sound = buffer;
        const bufferView = this.sound.getChannelData(0);

        const windSz = 2048;

        const gpuSTFT = new GPUSTFT(this.gpgpuManager);
        const spectrum = gpuSTFT.stft(bufferView, windSz, false, 2048);
        gpuSTFT.dispose();

        const gpuISTFT = new GPUISTFT(this.gpgpuManager);
        const realArr = spectrum.getCPUArrs(this.gpgpuManager)[0];
        const imgArr = spectrum.getCPUArrs(this.gpgpuManager)[1];
        const magArr = ComplexArray2D.fromRealArr(
            Utils.compute2DArrayAsArray2D(
                realArr.dims,
                pos => {
                    let mag = Math.sqrt(
                        Math.pow(realArr.data[pos.y][pos.x], 2) +
                        Math.pow(imgArr.data[pos.y][pos.x], 2)
                    ) / windSz;
                    //if(mag < 0.0001) mag = 0;
                    //if(pos.y < 500 && pos.y % 50 == 0) mag = 0.002;
                    //else mag = 0;
                    return mag;
                }
            )
        );
        const resynth = gpuISTFT.istft(magArr);
        gpuISTFT.dispose();
        for(let i = 0; i < resynth.length; i++){
            bufferView[i] = resynth[i];
        }

        const spectroKernel = new SpectrogramKernel(this.gpgpuManager);
        const spectro = spectroKernel.run(magArr, 10, 2);
        spectroKernel.dispose();
        magArr.dispose(this.gpgpuManager);
        spectrum.dispose(this.gpgpuManager);

        const quadKernel = new QuadDrawingKernel(this.webglStateManager);
        quadKernel.run(spectro.tex, new Rect(
            new Vector(0, 0),
            spectro.dims
        ), this.CANVAS_DIMS);
        quadKernel.dispose();
        
        this.gpgpuManager.disposeGPUArr(spectro);

        const source = this.audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioCtx.destination);
        source.start();

        //console.log('Done.');
    }
    render(){
        return (
<div>
    <SoundUploader onUpload={data => this.handleSoundUpload(data)} />
    {/*<TestCanvas />*/}
    <canvas key='mainCanvas' width={this.CANVAS_DIMS.width} height={this.CANVAS_DIMS.height} ref={canvas => {this.mainCanvas = canvas;}} />
    <SpectrogramCanvas ref={canvas => {this.spectroCanvas = canvas;}} />
</div>
        );
    }
};

function init(){
    ReactDOM.render(<SynthApp />, document.getElementById('indexContainer'));
}

module.exports = {
    init: init
};
