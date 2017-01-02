import React from 'react';

class SpectrogramCanvas extends React.Component{
    componentDidMount(){
        this.ctx = this.canvas.getContext('2d');
    }
    render(){
        return (
<canvas width="1500" height="2048" style={{
}} ref={canvas => {this.canvas = canvas;}} />
        );
    }
};
SpectrogramCanvas.propTypes = {
};

module.exports = SpectrogramCanvas;
