import QuadDrawingUtils from 'webgl/QuadDrawingUtils.js';

class WebGLStateManager{
    constructor(ctx){
        this.ctx = ctx;
        this.numAttribsEnabled = 0;
        this.lazyQuadPosBuff = null;
        this.lazyQuadIndexBuff = null;
    }
    getQuadPosBuff(){
        if(this.lazyQuadPosBuff == null)
            this.lazyQuadPosBuff = this.createStaticArrBuff(this.ctx.ARRAY_BUFFER, QuadDrawingUtils.QUAD_POS_ARR);
        return this.lazyQuadPosBuff;
    }
    getQuadIndexBuff(){
        if(this.lazyQuadIndexBuff == null)
            this.lazyQuadIndexBuff = this.createStaticArrBuff(this.ctx.ELEMENT_ARRAY_BUFFER, QuadDrawingUtils.QUAD_INDEX_ARR);
        return this.lazyQuadIndexBuff;
    }
    createStaticArrBuff(type, contents){
        const buff = this.ctx.createBuffer();
        this.ctx.bindBuffer(type, buff);
        this.ctx.bufferData(type, contents, this.ctx.STATIC_DRAW);
        return buff;
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
    dispose(){
        if(this.lazyQuadPosBuff != null)
            this.ctx.deleteBuffer(this.lazyQuadPosBuff);
        if(this.lazyQuadIndexBuff != null)
            this.ctx.deleteBuffer(this.lazyQuadIndexBuff);
    }
};

module.exports = WebGLStateManager;
