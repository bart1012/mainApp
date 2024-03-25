import { NormalBlending, PlaneGeometry, Vector4, InstancedBufferAttribute, Mesh, InstancedBufferGeometry, ShaderMaterial, TextureLoader } from "three";
import galaxyFragment from "../../Assets/Shaders/fragment_galaxy";
import galaxyVertex from "../../Assets/Shaders/vetex_galaxy";
import particle from '../../Assets/Images/particle.webp';
import { Color } from "three";

const mat = new ShaderMaterial({
    vertexShader: galaxyVertex,
    fragmentShader: galaxyFragment,
    uniforms:{
        time: {value:0},
        uTexture: {value: new TextureLoader().load(particle)},
        resolution: {value: new Vector4},
        uColor: {value: new Color(0xff0000)} 
    },
    transparent: true,
    depthTest: false,
    blending: NormalBlending
})

function galaxy(){
    const plane = new PlaneGeometry(1,1);
    console.log(plane.getAttribute('position'));
    const count = 40000;
    const geo = new InstancedBufferGeometry();
    geo.instanceCount = count;
    geo.setAttribute('position', plane.getAttribute('position'));
    geo.index = plane.index;
    let pos = new Float32Array(count*3);
    let min_rad = 0.3;
    let max_rad = 5;
    function lerp(a,b,t){
        return a*(1-t)+b*t;
    }
    for (let i =0; i <count; i++){
        let theta = Math.random()*2*Math.PI;
        let r = lerp(min_rad,max_rad,Math.random());
        let x = r*Math.sin(theta);
        let y = (Math.random()-0.5) * 5;
        let z = r*Math.cos(theta);
        pos.set([x,y,z], i*3);
    }
    geo.setAttribute('pos', new InstancedBufferAttribute(pos, 3, false));
    
    const planeMesh = new Mesh(geo, mat);
    return planeMesh
   }

   export{galaxy, mat}