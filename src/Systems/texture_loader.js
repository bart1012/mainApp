import { MeshBasicMaterial, MeshStandardMaterial, TextureLoader, DoubleSide, RepeatWrapping } from 'three';

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

export{texture_loader};