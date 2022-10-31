import type { FC, ComponentPropsWithoutRef } from 'react'
import classnames from 'classnames'
import { Navbar } from './navbar'

type LayoutProps = ComponentPropsWithoutRef<'div'>

export const Layout: FC<LayoutProps> = ({ className, children }) => {
    return (
        <>
            <Navbar />
            <main className={classnames('', className)}>{children}</main>
        </>
    )
}
