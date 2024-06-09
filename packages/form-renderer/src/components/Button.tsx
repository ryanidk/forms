import clsx from 'clsx'
import { ButtonHTMLAttributes, ElementRef, FC, forwardRef, ReactNode } from 'react'

import { Loader } from './Loader'

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'value' | 'onChange'> {
  type?: 'primary' | 'danger' | 'success'
  htmlType?: 'button' | 'submit' | 'reset'
  leading?: ReactNode
  trailing?: ReactNode
  block?: boolean
  rounded?: boolean
  loading?: boolean
  loaderClassName?: string
}

const ButtonComponent = forwardRef<ElementRef<FC<ButtonProps>>, ButtonProps>(
  (
    {
      type,
      htmlType = 'button',
      leading,
      trailing,
      loading,
      block,
      rounded,
      disabled,
      children,
      className,
      loaderClassName,
      ...restProps
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={htmlType}
        className={clsx(
          'button',
          {
            [`button-${type}`]: type,
            'button-block': block,
            'button-rounded': rounded,
            'button-icon-only': !children && leading,
            'button-loading': loading
          },
          className
        )}
        disabled={loading || disabled}
        {...restProps}
      >
        {leading && <span className="button-leading">{leading}</span>}
        {children && <span className="button-content">{children}</span>}
        {trailing && <span className="button-trailing">{trailing}</span>}
        {loading && (
          <span className={clsx('button-loader', loaderClassName)}>
            <Loader />
          </span>
        )}
      </button>
    )
  }
)

const LinkComponent = forwardRef<ElementRef<FC<ButtonProps>>, ButtonProps>(
  ({ className, children, ...restProps }, ref) => {
    return (
      <Button ref={ref} className={clsx('button-link', className)} {...restProps}>
        {children}
      </Button>
    )
  }
)

export const Button = Object.assign(ButtonComponent, {
  Link: LinkComponent
})
