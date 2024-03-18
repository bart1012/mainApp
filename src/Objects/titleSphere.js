import { Vector3, Color, SphereGeometry, Mesh, MeshStandardMaterial, TextureLoader, DoubleSide } from "three";

function createSphere(){

    function texture_loader(){
        const textureLoader = new TextureLoader();
    
        // load a texture
        const texture = textureLoader.load(
            '../../Assets/Models/rock_texture.jpg',
        );
        
        const material = new MeshStandardMaterial({
            map: texture,
            metalness: 0.2,
            roughness: 0.6,
            envMapIntensity: 0.5,
            side: DoubleSide,

          });
        return material;
    }

    const geometry = new SphereGeometry(.5, 50, 50);
    const currentColor = new Color(Math.random(), Math.random(), Math.random());
    const material = texture_loader();
    // const material = new MeshStandardMaterial({color: currentColor});
    const sphere = new Mesh(geometry, material)  
    return sphere;
}

export {createSphere};