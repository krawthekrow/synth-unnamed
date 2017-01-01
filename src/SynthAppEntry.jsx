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

class SynthApp extends React.Component {
    constructor(props){
        super(props);
        this.sound = null;
    }
    componentDidMount(){
        //UnitTestsManager.runAllTests();
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
        const fullLength = this.sound.length;
        const windSz = 1024;
        const halfWindSz = windSz / 2;
        const numWind = parseInt(fullLength / halfWindSz) - 1;

        const spectroDims = new Dimensions(/*numWind*/1024, halfWindSz);
        const windFunc = Utils.compute1DArray(windSz,
            i => 0.5 * (1 - Math.cos(2 * Math.PI * i / (windSz - 1)))
        );
        const dftInput = Utils.compute2DArrayAsArray2D(
            new Dimensions(spectroDims.width, windSz),
            pos => bufferView[pos.x * windSz + pos.y] * windFunc[pos.y]
        );
        const gpgpuManager = new GPGPUManager(null, false);
        const gpuFFT = new GPUFFT(gpgpuManager);
        const spectrum = gpuFFT.parallelFFT(dftInput).data.slice(halfWindSz, windSz);
        gpuFFT.dispose();
        const maxMag = 5;
        const flatSpectrum = Utils.flatten(Utils.flatten(spectrum).map(mag => [
            Math.floor(Utils.clamp(Math.log(mag) + 10, 0, maxMag) / maxMag * 256),
            0, 0, 255
        ]));
        
        const spectroImgBuff = new Uint8ClampedArray(flatSpectrum);

        //for(let i = 0; i < texDims; i++){
        //    const dftInput = new Float32Array(windowSize);
        //    for(let i2 = 0; i2 < windowSize; i2++){
        //        const signalVal = bufferView[i * windowSize + i2];
        //        const windowVal = 0;
        //        dftInput[i2] = signalVal * windowVal;
        //    }
        //    for(let k = 0; k < halfWindowSize; k++){
        //        let coeff = Complex.ZERO;
        //        for(let i2 = 0; i2 < windowSize; i2++){
        //            coeff = coeff.add(Complex.exp(new Complex(0, -2 * Math.PI * k * i2 / windowSize)).rMult(dftInput[i2]));
        //        }
        //        const pixOffset = k * (spectroDims.width * 4) + i * 4;
        //        const mag = Math.floor(Utils.clamp(Math.log(coeff.abs()) + 10, 0, maxMag) / maxMag * 256);
        //        spectroImgBuff[pixOffset] = mag;
        //        spectroImgBuff[pixOffset + 3] = 255;
        //    }
        //}
        const spectroImgData = this.spectroCanvas.ctx.createImageData(spectroDims.width, spectroDims.height);
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
