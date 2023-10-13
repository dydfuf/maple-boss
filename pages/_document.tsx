import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta
          name="google-adsense-account"
          content="ca-pub-3990660420952319"
        ></meta>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3990660420952319"
          crossOrigin="anonymous"
        ></script>
        <meta
          name="google-site-verification"
          content="4NGdq70g4vVxV9sIXHXilXj40YpBU2zGlrDfttr5uGg"
        />
        <meta
          name="naver-site-verification"
          content="850dfa049911db5ecf128f599eeea8b91c692202"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
