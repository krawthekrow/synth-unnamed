class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    static fromPolar(r, phi){
        return new Vector(
            r * Math.cos(phi),
            r * Math.sin(phi)
        );
    }
    add(oVec){
        return new Vector(
            this.x + oVec.x,
            this.y + oVec.y
        );
    }
    subtract(oVec){
        return new Vector(
            this.x - oVec.x,
            this.y - oVec.y
        );
    }
    multiply(scale){
        return new Vector(
            this.x * scale,
            this.y * scale
        );
    }
    divide(scale){
        return new Vector(
            this.x / scale,
            this.y / scale
        );
    }
    equals(oVec){
        return (
            this.x == oVec.x &&
            this.y == oVec.y
        );
    }
    floor(){
        return new Vector(
            Math.floor(this.x),
            Math.floor(this.y)
        );
    }
    dot(oVec){
        return this.x * oVec.x + this.y * oVec.y;
    }
    getLength(){
        return Math.sqrt(this.dot(this));
    }
    getAngle(){
        return Math.atan2(this.y, this.x);
    }
    toArray(){
        return [this.x, this.y];
    }
};

class Dimensions{
    constructor(width, height){
        this.width = width;
        this.height = height;
    }
    contains(pos){
        return isPointInRect(pos,
            new Rect(
                new Vector(0, 0),
                this
            )
        );
    }
    getArea(){
        return this.width * this.height;
    }
    equals(oDims){
        return this.width == oDims.width && this.height == oDims.height;
    }
    toArray(){
        return [this.width, this.height];
    }
};

class Rect{
    constructor(pos, dims){
        this.pos = pos;
        this.dims = dims;
    }
    get x(){
        return this.pos.x;
    }
    get y(){
        return this.pos.y;
    }
    get width(){
        return this.dims.width;
    }
    get height(){
        return this.dims.height;
    }
    get left(){
        return this.pos.x;
    }
    get right(){
        return this.pos.x + this.dims.width;
    }
    get top(){
        return this.pos.y;
    }
    get bottom(){
        return this.pos.y + this.dims.height;
    }
    static fromBounds(left, right, top, bottom){
        return new Rect(
            new Vector(left, top),
            new Dimensions(right - left, bottom - top)
        );
    }
};

class Array2D{
    constructor(dims, data){
        this.dims = dims;
        this.data = data;
    }
    get width(){
        return this.dims.width;
    }
    get height(){
        return this.dims.height;
    }
};

class MouseButton{
};
MouseButton.MOUSE_LEFT = 0;
MouseButton.MOUSE_MIDDLE = 1;
MouseButton.MOUSE_RIGHT = 2;

class Utils{
    static isPointInRect(p, rect){
        return p.x >= rect.left && p.x < rect.right &&
               p.y >= rect.top && p.y < rect.bottom;
    }
    static compute1DArray(length, func){
        return new Array(length).fill(undefined).map(
            (unused, i) => func(i)
        );
    }
    static compute2DArray(dims, func){
        return Utils.compute1DArray(dims.height,
            i => Utils.compute1DArray(dims.width,
                i2 => func(new Vector(i2, i))
            )
        );
    }
    static compute2DArrayAsArray2D(dims, func){
        return new Array2D(dims, Utils.compute2DArray(dims, func));
    }
    static flatten(arr){
        const result = [];
        for(let i = 0; i < arr.length; i++){
            for(let i2 = 0; i2 < arr[i].length; i2++){
                result.push(arr[i][i2]);
            }
        }
        return result;
    }
    static clamp(num, min, max){
        return (num <= min) ? min : ((num >= max) ? max : num);
    }
};
Utils.DIRS4 = [
    new Vector(1, 0),
    new Vector(0, 1),
    new Vector(-1, 0),
    new Vector(0, -1)
];

module.exports = {
    Vector: Vector,
    Dimensions: Dimensions,
    Rect: Rect,
    Array2D: Array2D,
    MouseButton: MouseButton,
    Utils: Utils
};

