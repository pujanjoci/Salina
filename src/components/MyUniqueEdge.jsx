// src/components/MyEdge.jsx
import { Code, Rocket, Users, Heart, Zap, Shield } from 'lucide-react';

const MyEdge = () => {
  const edgePoints = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code Advocate",
      description: "I write maintainable, scalable code with best practices and thorough documentation",
      gradient: "from-blue-500 to-cyan-500",
      delay: "0"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Fast Problem Solver",
      description: "Quick to adapt and solve complex challenges with innovative solutions",
      gradient: "from-purple-500 to-pink-500",
      delay: "100"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaborator",
      description: "Excellent communication skills and thrive in agile team environments",
      gradient: "from-green-500 to-emerald-500",
      delay: "200"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passionate Learner",
      description: "Constantly updating my skills and staying ahead of industry trends",
      gradient: "from-red-500 to-orange-500",
      delay: "300"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Focused",
      description: "Optimize applications for speed, efficiency and great user experience",
      gradient: "from-yellow-500 to-amber-500",
      delay: "400"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality First",
      description: "Rigorous testing and attention to detail ensure reliable, bug-free code",
      gradient: "from-indigo-500 to-blue-500",
      delay: "500"
    }
  ];

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleLetsConnect = () => {
    scrollToSection('contact');
  };

  return (
    <section id="my-edge" className="py-20 relative overflow-hidden">
      {/* Your Background */}
      <div className="absolute inset-0 bg-slate-900 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900"></div>
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            My Unique Edge
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            What sets me apart in a competitive landscape? Here's the unique value I bring to every project.
          </p>
        </div>

        {/* Edge Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {edgePoints.map((edge, index) => (
            <div
              key={index}
              className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${edge.delay}ms` }}
            >
              {/* Gradient Background Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${edge.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
              
              {/* Icon with Gradient */}
              <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${edge.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300 animate-float`}>
                {edge.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4">
                {edge.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {edge.description}
              </p>
              
              {/* Hover Border Effect */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${edge.gradient} bg-clip-padding group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:${edge.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl m-0.5 h-[calc(100%-4px)]" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-slide-up">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Bring My Edge to Your Team?
            </h3>
            <p className="text-gray-300 mb-6">
              Let's discuss how my unique combination of skills and approach can benefit your projects.
            </p>
            <button 
              onClick={handleLetsConnect}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Let's Connect
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyEdge;