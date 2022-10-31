import type { FC, ComponentPropsWithoutRef } from 'react'
import classnames from 'classnames'

type ButtonProps = ComponentPropsWithoutRef<'button'>

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
    return (
        <button className={classnames('bg-indigo-500 py-1 px-4 !mt-4 text-white rounded', className)} {...props}>
            {children}
        </button>
    )
}
