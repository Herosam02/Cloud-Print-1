import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cloud, 
  Users, 
  Award, 
  Target, 
  Zap, 
  Shield, 
  Globe,
  TrendingUp,
  CheckCircle,
  Star,
  Heart,
  Lightbulb
} from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { number: "50M+", label: "Pages Printed", icon: <Cloud className="h-6 w-6 sm:h-8 sm:w-8" /> },
    { number: "10K+", label: "Happy Clients", icon: <Users className="h-6 w-6 sm:h-8 sm:w-8" /> },
    { number: "99.9%", label: "Uptime", icon: <Shield className="h-6 w-6 sm:h-8 sm:w-8" /> },
    { number: "24hrs", label: "Avg Delivery", icon: <Zap className="h-6 w-6 sm:h-8 sm:w-8" /> }
  ];

  const values = [
    {
      icon: <Target className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600" />,
      title: "Customer-Centric",
      description: "Every decision we make is focused on delivering exceptional value and service to our customers."
    },
    {
      icon: <Lightbulb className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-600" />,
      title: "Innovation",
      description: "We continuously innovate to provide cutting-edge cloud printing solutions that simplify your life."
    },
    {
      icon: <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-green-600" />,
      title: "Reliability",
      description: "Our robust cloud infrastructure ensures your printing needs are met consistently and dependably."
    },
    {
      icon: <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-red-600" />,
      title: "Quality",
      description: "We never compromise on quality, delivering professional-grade prints that exceed expectations."
    }
  ];

  const team = [
    {
      name: "Adebayo Ogundimu",
      role: "CEO & Founder",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "15+ years in printing technology and business operations"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Cloud infrastructure expert with background in enterprise solutions"
    },
    {
      name: "Michael Johnson",
      role: "Head of Operations",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Logistics and supply chain optimization specialist"
    },
    {
      name: "Fatima Al-Rashid",
      role: "Customer Success Director",
      image: "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Customer experience and service excellence advocate"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Cloud Print was established with a vision to revolutionize printing through cloud technology"
    },
    {
      year: "2021",
      title: "First 1000 Customers",
      description: "Reached our first milestone of 1000 satisfied customers across Lagos"
    },
    {
      year: "2022",
      title: "Nationwide Expansion",
      description: "Expanded operations to cover all major cities in Nigeria"
    },
    {
      year: "2023",
      title: "10 Million Pages",
      description: "Printed over 10 million pages, establishing ourselves as a market leader"
    },
    {
      year: "2024",
      title: "Advanced AI Integration",
      description: "Launched AI-powered quality control and automated approval systems"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              About Cloud Print
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
              We're revolutionizing the printing industry by moving everything to the cloud. 
              No more printer maintenance, no more supply costs - just professional prints delivered fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
              <Link 
                to="/order" 
                className="w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Start Printing
              </Link>
              <Link 
                to="/contact" 
                className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-white rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <div className="text-blue-600">{stat.icon}</div>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Mission</h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8">
                To eliminate the hassle and expense of owning printers by providing 
                convenient, cost-effective cloud-based printing services that deliver 
                professional results to your doorstep.
              </p>
              
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Our Vision</h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                To become Africa's leading cloud printing platform, making professional 
                printing accessible to everyone while reducing environmental impact through 
                shared resources and optimized logistics.
              </p>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <img 
                src="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Cloud printing technology"
                className="rounded-2xl shadow-2xl w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-blue-600 text-white p-4 sm:p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Globe className="h-6 w-6 sm:h-8 sm:w-8" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold">100%</div>
                    <div className="text-blue-200 text-sm sm:text-base">Cloud-Based</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Our Core Values</h2>
            <p className="text-lg sm:text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{value.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story/Timeline */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Our Journey</h2>
            <p className="text-lg sm:text-xl text-gray-600">
              From startup to Nigeria's leading cloud printing platform
            </p>
          </div>

          {/* Mobile Timeline */}
          <div className="block lg:hidden space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative pl-8">
                <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                <div className="absolute left-2 top-4 w-0.5 h-full bg-blue-200"></div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{milestone.title}</h3>
                  <p className="text-gray-600 text-sm">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Meet Our Team</h2>
            <p className="text-lg sm:text-xl text-gray-600">
              The experts behind Cloud Print's success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3 text-sm sm:text-base">{member.role}</p>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Why Choose Cloud Print?</h2>
            <p className="text-lg sm:text-xl text-gray-600">
              We're not just another printing service - we're your printing solution
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start space-x-4 group">
                  <div className="bg-blue-100 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Equipment Costs</h3>
                    <p className="text-sm sm:text-base text-gray-600">Eliminate printer purchases, maintenance, and supply costs completely.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="bg-green-100 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                    <p className="text-sm sm:text-base text-gray-600">24-48 hour delivery with same-day options for urgent orders.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="bg-purple-100 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
                    <p className="text-sm sm:text-base text-gray-600">Professional-grade printing with 100% satisfaction guarantee.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="bg-orange-100 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Scalable Solutions</h3>
                    <p className="text-sm sm:text-base text-gray-600">From single pages to 300,000+ unit orders - we scale with you.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <img 
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Professional printing results"
                className="rounded-2xl shadow-2xl w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-green-500 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 sm:h-6 sm:w-6 fill-current" />
                  <div>
                    <div className="text-lg sm:text-xl font-bold">4.9/5</div>
                    <div className="text-green-200 text-xs sm:text-sm">Customer Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
            Ready to Experience the Future of Printing?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-blue-100 leading-relaxed">
            Join thousands of businesses and individuals who've made the switch to cloud printing. 
            No setup fees, no contracts, no hassle.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
            <Link 
              to="/order" 
              className="w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Start Your First Order
            </Link>
            <Link 
              to="/pricing" 
              className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;