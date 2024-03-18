import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { glb_to_points_cnvt } from '../Objects/point_cloud';
import { loadingScreen } from './loading_screen.js';


const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );

loader.setDRACOLoader( dracoLoader );


async function load_GLTF(){


    const [ast3Data, telescopeData] = await Promise.all([
        loader.loadAsync('../../Assets/Models/ast3.glb'),
        loader.loadAsync('../../Assets/Models/Hubble.glb'),
        ]);

    const ast3 = ast3Data.scene.children[0];
    const hubbleTelescope = telescopeData.scene.children[0];


    return {ast3, hubbleTelescope};
};

export {load_GLTF};