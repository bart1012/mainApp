import { BufferAttribute, Points, Vector3, BufferGeometry, ShaderMaterial } from 'three';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';

function glb_to_points_cnvt (obj) {
    const custom_shader = new ShaderMaterial({
        vertexShader:  `
        varying vec3 vUv;
      
        void main() {
          vUv = position;
          vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 30.0;
          gl_Position = projectionMatrix * modelViewPosition;
        }
      `,
        fragmentShader: `
        varying vec3 vUv;
      
        void main() {
          float radius = 0.1;  // Set the radius of the circle
          vec2 uv = gl_PointCoord - vec2(0.5);  // Map the coordinates to center the circle
      
          // Discard fragments outside the circle
          if (length(uv) > radius) {
            discard;
          }
      
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
      `,uniforms: {
        pointSize: { value: 0.05 }  // Initial point size
      }
      });

    const sampler = new MeshSurfaceSampler(obj)
    .setWeightAttribute( 'color' )
    .build();

    const num = 5000;

    let pointPos = new Float32Array(num*3);

    const newBuff = new BufferGeometry();

    for (let i =0; i < num; i++){
      const _position = new Vector3();
      const _normal = new Vector3();
      sampler.sample(_position, _normal);
      pointPos[i * 3] = _position.x;
      pointPos[i * 3 + 1] = _position.y;
      pointPos[i * 3 + 2] = _position.z;
    }

    newBuff.setAttribute('position', new BufferAttribute(pointPos, 3));
    const pointObj = new Points(newBuff, custom_shader);
    return pointObj;
}

export {glb_to_points_cnvt};
