# gl-react-instagramfilters
Instagram filters for gl-react and gl-react-native

*** WARNING: This is a port of the original hack posted here: https://github.com/danielgindi/Instagram-Filters ***
This release is only meant to edjucate people to write filters, and expand theyr knowledge of gl-react.
I take no responsibility for the usage, copying, modification, or distribution of this filter, neither to the hack.


## Props
none! :) only add the filter


## Installation

```js
npm i -S react-native-gl-react-instagramfilters
```

## Usage Examples

```js
import {Hudson} from "react-native-instagramfilters"
```


```html

<Surface height={1024} width={693}>
  <Hudson>
    <GLImage
      source="http://i.imgur.com/tCatS2c.jpg"
      imageSize={{ width: 1024, height: 693 }}
      resizeMode="cover"
    />
  </Hudson>
</Surface>
```