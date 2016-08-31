import GL from 'gl-react'
import React,{PropTypes} from 'react'

const shaders = GL.Shaders.create({
  XproII: {
    frag: `
      precision highp float;
      varying vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3; 

      void main () {

        vec3 texel = texture2D(inputImageTexture, uv).rgb;

        vec2 tc = (2.0 * uv) - 1.0;
        float d = dot(tc, tc);

        texel.r = texture2D(inputImageTexture3, vec2(d, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(d, (1.0-texel.g))).g;
        texel.b  = texture2D(inputImageTexture3, vec2(d, (1.0-texel.b))).b;

        texel.r = texture2D(inputImageTexture2, vec2(texel.r, .83333)).r;
        texel.g = texture2D(inputImageTexture2, vec2(texel.g, .5)).g;
        texel.b = texture2D(inputImageTexture2, vec2(texel.b, .16666)).b;

        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

module.exports = GL.createComponent(
  ({ children: inputImageTexture }) => {
    return <GL.Node
      shader={shaders.XproII}
      uniforms={{ 
        inputImageTexture,
        inputImageTexture2: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/xproMap.png',
        inputImageTexture3: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/vignetteMap.png',
      }}
    />
  },
  {
    displayName: "XproII",
    propTypes: {
      children: PropTypes.any.isRequired,
    }
  }
);