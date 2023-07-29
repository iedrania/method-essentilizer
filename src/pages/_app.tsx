import type { AppProps } from 'next/app'
import { MappingProvider } from '../context/context';
import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MappingProvider>
      <Component {...pageProps} />
    </MappingProvider>
  );
}

export default App;
