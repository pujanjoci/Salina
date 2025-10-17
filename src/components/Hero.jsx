import React, { useState, useEffect } from 'react'

const Hero = ({ setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToPortfolio = () => {
    setActiveSection('portfolio')
    const portfolioSection = document.getElementById('portfolio')
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-0 right-0 h-32 bg-gradient-to-t from-slate-800 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-slide-up">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8">
            <span className="text-purple-400">Salina</span>
            <span className="text-pink-400 block">Kayastha</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-6 max-w-md mx-auto leading-relaxed">
            Content Creator | Social Media Strategist | Video & Visual Storytelling
          </p>

          <div className="animate-fade-in delay-300">
            <button 
              onClick={scrollToPortfolio}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              View Work
            </button>
          </div>

          {!isScrolled && (
            <div className="absolute bottom-[-70%] left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero