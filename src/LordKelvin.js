import GL from 'gl-react'
import React,{PropTypes} from 'react'

const shaders = GL.Shaders.create({
  LordKelvin: {
    frag: `
      precision highp float;
      varying vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;

      void main () {

        vec3 texel = texture2D(inputImageTexture, uv).rgb;

        vec2 lookup;
        lookup.y = .5;

        lookup.x = texel.r;
        texel.r = texture2D(inputImageTexture2, lookup).r;

        lookup.x = texel.g;
        texel.g = texture2D(inputImageTexture2, lookup).g;

        lookup.x = texel.b;
        texel.b = texture2D(inputImageTexture2, lookup).b;

        gl_FragColor = vec4(texel, 1.0);

      }`
  }
});

module.exports = GL.createComponent(
  ({ children: inputImageTexture }) => {
    return <GL.Node
      shader={shaders.LordKelvin}
      uniforms={{ 
        inputImageTexture,
        inputImageTexture2: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/kelvinMap.png',
      }}
    />
  },
  {
    displayName: "LordKelvin",
    propTypes: {
      children: PropTypes.any.isRequired,
    }
  }
);