class Resizer {
    constructor(container, camera, renderer, renderer_2D) {
        this.setSize(container, camera, renderer, renderer_2D);

        // Bind the resize event listener to the class context
        window.addEventListener('resize', () => {
            console.log('resized');
            this.setSize(container, camera, renderer, renderer_2D);
        });
    }

    setSize(container, camera, renderer, renderer_2D) {
        const canvas = container;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer_2D.setSize(window.innerWidth, window.innerHeight);
    }

}

export { Resizer };
