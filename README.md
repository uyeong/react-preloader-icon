# React Preloader Icon

SVG loading icons component for React. - [Demo](http://uyeong.github.io/react-preloader-icon)

Thanks to [SVG-Loaders](https://github.com/SamHerbert/SVG-Loaders)

## Installation

### npm

```zsh
npm install --save react-preloader-icon
yarn add react-preloader-icon
```

### Usage

```tsx
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

- [Oval](https://uyeong.github.io/react-preloader-icon?loader=oval)
- [TailSpin](https://uyeong.github.io/react-preloader-icon?loader=tail_spin)
- [Audio](https://uyeong.github.io/react-preloader-icon?loader=audio)
- [Puff](https://uyeong.github.io/react-preloader-icon?loader=puff)
- [Rings](https://uyeong.github.io/react-preloader-icon?loader=rings)
- [SpinningCircles](http://uyeong.github.io/react-preloader-icon?loader=spinning)
- [Grid](https://uyeong.github.io/react-preloader-icon?loader=grid)
- [Hearts](https://uyeong.github.io/react-preloader-icon?loader=hearts)
- [Bars](https://uyeong.github.io/react-preloader-icon?loader=bars)
- [Circles](https://uyeong.github.io/react-preloader-icon?loader=circles)
- [ThreeDots](https://uyeong.github.io/react-preloader-icon?loader=three_dots)
- [BallTriangle](https://uyeong.github.io/react-preloader-icon/?loader=ball_triangle)

## Supported browsers

Support for Internet Explorer 9 requires [raf](https://github.com/chrisdickinson/raf) polyfill.

  * Latest Firefox
  * Latest Chrome
  * Latest Safari
  * IE9 through latest

## License

MIT
