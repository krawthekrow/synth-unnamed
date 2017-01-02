import React from 'react';
import ReactDOM from 'react-dom';
import SoundUploader from 'reactComponents/SoundUploader.jsx';
import SpectrogramCanvas from 'reactComponents/SpectrogramCanvas.jsx';
import Canvas from 'reactComponents/Canvas.jsx';
import TestCanvas from 'reactComponents/TestCanvas.jsx';
import {Utils, Dimensions} from 'utils/Utils.js';
import UnitTestsManager from 'tests/UnitTestsManager.js';
import FFTTimingTestManager from 'tests/FFTTimingTestManager.js';
import GPGPUManager from 'gpgpu/GPGPUManager.js';
import GPUDFT from 'gpgpu/GPUDFT.js';
import GPUFFT from 'gpgpu/GPUFFT.js';
import GPUSTFT from 'gpgpu/GPUSTFT.js';
import SpectrogramKernel from 'engine/SpectrogramKernel.js';

class SynthApp extends React.Component {
    constructor(props){
        super(props);
        this.sound = null;
    }
    componentDidMount(){
        UnitTestsManager.runAllTests();
        //FFTTimingTestManager.run();
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
        const gpgpuManager = new GPGPUManager(null, true);
        const spectroKernel = new SpectrogramKernel(gpgpuManager);
        const spectro = spectroKernel.run(truncBuff, 2048, 5, 2, 2048);
        spectroKernel.dispose();
        
        const spectroImgBuff = new Uint8ClampedArray(
            gpgpuManager.gpuArrToFlatArr(spectro, true)
        );
        const spectroImgData = this.spectroCanvas.ctx.createImageData(spectro.dims.width, spectro.dims.height);
        spectroImgData.data.set(spectroImgBuff);
        this.spectroCanvas.ctx.putImageData(spectroImgData, 0, 0);
        //this.spectroCanvas.ctx.drawImage(this.spectroCanvas.ctx.canvas, 0, 0, this.spectroCanvas.ctx.canvas.width * 2, this.spectroCanvas.ctx.canvas.height * 2);
        console.log('Done.');
    }
    render(){
        return (
<div>
    <SoundUploader onUpload={data => this.handleSoundUpload(data)} />
    {/*<TestCanvas />*/}
    {/*<canvas key='mainCanvas' width='1800' height='1024' ref={canvas => {this.mainCanvas = canvas;}} />*/}
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
