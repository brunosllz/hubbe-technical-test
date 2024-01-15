'use client'

import { useEffect, useState } from 'react'
import { NavLink } from './nav-link'
import { resourceSocketClient } from '@/libs/socket-io'

const NAV_LINK_ITEMS = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/secret-screen',
    label: 'Tela Secreta',
  },
]

export function NavBar() {
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    resourceSocketClient.connect()

    resourceSocketClient.emit(
      'resource:status',
      {
        resourceSlug: 'secret-screen',
      },
      ({ status }: { status: boolean }) => {
        console.log(status)

        setIsDisabled(status)
      },
    )

    resourceSocketClient.on(
      'resource:status',
      ({ status }: { status: boolean }) => {
        setIsDisabled(status)
      },
    )
  }, [])

  return (
    <nav className="flex items-center space-x-8">
      {NAV_LINK_ITEMS.map((navLink) => (
        <NavLink
          href={navLink.href}
          key={navLink.href}
          prefetch={false}
          disabled={navLink.href === '/secret-screen' && isDisabled}
        >
          {navLink.label}
        </NavLink>
      ))}
    </nav>
  )
}
