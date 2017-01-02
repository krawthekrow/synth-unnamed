import {Rect} from 'utils/Utils.js';

class QuadDrawingUtils{
    static createVertShaderSrc(transforms = [], coordSystem = QuadDrawingUtils.TEX_COORD_SYSTEM.img, dynamicDims = false, dynamicPos = false){
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

uniform sampler2D img;

varying vec2 vCoord;

void main(){
    gl_FragData[0] = texture2D(img, vCoord);
}
`;
        return res;
    }
    static translateVecToGLCoords(vec, canvasDims){
        return new Vector(
            vec.x / canvasDims.width * 2 - 1,
            - vec.y / canvasDims.height * 2 + 1
        );
    }
    static translateRectToGLCoords(rect, canvasDims){
        return new Rect(
            translateVecToGLCoords(
                new Vector(rect.pos.x, rect.pos.bottom)
                , canvasDims
            ),
            new Dimensions(
                rect.width / canvasDims.width * 2,
                rect.height / canvasDims.height * 2
            )
        );
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
    translate: 'pos = pos + uTranslate;',
    scale: 'pos = pos * uScale;'
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
