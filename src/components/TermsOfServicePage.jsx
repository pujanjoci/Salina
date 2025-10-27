import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const TermsOfService = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 fixed w-full top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-white hover:text-purple-400 transition-colors duration-300">
              Salina Kayastha
            </Link>
            <Link 
              to="/"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-slate-800/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
            <h1 className="text-4xl font-bold text-white mb-6">Terms of Service</h1>
            <p className="text-white/60 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="space-y-8 text-white/80">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using this website, you accept and agree to be bound by the terms and provision 
                  of this agreement. If you do not agree to abide by these terms, please do not use this site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
                <p className="mb-4">
                  Permission is granted to temporarily view the materials on Salina Kayastha's website for personal, 
                  non-commercial transitory viewing only.
                </p>
                <p>This license shall automatically terminate if you violate any of these restrictions.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. Services</h2>
                <p className="mb-4">
                  We offer various web development and design services. All projects are subject to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Project-specific agreements and scope</li>
                  <li>Clear communication and approval processes</li>
                  <li>Professional standards and timelines</li>
                  <li>Payment terms as outlined in project proposals</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property</h2>
                <p>
                  All content, designs, and code created by Salina Kayastha remain the intellectual property of 
                  Salina Kayastha until full payment is received and project completion. Client-provided materials 
                  remain the property of the client.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Limitations</h2>
                <p>
                  In no event shall Salina Kayastha be liable for any damages arising out of the use or inability 
                  to use the materials on this website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Revisions and Errata</h2>
                <p>
                  The materials appearing on this website could include technical, typographical, or photographic 
                  errors. We do not warrant that any of the materials on this website are accurate, complete, or current.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Information</h2>
                <p>
                  For any questions regarding these Terms of Service, please contact us at:{' '}
                  <a href="mailto:terms@example.com" className="text-purple-400 hover:text-purple-300">
                    terms@example.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService