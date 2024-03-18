import { gsap } from "gsap";

let tl = gsap.timeline();

function _mainMenu(element){
  gsap.set(element, { autoAlpha: 1 });
  const tl_main_menu = gsap.timeline({paused: true});
  tl_main_menu.fromTo(element, {autoAlpha: 1}, {autoAlpha: 0, duration: 5})
  return tl_main_menu;
}
export {_mainMenu};