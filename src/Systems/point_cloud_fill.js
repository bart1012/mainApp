import { MeshStandardMaterial, TextureLoader, ShaderMaterial, Mesh, MathUtils, Raycaster, Ray, BufferGeometry, Vector3, SphereGeometry, Points, PointsMaterial, BufferAttribute, DoubleSide } from "three";
import particle from '../../Assets/Images/particle.webp';


let geo = null;

const custom_shader = new ShaderMaterial({
  vertexShader:  `
  varying vec3 vUv;

  void main() {
    vUv = position;
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 5.0;
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

function fill_in_points(geoObj, count) {
    geo = geoObj;
    geo.computeBoundingBox();
    let geobbox = geoObj.boundingBox;
    let counter = 0;
    let points = new Float32Array(count * 3);

    const colors = new Float32Array(count * 3);

    // Assign random colors to each vertex
    for (let i = 0; i < count; i++) {
        colors[i * 3] = Math.random();      // Red component
        colors[i * 3 + 1] = Math.random() * 0.2;  // Green component
        colors[i * 3 + 2] = Math.random() * 0.75;  // Blue component
    }
    
    // Create a new BufferAttribute for colors
    const colorAttribute = new BufferAttribute(colors, 3);
    
    // Assign the color attribute to your geometry
    

    for (let i = 0; i < count; i++) {
        let v = new Vector3(
            MathUtils.randFloat(geobbox.min.x, geobbox.max.x),
            MathUtils.randFloat(geobbox.min.y, geobbox.max.y),
            MathUtils.randFloat(geobbox.min.z, geobbox.max.z),
        );
        if (isInside(v)){
            points[i * 3] = v.x;
            points[i * 3 + 1] = v.y;
            points[i * 3 + 2] = v.z; 
            counter++;
          }
        
    }

    const filledgeo = new BufferGeometry();
    filledgeo.setAttribute("color", colorAttribute);
    filledgeo.setAttribute('position', new BufferAttribute(points, 3));
    const points_mat = new PointsMaterial({color:'white', size: 0.025});
    const pointsObj = new Points(filledgeo, custom_shader);
    
    return pointsObj;

}

function isInside (v){
    var dir = new Vector3(0, 0, -1).normalize();

    const ray = new Ray(v, dir);
  

    let counter = 0;

    const pos = geo.attributes.position;
    const faces = pos.count / 3; //count the number of vertices and divded them by 3 (a face usually consists of 3 vertex points)
    
    let vA = new Vector3(), vB = new Vector3(), vC = new Vector3();

    const dummytarget = new Vector3();

    for(let i = 0; i < faces; i++){
        vA.fromBufferAttribute(pos, i * 3 + 0);
        vB.fromBufferAttribute(pos, i * 3 + 1);
        vC.fromBufferAttribute(pos, i * 3 + 2);
        // console.log(vA,vB,vC);
        if (ray.intersectTriangle(vA, vB, vC, false, dummytarget)) {counter++; console.log('crossed')};
      }

      return counter % 2 == 1;

}


export { fill_in_points };
