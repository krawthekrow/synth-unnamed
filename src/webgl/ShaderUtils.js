class WebGLProgramInfo{
    constructor(program, vertShader, fragShader){
        this.program = program;
        this.vertShader = vertShader;
        this.fragShader = fragShader;
    }
};

class ShaderUtils{
    static compileShader(ctx, src, type){
        const shader = ctx.createShader(type);
        ctx.shaderSource(shader, src);
        ctx.compileShader(shader);
        if(!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)){
            console.log(src);
            throw 'Shader compile error: ' + ctx.getShaderInfoLog(shader);
        }
        return shader;
    }
    static createProgram(ctx, vertSrc, fragSrc){
        const program = ctx.createProgram();
        const vertShader = ShaderUtils.compileShader(ctx, vertSrc, ctx.VERTEX_SHADER);
        const fragShader = ShaderUtils.compileShader(ctx, fragSrc, ctx.FRAGMENT_SHADER);
        ctx.attachShader(program, vertShader);
        ctx.attachShader(program, fragShader);
        ctx.linkProgram(program);
        return new WebGLProgramInfo(program, vertShader, fragShader);
    }
    static registerTextures(ctx, program, texNames){
        texNames.forEach((texName, i) => {
            const texLoc = ctx.getUniformLocation(program, texName);
            ctx.uniform1i(texLoc, i);
        });
    }
    static registerVectorUniform(ctx, program, uniformName, val){
        const uniformLoc = ctx.getUniformLocation(program, uniformName);
        ctx.uniform2fv(uniformLoc, val.toArray());
    }
    static setVertAttrib(ctx, program, attribName, itemSize, buff){
        const attrib = ctx.getAttribLocation(program, attribName);
        ctx.bindBuffer(ctx.ARRAY_BUFFER, buff);
        ctx.vertexAttribPointer(attrib, itemSize, ctx.FLOAT, false, 0, 0);
    }
    static bindTextures(ctx, textures){
        textures.forEach((texture, i) => {
            ctx.activeTexture(ctx['TEXTURE' + i.toString()]);
            ctx.bindTexture(ctx.TEXTURE_2D, texture);
        });
    }
    static disposeProgram(ctx, programInfo){
        ctx.detachShader(programInfo.program, programInfo.vertShader);
        ctx.detachShader(programInfo.program, programInfo.fragShader);
        ctx.deleteShader(programInfo.vertShader);
        ctx.deleteShader(programInfo.fragShader);
        ctx.deleteProgram(programInfo.program);
    }
};

module.exports = ShaderUtils;
