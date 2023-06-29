import type { AppProps } from 'next/app'
import { MappingProvider } from '../context/context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MappingProvider>
      <Component {...pageProps} />
    </MappingProvider>
  );
}
