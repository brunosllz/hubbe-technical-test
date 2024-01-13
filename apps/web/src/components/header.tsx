import { NavLink } from './nav-link'

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

export function Header() {
  return (
    <header className="fixed z-50 flex w-full border-b border-zinc-700 py-6 saturate-150 backdrop-blur-lg">
      <div className="w-full max-w-[81rem] py-6 mx-auto">
        <div className="flex items-center gap-20">
          <nav className="flex items-center space-x-8">
            {NAV_LINK_ITEMS.map((navLink) => (
              <NavLink href={navLink.href} key={navLink.href}>
                {navLink.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
