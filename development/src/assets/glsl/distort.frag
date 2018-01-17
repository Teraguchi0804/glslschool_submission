precision mediump float;

varying vec2 vertex_texCoord;

uniform sampler2D u_image;
uniform sampler2D u_distortion;
uniform float u_time;
uniform float u_amount;

void main() {

   float speed = 0.0008;
   float invscale = 1.0 / 3.0;
   
   float time = u_time * speed;
   
   vec2 distort1 = texture2D(u_distortion, vertex_texCoord * invscale + time * vec2(0.5, -0.7)).rg;
   vec2 distort2 = texture2D(u_distortion, vertex_texCoord * invscale + time * vec2(-0.3, 1.1)).gb;
   vec2 distort = (2.0 * (distort1 + distort2) - 2.0) * u_amount;
   
   gl_FragColor = texture2D(u_image, vertex_texCoord + distort);

}