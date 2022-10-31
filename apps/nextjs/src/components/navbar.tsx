import type { FC, ComponentPropsWithoutRef } from 'react'
import classnames from 'classnames'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Button } from './button'

type NavbarProps = ComponentPropsWithoutRef<'div'>

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const supabase = useSupabaseClient()

    const logout = () => {
        supabase.auth.signOut()
    }

    return (
        <div className={classnames('flex w-screen', className)}>
            <Button onClick={logout} className="ml-auto">
                Wyloguj
            </Button>
        </div>
    )
}
