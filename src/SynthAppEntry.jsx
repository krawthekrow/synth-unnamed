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
import SpectrogramKernel from 'engine/SpectrogramKernel.js';
import QuadDrawingKernel from 'webgl/QuadDrawingKernel.js';

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
    }
    handleSoundUpload(data){
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        ctx.decodeAudioData(data).then((buffer) =>{
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

        const wrapWidth = 2048;
        const truncBuff = new Float32Array(bufferView.buffer, 0, wrapWidth * 256);
        const spectroKernel = new SpectrogramKernel(this.gpgpuManager);
        const spectro = spectroKernel.run(bufferView, 2048, 5, 2, 2048);
        spectroKernel.dispose();

        const quadKernel = new QuadDrawingKernel(this.webglStateManager);
        quadKernel.run(spectro.tex, new Rect(
            new Vector(0, 0),
            spectro.dims
        ), this.CANVAS_DIMS);
        quadKernel.dispose();
        
        this.gpgpuManager.disposeGPUArr(spectro);

        console.log('Done.');
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
