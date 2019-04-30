import Head from 'next/head';
import React from 'react';
import * as ReactPreloaderIcon from 'react-preloader-icon';
import css from './style.scss';

const { Preloader } = ReactPreloaderIcon;

interface State {
  loader: string;
  size: string;
  strokeWidth: string;
  strokeColor: string;
  duration: string;
}

interface Props {
  loader: string;
}

class Home extends React.Component<Props, State> {
  public state: State = {
    loader: 'Oval',
    size: '60',
    strokeWidth: '6',
    strokeColor: '#262626',
    duration: '2000',
  };

  public componentDidMount() {
    let loader = (/loader=(\w+)/g.exec(location.search) || [])[1];
    if (loader) {
      loader = loader.charAt(0).toUpperCase() + loader.slice(1);
      loader = loader.replace(/_(\w)/g, m => m[1].toUpperCase());
      this.setState({ loader });
    }
  }

  public componentDidUpdate() {
    window.Prism.highlightAll();
  }

  public render() {
    const { loader, size, strokeWidth, strokeColor, duration } = this.state;
    return (
      <>
        <Head>
          <title>Home</title>
          <meta name="description" content="" />
          <meta name="keywords" content="" />
        </Head>
        <article className={css.wrapper}>
          <div className={css.playground}>
            <section className={css.document}>
              <h1 className={css.title}>React Preloader Icon</h1>
              <p className={css.plain}>SVG loading icons component for React.</p>
              <p className={css.plain}>
                Thank to <a href="https://github.com/SamHerbert/SVG-Loaders">SVG-Loaders</a>
              </p>
              <h2 className={css.subtitle}>Installation</h2>
              <code className={css.code}>
                $ npm install --save react-preloader-icon
                <br />$ yarn add react-preloader-icon
              </code>
              <h2 className={css.subtitle}>Showcase</h2>
              <div className={css.form}>
                <label>
                  <span>Loader: </span>
                  <select name="loader" value={loader} onChange={this.onChangeSelect}>
                    <option value="Audio">Audio</option>
                    <option value="Oval">Oval</option>
                    <option value="TailSpin">TailSpin</option>
                    <option value="Spinning">Spinning</option>
                    <option value="Puff">Puff</option>
                    <option value="Rings">Rings</option>
                    <option value="Grid">Grid</option>
                    <option value="Hearts">Hearts</option>
                  </select>
                </label>
                <label>
                  <span>Size :</span>
                  <input
                    name="size"
                    type="text"
                    defaultValue="60"
                    onKeyUp={this.onKeyUpValue}
                    onBlur={this.onBlurValue}
                  />
                </label>
                <label>
                  <span>Stroke Width :</span>
                  <input
                    name="strokeWidth"
                    type="number"
                    defaultValue="6"
                    onKeyUp={this.onKeyUpValue}
                    onBlur={this.onBlurValue}
                  />
                </label>
                <label>
                  <span>Stroke Color :</span>
                  <input
                    name="strokeColor"
                    type="text"
                    defaultValue="#262626"
                    onKeyUp={this.onKeyUpValue}
                    onBlur={this.onBlurValue}
                  />
                </label>
                <label>
                  <span>Duration :</span>
                  <input
                    name="duration"
                    type="number"
                    defaultValue="2000"
                    onKeyUp={this.onKeyUpValue}
                    onBlur={this.onBlurValue}
                  />
                </label>
              </div>
              <div className={css.demo}>
                <Preloader
                  // @ts-ignore
                  use={ReactPreloaderIcon[loader]}
                  size={size}
                  strokeWidth={parseInt(strokeWidth, 10)}
                  strokeColor={strokeColor}
                  duration={parseInt(duration, 10)}
                />
              </div>
            </section>
            <section className={css.example}>
              <pre>
                <code
                  className="language-js"
                  dangerouslySetInnerHTML={{
                    __html: `
                      import React from 'react';
                      import { Preloader, ${loader} } from 'react-preloader-icon';
                      
                      const SomeComponent = () => (
                        &lt;Preloader>
                          use={${loader}}
                          size=${!Number.isNaN(Number(size)) ? `{${size}}` : `"${size}"`}
                          strokeWidth={${strokeWidth}}
                          strokeColor="${strokeColor}"
                          duration={${duration}}
                        />
                      );
                    `,
                  }}
                />
              </pre>
            </section>
          </div>
        </article>
      </>
    );
  }

  private onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const select = event.currentTarget;
    this.setState({ loader: select.value });
  };

  private onKeyUpValue = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const name = input.name as keyof State;
    if (event.key === 'Escape') {
      input.value = this.state[name];
    }
    if (event.key === 'Enter') {
      // @ts-ignore
      this.setState({ [name]: input.value });
    }
  };

  private onBlurValue = (event: React.FocusEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const name = input.name as keyof State;
    if (input.value !== this.state[name]) {
      // @ts-ignore
      this.setState({ [name]: input.value });
    }
  };
}

export default Home;
