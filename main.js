import { World } from "/src/World/world.js";

async function main(){
    const container = document.querySelector('canvas.webgl');
    const init = new World(container);
    await init.load_assets();
    init.start();
    // init.addEventListners();
}

const learnMoreButtons = document.querySelectorAll('.LearnMoreButton');
const popup = document.querySelector('.popUps');
var modals = document.querySelectorAll('.overview');
var span = document.querySelectorAll('.close');


// Iterate over each button and attach the click event listener
/*learnMoreButtons.forEach(button => {
    button.addEventListener("click", popUp);
    // Add event listener to the scroll event
});*/

span.forEach(button => {
    button.addEventListener("click", hide);
});



function popUp(){
    console.log('explore clicked');
    popup.style.display = 'block';
    modals[2].style.display = 'block';
    // popup.classList.toggle("show");
}

function hide(){
    console.log('explore clicked');
    popup.style.display = 'none';

    // popup.classList.toggle("show");
}


//change error catch to something more clear
main().catch((err) => {
    console.error(err);
  });
