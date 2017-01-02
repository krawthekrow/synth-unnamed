import ShaderUtils from 'webgl/ShaderUtils.js';
import QuadDrawingUtils from 'webgl/QuadDrawingUtils.js';
import {Rect, Array2D, Utils} from 'utils/Utils.js';
import WebGLStateManager from 'webgl/WebGLStateManager.js';

class GPUArray{
    constructor(dims, tex){
        this.dims = dims;
        this.tex = tex;
    }
};

class GPGPUKernel{
    constructor(programInfo, params = [], numOutputs = 1){
        this.programInfo = programInfo;
        this.params = params;
        this.numOutputs = numOutputs;
    }
    get program(){
        return this.programInfo.program;
    }
};

class GPGPUManager{
    constructor(stateManager = null, useFloat = true){
        if(stateManager == null){
            stateManager = GPGPUManager.createWebGLStateManager();
        }
        this.stateManager = stateManager;
        this.useFloat = useFloat;

        this.extDB = this.ctx.getExtension('WEBGL_draw_buffers');
        if(this.useFloat){
            this.ctx.getExtension('OES_texture_float');
        }

        this.quadPosBuff = this.createStaticArrBuff(this.ctx.ARRAY_BUFFER, GPGPUManager.FULLSCREEN_QUAD_POS_ARR);
        this.quadIndexBuff = this.createStaticArrBuff(this.ctx.ELEMENT_ARRAY_BUFFER, QuadDrawingUtils.QUAD_INDEX_ARR);
    }
    get ctx(){
        return this.stateManager.ctx;
    }
    static createGPGPUCanvasContext(canvas = null){
        if(canvas == null){
            canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
        }
        const options = {
            depth: false,
            antialias: false
        };
        return canvas.getContext('webgl', options) || canvas.getContext('webgl-experimental', options);
    };
    static createWebGLStateManager(canvas = null){
        return new WebGLStateManager(
            this.createGPGPUCanvasContext(canvas)
        );
    }
    createStaticArrBuff(type, contents){
        const buff = this.ctx.createBuffer();
        this.ctx.bindBuffer(type, buff);
        this.ctx.bufferData(type, contents, this.ctx.STATIC_DRAW);
        return buff;
    }
    createComputeTexture(dims, type = this.ctx.FLOAT, contents = null, format = this.ctx.RGBA){
        const tex = this.ctx.createTexture();
        this.ctx.bindTexture(this.ctx.TEXTURE_2D, tex);
        this.ctx.texParameteri(this.ctx.TEXTURE_2D, this.ctx.TEXTURE_MIN_FILTER, this.ctx.NEAREST);
        this.ctx.texParameteri(this.ctx.TEXTURE_2D, this.ctx.TEXTURE_MAG_FILTER, this.ctx.NEAREST);
        this.ctx.texParameteri(this.ctx.TEXTURE_2D, this.ctx.TEXTURE_WRAP_S, this.ctx.CLAMP_TO_EDGE);
        this.ctx.texParameteri(this.ctx.TEXTURE_2D, this.ctx.TEXTURE_WRAP_T, this.ctx.CLAMP_TO_EDGE);
        this.ctx.texImage2D(this.ctx.TEXTURE_2D, 0, format, dims.width, dims.height, 0, format, type, contents);
        return tex;
    }
    createFBO(textures){
        const fbo = this.ctx.createFramebuffer();
        this.ctx.bindFramebuffer(this.ctx.FRAMEBUFFER, fbo);
        if(textures.length > 1){
            this.extDB.drawBuffersWEBGL(Utils.compute1DArray(
                textures.length,
                i => this.extDB['COLOR_ATTACHMENT' + i.toString() + '_WEBGL']
            ));
            textures.forEach((tex, i) => {
                this.ctx.framebufferTexture2D(
                    this.ctx.FRAMEBUFFER,
                    this.extDB['COLOR_ATTACHMENT' + i.toString() + '_WEBGL'],
                    this.ctx.TEXTURE_2D, tex, 0
                );
            });
        }
        else{
            this.ctx.framebufferTexture2D(this.ctx.FRAMEBUFFER, this.ctx.COLOR_ATTACHMENT0, this.ctx.TEXTURE_2D, textures[0], 0);
        }
        if(this.ctx.checkFramebufferStatus(this.ctx.FRAMEBUFFER) != this.ctx.FRAMEBUFFER_COMPLETE){
            throw 'GL_FRAMEBUFFER_COMPLETE failed.';
        }
        return fbo;
    }
    registerTextures(program, texNames){
        texNames.forEach((texName, i) => {
            const texLoc = this.ctx.getUniformLocation(program, texName);
            this.ctx.uniform1i(texLoc, i);
        });
    }
    registerUniforms(program, uniforms, vals){
        uniforms.forEach(uniform => {
            const uniformLoc = this.ctx.getUniformLocation(program, uniform.name);
            if(uniform.type == 'int'){
                this.ctx.uniform1i(uniformLoc, vals[uniform.name]);
            }
            else if(uniform.type == 'float'){
                this.ctx.uniform1f(uniformLoc, vals[uniform.name]);
            }
            else if(/^ivec[2-4]$/g.test(uniform.type)){
                this.ctx['uniform' + uniform.type[4].toString() + 'iv'](uniformLoc, new Int32Array(vals[uniform.name]));
            }
            else if(/^vec[2-4]$/g.test(uniform.type)){
                this.ctx['uniform' + uniform.type[3].toString() + 'fv'](uniformLoc, new Float32Array(vals[uniform.name]));
            }
        });
    }
    bindTextures(textures){
        textures.forEach((texture, i) => {
            this.ctx.activeTexture(this.ctx['TEXTURE' + i.toString()]);
            this.ctx.bindTexture(this.ctx.TEXTURE_2D, texture);
        });
    }
    drawQuad(program){
        this.ctx.useProgram(program);
        this.stateManager.enableAttribs(1);
        this.ctx.bindBuffer(this.ctx.ELEMENT_ARRAY_BUFFER, this.quadIndexBuff);
        this.ctx.drawElements(this.ctx.TRIANGLE_STRIP, QuadDrawingUtils.QUAD_NUM_VERT, this.ctx.UNSIGNED_SHORT, 0);
    }
    disposeGPUArr(gpuArr){
        this.ctx.deleteTexture(gpuArr.tex);
    }
    numChannelsToFormat(numChannels){
        if(numChannels === 1) return this.ctx.ALPHA;
        else if(numChannels === 2) throw 'WebGL 1.0 does not support RG textures.';
        else if(numChannels === 3) return this.ctx.RGB;
        else if(numChannels === 4) return this.ctx.RGBA;
        else throw 'Unsupported number of channels.';
    }
    flatArrToGPUArr(arr, dims, numChannels = 4){
        if(!this.useFloat && numChannels != 4)
            throw 'Packed float arrays require 4 channels.';
        const format = this.numChannelsToFormat(numChannels);
        const floatArr = new Float32Array(arr);
        return new GPUArray(
            dims,
            this.createComputeTexture(dims, this.useFloat ? this.ctx.FLOAT : this.ctx.UNSIGNED_BYTE, this.useFloat ? floatArr : new Uint8Array(floatArr.buffer), format)
        );
    }
    arrToGPUArr(arr, singleChannel = true){
        if(!this.useFloat && !singleChannel)
            throw 'Cannot pack multiple packed float channels.';
        const pixelFlatArr = Utils.flatten(arr.data);
        const flatArr = this.useFloat ? Utils.flatten(
            singleChannel ?
            pixelFlatArr.map(val => [val, 0, 0, 0]) :
            pixelFlatArr
        ) : pixelFlatArr;
        return this.flatArrToGPUArr(flatArr, arr.dims);
    }
    gpuArrToFlatArr(gpuArr, overrideFloat = false){
        const fbo = this.createFBO([gpuArr.tex]);
        this.ctx.bindFramebuffer(this.ctx.FRAMEBUFFER, fbo);
        const buffLen = gpuArr.dims.getArea() * 4;
        const buff = (this.useFloat && !overrideFloat) ?
            new Float32Array(buffLen) :
            new Uint8Array(buffLen);
        this.ctx.readPixels(0, 0, gpuArr.dims.width, gpuArr.dims.height, this.ctx.RGBA, (this.useFloat && !overrideFloat) ? this.ctx.FLOAT : this.ctx.UNSIGNED_BYTE, buff);
        this.ctx.deleteFramebuffer(fbo);
        return this.useFloat ? buff : new Float32Array(buff.buffer);
    }
    gpuArrToArr(gpuArr, singleChannel = true, numTexChannels = 4, overrideFloat = false){
        if(!this.useFloat && !singleChannel)
            throw 'Cannot pack multiple packed float channels.';
        if(!this.useFloat && numTexChannels != 4)
            throw 'Packed float arrays require 4 channels.';
        const copyArr = numTexChannels != 4;
        if(copyArr) gpuArr = this.copyGPUArr(gpuArr, numTexChannels, 4);
        const flatArr = this.gpuArrToFlatArr(gpuArr, overrideFloat);
        if(copyArr) this.disposeGPUArr(gpuArr);
        const arrData = Utils.compute2DArray(gpuArr.dims, pos => {
            const offset = pos.y * gpuArr.dims.width + pos.x;
            return this.useFloat ? (
                singleChannel ?
                flatArr[offset * 4] :
                flatArr.slice(offset * 4, (offset + 1) * 4)
            ) : flatArr[offset];
        });
        return new Array2D(gpuArr.dims, arrData);
    }
    createCopyKernel(srcNumChannels = 4, destNumChannels = srcNumChannels){
        if(!this.useFloat && (srcNumChannels != 4 || destNumChannels != 4))
            throw 'Packed float arrays require 4 channels.';
        let extractCode = null, placeCode = null;
        if(srcNumChannels == 1)
            extractCode = 'vec4(texture2D(uArr, vCoord).a, 0.0, 0.0, 0.0)';
        else if(srcNumChannels === 2) throw 'WebGL 1.0 does not support RG textures.';
        else if(srcNumChannels === 3 || srcNumChannels === 4)
            extractCode = 'texture2D(uArr, vCoord)';
        else throw 'Unsupported number of channels.';
        if(destNumChannels == 1)
            placeCode = 'vec4(0.0, 0.0, 0.0, data.r)';
        else if(destNumChannels === 2) throw 'WebGL 1.0 does not support RG textures.';
        else if(destNumChannels === 3 || destNumChannels == 4)
            placeCode = 'data';
        else throw 'Unsupported number of channels.';
        return this.createKernel(
`vec4 data = ` + extractCode + `;
gl_FragData[0] = ` + placeCode + `;
`,
        ['uArr'], [], 1);
    }
    copyGPUArr(gpuArr, srcNumChannels = 4, destNumChannels = srcNumChannels){
        const copyKernel = this.createCopyKernel(srcNumChannels, destNumChannels);
        const resGPUArr = this.runKernel(copyKernel, [
            gpuArr
        ], gpuArr.dims)[0];
        this.disposeKernel(copyKernel);
        return resGPUArr;
    }
    disposeProgram(programInfo){
        this.ctx.detachShader(programInfo.program, programInfo.vertShader);
        this.ctx.detachShader(programInfo.program, programInfo.fragShader);
        this.ctx.deleteShader(programInfo.vertShader);
        this.ctx.deleteShader(programInfo.fragShader);
        this.ctx.deleteProgram(programInfo.program);
    }
    createKernel(computeFunc, inputNames, params = [], numOutputs = 1, includeSrc = ''){
        const uniforms = [].concat(params, inputNames.map(
            inputName => ({
                type: 'sampler2D',
                name: inputName
            })

        ), [{
            type: 'ivec2',
            name: 'uDims'
        }]);
        const vertShaderSrc = GPGPUManager.createVertShaderSrc();
        const fragShaderSrc = GPGPUManager.createFragShaderSrc(
            computeFunc.trim().split('\n').map(line =>
                '    ' + line
            ).join('\n') + '\n',
            uniforms, includeSrc, numOutputs > 1
        );
        const programInfo = ShaderUtils.createProgram(this.ctx, vertShaderSrc, fragShaderSrc);
        const program = programInfo.program;

        this.ctx.useProgram(program);
        ShaderUtils.setVertAttrib(this.ctx, program, 'aPos', 2, this.quadPosBuff)
        this.registerTextures(program, inputNames);
        return new GPGPUKernel(programInfo, params, numOutputs);
    }
    runKernel(kernel, inputArrs, outputDims, paramVals = {}, colorOutput = false, drawDirect = false){
        this.ctx.useProgram(kernel.program);
        this.registerUniforms(kernel.program, kernel.params, paramVals);
        this.registerUniforms(kernel.program, [{
            name: 'uDims',
            type: 'ivec2'
        }], {
            uDims: outputDims.toArray()
        });

        const outputTextures = Utils.compute1DArray(kernel.numOutputs, i =>
            this.createComputeTexture(outputDims, (this.useFloat && !colorOutput) ? this.ctx.FLOAT : this.ctx.UNSIGNED_BYTE)
        );

        const fbo = drawDirect ? null : this.createFBO(outputTextures);
        this.ctx.bindFramebuffer(this.ctx.FRAMEBUFFER, fbo);

        this.bindTextures(inputArrs.map(gpuArr => gpuArr.tex));

        this.ctx.viewport(0, 0, outputDims.width, outputDims.height);
        this.drawQuad(kernel.program);

        this.ctx.deleteFramebuffer(fbo);

        return outputTextures.map(tex =>
            new GPUArray(outputDims, tex)
        );
    }
    disposeKernel(kernel){
        ShaderUtils.disposeProgram(this.ctx, kernel.programInfo);
    }
};
GPGPUManager.FULLSCREEN_QUAD_POS_ARR = QuadDrawingUtils.createQuadArray(
    Rect.fromBounds(-1, 1, -1, 1)
);

