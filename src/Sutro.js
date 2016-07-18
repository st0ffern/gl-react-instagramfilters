import GL from 'gl-react'
import React,{PropTypes} from 'react'

const shaders = GL.Shaders.create({
  Sutro: {
    frag: `
      precision highp float;
      varying vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4; 
      uniform sampler2D inputImageTexture5;
      uniform sampler2D inputImageTexture6;  

      void main () {

        vec3 texel = texture2D(inputImageTexture, uv).rgb;

        vec2 tc = (2.0 * uv) - 1.0;
        float d = dot(tc, tc);
        vec2 lookup = vec2(d, texel.r);
        texel.r = texture2D(inputImageTexture2, lookup).r;
        lookup.y = texel.g;
        texel.g = texture2D(inputImageTexture2, lookup).g;
        lookup.y = texel.b;
        texel.b  = texture2D(inputImageTexture2, lookup).b;

        vec3 rgbPrime = vec3(0.1019, 0.0, 0.0); 
        float m = dot(vec3(.3, .59, .11), texel.rgb) - 0.03058;
        texel = mix(texel, rgbPrime + m, 0.32);

        vec3 metal = texture2D(inputImageTexture3, uv).rgb;
        texel.r = texture2D(inputImageTexture4, vec2(metal.r, texel.r)).r;
        texel.g = texture2D(inputImageTexture4, vec2(metal.g, texel.g)).g;
        texel.b = texture2D(inputImageTexture4, vec2(metal.b, texel.b)).b;

        texel = texel * texture2D(inputImageTexture5, uv).rgb;

        texel.r = texture2D(inputImageTexture6, vec2(texel.r, .16666)).r;
        texel.g = texture2D(inputImageTexture6, vec2(texel.g, .5)).g;
        texel.b = texture2D(inputImageTexture6, vec2(texel.b, .83333)).b;


        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

module.exports = GL.createComponent(
  ({ children: inputImageTexture }) => {
    return <GL.Node
      shader={shaders.Sutro}
      uniforms={{ 
        inputImageTexture,
        inputImageTexture2: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/vignetteMap.png',
        inputImageTexture3: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/sutroMetal.png',
        inputImageTexture4: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/softLight.png',
        inputImageTexture5: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/sutroEdgeBurn.png',
        inputImageTexture6: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/sutroCurves.png'
      }}
    />
  },
  {
    displayName: "Sutro",
    propTypes: {
      children: PropTypes.any.isRequired,
    }
  }
);