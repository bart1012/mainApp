const fragment = /*glsl*/ `

varying vec2 vUv;
uniform float time;
varying vec3 vPosition;
uniform samplerCube uPerlin;
varying vec3 vLayer0;
varying vec3 vLayer1;
varying vec3 vLayer2;


float supersun(){
 float sum = 0.;
 sum += textureCube(uPerlin, vLayer0).r;
 sum += textureCube(uPerlin, vLayer1).r;
 sum += textureCube(uPerlin, vLayer2).r;
sum*=0.33;
 return sum;
}

vec3 brightness2Color(float b){
    b*=0.25;
    return (vec3(b,b*b,b*b*b*b)/0.25)*0.6;
}

void main(){
    // vec4 color = textureCube(uPerlin, vPosition);
    float intensity = supersun();
    intensity = intensity*4.+1.;
    vec3 col = brightness2Color(intensity);

// Output the sampled color
    // gl_FragColor = color;
    // gl_FragColor = vec4(1.,0.,0.,1.);
    gl_FragColor = vec4(col, 1.);
}

`

export default fragment;