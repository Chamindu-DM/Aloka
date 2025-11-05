import { Navigation } from './Navigation'

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-blue-600">
              Aloka
            </a>
          </div>
          <Navigation />
        </div>
      </div>
    </header>
  )
}
