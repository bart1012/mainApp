import { DirectionalLight, AmbientLight, PointLight } from "three";

function createLight(){
    const sunLight = new PointLight('white', 150);
    sunLight.position.set(0,6,-5);
    const keyLight = new DirectionalLight('white', 100);
    keyLight.position.set(0,0,-5);
    keyLight.castShadow = true;

    const fillLight = new AmbientLight('white', 0.15);

    return {sunLight: sunLight, keyLight: keyLight, fillLight: fillLight};
}

export {createLight};