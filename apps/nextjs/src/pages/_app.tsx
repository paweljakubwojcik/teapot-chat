// src/pages/_app.tsx
import '../styles/globals.css'
import type { AppType } from 'next/app'
import { trpc } from '../utils/trpc'
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { AppPropsWithLayout } from '../types/next-page-with-layout'

type AppProps = {
    pageProps: {
        initialSession?: Session
    }
} & AppPropsWithLayout

const supabaseBrowserClient = createBrowserSupabaseClient()

const MyApp = ({ Component, pageProps: { initialSession, ...pageProps } }: AppProps) => {
    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <SessionContextProvider supabaseClient={supabaseBrowserClient} initialSession={initialSession}>
            {getLayout(<Component {...pageProps} />)}
        </SessionContextProvider>
    )
}

export default trpc.withTRPC(MyApp)
