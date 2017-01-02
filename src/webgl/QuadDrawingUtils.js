import {Rect} from 'utils/Utils.js';
import ShaderUtils from 'webgl/ShaderUtils.js';

class QuadDrawingUtils{
    static createVertShaderSrc(transforms = [], dynamicDims = false, dynamicPos = false, coordSystem = QuadDrawingUtils.TEX_COORD_SYSTEM.img){
        if(dynamicDims)
            transforms.push(QuadDrawingUtils.TRANSFORMS.scale);
        if(dynamicPos)
            transforms.push(QuadDrawingUtils.TRANSFORMS.translate);
        const res =
`precision highp float;

attribute vec2 aPos;

` + (dynamicDims ? `uniform vec2 uScale;
` : '') + (dynamicPos ? `uniform vec2 uTranslate;
` : '') + `
varying vec2 vCoord;

void main(){
    vec2 pos = aPos;
` + transforms.map((line) => '    ' + line).join('\n') +`
    vec2 glPos = vec2(pos.x * 2.0 - 1.0, pos.y * 2.0 - 1.0);
    gl_Position = vec4(glPos, 0.0, 1.0);
    ` + coordSystem + `
}`;
        return res;
    }
    static createDirectDrawFragShaderSrc(){
        const res =
`precision highp float;
precision highp sampler2D;

uniform sampler2D uImg;

varying vec2 vCoord;

void main(){
    gl_FragData[0] = texture2D(uImg, vCoord);
}
`;
        return res;
    }
    static createQuadArray(rect){
        return new Float32Array([
            rect.left, rect.bottom,
            rect.left, rect.top,
            rect.right, rect.top,
            rect.right, rect.bottom
        ]);
    }
};
QuadDrawingUtils.TRANSFORMS = {
    flipX: 'pos.x = 1.0 - pos.x;',
    flipY: 'pos.y = 1.0 - pos.y;',
    scale: 'pos = pos * uScale;',
    translate: 'pos = pos + uTranslate;'
};
QuadDrawingUtils.TEX_COORD_SYSTEM = {
    gl: 'vCoord = glPos;',
    img: 'vCoord = aPos;'
};
QuadDrawingUtils.QUAD_POS_ARR = QuadDrawingUtils.createQuadArray(
    Rect.fromBounds(0, 1, 0, 1)
);
QuadDrawingUtils.QUAD_INDEX_ARR = new Uint16Array([
    0, 1, 2,
    0, 2, 3
]);
QuadDrawingUtils.QUAD_NUM_VERT = 6;


module.exports = QuadDrawingUtils;
