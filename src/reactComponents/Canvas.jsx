import React from 'react';
import {Dimensions} from 'utils/Utils.js';

class Canvas extends React.Component{
    componentDidMount(){
        this.ctx = this.canvas.getContext('2d');
        if('onMount' in this.props){
            this.props.onMount(this.ctx);
        }
        this.ctx.canvas.width = 100;
        this.ctx.canvas.height = 10;
        this.ctx.beginPath();
        this.ctx.rect(0, 0, 100, 10);
        this.ctx.fillStyle = 'red';
        this.ctx.fill();
    }
    componentWillUnmount(){
    }
    setDimensions(newDims){
        this.canvas.width = newDims.width;
        this.canvas.height = newDims.height;
    }
    render(){
        return (
            <canvas width="1" height="1" ref={canvas => {this.canvas = canvas;}} />
        );
    }
};
Canvas.propTypes = {
    onMount: React.PropTypes.func
};

module.exports = Canvas
