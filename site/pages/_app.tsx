import { AppProps } from 'next/app';
import React from 'react';
import 'styles/style.scss';

const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default App;
