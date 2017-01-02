import QuadDrawingUtils from 'webgl/QuadDrawingUtils.js';
import ShaderUtils from 'webgl/ShaderUtils.js';
import {Vector} from 'utils/Utils.js';

class QuadDrawingKernel{
    constructor(stateManager){
        this.stateManager = stateManager;
        const vertShaderSrc = QuadDrawingUtils.createVertShaderSrc(
            [QuadDrawingUtils.TRANSFORMS.flipY],
            true, true
        );
        const fragShaderSrc = QuadDrawingUtils.createDirectDrawFragShaderSrc();
        const programInfo = ShaderUtils.createProgram(this.ctx, vertShaderSrc, fragShaderSrc);
        const program = programInfo.program;

        this.ctx.useProgram(program);
        ShaderUtils.setVertAttrib(this.ctx, program, 'aPos', 2, this.stateManager.getQuadPosBuff())
        ShaderUtils.registerTextures(this.ctx, program, ['uImg']);

        this.programInfo = programInfo;
    }
    get ctx(){
        return this.stateManager.ctx;
    }
    get program(){
        return this.programInfo.program;
    }
    run(tex, boundingRect, canvasDims){
        this.ctx.useProgram(this.program);
        ShaderUtils.registerVectorUniform(this.ctx, this.program, 'uScale',
            new Vector(
                boundingRect.width / canvasDims.width,
                boundingRect.height / canvasDims.height
            )
        );
        ShaderUtils.registerVectorUniform(this.ctx, this.program, 'uTransform',
            new Vector(
                boundingRect.x / canvasDims.width,
                boundingRect.y / canvasDims.height
            )
        );
        this.ctx.bindFramebuffer(this.ctx.FRAMEBUFFER, null);
        ShaderUtils.bindTextures(this.ctx, [tex]);

        this.ctx.viewport(0, 0, canvasDims.width, canvasDims.height);
        this.stateManager.enableAttribs(1);
        this.ctx.bindBuffer(this.ctx.ELEMENT_ARRAY_BUFFER, this.stateManager.getQuadIndexBuff());
        this.ctx.drawElements(this.ctx.TRIANGLE_STRIP, QuadDrawingUtils.QUAD_NUM_VERT, this.ctx.UNSIGNED_SHORT, 0);
    }
    dispose(){
        ShaderUtils.disposeProgram(this.ctx, this.programInfo);
    }
};

module.exports = QuadDrawingKernel;
