class QuadDrawingUtils{
    static createVertShaderSrc(transforms = [], coordSystem = QuadDrawingUtils.TEX_COORD_SYSTEM.gl){
        const res =
`precision highp float;

attribute vec2 aPos;

varying vec2 vCoord;

void main(){
    vec2 pos = aPos;
` + transforms.map((line) => '    ' + line).join('\n') +`
    gl_Position = vec4(pos, 0.0, 1.0);
    vCoord = (aPos + 1.0) / 2.0;
}`;
        return res;
    }
};
QuadDrawingUtils.TRANSFORMS = {
    flipX: 'pos.x = -pos.x;',
    flipY: 'pos.y = -pos.y;'
};
QuadDrawingUtils.TEX_COORD_SYSTEM = {
    gl: 'vCoord = aPos;',
    img: 'vCoord = (aPos + 1.0) / 2.0;'
};
QuadDrawingUtils.QUAD_INDEX_ARR = new Uint16Array([
    0, 1, 2,
    0, 2, 3
]);
QuadDrawingUtils.QUAD_NUM_VERT = 6;


module.exports = QuadDrawingUtils;
