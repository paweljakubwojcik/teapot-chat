import { useSession } from '@supabase/auth-helpers-react'
import type { NextPage } from 'next'
import { Layout } from '../components/layout'
import { protectedPage } from '../components/protected-page'
import { NextPageWithLayout } from '../types/next-page-with-layout'
import { trpc } from '../utils/trpc'

const Home: NextPageWithLayout = () => {
    const session = useSession()

    const { data: user, isLoading } = trpc.user.me.useQuery(undefined, {})

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <div>Brak user-a</div>
    }

    return <div>Elo teapot {user.username}</div>
}

Home.getLayout = (Page) => <Layout>{Page}</Layout>

export default protectedPage(Home)
