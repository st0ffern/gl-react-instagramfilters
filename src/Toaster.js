import GL from 'gl-react'
import React,{PropTypes} from 'react'

const shaders = GL.Shaders.create({
  Toaster: {
    frag: `
      precision highp float;
      varying vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;  //edgeBurn
      uniform sampler2D inputImageTexture3;  //hefeMap
      uniform sampler2D inputImageTexture4;  //hefeGradientMap
      uniform sampler2D inputImageTexture5;  //hefeSoftLight
      uniform sampler2D inputImageTexture6;  //hefeMetal

      void main () {

      }`
  }
});

module.exports = GL.createComponent(
  ({ children: inputImageTexture }) => {
    return <GL.Node
      shader={shaders.Toaster}
      uniforms={{ 
        inputImageTexture,
        inputImageTexture2: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/earlyBirdCurves.png',
        inputImageTexture3: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/earlybirdOverlayMap.png',
        inputImageTexture4: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/vignetteMap.png',
        inputImageTexture5: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/earlybirdBlowout.png',
        inputImageTexture6: 'https://raw.githubusercontent.com/stoffern/gl-react-instagramfilters/master/resources/earlybirdMap.png'
      }}
    />
  },
  {
    displayName: "Toaster",
    propTypes: {
      children: PropTypes.any.isRequired,
    }
  }
);