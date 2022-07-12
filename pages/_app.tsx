import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          colors: {
            "sos11": ["#F4E3D7", "#E5C4AB", "#D0836E", "#9CA9B1", "#4B7A90", "#142B43", "#000", "#000", "#000", "#000"]
          }
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  )
}