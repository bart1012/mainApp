import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

function create2DRenderer (){
    const renderer_2D = new CSS2DRenderer();
    renderer_2D.domElement.style.position = 'absolute';
    renderer_2D.domElement.style.top = '0px';
    renderer_2D.domElement.style.color = 'white';
    // renderer_2D.domElement.style.fontSize = '50rem';
    // Append the renderer's DOM element to the specified container
    const container = document.getElementById('page_wrapper');
    container.appendChild(renderer_2D.domElement);
    return renderer_2D;
}

export {create2DRenderer};