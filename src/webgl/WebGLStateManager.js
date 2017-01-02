class WebGLStateManager{
    constructor(ctx){
        this.ctx = ctx;
        this.numAttribsEnabled = 0;
    }
    enableAttribs(numAttribs){
        while(this.numAttribsEnabled > numAttribs){
            this.numAttribsEnabled--;
            this.ctx.disableVertexAttribArray(this.numAttribsEnabled);
        }
        while(this.numAttribsEnabled < numAttribs){
            this.ctx.enableVertexAttribArray(this.numAttribsEnabled);
            this.numAttribsEnabled++;
        }
    }
};

module.exports = WebGLStateManager;
