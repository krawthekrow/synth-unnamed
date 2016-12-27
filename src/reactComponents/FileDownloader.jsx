import React from 'react';

class FileDownloader extends React.Component {
    constructor(){
        super();
    }
    handleClickDownload(){
        const req = new XMLHttpRequest();
        if(!req){
            console.log('Unable to create XMLHttpRequest.');
            return;
        }
        req.onreadystatechange = () => {
            if(req.readyState === XMLHttpRequest.DONE){
                if(req.status === 200){
                    console.log(req.responseText);
                }
                else{
                    console.log('Failed to download sound file.');
                }
            }
        };
        req.open('GET', this.urlInput.value);
        req.send();
    }
    render(){
        return (
<div>
    <div className="form-group">
        <label>
            Sound file URL
            <input type="text" className="form-control" placeholder="URL" ref={input => {this.urlInput = input;}} />
        </label>
    </div>
    <button type="button" className="btn btn-default" onClick={e => {this.handleClickDownload();}}>Download</button>
</div>
        );
    }
};

module.exports = {
    FileDownloader: FileDownloader
};
