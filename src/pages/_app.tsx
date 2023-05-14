import { AutenticacaoProvider } from '@/data/contexts/AutenticacaoContext'
import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider theme={{ colorScheme: 'dark' }}>
            <Head>
                <link rel="icon" href="/money-bag.png" />
                <link rel="apple-touch-icon" href="/money-bag.png" />
                <title>Coin Saves</title>
            </Head>
            <AutenticacaoProvider>
                <Component {...pageProps} />
            </AutenticacaoProvider>
        </MantineProvider>
    )
}
