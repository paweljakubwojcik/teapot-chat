import { useSessionContext } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { NextPageWithLayout } from '../types/next-page-with-layout'

export const protectedPage = (Page: NextPageWithLayout | NextPage) => {
    const ProtectedPage: NextPageWithLayout = () => {
        const { isLoading, session } = useSessionContext()
        const router = useRouter()

        useEffect(() => {
            if (!session && !isLoading) {
                router.replace('/login', { query: `redirectPage=${router.pathname}` }, {})
            }
        }, [isLoading, router, session])

        if (isLoading) {
            return <>Splash screen</>
        }

        if (!session) {
            return null
        }

        return <Page />
    }
    if ('getLayout' in Page) {
        ProtectedPage.getLayout = Page.getLayout
    }

    return ProtectedPage
}
