import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Cloud,
  Printer,
  Clock,
  Shield,
  Truck,
  Palette,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Globe,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Headphones,
  Phone
} from 'lucide-react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  
  // Contact information
  const phoneNumber = "+234-906-631-0001";

  const handleWhatsAppClick = () => {
    // Open WhatsApp with the phone number
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleCallClick = () => {
    // Open phone dialer
    window.location.href = `tel:${phoneNumber}`;
  };

  const sliderImages = [
    {
      url: "https://cloud-print1.vercel.app/",
      fallback: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Cloud Print Dashboard",
      description: "Manage your printing jobs from anywhere"
    },
    {
      url: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800",
      fallback: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Professional Printing",
      description: "High-quality prints delivered fast"
    },
    {
      url: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
      fallback: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Business Cards",
      description: "Professional business cards made easy"
    },
    {
      url: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800",
      fallback: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Marketing Materials",
      description: "Brochures, flyers, and promotional items"
    },
    {
      url: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800",
      fallback: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Custom Merchandise",
      description: "T-shirts, mugs, and branded items"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const features = [
    {
      icon: <Cloud className="h-8 w-8 text-blue-600" />,
      title: "Cloud-Based Printing",
      description: "No printers needed. Upload, approve, and we handle the rest with our advanced cloud infrastructure."
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: "24-48 Hour Delivery",
      description: "Fast turnaround times with delivery within 24-48 hours depending on quantity and location."
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Approval Process",
      description: "Every job requires your approval via email or call before printing begins. Complete control guaranteed."
    },
    {
      icon: <Palette className="h-8 w-8 text-pink-600" />,
      title: "Free Design Templates",
      description: "Access hundreds of professional templates or upload your own designs. Design assistance included."
    },
    {
      icon: <Truck className="h-8 w-8 text-orange-600" />,
      title: "All-in-One Package",
      description: "Design, printing, and delivery included with no hidden charges. One price, complete service."
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: "Bulk Order Specialist",
      description: "Perfect for large orders (300,000+ units). Competitive pricing for volume printing."
    }
  ];

  const testimonials = [
    {
      name: "Adebayo Johnson",
      company: "Tech Startup Lagos",
      text: "Cloud Print saved us thousands on printer maintenance. Their 24-hour delivery is incredible!",
      rating: 5
    },
    {
      name: "Sarah Okafor",
      company: "Marketing Agency",
      text: "The approval process gives us complete control. No more printing mistakes or waste.",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "E-commerce Business",
      text: "Handled our 500,000 unit order flawlessly. Professional service from start to finish.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Fixed Floating Contact Icons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Call Button */}
        <button
          onClick={handleCallClick}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
          title="Call us"
        >
          <Phone className="w-6 h-6" />
          <span className="absolute right-full mr-3 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Call {phoneNumber}
          </span>
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
          title="WhatsApp us"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-full mr-3 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            WhatsApp {phoneNumber}
          </span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Cloud Printing
                  <span className="block text-blue-300">Revolutionized</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  No printers, no maintenance, no hassle. Upload your designs, approve your jobs,
                  and receive professional prints delivered to your door in 24-48 hours.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/order"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  Start Printing Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/professionals"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  Professionals
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>

              <div className="flex items-center space-x-8 text-blue-200">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>No Setup Fees</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Free Delivery Lagos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Image Slider */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden">
                {/* Slider Container */}
                <div className="relative h-64 rounded-lg overflow-hidden">
                  {sliderImages.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
                        ? 'opacity-100 transform translate-x-0'
                        : index < currentSlide
                          ? 'opacity-0 transform -translate-x-full'
                          : 'opacity-0 transform translate-x-full'
                        }`}
                    >
                      <img
                        src={slide.url}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = slide.fallback;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-semibold text-lg mb-1">{slide.title}</h3>
                        <p className="text-sm opacity-90">{slide.description}</p>
                      </div>
                    </div>
                  ))}

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {sliderImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/75'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Status Display */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Print Status</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Approved</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Business Cards - 100 units</span>
                      <span className="text-blue-600 font-semibold">₦30,000</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Business Cards - 50 units</span>
                      <span className="text-blue-600 font-semibold">₦15,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Cloud Print?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've revolutionized printing by moving everything to the cloud.
              No equipment, no maintenance, just professional results delivered fast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold">50M+</div>
              <div className="text-blue-200">Pages Printed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">10K+</div>
              <div className="text-blue-200">Happy Clients</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">24hrs</div>
              <div className="text-blue-200">Average Delivery</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">99.9%</div>
              <div className="text-blue-200">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Cloud Print Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, fast, and reliable. Get professional prints in 4 easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold">Upload Design</h3>
              <p className="text-gray-600">Upload your files or choose from our free templates</p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold">Get Quote</h3>
              <p className="text-gray-600">Receive instant pricing and delivery timeline</p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold">Approve & Pay</h3>
              <p className="text-gray-600">Review proof, approve via email/call, and pay securely</p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-semibold">Receive Prints</h3>
              <p className="text-gray-600">Get your professional prints delivered in 24-48 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied customers who trust Cloud Print
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Cloud Printing?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of businesses who've eliminated printer costs and maintenance.
            Get professional prints delivered fast with our cloud-based solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/order"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Your First Order
            </Link>
            <button
              onClick={() => setShowVoiceChat(true)}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat with Assistant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;