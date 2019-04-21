import Document, { Head, Main, NextDocumentContext, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  public static async getInitialProps(ctx: NextDocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

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
        </body>
      </html>
    );
  }
}
