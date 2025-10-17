import React, { useEffect, useRef, useState } from 'react'
import Profile from '../assets/profile.jpg'

const About = ({ setActiveSection }) => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const [imageShrunk, setImageShrunk] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Skill Section - Change these values here
  const skills = [
    { name: 'Web Development', level: 95 },
    { name: 'UI/UX Design', level: 90 },
    { name: 'Problem Solving', level: 85 },
    { name: 'Team Collaboration', level: 88 },
    { name: 'Creative Thinking', level: 92 },
    { name: 'Continuous Learning', level: 87 },
  ]

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleScroll = () => {
      if (!sectionRef.current) return

      const sectionTop = sectionRef.current.getBoundingClientRect().top
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Different scroll behavior for mobile vs desktop
      if (isMobile) {
        // Mobile: simpler animations, trigger earlier
        if (scrollPosition > 100) {
          setImageShrunk(true)
        } else {
          setImageShrunk(false)
        }

        if (scrollPosition > 200) {
          setContentVisible(true)
        }
      } else {
        // Desktop: original behavior
        if (scrollPosition > sectionTop + 100) {
          setImageShrunk(true)
        } else {
          setImageShrunk(false)
        }

        if (scrollPosition > sectionTop + 300) {
          setContentVisible(true)
        } else {
          setContentVisible(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile])

  return (
    <section id="about" className="min-h-screen relative" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-slate-900 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900"></div>
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Mobile Layout - Single Column */}
        <div className="block md:hidden">
          {/* Profile Image - Top for mobile */}
          <div 
            ref={imageRef}
            className={`pt-20 pb-8 transition-all duration-700 ease-out ${
              imageShrunk 
                ? 'scale-90 opacity-90' 
                : 'scale-100 opacity-100'
            }`}
          >
            <div className="flex justify-center">
              <img 
                src={Profile}
                alt="Profile" 
                className="rounded-2xl shadow-2xl object-cover w-full max-w-sm mx-auto"
              />
            </div>
          </div>

          {/* Content - Below image for mobile */}
          <div 
            ref={contentRef}
            className={`transition-all duration-1000 delay-300 ${
              contentVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Nice to Meet <span className="text-purple-400">You!</span>
            </h2>
            
            {/* About me - Description for mobile*/}

            <div className="space-y-4 mb-6">
              <p className="text-white/80 text-base leading-relaxed">
                I'm a passionate developer who loves turning creative ideas into digital reality. 
                With a keen eye for detail and a heart for innovation, I enjoy crafting experiences 
                that are not just functional, but truly delightful to use.
              </p>
              <p className="text-white/80 text-base leading-relaxed">
                When I'm not coding, you'll probably find me exploring new technologies, 
                sketching out design concepts, or enjoying a good cup of coffee while 
                brainstorming my next project.
              </p>
            </div>
            
            {/* Stats - Grid for mobile */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="text-center p-3 bg-slate-800/30 rounded-lg backdrop-blur-sm border border-white/5 hover:bg-slate-800/50 transition-all duration-300">
                <div className="text-xl font-bold text-purple-400">25+</div>
                <div className="text-white/70 text-xs">Happy Projects</div>
              </div>
              <div className="text-center p-3 bg-slate-800/30 rounded-lg backdrop-blur-sm border border-white/5 hover:bg-slate-800/50 transition-all duration-300">
                <div className="text-xl font-bold text-purple-400">15+</div>
                <div className="text-white/70 text-xs">Amazing Clients</div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-6 text-center">What I Bring to the Table</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between text-white mb-2">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <span className="text-purple-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out transform translate-x-0 group-hover:scale-105"
                        style={{ width: '0%' }}
                        ref={(el) => {
                          if (el && contentVisible) {
                            setTimeout(() => {
                              el.style.width = `${skill.level}%`
                            }, index * 100)
                          }
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
            </div>
          </div>
        </div>

        {/* Desktop Layout - Original Two Column */}
        <div className="hidden md:flex">
          {/* Left Side - Content that appears on scroll */}
          <div className="w-1/2">
            <div 
              ref={contentRef}
              className={`pt-20 transition-all duration-1000 delay-500 ${
                contentVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >

              {/* About me - Description for Desktop View*/}

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Nice to Meet <span className="text-purple-400">You!</span>
              </h2>
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                I'm a passionate developer who loves turning creative ideas into digital reality. 
                With a keen eye for detail and a heart for innovation, I enjoy crafting experiences 
                that are not just functional, but truly delightful to use.
              </p>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                When I'm not coding, you'll probably find me exploring new technologies, 
                sketching out design concepts, or enjoying a good cup of coffee while 
                brainstorming my next project. I believe that great work happens when 
                passion meets purpose!
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-slate-800/30 rounded-lg backdrop-blur-sm border border-white/5 hover:bg-slate-800/50 transition-all duration-300">
                  <div className="text-2xl font-bold text-purple-400">25+</div>
                  <div className="text-white/70 text-sm">Happy Projects</div>
                </div>
                <div className="text-center p-4 bg-slate-800/30 rounded-lg backdrop-blur-sm border border-white/5 hover:bg-slate-800/50 transition-all duration-300">
                  <div className="text-2xl font-bold text-purple-400">15+</div>
                  <div className="text-white/70 text-sm">Amazing Clients</div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-8">What I Bring to the Table</h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between text-white mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-purple-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out transform translate-x-0 group-hover:scale-105"
                          style={{ width: '0%' }}
                          ref={(el) => {
                            if (el && contentVisible) {
                              setTimeout(() => {
                                el.style.width = `${skill.level}%`
                              }, index * 100)
                            }
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Side - Sticky Image */}
          <div className="w-1/2">
            <div 
              ref={imageRef}
              className={`sticky top-0 h-screen flex items-center transition-all duration-700 ease-out ${
                imageShrunk 
                  ? 'w-[60%] ml-auto mr-6' 
                  : 'w-full ml-auto mr-8'
              }`}
            >
              <img 
                src={Profile}
                alt="Profile" 
                className={`rounded-2xl shadow-2xl object-cover transition-all duration-700 ${
                  imageShrunk 
                    ? 'w-full h-auto max-h-[70vh]' 
                    : 'w-full h-auto max-h-[80vh]'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About