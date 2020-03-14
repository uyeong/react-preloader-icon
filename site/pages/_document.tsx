import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  public render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          />
          <link href="//fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" />
          <link href="//cdnjs.cloudflare.com/ajax/libs/prism/1.16.0/themes/prism-okaidia.min.css" rel="stylesheet" />
          {/* prettier-ignore */}
          <link href="//cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.2/gh-fork-ribbon.min.css" rel="stylesheet" />
          <script src="//cdnjs.cloudflare.com/ajax/libs/prism/1.16.0/prism.min.js" />
          <script src="//cdnjs.cloudflare.com/ajax/libs/prism/1.16.0/components/prism-javascript.min.js" />
          <script src="//cdnjs.cloudflare.com/ajax/libs/prism/1.16.0/plugins/normalize-whitespace/prism-normalize-whitespace.min.js" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                Prism.plugins.NormalizeWhitespace.setDefaults({
                  'remove-trailing': true,
                  'remove-indent': true,
                  'left-trim': true,
                  'right-trim': true,
                  'remove-initial-line-feed': true
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <a
            className="github-fork-ribbon"
            href="//github.com/UYEONG/react-preloader-icon/releases"
            data-ribbon="Fork me on GitHub"
            title="Fork me on GitHub"
          >
            Fork me on GitHub
          </a>
        </body>
      </html>
    );
  }
}
