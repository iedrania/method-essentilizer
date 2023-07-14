import type { AppProps } from 'next/app'
import { MappingProvider } from '../context/context';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MappingProvider>
      <Component {...pageProps} />
    </MappingProvider>
  );
}

export default App;
