import classnames from 'classnames'
import { Layout } from '../components/layout'
import { protectedPage } from '../components/protected-page'
import { NextPageWithLayout } from '../types/next-page-with-layout'

const ProfilePage: NextPageWithLayout = () => {
    return <div className={classnames('')}>ProfilePage</div>
}

ProfilePage.getLayout = (Page) => <Layout>{Page}</Layout>

export default protectedPage(ProfilePage)
