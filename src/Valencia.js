import GL from 'gl-react'
import React,{PropTypes} from 'react'

const shaders = GL.Shaders.create({
  Valencia: {
    frag: `
      precision highp float;
      varying vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2; 
      uniform sampler2D inputImageTexture3;


      mat3 saturateMatrix = mat3(
                                1.1402,
                                -0.0598,
                                -0.061,
                                -0.1174,
                                1.0826,
                                -0.1186,
                                -0.0228,
                                -0.0228,
                                1.1772);

      vec3 lumaCoeffs = vec3(.3, .59, .11);

      void main () {

        vec3 texel = texture2D(inputImageTexture, uv).rgb;

        texel = vec3(
                    texture2D(inputImageTexture2, vec2(texel.r, .1666666)).r,
                    texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
                    texture2D(inputImageTexture2, vec2(texel.b, .8333333)).b
                    );

        texel = saturateMatrix * texel;
        float luma = dot(lumaCoeffs, texel);
        texel = vec3(
                    texture2D(inputImageTexture3, vec2(luma, texel.r)).r,
                    texture2D(inputImageTexture3, vec2(luma, texel.g)).g,
                    texture2D(inputImageTexture3, vec2(luma, texel.b)).b);

        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

module.exports = GL.createComponent(
  ({ children: inputImageTexture }) => {
    return <GL.Node
      shader={shaders.Valencia}
      uniforms={{ 
        inputImageTexture,
        inputImageTexture2: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/valenciaMap.png',
        inputImageTexture3: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/valenciaGradientMap.png',
      }}
    />
  },
  {
    displayName: "Valencia",
    propTypes: {
      children: PropTypes.any.isRequired,
    }
  }
);