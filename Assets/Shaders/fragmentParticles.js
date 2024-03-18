const fragment = /*glsl*/ `
        varying vec3 vUv;
        uniform sampler2D uTexture;
        varying float distanceToCamera;
        varying vec3 vColor;

      
        void main() {
          float radius = 5.0;  // Set the radius of the circle
          vec2 uv = gl_PointCoord - vec2(0.5);  // Map the coordinates to center the circle
      
          // Discard fragments outside the circle
          if (length(uv) > radius) {
            discard;
          }
      
          vec4 textureColor = texture2D(uTexture, gl_PointCoord);

          // Multiply the texture color by the desired color
          //vec4 finalColor = textureColor * vec4(0.00, 0.92, 1.0, 1.0);
      
        //   gl_FragColor = vec4(vColor, textureColor.r);
        gl_FragColor = vec4(1,1,1, textureColor.r);
        }
      `

export default fragment;