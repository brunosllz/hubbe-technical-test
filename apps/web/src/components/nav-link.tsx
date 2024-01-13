'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type NavLinkProps = ComponentProps<typeof Link> & {
  disabled?: boolean
  selectedHighlight?: boolean
}

export function NavLink({
  disabled = false,
  selectedHighlight = true,
  ...props
}: NavLinkProps) {
  const pathname = usePathname()

  const isActive = pathname === props.href

  return (
    <Link
      data-active={isActive && selectedHighlight}
      data-disabled={disabled}
      className={twMerge(
        'font-medium leading-none text-zinc-500 transition-colors data-[disabled=true]:pointer-events-none data-[active=true]:text-zinc-50 hover:text-zinc-300',
        props.className,
      )}
      {...props}
    />
  )
}
