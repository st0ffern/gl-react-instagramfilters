import GL from 'gl-react'
import React,{PropTypes} from 'react'

const shaders = GL.Shaders.create({
  Hefe: {
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
        vec3 edge = texture2D(inputImageTexture2, uv).rgb;
        texel = texel * edge;
        
        texel = vec3(
                       texture2D(inputImageTexture3, vec2(texel.r, .16666)).r,
                       texture2D(inputImageTexture3, vec2(texel.g, .5)).g,
                       texture2D(inputImageTexture3, vec2(texel.b, .83333)).b);
        
        vec3 luma = vec3(.30, .59, .11);
        vec3 gradSample = texture2D(inputImageTexture4, vec2(dot(luma, texel), .5)).rgb;
        vec3 final = vec3(
                            texture2D(inputImageTexture5, vec2(gradSample.r, texel.r)).r,
                            texture2D(inputImageTexture5, vec2(gradSample.g, texel.g)).g,
                            texture2D(inputImageTexture5, vec2(gradSample.b, texel.b)).b
                            );
          
          vec3 metal = texture2D(inputImageTexture6, uv).rgb;
          vec3 metaled = vec3(
                              texture2D(inputImageTexture5, vec2(metal.r, texel.r)).r,
                              texture2D(inputImageTexture5, vec2(metal.g, texel.g)).g,
                              texture2D(inputImageTexture5, vec2(metal.b, texel.b)).b
                              );
        
        gl_FragColor = vec4(metaled, 1.0);

      }`
  }
});

module.exports = GL.createComponent(
  ({ children: inputImageTexture }) => {
    return <GL.Node
      shader={shaders.Hefe}
      uniforms={{ 
        inputImageTexture,
        inputImageTexture2: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/edgeBurn.png',
        inputImageTexture3: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/hefeMap.png',
        inputImageTexture4: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/hefeGradientMap.png',
        inputImageTexture5: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/hefeSoftLight.png',
        inputImageTexture6: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/hefeMetal.png'
      }}
    />
  },
  {
    displayName: "Hefe",
    propTypes: {
      children: PropTypes.any.isRequired,
    }
  }
);