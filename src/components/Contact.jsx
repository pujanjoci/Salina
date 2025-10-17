import React, { useState, useRef, useEffect } from 'react'

const Contact = ({ setActiveSection }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setActiveSection('contact')
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [setActiveSection])

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters'
    } else if (formData.subject.trim().length > 100) {
      newErrors.subject = 'Subject must be less than 100 characters'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector('[data-error="true"]')
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setIsSubmitting(true)

    // Create a FormData object for FormSubmit
    const formDataToSubmit = new FormData()
    formDataToSubmit.append('name', formData.name)
    formDataToSubmit.append('email', formData.email)
    formDataToSubmit.append('subject', formData.subject)
    formDataToSubmit.append('message', formData.message)
    formDataToSubmit.append('_captcha', 'false')
    formDataToSubmit.append('_subject', `New Contact: ${formData.subject}`)

    try {
      // Submit to FormSubmit
      // Change email before deploying
      // Ask for new email to change it to. - AI 
      await fetch('https://formsubmit.co/ajax/pleasechange@gmail.com', { 
        method: 'POST',
        body: formDataToSubmit,
      })

      // Show thank you message
      setShowThankYou(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setErrors({})
      
    } catch (error) {
      console.error('Form submission error:', error)
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldClassName = (fieldName) => {
    const baseClasses = "w-full px-4 py-4 bg-slate-800/40 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-4 transition-all duration-300 backdrop-blur-sm"
    
    if (errors[fieldName]) {
      return `${baseClasses} border-red-500/50 focus:border-red-500 focus:ring-red-500/20`
    }
    
    return `${baseClasses} border-white/10 hover:border-white/20 focus:border-purple-500 focus:ring-purple-500/20`
  }

  return (
    <>
      <section id="contact" className="py-20 relative overflow-hidden" ref={sectionRef}>
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-slate-900 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
          {/* Animated Background Elements */}
          <div className={`absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow ${isVisible ? 'animate-enter' : ''}`}></div>
          <div className={`absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slower ${isVisible ? 'animate-enter' : ''}`}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow ${isVisible ? 'animate-enter' : ''}`}></div>
        </div>

        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Enhanced Section Header */}
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
                <div className="w-4 h-0.5 bg-purple-400"></div>
                <span className="text-sm font-semibold tracking-wider">GET IN TOUCH</span>
                <div className="w-4 h-0.5 bg-purple-400"></div>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Create</span> Together
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
                Ready to bring your vision to life? Let's discuss your project 
                and create something amazing together.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Enhanced Contact Form */}
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
                <div className="bg-slate-800/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
                  <form 
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="group" data-error={!!errors.name}>
                        <label htmlFor="name" className={`block text-sm font-medium mb-3 transition-all duration-300 group-focus-within:text-purple-400 ${errors.name ? 'text-red-400' : 'text-white/80'}`}>
                          Your Name {errors.name && <span className="text-red-400">*</span>}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className={getFieldClassName('name')}
                          placeholder="EX: Salina"
                        />
                        {errors.name && (
                          <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div className="group" data-error={!!errors.email}>
                        <label htmlFor="email" className={`block text-sm font-medium mb-3 transition-all duration-300 group-focus-within:text-purple-400 ${errors.email ? 'text-red-400' : 'text-white/80'}`}>
                          Email Address {errors.email && <span className="text-red-400">*</span>}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={getFieldClassName('email')}
                          placeholder="EX: salina@example.com"
                        />
                        {errors.email && (
                          <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="group" data-error={!!errors.subject}>
                      <label htmlFor="subject" className={`block text-sm font-medium mb-3 transition-all duration-300 group-focus-within:text-purple-400 ${errors.subject ? 'text-red-400' : 'text-white/80'}`}>
                        Subject {errors.subject && <span className="text-red-400">*</span>}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className={getFieldClassName('subject')}
                        placeholder="What's this regarding?"
                      />
                      <div className="flex justify-between mt-2">
                        {errors.subject ? (
                          <p className="text-red-400 text-sm flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            {errors.subject}
                          </p>
                        ) : (
                          <div></div>
                        )}
                        <p className={`text-sm ${formData.subject.length > 100 ? 'text-red-400' : 'text-white/50'}`}>
                          {formData.subject.length}/100
                        </p>
                      </div>
                    </div>

                    <div className="group" data-error={!!errors.message}>
                      <label htmlFor="message" className={`block text-sm font-medium mb-3 transition-all duration-300 group-focus-within:text-purple-400 ${errors.message ? 'text-red-400' : 'text-white/80'}`}>
                        Your Message {errors.message && <span className="text-red-400">*</span>}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className={getFieldClassName('message')}
                        placeholder="Tell me about your project vision, timeline, and any specific requirements..."
                      ></textarea>
                      <div className="flex justify-between mt-2">
                        {errors.message ? (
                          <p className="text-red-400 text-sm flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            {errors.message}
                          </p>
                        ) : (
                          <div></div>
                        )}
                        <p className={`text-sm ${formData.message.length > 1000 ? 'text-red-400' : 'text-white/50'}`}>
                          {formData.message.length}/1000
                        </p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 transform shadow-2xl relative overflow-hidden group ${
                        isSubmitting 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:from-purple-700 hover:to-blue-700 hover:scale-105 hover:shadow-purple-500/30'
                      }`}
                    >
                      <span className="relative z-10 transition-transform duration-300">
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Sending...
                          </div>
                        ) : (
                          'Send Message'
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </form>
                </div>
              </div>

              {/* Enhanced Contact Info */}
              <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
                <div className="bg-slate-800/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl h-full">
                  <h3 className="text-2xl font-bold text-white mb-8">Get In Touch</h3>
                  
                  <div className="space-y-6">
                    {[
                      {
                        icon: (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        ),
                        title: "Email",
                        content: "changeyour@email.com",
                        link: "mailto:changeyour@email.com"
                      },
                      {
                        icon: (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        ),
                        title: "Phone",
                        content: "+977 (98) 8888 8888",
                        link: "tel:+977-9888888888"
                      },
                      {
                        icon: (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        ),
                        title: "Location",
                        content: "Based in Bhaktapur",
                        link: "#"
                      }
                    ].map((item, index) => (
                      <a
                        key={index}
                        href={item.link}
                        className="flex items-start space-x-4 group p-4 rounded-xl hover:bg-slate-700/30 transition-all duration-300 transform hover:scale-105"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-1 group-hover:text-purple-400 transition-colors duration-300">
                            {item.title}
                          </h4>
                          <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                            {item.content}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Enhanced Social Links with Hero Icons */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <h4 className="text-white font-semibold mb-6">Follow My Journey</h4>
                    <div className="flex space-x-3">
                      {[
                        { 
                          name: 'Instagram', 
                          icon: (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          ), 
                          color: 'hover:bg-pink-600' 
                        },
                        { 
                          name: 'YouTube', 
                          icon: (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                            </svg>
                          ), 
                          color: 'hover:bg-red-600' 
                        },
                        { 
                          name: 'Twitter', 
                          icon: (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                          ), 
                          color: 'hover:bg-blue-400' 
                        },
                        { 
                          name: 'LinkedIn', 
                          icon: (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          ), 
                          color: 'hover:bg-blue-600' 
                        }
                      ].map((platform) => (
                        <a
                          key={platform.name}
                          href="#"
                          className={`w-12 h-12 bg-slate-700/30 rounded-xl flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 transform hover:scale-110 backdrop-blur-sm ${platform.color} hover:shadow-lg`}
                          title={platform.name}
                        >
                          {platform.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Modal */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-white/10 shadow-2xl animate-scale-in">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Thank You!
              </h3>
              
              <p className="text-white/70 mb-6 leading-relaxed">
                Your message has been sent successfully. I'll get back to you within 24 hours.
              </p>
              
              <button
                onClick={() => setShowThankYou(false)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Contact