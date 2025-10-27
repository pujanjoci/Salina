import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)
  const location = useLocation()

  const isPolicyPage = location.pathname !== '/'

  useEffect(() => {
    // Only add scroll behavior if we're on the main page
    if (!isPolicyPage) {
      const handleScroll = () => {
        const currentScrollY = window.scrollY
        
        // Show background when scrolled down
        setIsScrolled(currentScrollY > 10)
        
        // Header hide/show logic
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          // Scrolling down & past 100px - hide header and close mobile menu
          setIsHeaderVisible(false)
          setIsMobileMenuOpen(false)
        } else {
          // Scrolling up - show header
          setIsHeaderVisible(true)
        }
        
        lastScrollY.current = currentScrollY
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    } else {
      // On policy pages, always show header with background
      setIsScrolled(true)
      setIsHeaderVisible(true)
    }
  }, [isPolicyPage])

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'myedge', label: 'MyEdge' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ]

  const scrollToSection = (sectionId) => {
    if (isPolicyPage) {
      // Navigate to home page and then scroll to section
      window.location.href = `/#${sectionId}`
      return
    }
    
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMobileMenuOpen(false)
    }
  }

  const handleLetsConnect = () => {
    scrollToSection('contact')
  }

  const handleLogoClick = () => {
    if (isPolicyPage) {
      // If on policy page, navigate to home
      window.location.href = '/'
    } else {
      // If on home page, scroll to top and set active section
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection('home')
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled || isPolicyPage
          ? 'bg-slate-900/80 backdrop-blur-md py-4 shadow-lg' 
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="text-lg md:text-2xl font-bold text-white animate-fade-in hover:text-purple-400 transition-colors duration-300 text-left"
          >
            Salina <span className="text-purple-400">Kayastha</span>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-purple-400 ${
                  activeSection === item.id ? 'text-purple-400' : 'text-white/80'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-purple-400 animate-scale-in"></span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {!isPolicyPage && (
              <button 
                onClick={handleLetsConnect}
                className="hidden md:block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 animate-fade-in"
              >
                Let's Connect
              </button>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white focus:outline-none p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}></span>
                <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden fixed left-0 w-screen transition-all duration-300 ease-in-out z-40 ${
            isHeaderVisible 
              ? (isMobileMenuOpen ? 'opacity-100 visible translate-y-0 top-full' : 'opacity-0 invisible -translate-y-4 top-full')
              : 'opacity-0 invisible -translate-y-4 -top-full'
          }`}
        >
          <div className="bg-slate-900/95 backdrop-blur-md shadow-lg border-t border-slate-700 px-6 py-4 w-full overflow-x-hidden">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-3 px-4 rounded-lg transition-all duration-300 font-medium ${
                    !isPolicyPage && activeSection === item.id
                      ? 'bg-purple-600 text-white'
                      : 'text-white/80 hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header