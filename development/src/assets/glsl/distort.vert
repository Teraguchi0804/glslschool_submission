precision mediump float;

attribute vec2 position;
attribute vec2 texCoord;

uniform vec2 u_resolution;

varying vec2 vertex_texCoord;

void main() {

   vec2 clipSpace = (position / u_resolution) * 2.0 - 1.0;

   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
   vertex_texCoord = texCoord;

}