import GL from 'gl-react'
import React,{PropTypes} from 'react'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'

const shaders = GL.Shaders.create({
  Lokofi: {
    frag: `
      precision highp float;
      varying vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;

      void main () {

        vec3 texel = texture2D(inputImageTexture, uv).rgb;

        vec2 red = vec2(texel.r, 0.83333);
        vec2 green = vec2(texel.g, 0.5);
        vec2 blue = vec2(texel.b, 0.16666);

        texel.rgb = vec3(
              texture2D(inputImageTexture2, red).r,
              texture2D(inputImageTexture2, green).g,
              texture2D(inputImageTexture2, blue).b);

        vec2 tc = (2.0 * uv) - 1.0;
        float d = dot(tc, tc);
        texel.r = texture2D(inputImageTexture3, vec2(d, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(d, (1.0-texel.g))).g;
        texel.b  = texture2D(inputImageTexture3, vec2(d, (1.0-texel.b))).b;

        gl_FragColor = vec4(texel,1.0);
      }`
  }
});

module.exports = GL.createComponent(
  ({ children: inputImageTexture }) => {
    return <GL.Node
      shader={shaders.Lokofi}
      uniforms={{
        inputImageTexture,
        inputImageTexture2: resolveAssetSource(require('../resources/lomoMap.png')),
        inputImageTexture3: resolveAssetSource(require('../resources/vignetteMap.png')),
      }}
    />
  },
  {
    displayName: "Lokofi",
    propTypes: {
      children: PropTypes.any.isRequired,
    }
  }
);