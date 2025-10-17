import React from 'react'
import { Link } from 'react-router-dom'

const CookiePolicy = () => {
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
            <h1 className="text-4xl font-bold text-white mb-6">Cookie Policy</h1>
            <p className="text-white/60 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="space-y-8 text-white/80">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies</h2>
                <p>
                  Cookies are small text files that are placed on your computer by websites that you visit. They are 
                  widely used to make websites work more efficiently and provide information to the site owners.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Cookies</h2>
                <p className="mb-4">We use cookies for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Essential Cookies:</strong> Required for the basic functions of the website and cannot be switched off
                  </li>
                  <li>
                    <strong>Performance Cookies:</strong> Help us understand how visitors interact with our website
                  </li>
                  <li>
                    <strong>Functionality Cookies:</strong> Enable enhanced functionality and personalization
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. Types of Cookies We Use</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Session Cookies</h3>
                    <p>
                      These are temporary cookies that remain in the cookie file of your browser until you leave the site. 
                      They are essential for the proper functioning of the website.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Persistent Cookies</h3>
                    <p>
                      These remain in the cookie file of your browser for much longer. They help us recognize you as a 
                      unique visitor and remember your preferences.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Cookies</h2>
                <p>
                  We may use third-party services that set cookies on our behalf to deliver the services that they are providing. 
                  These cookies are subject to the respective privacy policies of these third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Managing Cookies</h2>
                <p className="mb-4">
                  Most web browsers allow you to control cookies through their settings preferences. However, 
                  limiting cookies may affect your experience on our website.
                </p>
                <p>
                  You can usually find these settings in the "Options" or "Preferences" menu of your browser.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Changes to This Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time. We will notify you of any changes by posting 
                  the new Cookie Policy on this page with a new "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Us</h2>
                <p>
                  If you have any questions about our use of cookies, please contact us at:{' '}
                  <a href="mailto:cookies@example.com" className="text-purple-400 hover:text-purple-300">
                    cookies@example.com
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

export default CookiePolicy