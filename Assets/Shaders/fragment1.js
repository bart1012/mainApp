const fragment = /*glsl*/ `varying vec3 vColor;

float random(vec2 seed) {
    return fract(sin(dot(seed.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
float distanceToCenter = distance(gl_PointCoord, vec2(0.5)) * 2.0;
float distanceToCenterAlpha = smoothstep(0.0, 1.0, 1.0 - clamp(distanceToCenter, 0.0, 1.0));

float noise = 0.01 * (random(gl_FragCoord.xy) - 0.5); // Adjust the noise intensity as needed
distanceToCenterAlpha += clamp(distanceToCenterAlpha + noise, 0.0, 1.0);

distanceToCenterAlpha += pow(distanceToCenterAlpha, 2.0);
// gl_FragColor = vec4( vColor, distanceToCenterAlpha );
gl_FragColor = vec4( vColor, distanceToCenterAlpha );
}`

export default fragment;