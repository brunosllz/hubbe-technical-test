'use client'

import { useEffect, useState } from 'react'
import { NavLink } from './nav-link'
import { socket } from '@/libs/socket-io'

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
    socket.connect()

    socket.on('user:status', (data) => {
      setIsDisabled(data.isBlocked)
    })
  })

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
