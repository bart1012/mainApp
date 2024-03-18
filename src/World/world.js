import {createCamera} from '../Components/camera.js';
import {createScene} from '../Components/scene.js';
import {createSphere} from '../Objects/titleSphere.js';
import { createParticles } from '../Objects/particles.js';
import { createLight } from '../Components/lights.js';
import { createLines } from '../Objects/line.js';
import {CSS2DObject} from 'three/addons/renderers/CSS2DRenderer.js';
import { DirectionalLight,AmbientLight, AxesHelper, Box3, CircleGeometry, MathUtils, MeshStandardMaterial, Points, PointsMaterial, Scene, Vector3, Vector4, Color } from 'three';
import { galaxy, mat } from '../Objects/galaxy.js';
import {  SolarSystem, points } from '../Objects/solarSystem.js';
import { sun, material, materialTexture, sunMainBody } from '../Objects/sun.js';
import { CubeCamera, WebGLCubeRenderTarget, RGBAFormat, LinearMipMapLinearFilter, SRGBColorSpace } from 'three';
import {createRenderer} from '../Systems/renderer.js'
import { create2DRenderer } from '../Systems/2Drenderer.js';
import {Resizer} from '../Systems/Resizer.js';
import {Loop} from '../Systems/Looper.js';
import { hide_elements, show_elements } from '../Systems/camera_scroll.js';
import { init_MAPP } from '../Systems/animations.js';
import {_mainMenu} from '../Systems/main_menu.js';
import { load_GLTF } from '../Systems/loader.js';
import { onPointerMove } from '../Systems/mouse_raycaster.js';
import { texture_loader } from '../Systems/texture_loader.js';
import { Group } from 'three';
import { fill_in_points } from '../Systems/point_cloud_fill.js';
import { PlaneGeometry,InstancedBufferGeometry, InstancedBufferAttribute, SphereGeometry, TorusGeometry, Mesh, MeshBasicMaterial, ShaderMaterial,TextureLoader, DoubleSide} from 'three';
import { glb_to_points_cnvt } from '../Objects/point_cloud';
import particle from '../../Assets/Images/particle.webp';
import { loadingScreen } from '../Systems/loading_screen.js';
import { DefaultLoadingManager } from 'three';
import { getFresnelMat } from '../../Assets/Shaders/fresnelMat.js';
import getStarfield from '../Objects/stars.js'

import vertex from '../../Assets/Shaders/vertexParticles.js';
import fragment from '../../Assets/Shaders/fragmentParticles.js';


class World {
    //1. Create a world instance
    constructor(container){
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.renderer_2D = null;
        this.sphere1 = null;
        this.sphere2 = null;
        this.sphere3 = null;
        this.sphere4 = null;
        this.sphere5 = null;
        this.particles = null;
        this.light = null;
        this.axesH = null;
        this.loop = null;
        this.nav_bar = null;
        this.time = 0;


//-----------------------------------------
/*
        var loadingBar = document.getElementById('progress-bar');

        DefaultLoadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
            console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };
        
        DefaultLoadingManager.onLoad = function ( ) {
            console.log( 'Loading Complete!');
        };
        
        DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal) {
            loadingBar.value = (itemsLoaded / itemsTotal)*100;
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };
        
        DefaultLoadingManager.onError = function ( url ) {
            console.log( 'There was an error loading ' + url );
        };
        */
//-----------------------------------------


        //get elements
            
        this.test = 1;
        this.menu_screen = document.getElementById('main_menu');
        this.main_app = document.getElementById('app');
        this.chapterPOIs = document.querySelector('.Chapter_Content');
        this.header = document.querySelector('.header');
        this.single_chapter = Array.from(this.chapterPOIs.children);
        // this.start_btn = document.getElementById('start_btn');
        //create instances

        this.camera = createCamera(5);
        
        /*
        this.camera = createCamera(-42);
        this.camera.position.y = 20;
        this.camera.rotation.x = -1.5708;
        */


        const chapter_scene = createScene('black');
        this.scene = chapter_scene;
        this.scene1 = new Scene();
        
        this.renderer = createRenderer(container);
        this.renderer_2D = create2DRenderer();
        
        this.particles = new createParticles();
        this.particles.position.set(0,0,0);

        const chapterText = Array.from(document.querySelectorAll('.main_menu > div'));
        const main_menu_timeline = _mainMenu(this.menu_screen);
     
        this.galaxy = galaxy();
        

        const sunMesh = sun();
        sunMesh.position.set(0,0,0);
        // var planetLines = createLines(create_Vec3s());
        var solarSystemRep = new SolarSystem;

        this.solarSystem = new Group();
        // this.solarSystem.add(sunMesh, solarSystemRep.create());
        this.solarSystem.add(solarSystemRep.create());
        // this.solarSystem.visible = false;

        console.log(points);
        
        this.galaxy.position.set(0,10,-3);
        // this.galaxy.opacity.set(2, 3, 1.5);
        // this.galaxy.frustumCulled = false;
        // this.galaxy.visible = false;

        var cubeRendererTarget1 = null;
        var cubeCamera = null;
        var sunTexture = sunMainBody();
        sunTexture.position.set(0,0,-2.5);

        function cubeCam(){
            cubeRendererTarget1 = new WebGLCubeRenderTarget(256, {
                generateMipmaps: true,
                minFilter: LinearMipMapLinearFilter,
            });
            cubeCamera = new CubeCamera(0.001,1000, cubeRendererTarget1);
            cubeCamera.position.set(0,0,0);
        }

        cubeCam();

        this.scene1.background = new Color('white');
        this.scene1.add(sunMesh, cubeCamera);

        this.stars = getStarfield({numStars: 1000});
        
        var lights = createLight();
        var sunLight = lights.sunLight;
        var keyLight = lights.keyLight;
        var fillLight = lights.fillLight;

        // chapter_scene.add( this.particles, this.stars, sunMesh, this.solarSystem, this.galaxy, sunLight, keyLight, fillLight);
        chapter_scene.add(sunTexture, this.particles, this.solarSystem, this.galaxy, sunLight, keyLight, fillLight);

        
        //creating and adding objs
        onPointerMove(this.camera, this.scene);

        // chapter_scene.add(galaxyP, solarSystemRep, planetLines);
        hide_elements(this.menu_screen);
  
        _mainMenu(this.menu_screen);
       
        //scene creation
        this.resizer = new Resizer(container, this.camera, this.renderer, this.renderer_2D);
        this.loop = new Loop(this.camera, this.scene, this.renderer, this.renderer_2D, mat, material, materialTexture, cubeCamera, cubeRendererTarget1, this.scene1);
        this.loop.updatables.push( solarSystemRep);
            
    }
    
    async load_assets(){
        const asteroidGroup = new Group();
        const {ast3, hubbleTelescope} = await load_GLTF();
        ast3.position.set(0,-5,-10);
        this.scene.add(ast3);
        init_MAPP(this.camera,  this.single_chapter, this.solarSystem, this.galaxy);
    }

    start() {
        this.loop.start();
      }

    stop(){
        this.loop.stop();
    }
}

export {World};