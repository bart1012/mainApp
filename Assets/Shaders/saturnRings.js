import * as THREE from "three";

function getSaturnRings() {
  const uniforms = {
    color1: { value: new THREE.Vector3(0.5, 0.0, 0.5) }, // Red color
    color2: { value: new THREE.Vector3(0.0, 1.0, 0.0) }, // Green color
    gapSize: { value: 0.5 }, // Size of the gap between rings
    ringWidth: { value: 0.3 } // Width of each ring
  };
  const vs = /*glsl*/ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;


    void main(){
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  
  `;


  const fs = /*glsl*/ `
    varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    // Define the number of stripes and gap size
    float numStripes = 5.0;
    float gapSize = 0.35;

    // Calculate the distance from the center of the torus
    float distanceToCenter = length(vPosition.xy);

    // Calculate the radius of each stripe
    float stripeRadius = 1.0 / numStripes;

    // Calculate the stripe index
    float stripeIndex = floor(distanceToCenter / stripeRadius);

    // Calculate the distance from the nearest stripe
    float distanceToStripe = abs(fract(distanceToCenter / stripeRadius) - 0.5);

    // Set color and alpha based on stripe index and distance
    vec3 color = mod(stripeIndex, 2.0) == 0.0 ? vec3(0.992, 0.961, 0.792) : vec3(0.792, 0.761, 0.592);
    float alpha = smoothstep(0.0, gapSize, distanceToStripe);

    // Output final color with alpha
    gl_FragColor = vec4(color, alpha);
}
  `;
  const fresnelMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vs,
    fragmentShader: fs,
    transparent: true,
    blending: THREE.NormalBlending,
    // wireframe: true,
  });
  return fresnelMat;
}

export { getSaturnRings };