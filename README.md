# React Preloader Icon

SVG loading icons component for React. - [Demo](http://uyeong.github.io/react-preloader-icon)

Thank to [SVG-Loaders](https://github.com/SamHerbert/SVG-Loaders)

## Installation

### npm

```
npm install --save react-preloader-icon@beta
yarn add react-preloader-icon@beta
```

### Usage

```
import { Preloader, Oval } from 'react-preloader-icon';

const SomeComponent = () => (
  <Preloader
    use={Oval}
    size={32}
    strokeWidth={8}
    strokeColor="#F0AD4E"
    duration={800}
  /> 
);
```

### Icon types

- [x] Oval
- [x] TailSpin
- [x] Audio
- [ ] BallTriangle
- [ ] Bars
- [ ] Circles
- [ ] Grid
- [ ] Hearts
- [x] Puff
- [ ] Rings
- [x] SpinningCircles
- [ ] ThreeDots

## Supported browsers

  * Latest Firefox
  * Latest Chrome
  * Latest Safari
  * IE9 through latest

## License

MIT
