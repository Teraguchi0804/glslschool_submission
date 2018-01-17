precision mediump float;
precision mediump int;

uniform float u_time;
uniform sampler2D textureUnit;
varying vec2 vUv;

//varying vec3 vPosition;
//varying vec4 vColor;

void main()	{

//    vec4 color = vec4( vColor );
//    color.r += sin( vPosition.x * 10.0 + u_time ) * 0.5;
//    gl_FragColor = color;
//    gl_FragColor = vec4(1.0,0.0,1.0,1.0);

    gl_FragColor = texture2D(textureUnit, vUv);
    
}