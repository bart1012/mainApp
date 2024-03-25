import {ShaderMaterial, Float32BufferAttribute, BufferGeometry, Points, Color } from "three";
import vertex1 from '../../Assets/Shaders/vertex1.js';
import fragment1 from '../../Assets/Shaders/fragment1.js';


function createParticles(){
    const geometry = new BufferGeometry();
    var material1 = new ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uColor: { type: "v3", value: new Color(0xffffff) },
          uAlpha: { value: 1.0 }
        },
        vertexShader: vertex1,
        fragmentShader: fragment1,
      });
    const particles = new Points(geometry, material1);
    const positions = [];
    const particleCount = 5000;
    
    for (let i = 0; i < particleCount; i++){
        const x = (Math.random() - 0.5) * 30;
        const y = (Math.random() - 0.5) * 30;
        const z = (Math.random() - 0.5) * 15;
        positions.push(x, y, z);
    }
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    particles.tick = () => {
        particles.rotation.x = Math.random() * 0.0001;
        particles.rotation.y = Math.random() * 0.0001;
    }
    return particles;

}

export {createParticles};