// Credit: https://gist.github.com/TooTallNate/4750953
GPGPUManager.ENDIANNESS = (() => {
    const b = new ArrayBuffer(4);
    const a = new Uint32Array(b);
    const c = new Uint8Array(b);
    a[0] = 0xdeadbeef;
    if (c[0] == 0xef) return 'LE';
    if (c[0] == 0xde) return 'BE';
    throw new Error('unknown endianness');
})();

GPGPUManager.createVertShaderSrc = (drawDirect = false) =>
    QuadDrawingUtils.createVertShaderSrc(
        drawDirect ? [QuadDrawingUtils.TRANSFORMS.flipY] : []
    );

///
/// Adapted from gpu.js
/// http://gpu.rocks/
///
/// GPU Accelerated JavaScript
///
/// @version 0.0.0
/// @date    Mon Jul 04 2016 00:47:07 GMT+0800 (SGT)
///
/// @license MIT
/// The MIT License
///
/// Copyright (c) 2016 Fazli Sapuan, Matthew Saw, Eugene Cheah and Julia Low
///
/// Permission is hereby granted, free of charge, to any person obtaining a copy
/// of this software and associated documentation files (the "Software"), to deal
/// in the Software without restriction, including without limitation the rights
/// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
/// copies of the Software, and to permit persons to whom the Software is
/// furnished to do so, subject to the following conditions:
///
/// The above copyright notice and this permission notice shall be included in
/// all copies or substantial portions of the Software.
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
/// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
/// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
/// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
/// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
/// THE SOFTWARE.
///

