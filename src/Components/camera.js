import { PerspectiveCamera } from "three";

function createCamera(t){
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 10);
    camera.position.z = t;
    return camera;
}

export {createCamera};