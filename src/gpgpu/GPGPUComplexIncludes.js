class GPGPUComplexIncludes{
};
GPGPUComplexIncludes.PI =
`const float PI = 3.1415926535897932384626433832795;

`;
GPGPUComplexIncludes.LIB =
`vec2 complexMult(vec2 a, vec2 b){
    return vec2(a.x * b.x - a.y * b.y, a.y * b.x + a.x * b.y);
}

vec2 complexDiv(vec2 a, vec2 b){
    float divisor = dot(b, b);
    return vec2(dot(a, b), a.y * b.x - a.x * b.y) / divisor;
}

vec2 complexPow(vec2 a, vec2 b){
    float r = length(a), phi = atan(a.y, a.x);
    float newR = pow(r, b.x) * exp(-b.y * phi);
    float newPhi = b.y * log(r) + b.x * phi;
    return newR * vec2(cos(newPhi), sin(newPhi));
}

vec2 complexExp(vec2 b){
    return exp(b.x) * vec2(cos(b.y), sin(b.y));
}

vec2 complexLog(vec2 x){
    return vec2(log(length(x)), atan(x.y, x.x));
}

`;

module.exports = GPGPUComplexIncludes;
