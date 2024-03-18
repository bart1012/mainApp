import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { gsap } from "gsap";

class Text{
    constructor(elementType, contents, myclass, myid){
        this.element = document.createElement(elementType);
        this.element.id = myid;
        this.element.className = myclass;
        this.element.textContent = contents;
        //return text;
    }
    changeText(newText){
        this.element.textContent = newText;
    }
    hideText(){
        // this.element.style.display = 'none';
        gsap.to(this.element, {opacity: 0, duration: 1})
    }
}


function build2D(...args) {
    const div = document.createElement('div');
    args.forEach((textInstance) => {
        // Ensure that textInstance has an element property
        if (textInstance && textInstance.element) {
            div.appendChild(textInstance.element);
        }
    });

    const obj = new CSS2DObject(div);
    return obj;
}

export {Text, build2D};