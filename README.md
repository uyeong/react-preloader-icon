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
import PreloaderIcon from 'react-preloader-icon';
import Oval from 'react-preloader-icon/loaders/Oval';

<PreloaderIcon
    loader={Oval}
    size={32}
    strokeWidth={8} // min: 1, max: 50
    strokeColor="#F0AD4E"
    duration={800}
/> 
```

### Icon types

 - [Oval](http://uyeong.github.io/react-preloader-icon/#oval)
 - [TailSpin](http://uyeong.github.io/react-preloader-icon/#tailSpin)
 - [Spinning](http://uyeong.github.io/react-preloader-icon/#spinning)
 - [Puff](http://uyeong.github.io/react-preloader-icon/#puff)

## Supported browsers

  * Latest Firefox
  * Latest Chrome
  * Latest Safari
  * IE9 through latest

## License

MIT
