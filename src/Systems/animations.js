import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin( ScrollTrigger );
import { MathUtils } from "three";

const defaultDuration = 1;
var zPos = [2.4, 2.15, 2.02, 1.82, 1.45, 1.21, 0.69, 0.40, -0.13, -0.19, -0.25, -0.34, -0.42, -0.50, -0.60, -0.65];
const vastnessOfUniverse = document.getElementById('vastnessOfUniverse');

var target = null;
const popup = document.querySelector('.popUps');
var modals = document.querySelectorAll('.overview');

var lMBtn = document.querySelectorAll('.LearnMoreButton');
lMBtn.forEach(button => {
  button.addEventListener("click", popUp);
  // Add event listener to the scroll event
});



function popUp(){
  popup.style.display = 'block';
  modals[0].style.display = 'block';
  // target.style.display = 'block';
  // popup.classList.toggle("show");
}


function animate_camera(tl, camera, solarsystem, morphMat){
  // tl.to(rings.parameters, {thetaLength: '7', duration: 1, ease:'none'}, 'start') 

  tl.to(camera.position, {z: '0.5', duration: 0.05, ease:'none'}) 
  tl.to(camera.position, {z: '-3', duration: 1.5, ease:'none'}, '>') 
  tl.to(camera.position, {y: '10', duration: 0.5, ease:'none'}, '>')
  tl.to(solarsystem.scale, {x:0.1,y:0.1,z:0.1, duration:0.5, ease: 'none'},'<')
  tl.to(camera.position, {z: '-2.5', duration: 0.5, ease:'none'}, '<') 
  tl.to(camera.rotation, {x: '-1.5708', duration: 0.25, ease:'none'},'<') 
  tl.to(camera.rotation, {x: '0', duration: 0.5, ease:'none'},'>+=0.5') 
  tl.to(vastnessOfUniverse, {display: 'block', autoAlpha: 1, duration: 0.5}, '>-=0.05')
  tl.to(vastnessOfUniverse, {display: 'none', autoAlpha: 0, duration: 0.5}, '>')
  tl.to(camera.position, {z: '-3', duration: 0.5, ease:'none'}, '>') 
  tl.to(morphMat.uniforms.amplitude, {value: '0.4', duration: 0.25, ease:'none'}, '>') 
  tl.to(morphMat.uniforms.offset, {value: '-0.2', duration: 0.25, ease:'none'}, '<') 
  tl.to(camera.position, {z: '-5', duration: 0.5, ease:'none'}, '>') 




  /*
  tl.to(camera.position, {y: '8', duration: 1, ease:'none'}, '>') 
  tl.to(camera.rotation, {x: '0', duration: 0.5, ease:'none', delay: 1},'<') 
  tl.to(camera.position, {z: '-3', duration: 0.5, ease:'none'}, '<') 
  tl.to(camera.position, {z: '-15', duration: 1, ease:'none', onUpdate:()=>{
    console.log(camera.position.z);
  }}, '>') 
  tl.to(vastnessOfUniverse, {display: 'block', autoAlpha: 1, duration: 0.5}, '>-=0.05');
  */
 






  /*
  tl.to(camera.position, {y: '-4.5', duration: 0.5, ease:'none'}, '>') 
  // tl.to(camera.rotation, {x: '-0.5', duration: 2, ease:'none'}, '>') 
  tl.to(camera.position, {z: '-8', duration: 0.5, ease:'none'}, '>') 
  tl.to(camera.rotation, {x: '-0.6', duration: 0.5, ease:'none'}, '<') 
  */

  /*
  tl.to(camera.position, {y: '9', duration: defaultDuration, ease:'none'}, '<+=0.1') 
  tl.to(camera.rotation, {x: '-1.5708', duration: defaultDuration, ease:'none'}, '<') 
  tl.to(camera.rotation, {x: '0', duration: defaultDuration, ease:'none'}, '>')
  tl.to(camera.position, {z: '-10', duration: defaultDuration * 1.5, ease:'none'}, '<')
  tl.to(camera.position, {z: '-60', duration: 5, ease:'none'}, '>')
  tl.to(camera.position, {z: '-80', duration: 2, ease:'none'}, '>')
  tl.to(camera.position, {y: '10', duration: 2, ease:'none'}, '>-=2')
  tl.to(camera.rotation, {x: '-0.8', duration: defaultDuration, ease:'none'}, '<') 
  */





  //maybe keep the camera rotation only to x and simply animate individual objects? it will be a pain to determine the positioning 
  //also you can put the sun in the torus at the start?



}


