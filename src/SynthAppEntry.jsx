import React from 'react';
import ReactDOM from 'react-dom';
import SoundUploader from 'reactComponents/SoundUploader.jsx';
import Canvas from 'reactComponents/Canvas.jsx';

class SynthApp extends React.Component {
    handleSoundUpload(data){
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        ctx.decodeAudioData(data).then((buffer) =>{
            const bufferView = buffer.getChannelData(0);
            for(let i = 0; i < buffer.length; i++){
                bufferView[i] /= 6;
            }
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);
            source.start();
        });
    }
    render(){
        return (
<div>
    <SoundUploader onUpload={data => this.handleSoundUpload(data)} />;
    <Canvas />
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
