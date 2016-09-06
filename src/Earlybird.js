import GL from 'gl-react'
import React,{PropTypes} from 'react'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'

const shaders = GL.Shaders.create({
  Earlybird: {
    frag: `
      precision highp float;
      varying vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      uniform sampler2D inputImageTexture5;
      uniform sampler2D inputImageTexture6;

      const mat3 saturate = mat3(
                                1.210300,
                                -0.089700,
                                -0.091000,
                                -0.176100,
                                1.123900,
                                -0.177400,
                                -0.034200,
                                -0.034200,
                                1.265800);
      const vec3 rgbPrime = vec3(0.25098, 0.14640522, 0.0);
      const vec3 desaturate = vec3(.3, .59, .11);
      void main () {

        vec3 texel = texture2D(inputImageTexture, uv).rgb;

        vec2 lookup;
        lookup.y = 0.5;

        lookup.x = texel.r;
        texel.r = texture2D(inputImageTexture2, lookup).r;

        lookup.x = texel.g;
        texel.g = texture2D(inputImageTexture2, lookup).g;

        lookup.x = texel.b;
        texel.b = texture2D(inputImageTexture2, lookup).b;

        float desaturatedColor;
        vec3 result;
        desaturatedColor = dot(desaturate, texel);


        lookup.x = desaturatedColor;
        result.r = texture2D(inputImageTexture3, lookup).r;
        lookup.x = desaturatedColor;
        result.g = texture2D(inputImageTexture3, lookup).g;
        lookup.x = desaturatedColor;
        result.b = texture2D(inputImageTexture3, lookup).b;

        texel = saturate * mix(texel, result, .5);

        vec2 tc = (2.0 * uv) - 1.0;
        float d = dot(tc, tc);

        vec3 sampled;
        lookup.y = .5;

        /*
        lookup.x = texel.r;
        sampled.r = texture2D(inputImageTexture4, lookup).r;

        lookup.x = texel.g;
        sampled.g = texture2D(inputImageTexture4, lookup).g;

        lookup.x = texel.b;
        sampled.b = texture2D(inputImageTexture4, lookup).b;

        float value = smoothstep(0.0, 1.25, pow(d, 1.35)/1.65);
        texel = mix(texel, sampled, value);
        */

        //---

        texel.r = texture2D(inputImageTexture4, vec2(d, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture4, vec2(d, (1.0-texel.g))).g;
        texel.b  = texture2D(inputImageTexture4, vec2(d, (1.0-texel.b))).b;
        float value = smoothstep(0.0, 1.25, pow(d, 1.35)/1.65);

        //---

        lookup.x = texel.r;
        sampled.r = texture2D(inputImageTexture5, lookup).r;
        lookup.x = texel.g;
        sampled.g = texture2D(inputImageTexture5, lookup).g;
        lookup.x = texel.b;
        sampled.b = texture2D(inputImageTexture5, lookup).b;
        texel = mix(sampled, texel, value);


        lookup.x = texel.r;
        texel.r = texture2D(inputImageTexture6, lookup).r;
        lookup.x = texel.g;
        texel.g = texture2D(inputImageTexture6, lookup).g;
        lookup.x = texel.b;
        texel.b = texture2D(inputImageTexture6, lookup).b;

        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

module.exports = GL.createComponent(
  ({ children: inputImageTexture }) => {
    return <GL.Node
      shader={shaders.Earlybird}
      uniforms={{
        inputImageTexture,
        inputImageTexture2: resolveAssetSource(require('../resources/earlyBirdCurves.png')),
        inputImageTexture3: resolveAssetSource(require('../resources/earlybirdOverlayMap.png')),
        inputImageTexture4: resolveAssetSource(require('../resources/vignetteMap.png')),
        inputImageTexture5: resolveAssetSource(require('../resources/earlybirdBlowout.png')),
        inputImageTexture6: resolveAssetSource(require('../resources/earlybirdMap.png'))
      }}
    />
  },
  {
    displayName: "Earlybird",
    propTypes: {
      children: PropTypes.any.isRequired,
    }
  }
);