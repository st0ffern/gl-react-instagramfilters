import GL from 'gl-react'
import React,{PropTypes} from 'react'

const shaders = GL.Shaders.create({
  Rise: {
    frag: `
      precision highp float;
      varying vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;  
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;

      void main () {
        vec4 texel = texture2D(inputImageTexture, uv);
        vec3 bbTexel = texture2D(inputImageTexture2, uv).rgb;

        texel.r = texture2D(inputImageTexture3, vec2(bbTexel.r, texel.r)).r;
        texel.g = texture2D(inputImageTexture3, vec2(bbTexel.g, texel.g)).g;
        texel.b = texture2D(inputImageTexture3, vec2(bbTexel.b, texel.b)).b;

        vec4 mapped;
        mapped.r = texture2D(inputImageTexture4, vec2(texel.r, .16666)).r;
        mapped.g = texture2D(inputImageTexture4, vec2(texel.g, .5)).g;
        mapped.b = texture2D(inputImageTexture4, vec2(texel.b, .83333)).b;
        mapped.a = 1.0;

        gl_FragColor = mapped;
      }`
  }
});

module.exports = GL.createComponent(
  ({ children: inputImageTexture }) => {
    return <GL.Node
      shader={shaders.Rise}
      uniforms={{ 
        inputImageTexture,
        inputImageTexture2: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/blackboard1024.png',
        inputImageTexture3: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/overlayMap.png',
        inputImageTexture4: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/riseMap.png',
      }}
    />
  },
  {
    displayName: "Rise",
    propTypes: {
      children: PropTypes.any.isRequired,
    }
  }
);