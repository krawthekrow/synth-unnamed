import React from 'react';

class SoundUploader extends React.Component {
    handleClickUpload(){
        const file = this.fileInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            this.props.onUpload(e.target.result);
        };
        reader.readAsArrayBuffer(file);
    }
    render(){
        return(
<div>
    <div className="form-group">
        <label>
            Upload sound file
            <input type="file" ref={input => {this.fileInput = input;}} />
        </label>
    </div>
    <button type="button" className="btn btn-default" onClick={e => {this.handleClickUpload();}}>Upload</button>
</div>
        );
    }
};
SoundUploader.propTypes = {
    onUpload: React.PropTypes.func.isRequired
};

module.exports = SoundUploader
