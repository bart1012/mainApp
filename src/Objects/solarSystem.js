import { createSphere } from "./titleSphere";
import { Color, AdditiveBlending, TextureLoader, Vector3, TorusGeometry, Mesh, Group, MeshStandardMaterial, MathUtils} from "three";
import { getFresnelMat } from "../../Assets/Shaders/fresnelMat";


var points = [];


class SolarSystem{
    constructor(){
        this.solarSystemGroupArr = [];
        this.solarSystemGroup = new Group();
        this.positions = [];
    }
    create(){
        function textures(path){
            var mat = new MeshStandardMaterial({
                map: new TextureLoader().load(path),
                transparent:true,
            });
            return mat;
        }
            
        function create_Vec3s(){
            // let lineVertices = [new Vector3(4,0,25), new Vector3(-1.5,0,-20) ];
            let lineVertices = [new Vector3(0,0,25), new Vector3(0,0,-20) ];
            lineVertices.push(new Vector3().lerpVectors(lineVertices[0], lineVertices[1], 1.4));    
            return lineVertices;
        }

        const lineVertices = create_Vec3s();

        for (let i = 0; i < 9; i++){
            this.solarSystemGroupArr.push(createSphere());
        }

        for (let i =0; i < this.solarSystemGroupArr.length; i++){
            this.solarSystemGroupArr[i].material = new MeshStandardMaterial({color:'white'});
            this.solarSystemGroup.add(this.solarSystemGroupArr[i]);
        }     

        const interpolatedPoint0 = new Vector3().lerpVectors(lineVertices[0], lineVertices[1], 0);        this.positions.push(interpolatedPoint0);
        this.solarSystemGroup.children[0].position.copy(interpolatedPoint0);
        this.solarSystemGroup.children[0].scale.set(0.1,0.1,0.1);
        this.solarSystemGroup.children[0].visible = false;
        

        const interpolatedPoint1 = new Vector3().lerpVectors(lineVertices[0], lineVertices[1], 0.08);
        this.positions.push(interpolatedPoint1);
        this.solarSystemGroup.children[1].position.copy(interpolatedPoint1);
        // this.solarSystemGroup.children[1].scale.set(2,2,2);
        this.solarSystemGroup.children[1].material = textures('../../Assets/Images/neptune.jpg');
        this.solarSystemGroup.children[1].rotation.z = -30 * Math.PI / 180;
        this.solarSystemGroup.children[1].name = 'neptune';
        this.solarSystemGroup.children[1].userData = 'neptune';
        // console.log(this.solarSystemGroup.children[1]);
        console.log(this.solarSystemGroup);

        const interpolatedPoint2 = new Vector3().lerpVectors(lineVertices[0], lineVertices[1], 0.163);
        this.positions.push(interpolatedPoint2);
        this.solarSystemGroup.children[2].position.copy(interpolatedPoint2);
        // this.solarSystemGroup.children[2].scale.set(2,2,2);
        this.solarSystemGroup.children[2].material = textures('../../Assets/Images/uranus.jpg');
        this.solarSystemGroup.children[2].rotation.z = -98 * Math.PI / 180;
        this.solarSystemGroup.children[2].name = 'uranus';



        const interpolatedPoint3 = new Vector3().lerpVectors(lineVertices[0], lineVertices[1], 0.3);
        this.positions.push(interpolatedPoint3);
        this.solarSystemGroup.children[3].position.copy(interpolatedPoint3);
        this.solarSystemGroup.children[3].scale.set(2,2,2);
        this.solarSystemGroup.children[3].material = textures('../../Assets/Images/saturn.jpg');
        this.solarSystemGroup.children[3].rotation.z = -27 * Math.PI / 180;
        this.solarSystemGroup.children[3].name = 'saturn';


        const interpolatedPoint4 = new Vector3().lerpVectors(lineVertices[0], lineVertices[1], 0.48);
        this.positions.push(interpolatedPoint4);
        this.solarSystemGroup.children[4].position.copy(interpolatedPoint4);
        this.solarSystemGroup.children[4].scale.set(2,2,2);
        this.solarSystemGroup.children[4].material = textures('../../Assets/Images/jupitermap.jpg');
        this.solarSystemGroup.children[4].rotation.z = -3 * Math.PI / 180;
        this.solarSystemGroup.children[4].name = 'jupiter';



        const interpolatedPoint5 = new Vector3().lerpVectors(lineVertices[0], lineVertices[1], 0.6);
        this.positions.push(interpolatedPoint5);
        this.solarSystemGroup.children[5].position.copy(interpolatedPoint5);
        this.solarSystemGroup.children[5].scale.set(0.2,0.2,0.2);
        this.solarSystemGroup.children[5].material = textures('../../Assets/Images/mars.jpg');
        this.solarSystemGroup.children[5].rotation.z = -25 * Math.PI / 180;
        this.solarSystemGroup.children[5].name = 'mars';


        var earthGroup = new Group();
        const interpolatedPoint6 = new Vector3().lerpVectors(lineVertices[0], lineVertices[1], 0.63);
        this.positions.push(interpolatedPoint6);
        this.solarSystemGroup.children[6].position.copy(interpolatedPoint6);
        this.solarSystemGroup.children[6].scale.set(0.2,0.2,0.2);
        this.solarSystemGroup.children[6].material = textures('../../Assets/Images/earth.jpg');
        this.solarSystemGroup.children[6].rotation.z = -23 * Math.PI / 180;
        this.solarSystemGroup.children[6].name = 'earth';

        var earthClouds = createSphere();
        earthClouds.scale.set(0.201,0.201,0.201);
        earthClouds.position.copy(interpolatedPoint6);
        var mat = new MeshStandardMaterial({
            transparent: true,
            map: new TextureLoader().load('../../Assets/Images/earthClouds.webp'),
            blending: AdditiveBlending
        });
        earthClouds.material = mat;
        // earthGroup.add( this.solarSystemGroup.children[6], earthClouds);
        this.solarSystemGroup.add(earthClouds);


        const interpolatedPoint7 = new Vector3().lerpVectors(lineVertices[0], lineVertices[1], 0.67);
        this.positions.push(interpolatedPoint7);
        this.solarSystemGroup.children[7].position.copy(interpolatedPoint7);
        this.solarSystemGroup.children[7].scale.set(0.2,0.2,0.2);
        this.solarSystemGroup.children[7].material = textures('../../Assets/Images/venus.jpg');
        this.solarSystemGroup.children[7].rotation.z = -177 * Math.PI / 180;
        this.solarSystemGroup.children[7].name = 'venus';


        const interpolatedPoint8 = new Vector3().lerpVectors(lineVertices[0], lineVertices[1], 0.7);
        this.positions.push(interpolatedPoint8);
        this.solarSystemGroup.children[8].position.copy(interpolatedPoint8);
        this.solarSystemGroup.children[8].scale.set(0.1,0.1,0.1);
        this.solarSystemGroup.children[8].material = textures('../../Assets/Images/mercury.jpg');
        this.solarSystemGroup.children[8].rotation.z = -0.1 * Math.PI / 180;
        this.solarSystemGroup.children[8].name = 'mercury';


        
        points.push(interpolatedPoint0, interpolatedPoint1, interpolatedPoint2, interpolatedPoint3, interpolatedPoint4, interpolatedPoint5, interpolatedPoint6, interpolatedPoint7, interpolatedPoint8);
        console.log(points);

        console.log(this.solarSystemGroup.children);

        var colors = [0x005ce6,0x7FFFD4,0xF0E68C,0xFFD700,0xA52A2A,0x0088ff,0xFFFFE0,0xb3b3b3 ];
        for (let i =1; i<this.solarSystemGroupArr.length; i++){
            const sphere = createSphere();
            const matnew = getFresnelMat();
            matnew.uniforms.color1.value = new Color(colors[i-1]);
            sphere.material = matnew;
            const scaleFactor = 1.01; // Adjust this factor as needed
            const newScale = this.solarSystemGroup.children[i].scale.clone().multiplyScalar(scaleFactor);
            sphere.scale.copy(newScale);
            sphere.position.copy(this.positions[i]);
            // sphere.scale.copy(this.solarSystemGroup.children[i].scale);
            this.solarSystemGroup.add(sphere);
        }

        
        const torus = new TorusGeometry(1,1,2,38);
        const torusMat = textures('../../Assets/Images/saturn_rings.png');
        const torusMesh = new Mesh(torus, torusMat);
        torusMesh.position.copy(interpolatedPoint3);
        torusMesh.rotation.set(1.5,0,0);
        this.solarSystemGroup.add(torusMesh);
        this.solarSystemGroup.scale.set(0.1,0.1,0.1);
        console.log(points);

        console.log(this.solarSystemGroup);

        return this.solarSystemGroup;
    }
    tick(){
        this.solarSystemGroup.children.forEach((child, index) =>{
            if (index === 18){
                child.rotation.z += 0.002;
            }else{
                child.rotation.y += 0.002;

            }
           
        })
    }
}


 
        

    export{SolarSystem, points}
