const vertex = /*glsl*/  `
uniform float time;
varying vec3 vUv;
varying float distanceToCamera;
attribute vec3 color;
varying vec3 vColor;


void main() {
  vUv = position;
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;

  float distanceToCamera = length((viewMatrix * vec4(position, 1.0)).xyz);
  vColor = color;

  // Adjust point size based on the distance
  gl_PointSize = 100.0 / distanceToCamera;

}
`

export default vertex;