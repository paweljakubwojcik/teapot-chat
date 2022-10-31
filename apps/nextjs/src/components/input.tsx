import classnames from 'classnames'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type InputProps = {
    label: ReactNode
} & ComponentPropsWithoutRef<'input'>

export const Input = ({ label, className, ...props }: InputProps) => {
    return (
        <div className={classnames('flex flex-col', className)}>
            <label className="text-sm" htmlFor={props.name}>
                {label}
            </label>
            <input {...props} className="border rounded px-2 py-1 focus:border-red-500" />
        </div>
    )
}
