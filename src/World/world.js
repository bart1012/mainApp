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
import { VideoTexture, FrontSide, Matrix4, MeshPhongMaterial, MeshLambertMaterial, LinearFilter } from 'three';
import morphPlanetMat from '../../Assets/Shaders/MorphingPlanet.js';

import vertex from '../../Assets/Shaders/vertexParticles.js';
import fragment from '../../Assets/Shaders/fragmentParticles.js';
import { RingGeometry } from 'three';


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

        this.camera = createCamera(10);
        // this.camera = createCamera(3);

        
        /*
        this.camera = createCamera(0);
        this.camera.position.y = 15;
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
    
        this.rings = solarSystemRep.rings;

        console.log(points);
        
        this.galaxy.position.set(0,0,-2.5);
        // this.galaxy.rotation.set(MathUtils.degToRad(90),0,0);
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
        var sunLight2 = lights.sunLight;
        sunLight2.position.set(0,15,-10);
        var keyLight = lights.keyLight;
        var fillLight = lights.fillLight;

        var textureLoader = new TextureLoader();
        var mapbg = textureLoader.load(
         '../../Assets/Images/bg/test2.jpg');
         mapbg.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        mapbg.magFilter =  LinearFilter;

       var bgSphere = new SphereGeometry(130,50,50);
    //    bgSphere.scale(-1,1,1);
       var bgMat = new MeshStandardMaterial({
        side: DoubleSide,
        map: mapbg,
        emissive: new Color(0x000000),
        generateMipmaps: true,
        minFilter: LinearMipMapLinearFilter,
        });
       var bgSphere = new Mesh(bgSphere, bgMat);
       bgSphere.position.set(0,0,100);

       //--------------------------------
       function textures(path){
        var mat = new MeshStandardMaterial({
            map: new TextureLoader().load(path),
        });
        return mat;
    }
       this.exoPlanets = new Group();
       this.exoPlanets.add(createSphere(), createSphere());
       this.exoPlanets.children[0].scale.set(0.2,0.2,0.2);
       this.exoPlanets.children[0].position.set(0,0,0);
       this.morphMat = morphPlanetMat();
       this.exoPlanets.children[0].material = this.morphMat;

       this.exoPlanets.position.set(0,10,-5.5);
       this.exoPlanets.rotation.set(0,MathUtils.degToRad(45),0);
        //--------------------------------

        //-------------------------kardashev scale

        var type1 = new Group();
        var type2 = new Group();
        var type3 = new Group();

        var rGeometry2 = new TorusGeometry(1,0.005,50,50);
        var ringMat2 = new MeshBasicMaterial();
        var ringMesh2 = new Mesh(rGeometry2, ringMat2);
        var ringMesh3 = new Mesh(rGeometry2, ringMat2);
        ringMesh3.rotation.set(1.5, 0 ,0);


        type1.add(createSphere(), ringMesh2, ringMesh3);
        type1.position.set(0,0,5);

        console.log(this.rings);

       this.solarSystem.add(solarSystemRep.create(), this.rings, sunTexture);

        //galaxy rings-------------------

        this.gRIngs = new Group();
        for (let i = 0; i<5; i++){
           var ringGeo =  new RingGeometry(1.35+i,1.33+i,50,50);
           var ringMat = new MeshBasicMaterial({
            color: 'white',
            transparent: true,
            opacity: 0
        });
            var ringMesh = new Mesh(ringGeo, ringMat);
            ringMesh.rotation.set(MathUtils.degToRad(90), 0 ,0);
            this.gRIngs.add(ringMesh);
        }
       
        this.gRIngs.position.z = -2.5;
        //-------------stellar neighbours
        const positions = [
            new Vector3(0,0,-3.8),
            new Vector3(-3,0,1),
            new Vector3(3,0,1)
        ];

        this.alphaCentauri = new Group();

        for (let i =0; i<3; i++){
            var aCSun = sunTexture.clone();
            this.alphaCentauri.add(aCSun);
        }
        //stellar labels-------------
        const texts = ['Alpha Centauri', "Barnard's Star", 'Proxima Centauri'];
        this.sNLabels = [];
        this.textGroup = new Group();

        for (let i = 0; i <5; i++){
            const p = document.createElement('p');
            p.textContent = texts[i];
            p.style.opacity = 0;
            p.style.display = 'none';
            this.sNLabels.push(p)
            var cpointLabel = new CSS2DObject(p);
            this.textGroup.add(cpointLabel);
        }
        //positioning-------------
        for (let i = 0; i < 3; i++) {
            this.alphaCentauri.children[i].position.copy(positions[i]);//1
            // this.alphaCentauri.children[i].scale.set(0.1,0.1,0.1);
            this.alphaCentauri.children[i].scale.set(0.0,0.0,0.0);
            // this.alphaCentauri.children[i].visible = false;
            this.textGroup.children[i].position.copy(positions[i]);
            this.textGroup.children[i].position.z+=0.5;
            // this.textGroup.children[i].visible = false;
        }

        // this.alphaCentauri.children[0].children[0].material.opacity = 0;

        /*
        const divElement = document.createElement('div');
        divElement.style.width = '100px'; // Set the width of the div
        divElement.style.height = '100px'; // Set the height of the div
        divElement.style.borderRadius = '50%'; // Set border radius to 50% to make it a circle
        divElement.style.border = '2px solid white'; // Set border width and color
        divElement.style.backgroundColor = 'transparent'; // Set background color to transparent
        
        var cpointLabel = new CSS2DObject(p);
        var cGraphic = new CSS2DObject(divElement);
        cpointLabel.position.set(2.5,0,-4.5);
        cGraphic.position.set(2.5,0,-5.5);
        this.textGroup.add(cpointLabel,cGraphic);

        */
        this.solarSystem.position.z = -2.2;
        this.alphaCentauri.position.z -= 2;
        this.textGroup.position.z -= 2;

        const planetNames = ['NEPTUNE', 'URANUS', 'SATURN', 'JUPITER', 'MARS', 'EARTH', 'VENUS', 'MERCURY'];
        var points = [0,
            -0.38,
            -0.95,
            -1.75,
            -2.4,
            -2.53,
            -2.71,
            -2.85];
        this.planetLabelsDOM = [];
        const planetLabel2DObj = new Group();

        const popup = document.querySelector('.popUps');
        var modals = document.querySelectorAll('.overview');

        // popup.style.display = 'block';
        // modals[1].style.display = 'block';


        for (let index = 0; index < 8; index++) {
            var h2 = document.createElement('h2');
            h2.textContent = planetNames[index];
            this.planetLabelsDOM.push(h2);
            var cpointLabel2 = new CSS2DObject(h2);
            cpointLabel2.position.x = 0.025;
            cpointLabel2.position.y = 0;
            cpointLabel2.position.z = points[index];
            planetLabel2DObj.add(cpointLabel2);            
        }
   
        this.planetLabelsDOM.forEach((element, index) => {
            element.addEventListener('click', () => {
                popup.style.display = 'block';
                modals[index].style.display = 'block';
            });
        });

        planetLabel2DObj.children[4].position.x = 0.015;
        planetLabel2DObj.children[5].position.x = 0.015;
        planetLabel2DObj.children[6].position.x = 0.013;
        planetLabel2DObj.children[7].position.x = 0.01;
        console.log(planetLabel2DObj);

        this.planetLabelsDOM.forEach(child => {
            child.style.display = 'none',
            child.style.opacity = 0;
        });

       
       // chapter_scene.add( this.particles, this.stars, sunMesh, this.solarSystem, this.galaxy, sunLight, keyLight, fillLight);
        chapter_scene.add(planetLabel2DObj, this.exoPlanets, this.textGroup, this.alphaCentauri, this.gRIngs, this.particles, this.solarSystem, sunLight, keyLight, fillLight);

        
        //creating and adding objs
        onPointerMove(this.camera, this.scene);

        // chapter_scene.add(galaxyP, solarSystemRep, planetLines);
        hide_elements(this.menu_screen);
  
        _mainMenu(this.menu_screen);
       
        //scene creation
        this.resizer = new Resizer(container, this.camera, this.renderer, this.renderer_2D);
        this.loop = new Loop(this.camera, this.scene, this.renderer, this.renderer_2D, mat, material, materialTexture, cubeCamera, cubeRendererTarget1, this.scene1, solarSystemRep);
        this.loop.updatables.push( solarSystemRep);
            
    }
    
    async load_assets(){
        const asteroidGroup = new Group();
        const {ast3, hubbleTelescope, spaceship} = await load_GLTF();
        spaceship.scale.set(0.5,0.5,0.5);
        spaceship.position.set(0,-1,0);
        // this.scene.add(spaceship);
        ast3.position.set(0,-5,-10);
        /*
        var ringGeo = new RingGeometry( 1, 5, 32, 32,0,0);
        console.log(ringGeo);
        var mat = new MeshBasicMaterial({color:'red'});
        var ringTest = new Mesh(ringGeo, mat);
        ringTest.position.set(0,0,-5);
        this.scene.add(ringTest);
        */
       console.log(this.morphMat);
       init_MAPP(this.camera,  this.single_chapter, this.solarSystem, this.morphMat, this.planetLabelsDOM, this.gRIngs, this.alphaCentauri, this.sNLabels);
    }

    start() {
        this.loop.start();
      }

    stop(){
        this.loop.stop();
    }
}

export {World};