GPGPUManager.PACK_FLOAT_INCLUDE =
`float round(float x) {
    return floor(x + 0.5);
}

vec2 integerMod(vec2 x, float y) {
    vec2 res = floor(mod(x, y));
    return res * step(1.0 - floor(y), -res);
}

float integerMod(float x, float y) {
    float res = floor(mod(x, y));
    return res * (res > floor(y) - 1.0 ? 0.0 : 1.0);
}

const vec2 MAGIC_VEC = vec2(1.0, -256.0);
const vec4 SCALE_FACTOR = vec4(1.0, 256.0, 65536.0, 0.0);
const vec4 SCALE_FACTOR_INV = vec4(1.0, 0.00390625, 0.0000152587890625, 0.0); // 1, 1/256, 1/65536
float unpackFloat(vec4 rgba) {
` + ((GPGPUManager.ENDIANNESS == 'LE') ? '' :
`    rgba.rgba = rgba.abgr;
`) +
`    rgba *= 255.0;
    vec2 gte128;
    gte128.x = rgba.b >= 128.0 ? 1.0 : 0.0;
    gte128.y = rgba.a >= 128.0 ? 1.0 : 0.0;
    float exponent = 2.0 * rgba.a - 127.0 + dot(gte128, MAGIC_VEC);
    float res = exp2(round(exponent));
    rgba.b = rgba.b - 128.0 * gte128.x;
    res = dot(rgba, SCALE_FACTOR) * exp2(round(exponent-23.0)) + res;
    res *= gte128.y * -2.0 + 1.0;
    return res;
}

vec4 packFloat(float f) {
    float F = abs(f);
    float sign = f < 0.0 ? 1.0 : 0.0;
    float exponent = floor(log2(F));
    float mantissa = (exp2(-exponent) * F);
    // exponent += floor(log2(mantissa));
    vec4 rgba = vec4(F * exp2(23.0-exponent)) * SCALE_FACTOR_INV;
    rgba.rg = integerMod(rgba.rg, 256.0);
    rgba.b = integerMod(rgba.b, 128.0);
    rgba.a = exponent*0.5 + 63.5;
    rgba.ba += vec2(integerMod(exponent+127.0, 2.0), sign) * 128.0;
    rgba = floor(rgba);
    rgba *= 0.003921569; // 1/255
` + ((GPGPUManager.ENDIANNESS == 'LE') ? '' :
`    rgba.rgba = rgba.abgr;
`) +
`    return rgba;
}

`;

GPGPUManager.createFragShaderSrc = (computeFunc, uniforms, includeSrc = '', useDrawBuffers = true) => [
    useDrawBuffers ?
`#extension GL_EXT_draw_buffers: require
` : '',
`precision highp float;
precision highp sampler2D;

`,
    ...uniforms.map(uniform =>
`uniform ` + uniform.type + ` ` + uniform.name + `;
`
    ),
`
varying vec2 vCoord;

vec4 arrGet(sampler2D arr, ivec2 id, ivec2 dims){
    return texture2D(arr, (vec2(id) + vec2(0.5)) / vec2(dims));
}

`,
    includeSrc,
`void main(){
    ivec2 threadId = ivec2(vCoord * vec2(uDims));
`,
    computeFunc,
`}
`].join('');

module.exports = GPGPUManager;
