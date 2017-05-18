# React Preloader Icon

SVG loading icons component for React. - [Demo](http://uyeong.github.io/react-preloader-icon)

Thank to [SVG-Loaders](https://github.com/SamHerbert/SVG-Loaders)

## Installation

### npm

```
npm install --save react-preloader-icon
```

### Usage

```
import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';

<PreloaderIcon
    type={ICON_TYPE.OVAL}
    size={32}
    strokeWidth={8} // min: 1, max: 50
    strokeColor="#F0AD4E"
    duration={800}
/> 
```

### Icon types

 - ICON_TYPE.OVAL
 - ICON_TYPE.TAIL_SPIN
 - ICON_TYPE.SPINNING
 - ICON_TYPE.PUFF

## Supported browsers

  * Latest Firefox
  * Latest Chrome
  * Latest Safari
  * IE9 through latest

## License

MIT
