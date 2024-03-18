import { gsap } from "gsap";

//const lookAt = new Vector3(0,0,0);

function hide_elements(...args){
  gsap.set(args, {autoAlpha: 0, display: 'none'});
}

function show_elements(...args){
  gsap.set(args, {autoAlpha: 1, display: 'block'} );
  console.log('show elements');
}

export {hide_elements, show_elements};