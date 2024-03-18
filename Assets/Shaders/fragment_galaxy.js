const galaxyFragment = /*glsl*/`
            varying vec2 vUv;
            uniform sampler2D uTexture;
            void main(){
                vec4 ttt = texture2D(uTexture, vUv);
                gl_FragColor = vec4(vec3(1.0), ttt.r);
            }
            `;
export default galaxyFragment;