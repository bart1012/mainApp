import { MeshBasicMaterial, Raycaster, Vector2 } from "three";

let pointer = new Vector2();
let raycaster = new Raycaster();
var lMBtn = document.querySelector('.LearnMoreButton');

function onPointerMove(camera, scene) {
    window.addEventListener('click', (event) => {
        // Calculate normalized device coordinates
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the raycaster with the new pointer position and camera
        raycaster.setFromCamera(pointer, camera);

        // Perform raycasting to find intersected objects
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            // Get the first intersected object
            const hoveredObject = intersects[0].object;
        }
    });
}

export { onPointerMove };
