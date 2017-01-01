import React from 'react';

class TestCanvas extends React.Component{
    componentDidMount(){
    }
    render(){
        return (
<canvas width="10" height="10" style={{
}} ref={canvas => {this.canvas = canvas;}} />
        );
    }
};
TestCanvas.propTypes = {
};

module.exports = TestCanvas;
