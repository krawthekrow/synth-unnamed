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
    static disposeProgram(ctx, programInfo){
        ctx.detachShader(programInfo.program, programInfo.vertShader);
        ctx.detachShader(programInfo.program, programInfo.fragShader);
        ctx.deleteShader(programInfo.vertShader);
        ctx.deleteShader(programInfo.fragShader);
        ctx.deleteProgram(programInfo.program);
    }
};

module.exports = ShaderUtils;
