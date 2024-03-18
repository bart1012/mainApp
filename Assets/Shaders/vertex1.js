const vertex = /*glsl*/ `attribute vec3 color;
    attribute float size;
    varying vec3 vColor;
    void main() {
    vColor = color;
    // vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * modelViewMatrix *vec4(position, 1.0);
    // gl_PointSize = size * ( 10000.0 / -mvPosition.z );
    gl_PointSize = 1.;
    // gl_Position = projectionMatrix * mvPosition;
}`

export default vertex;