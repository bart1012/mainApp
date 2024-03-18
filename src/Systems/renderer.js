import { WebGLRenderer } from "three";

function createRenderer(mycanvas){
    const renderer = new WebGLRenderer({canvas: mycanvas, antialias: true});
    renderer.physicallyCorrectLights = true;
    return renderer;    
}

export {createRenderer};