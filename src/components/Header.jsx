import { useState } from 'react'

function Header({ currentCategory, onCategoryChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const categories = [
    { id: 'technology', label: 'Technology', icon: 'fa-microchip' },
    { id: 'business', label: 'Business', icon: 'fa-briefcase' },
    { id: 'sports', label: 'Sports', icon: 'fa-trophy' },
  ]

  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <i className="fas fa-newspaper text-3xl text-primary-600 mr-3"></i>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-secondary-900">
              News Portal
            </h1>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-secondary-600 hover:text-secondary-900 transition"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>

        <nav className={`${isMenuOpen ? 'block' : 'hidden'} lg:block pb-4 lg:pb-0`}>
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id)
                  setIsMenuOpen(false)
                }}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition flex items-center lg:justify-center ${
                  currentCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'text-secondary-700 hover:bg-secondary-100'
                }`}
              >
                <i className={`fas ${category.icon} mr-2`}></i>
                {category.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header