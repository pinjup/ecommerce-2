import { ContextProvider } from '@/components/context';
import Layout from '@/layout/LayoutP';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <ContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ContextProvider>
    );
}
