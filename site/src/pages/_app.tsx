import { NextComponentType, NextContext } from 'next';
import App, { Container } from 'next/app';
import React from 'react';
import 'styles/style.scss';

interface MyAppContext {
  Component: NextComponentType;
  ctx: NextContext;
}

class MyApp extends App {
  public static async getInitialProps({ Component, ctx }: MyAppContext) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  public props: any;

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
