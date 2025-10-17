import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import PrivacyPolicy from './components/PrivacyPolicyPage'
import TermsOfService from './components/TermsOfServicePage'
import CookiePolicy from './components/CookiePolicyPage'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  // Fallback timeout
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(fallbackTimer)
  }, [])

  // Create a Layout component that includes Header and Footer
  const Layout = ({ children }) => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>{children}</main>
      <Footer />
    </div>
  )

  const MainContent = () => (
    <Layout>
      <div id="home">
        <Hero setActiveSection={setActiveSection} />
      </div>
      <div id="about">
        <About setActiveSection={setActiveSection} />
      </div>
      <div id="portfolio">
        <Portfolio setActiveSection={setActiveSection} />
      </div>
      <div id="contact">
        <Contact setActiveSection={setActiveSection} />
      </div>
    </Layout>
  )

  // Policy pages with Layout
  const PolicyPage = ({ children }) => (
    <Layout>
      <div className="container mx-auto px-4 py-8 pt-24"> {/* Added pt-24 to account for fixed header */}
        {children}
      </div>
    </Layout>
  )

  return (
    <Router>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      <div className={isLoading ? 'hidden' : 'block'}>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route 
            path="/privacy-policy" 
            element={
              <PolicyPage>
                <PrivacyPolicy />
              </PolicyPage>
            } 
          />
          <Route 
            path="/terms-of-service" 
            element={
              <PolicyPage>
                <TermsOfService />
              </PolicyPage>
            } 
          />
          <Route 
            path="/cookie-policy" 
            element={
              <PolicyPage>
                <CookiePolicy />
              </PolicyPage>
            } 
          />
          {/* Add a catch-all route */}
          <Route path="*" element={<MainContent />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App