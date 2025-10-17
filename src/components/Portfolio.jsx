import React, { useState, useEffect } from 'react'
import projectsData from '../data/Projects.json'

// Import your project images
import Project1 from '../assets/Projects/Project-1.png'
import Project2 from '../assets/Projects/Project-2.png'
import Project3 from '../assets/Projects/Project-3.png'
import Project4 from '../assets/Projects/Project-4.png'
import Project5 from '../assets/Projects/Project-5.png'
import Project6 from '../assets/Projects/Project-6.png'

const Portfolio = ({ setActiveSection }) => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showAllMobile, setShowAllMobile] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // Array of imported project images
  const projectImages = [Project1, Project2, Project3, Project4, Project5, Project6]

  // Projects & filters from JSON
  const { projects, filters } = projectsData

  // ✅ Check if mobile (on mount + resize)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // ✅ Get project image (cycles through available images)
  const getProjectImage = (projectId) => {
    const imageIndex = (projectId - 1) % projectImages.length
    return projectImages[imageIndex]
  }

  // ✅ Filter projects by category
  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.category === activeFilter)

  // ✅ Slice projects for mobile
  const displayedProjects = !isMobile || showAllMobile 
    ? filteredProjects 
    : filteredProjects.slice(0, 4)

  return (
    <section id="portfolio" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            My <span className="text-purple-400">Portfolio</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto animate-fade-in delay-200">
            A collection of {projects.length} projects that demonstrate my expertise in modern technologies 
            and problem-solving capabilities.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => {
                setActiveFilter(filter.key)
                setShowAllMobile(false)
              }}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 border ${
                activeFilter === filter.key
                  ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-slate-800/50 border-slate-600 text-white/70 hover:bg-slate-700/50 hover:text-white hover:border-slate-500'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => {
            const projectImage = getProjectImage(project.id)
            return (
              <div
                key={project.id}
                className="group relative bg-slate-800/30 rounded-xl overflow-hidden backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 animate-fade-in-up"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both',
                }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={projectImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                    Project #{project.id}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300 flex-1">
                      {project.title}
                    </h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 ml-2 capitalize">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-1 bg-slate-700/50 rounded-md text-white/60 hover:bg-slate-600/50 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <a
                      href={project.liveLink}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-center py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/25"
                      onClick={(e) => {
                        if (project.liveLink === '#') {
                          e.preventDefault()
                          alert('Live demo link would open here!')
                        }
                      }}
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.githubLink}
                      className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-center py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 border border-slate-600"
                      onClick={(e) => {
                        if (project.githubLink === '#') {
                          e.preventDefault()
                          alert('GitHub repository would open here!')
                        }
                      }}
                    >
                      Source Code
                    </a>
                  </div>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/30 rounded-xl transition-all duration-500 pointer-events-none"></div>
              </div>
            )
          })}
        </div>

        {/* Mobile Show More Button */}
        {isMobile && filteredProjects.length > 4 && (
          <div className="text-center mt-8 animate-fade-in">
            <button
              onClick={() => setShowAllMobile(!showAllMobile)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
            >
              {showAllMobile ? 'Show Less' : 'Show More Projects'}
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-white/50 text-lg mb-4">
              No projects found in this category.
            </div>
            <button
              onClick={() => {
                setActiveFilter('all')
                setShowAllMobile(false)
              }}
              className="text-purple-400 hover:text-purple-300 transition-colors duration-300 bg-slate-800/50 px-6 py-2 rounded-lg"
            >
              View All {projects.length} Projects
            </button>
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </section>
  )
}

export default Portfolio