function animate_text(tl, single_chapter){
/*
  const btnTL = gsap.timeline(); // Nested timeline for each elementtn
  btnTL.to(lMBtn, { autoAlpha: 1, display: 'block', duration: 0.06, onStart: ()=> {target = modals[0]}}, 'start+=0.2')
  btnTL.to(lMBtn, { autoAlpha: 0, display: 'none', duration: 0.06}, '>')
  btnTL.to(lMBtn, { autoAlpha: 1, display: 'block', duration: 0.06, onStart: ()=> {target = modals[1]}}, '>')
  btnTL.to(lMBtn, { autoAlpha: 0, display: 'none', duration: 0.06}, '>')
  btnTL.to(lMBtn, { autoAlpha: 1, display: 'block', duration: 0.06, onStart: ()=> {target = modals[2]}}, '>')
  btnTL.to(lMBtn, { autoAlpha: 0, display: 'none', duration: 0.06}, '>')
  btnTL.to(lMBtn, { autoAlpha: 1, display: 'block', duration: 0.06, onStart: ()=> {target = modals[3]}}, '>+=0.1')
  btnTL.to(lMBtn, { autoAlpha: 0, display: 'none', duration: 0.06}, '>')
  btnTL.to(lMBtn, { autoAlpha: 1, display: 'block', duration: 0.012, onStart: ()=> {target = modals[4]}}, '>+=0.14')
  btnTL.to(lMBtn, { autoAlpha: 0, display: 'none', duration: 0.02}, '>')
  btnTL.to(lMBtn, { autoAlpha: 1, display: 'block', duration: 0.012, onStart: ()=> {target = modals[5]}}, '>')
  btnTL.to(lMBtn, { autoAlpha: 0, display: 'none', duration: 0.06}, '>')
  btnTL.to(lMBtn, { autoAlpha: 1, display: 'block', duration: 0.012, onStart: ()=> {target = modals[6]}}, '>-=0.2')
  btnTL.to(lMBtn, { autoAlpha: 0, display: 'none', duration: 0.06}, '>')
  btnTL.to(lMBtn, { autoAlpha: 1, display: 'block', duration: 0.012, onStart: ()=> {target = modals[7]}}, '>+=0.12')
  btnTL.to(lMBtn, { autoAlpha: 0, display: 'none', duration: 0.06}, '>')

*/
  // tl.add(btnTL, `start`);
  // tl.to(lMBtn, { autoAlpha: 1, display: 'block', duration: 0.5 })
  single_chapter.forEach((element, index)=>{
    const elementTl = gsap.timeline(); // Nested timeline for each element
    elementTl.to(element, { autoAlpha: 1, display: 'block', duration: 0.5 })
    elementTl.to(element, { autoAlpha: 0, display: 'none', duration: 0.5 }, '+=1'); // Overlap with the appearance

    tl.add(elementTl, `start+=${index * 2}`); // Add the nested timeline to the main timeline
    
  })
  

}

function animate_objects(tl, exoplanets){
  tl.to(exoplanets.rotation,{y: MathUtils.degToRad(360*3), duration: 2}, 'start')
}


function animate_line(tl, line){
  tl.to(line.geometry.attributes.position.array, {
    4: -2,
    duration: 1,
    ease: 'power1.out', // Adjust easing function as needed
  }, 'start');
}


function clickableLinks(){
  const container = document.querySelector('.NavBar_Inner');
  const links = Array.from(container.querySelectorAll("a"));
  links.forEach((element, index) => {
      element.addEventListener("click", (event) => {
          console.log('clicked' + index);
          event.preventDefault(); //prevnt page refresh
          console.log(document.body.scrollHeight);
          window.scrollTo({
            top: index * 15000,
            // behavior: 'smooth' // Add smooth scrolling effect
          });
          // document.body.scrollTop = 150;
          // document.documentElement.scrollTop = 150;
  })})
}

console.log(zPos);

function init_MAPP(camera,single_chapter, solarsystem, morphMat,planetLabels, gRings, stellarNeighbours, sNLabels) {

  function showPlanetLabel(){
    var camZ = camera.position.z;
    var camY = camera.position.y;

    var distanceThreshold = 0.15;
    var points = [0,
      -0.38,
      -0.9,
      -1.7,
      -2.4,
      -2.53,
      -2.71,
      -2.82];
    planetLabels.forEach((child, index) => {
      var isWithinRangeZ = Math.abs(camZ - points[index]) < distanceThreshold;
      gsap.to(child, {autoAlpha: isWithinRangeZ ? 1 : 0, display: isWithinRangeZ ? 'block' : 'none', onUpdate: ()=> {
        if (camY > 0){
          gsap.to(child, {autoAlpha: 0, display: 'none'});
        }
        
        gRings.children.forEach(child => {
          child.material.opacity = camY * 0.025;
        });

        stellarNeighbours.children.forEach(child => {
          child.scale.x = camY *0.01;
          child.scale.y = camY *0.01;
          child.scale.z = camY *0.01;
        });

        sNLabels.forEach(label => {
          label.style.display = 'block';
          label.style.opacity = camY * 0.1;
        });
        
      }});
    });
  }

    const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#page_wrapper',
          start: 'top top',
          end: '+=' + window.innerHeight * 100,
          scrub: 2, //can increase for smoother transitions
          markers: true,
          pin: true,
        },
        onUpdate: showPlanetLabel
    })

      tl.set(single_chapter, {autoAlpha: 0, display:'none'} )

      tl.add('start') //set a start point of the timeline 
      animate_camera(tl, camera, solarsystem, morphMat, gRings);
      animate_text(tl, single_chapter);
      // animate_objects(tl, exoplanets)
      clickableLinks();
   
      const learnMoreButtons = document.querySelectorAll('.LearnMoreButton');
      learnMoreButtons.forEach(button => {
        button.addEventListener("click", ()=>{
          tl.scrollTrigger.disable(false);
        });
      });


      var span = document.querySelectorAll('.close');
      span.forEach(button => {
        button.addEventListener("click", ()=>{
          tl.scrollTrigger.enable(false);
        });
    });

}

export {init_MAPP};