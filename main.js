import { World } from "/src/World/world.js";

async function main(){
    const container = document.querySelector('canvas.webgl');
    const init = new World(container);
    await init.load_assets();
    init.start();
    // init.addEventListners();
}

alert('test');
const learnMoreButtons = document.querySelectorAll('.LearnMoreButton');
const popup = document.querySelector('.popUps');
var modals = document.querySelectorAll('.overview');
var span = document.querySelectorAll('.close');
const galaxyImgs = document.querySelectorAll('.galaxyImg');
const galaxiesContainer = document.getElementById('vastnessOfUniverse');
console.log(galaxyImgs);


// Iterate over each button and attach the click event listener
/*learnMoreButtons.forEach(button => {
    button.addEventListener("click", popUp);
    // Add event listener to the scroll event
});*/


span.forEach(button => {
    button.addEventListener("click", hide);
});

galaxyImgs.forEach((image, index) => {
    image.addEventListener("click", ()=>{
        if (index === 0){
            popup.style.display = 'block';
            modals[8].style.display = 'block';
        }else if (index === 1){
            popup.style.display = 'block';
            modals[9].style.display = 'block';
        }else if (index === 2){
            popup.style.display = 'block';
            modals[10].style.display = 'block';
        }
        galaxiesContainer.style.display = 'none';

    });
});

console.log(modals);
/*
function popUp(){
    console.log('explore clicked');
    popup.style.display = 'block';
    modals[8].style.display = 'block';
    // popup.classList.toggle("show");
}
*/
function hide(){
    console.log('explore clicked');
    popup.style.display = 'none';
    galaxiesContainer.style.display = 'block';


    // popup.classList.toggle("show");
}


//change error catch to something more clear
main().catch((err) => {
    console.error(err);
  });
