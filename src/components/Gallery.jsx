import { useState, useRef, useEffect } from 'react';

// Import your images - update these paths to match your actual image files
import bts from '../assets/Projects/bts.png';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Gallery images using imported images
  const galleryImages = [
    {
      id: 1,
      src: bts,
      alt: "Team collaboration session",
      category: "Workshop"
    },
    {
      id: 2,
      src: bts,
      alt: "Creative brainstorming",
      category: "Planning"
    },
    {
      id: 3,
      src: bts,
      alt: "Project development",
      category: "Development"
    },
    {
      id: 4,
      src: bts,
      alt: "Team meeting",
      category: "Meeting"
    },
    {
      id: 5,
      src: bts,
      alt: "Creative process",
      category: "Creative"
    },
    {
      id: 6,
      src: bts,
      alt: "Project launch",
      category: "Launch"
    }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden bg-slate-900"
      id="behind-the-scenes"
    >
      {/* Enhanced Background */}
        <div className="absolute inset-0 bg-slate-900 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
          {/* Animated Background Elements */}
          <div className={`absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow ${isVisible ? 'animate-enter' : ''}`}></div>
          <div className={`absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slower ${isVisible ? 'animate-enter' : ''}`}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow ${isVisible ? 'animate-enter' : ''}`}></div>
        </div>

      {/* Section Header */}
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            Behind the Scenes
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6 animate-scale-in"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in">
            A glimpse into our creative process, team collaboration, and the moments that make it all happen.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover-lift ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage(image)}
            >
              {/* Image Container */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-full mb-2 animate-fade-in">
                    {image.category}
                  </span>
                  <p className="text-white text-lg font-semibold animate-slide-up">{image.alt}</p>
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-white text-2xl hover:text-purple-300 transition-colors duration-200 z-10"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <div className="relative animate-scale-in">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="rounded-2xl max-w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                <h3 className="text-white text-xl font-semibold mb-2 animate-slide-up">{selectedImage.alt}</h3>
                <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-full animate-fade-in">
                  {selectedImage.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;