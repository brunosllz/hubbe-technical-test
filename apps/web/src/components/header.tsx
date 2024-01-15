import { NavBar } from './nav-bar'

export function Header() {
  return (
    <header className="fixed z-50 flex w-full border-b border-zinc-700 py-6 saturate-150 backdrop-blur-lg">
      <div className="w-full max-w-[81rem] py-6 mx-auto">
        <div className="flex items-center gap-20">
          <NavBar />
        </div>
      </div>
    </header>
  )
}
