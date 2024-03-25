const fragment = /*glsl*/ `

varying vec2 vUv;
uniform float time;
varying vec3 vPosition;
uniform samplerCube uPerlin;
varying vec3 vLayer0;
varying vec3 vLayer1;
varying vec3 vLayer2;
varying vec3 eyeVector;
varying vec3 vNormal;

float supersun() {
    float sum = 0.0;
    sum += textureCube(uPerlin, vLayer0).r;
    sum += textureCube(uPerlin, vLayer1).r;
    sum += textureCube(uPerlin, vLayer2).r;
    return sum * 0.33;
}

vec3 brightness2Color(float b) {
    b *= 0.25;
    return (vec3(b, b * b, b * b * b * b) / 0.25) * 0.8;
}

float Fresnel(vec3 eyeVector, vec3 worldNormal) {
    return pow(1.0 + dot(eyeVector, worldNormal), 3.0);
}

void main() {

    float radiala = length(vPosition.xy);

    vec2 fragmentDirection = normalize(vPosition.xy);
    float angle = acos(dot(fragmentDirection, normalize(-vPosition.xy)));

    // Smoothly transition the alpha value based on radial distance and angle
    float alpha = smoothstep(0.0, 0.5, radiala) * smoothstep(0.0, 1.5, angle); // Adjust parameters as needed

    float radial = (1.0 - vPosition.z);
    radial *= radial;

    float brightness = 1.0 + radial * 0.83;
    vec3 color = (vec3(brightness * 0.25, pow(brightness * 0.25, 2.0), pow(brightness * 0.25, 4.0))) * 0.8;
    // float alpha = smoothstep(0.0, 0.2, radial); // Adjust the second parameter for smoother transition

    gl_FragColor = vec4(color * radial, alpha);
}


`

export default fragment;