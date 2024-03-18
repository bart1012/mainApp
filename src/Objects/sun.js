import { Color, BackSide, Group, Clock,DoubleSide, PlaneGeometry, Vector4, InstancedBufferAttribute, Mesh, InstancedBufferGeometry, ShaderMaterial, TextureLoader, SphereGeometry, MeshStandardMaterial, Uniform } from "three";
import sunVertex from '../../Assets/Shaders/sunShaders/sunVertex.js';
import sunFragment from '../../Assets/Shaders/sunShaders/sunFragment.js';  
import sunVertexHalo from '../../Assets/Shaders/sunShaders/sunVertexHalo.js';
import sunFragmentHalo from '../../Assets/Shaders/sunShaders/sunFragmentHalo.js';  
import sunFragmentTexture from '../../Assets/Shaders/sunShaders/sunFragmentTexture.js';  
import sunVertexTexture from '../../Assets/Shaders/sunShaders/sunVertexTexture.js';
import { getFresnelMat } from "../../Assets/Shaders/fresnelMat.js";

var sunGroup = new Group();

var material = new ShaderMaterial({
    side: DoubleSide,
    vertexShader: sunVertex,
    fragmentShader: sunFragment,
    extensions: {
        derivatives: " #extension GL_OES_standard_derivatives : enable",
    },
    uniforms: {
        time: {value: 0}, 
        resolution: {value: new Vector4()},
    }  
})

var materialTexture = new ShaderMaterial({
    side: DoubleSide,
    vertexShader: sunVertexTexture,
    fragmentShader: sunFragmentTexture,
    extensions: {
        derivatives: " #extension GL_OES_standard_derivatives : enable",
    },
    uniforms: {
        time: {value: 0}, 
        resolution: {value: new Vector4()},
        uPerlin: {value: null}
    }
})

function sunMainBody(){
    var sunGroup = new Group();
    var geometry = new SphereGeometry(1,30,30);
    // var mat = new MeshStandardMaterial();
    var sunMesh = new Mesh(geometry, materialTexture);
    var halo = sunHalo();
    sunGroup.add(sunMesh, halo);
    return sunGroup;
}

function sunHalo(){
    var mat = getFresnelMat();
    mat.uniforms.color1.value = new Color(0xF0E68C);
    var halogeometry = new SphereGeometry(1.005,30,30);
    var sunHalo = new Mesh(halogeometry, mat);
    return sunHalo;

}

function sun(){
    var geometry = new SphereGeometry(1,30,30);
    // var mat = new MeshStandardMaterial();
    var sunMesh = new Mesh(geometry, material);
    var halo = sunHalo();
    // sunMainBody();
    sunGroup.add(sunMesh);
    return sunGroup;
}

export {sun, material, materialTexture, sunMainBody}