import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-gray-200 hover:text-black-100',
        primary: 'bg-blue-600 text-white hover:bg-primary hover:text-gray-400',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-gray-500 hover:text-gray-200',
        outline:
          'border border-input bg-transparent shadow-sm hover:bg-gray-500 hover:text-gray-200',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-gray-500 hover:text-gray-200',
        ghost: 'hover:bg-gray-500 hover:text-gray-200',
        link: 'text-primary underline-offset-4 hover:underline hover:text-gray-200',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 py-1.5 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    console.log(variant)
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        children={isLoading ? <div /> : children}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
