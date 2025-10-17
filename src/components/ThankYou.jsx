import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ThankYou = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slower"></div>
      
      {/* Content */}
      <div className="text-center max-w-2xl mx-auto relative z-10">
        <div className="bg-slate-800/20 backdrop-blur-xl rounded-2xl p-12 border border-white/10 shadow-2xl">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Thank You!
          </h1>
          
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            Your message has been sent successfully. I've received your inquiry and will get back to you within 24 hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Return Home
            </button>
            
            <button
              onClick={() => navigate('/contact')}
              className="border border-white/20 hover:border-white/40 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              Send Another Message
            </button>
          </div>
          
          <p className="text-white/50 text-sm mt-8">
            You will be automatically redirected to the home page in 5 seconds...
          </p>
        </div>
      </div>
    </div>
  )
}

export default ThankYou