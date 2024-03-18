import { LoadingManager } from "three";

function loadingScreen() {
    var lManager = new LoadingManager();

    lManager.onStart = function (url, itemsLoaded, itemsTotal) {
        console.log('Started loading:', url);
    };

    lManager.onProgress = function (url, itemsLoaded, itemsTotal) {
        console.log('Loading progress:', itemsLoaded, '/', itemsTotal);
    };

    lManager.onLoad = function () {
        console.log('Loading complete. Do something here.');
        // Hide your loading screen or transition to the main scene.
    };

    lManager.onError = function (url) {
        console.log('Error loading:', url);
        // Handle loading error here.
    };

    // Example: Load a texture using the LoadingManager

    // You can continue with your scene setup or any other logic here.
}

export { loadingScreen };
