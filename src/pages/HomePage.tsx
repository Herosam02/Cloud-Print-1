import React, { useState, useEffect, useRef } from 'react';
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
  Phone,
  Plus,
  Quote,
  Send,
  X
} from 'lucide-react';
import {
  Eye,
  Calendar,
  Package,
  Award,
  Smartphone,
  Monitor
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  createdAt: Date;
}

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    avatar: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Contact information
  const phoneNumber = "+234-906-631-0001";

  const initialTestimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Adebayo Johnson',
      role: 'CEO',
      company: 'Tech Startup Lagos',
      content: 'Cloud Print saved us thousands on printer maintenance. Their 24-hour delivery is incredible!',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Sarah Okafor',
      role: 'Marketing Director',
      company: 'Marketing Agency',
      content: 'The approval process gives us complete control. No more printing mistakes or waste.',
      createdAt: new Date('2024-01-20'),
    },
    {
      id: '3',
      name: 'Michael Chen',
      role: 'Business Owner',
      company: 'E-commerce Business',
      content: 'Handled our 500,000 unit order flawlessly. Professional service from start to finish.',
      createdAt: new Date('2024-01-25'),
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      role: 'Operations Manager',
      company: 'StartupXYZ',
      content: 'Game-changer for our business. We\'ve seen a 300% increase in customer satisfaction since implementing this solution.',
      createdAt: new Date('2024-02-01'),
    },
    {
      id: '5',
      name: 'David Thompson',
      role: 'CTO',
      company: 'DataFlow Inc',
      content: 'The technical excellence and attention to detail is remarkable. Highly recommend to any growing business.',
      createdAt: new Date('2024-02-05'),
    },
  ];

  useEffect(() => {
    setTestimonials(initialTestimonials);
  }, []);

  const addTestimonial = (newTestimonial: Omit<Testimonial, 'id' | 'createdAt'>) => {
    const testimonial: Testimonial = {
      ...newTestimonial,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setTestimonials(prev => [testimonial, ...prev]);
    setIsFormOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.content) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    addTestimonial({
      name: formData.name,
      role: formData.role || 'Customer',
      company: formData.company || 'Anonymous',
      content: formData.content,
      avatar: formData.avatar,
    });

    // Reset form
    setFormData({
      name: '',
      role: '',
      company: '',
      content: '',
      avatar: '',
    });

    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Testimonial Card Component
  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
    const getInitials = (name: string) => {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const isNewTestimonial = () => {
      const now = new Date();
      const testimonialDate = new Date(testimonial.createdAt);
      const diffInMinutes = (now.getTime() - testimonialDate.getTime()) / (1000 * 60);
      return diffInMinutes < 5; // Consider new if added within 5 minutes
    };

    return (
      <div className={`
        relative w-80 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6
        ${isNewTestimonial() ? 'ring-2 ring-purple-400 animate-pulse' : ''}
        hover:scale-105 transform
      `}>
        {isNewTestimonial() && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
            NEW!
          </div>
        )}

        <div className="flex items-center mb-4">
          <div className="relative">
            {testimonial.avatar ? (
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                {getInitials(testimonial.name)}
              </div>
            )}
          </div>
          <div className="ml-4 flex-1">
            <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
            <p className="text-sm text-gray-600">{testimonial.role}</p>
            <p className="text-sm text-purple-600 font-medium">{testimonial.company}</p>
          </div>
        </div>

        <div className="relative mb-4">
          <Quote className="absolute -top-2 -left-2 w-8 h-8 text-purple-200" />
          <p className="text-gray-700 leading-relaxed pl-6">
            {testimonial.content}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {testimonial.createdAt.toLocaleDateString()}
          </span>
        </div>
      </div>
    );
  };

  // Testimonial Wall Component
  const TestimonialWall = () => {
    // Create multiple copies for seamless infinite scroll
    const repeatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

    useEffect(() => {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) return;

      let animationId: number;
      let scrollPosition = 0;
      const scrollSpeed = 0.5; // pixels per frame

      const animate = () => {
        scrollPosition += scrollSpeed;

        // Reset when we've scrolled through one full set
        if (scrollPosition >= scrollContainer.scrollWidth / 3) {
          scrollPosition = 0;
        }

        scrollContainer.scrollLeft = scrollPosition;
        animationId = requestAnimationFrame(animate);
      };

      animationId = requestAnimationFrame(animate);

      // Pause on hover
      const handleMouseEnter = () => cancelAnimationFrame(animationId);
      const handleMouseLeave = () => {
        animationId = requestAnimationFrame(animate);
      };

      scrollContainer.addEventListener('mouseenter', handleMouseEnter);
      scrollContainer.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        cancelAnimationFrame(animationId);
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [testimonials]);

    return (
      <div className="w-full">
        <div className="container mx-auto px-4 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600">
                Join thousands of satisfied customers who trust Cloud Print
              </p>
            </div>
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your Review
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-hidden py-4 px-4"
          style={{ scrollBehavior: 'auto' }}
        >
          {repeatedTestimonials.map((testimonial, index) => (
            <div key={`${testimonial.id}-${index}`} className="flex-shrink-0">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    );
  };

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

  const advancedFeatures = [
    {
      icon: <Eye className="h-8 w-8 text-blue-600" />,
      title: "Live File Preview & Print Simulation",
      description: "Preview exactly how your documents will look when printed. See page layout, colors, and quality before printing to avoid post-print errors."
    },
    {
      icon: <Cloud className="h-8 w-8 text-green-600" />,
      title: "Print from Anywhere (Cloud Sync)",
      description: "Sync with Google Drive, Dropbox, OneDrive, or use email-to-print. Upload from multiple sources easily, even from your mobile phone."
    },
    {
      icon: <Calendar className="h-8 w-8 text-purple-600" />,
      title: "Scheduled Print & Delivery",
      description: "Schedule your print jobs and select preferred delivery/pickup times. Includes 'Rush Print' pricing for urgent orders."
    },
    {
      icon: <Users className="h-8 w-8 text-pink-600" />,
      title: "Personalized Print Storefronts",
      description: "Custom dashboards with saved templates, print history, and branded stationery. Perfect for schools, churches, and businesses."
    },
    {
      icon: <Palette className="h-8 w-8 text-orange-600" />,
      title: "Design + Print Integration",
      description: "Create and edit designs using our in-browser editor. Edit flyers, ID cards, banners before printing with drag-and-drop tools."
    },
    {
      icon: <Award className="h-8 w-8 text-indigo-600" />,
      title: "Loyalty & Cashback System",
      description: "Earn loyalty points and 5% cashback on repeat orders. Referral rewards: 'Refer a friend and both get ₦500 off your next print.'"
    }
  ];

  const smartFeatures = [
    {
      icon: <MessageCircle className="h-8 w-8 text-green-600" />,
      title: "WhatsApp & Live Chat Support",
      description: "Floating WhatsApp chat button for direct order follow-up, support, and quoting. Helps close unsure customers quickly."
    },
    {
      icon: <Package className="h-8 w-8 text-blue-600" />,
      title: "Track My Print",
      description: "Real-time tracking of print progress and delivery. See 'Your order is being printed,' 'Out for delivery,' and more."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-purple-600" />,
      title: "Mobile-First Experience",
      description: "Optimized mobile experience with app-like functionality. Upload, preview, and order from any device."
    },
    {
      icon: <Monitor className="h-8 w-8 text-orange-600" />,
      title: "Bulk Print Dashboard",
      description: "Organizations can add staff members who can order prints under company account. Centralized billing with monthly invoices."
    }
  ];

  const useCases = [
    {
      title: "Students",
      description: "Thesis, assignments, posters",
      link: "/students",
      color: "bg-green-500",
      icon: "🎓"
    },
    {
      title: "Churches",
      description: "Program booklets, envelopes",
      link: "/churches",
      color: "bg-purple-500",
      icon: "⛪"
    },
    {
      title: "Event Planners",
      description: "Banners, invitations",
      link: "/events",
      color: "bg-pink-500",
      icon: "🎉"
    },
    {
      title: "Offices",
      description: "Letterheads, ID cards",
      link: "/offices",
      color: "bg-blue-500",
      icon: "🏢"
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
                  Start Smart Printing
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
              <Link
                to="/BackgroundRemovalpage"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Background Removal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <div className="flex items-center space-x-8 text-blue-200">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Live Preview</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Cloud Sync</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Real-time Tracking</span>
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
            {advancedFeatures.map((feature, index) => (
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

      {/* Smart Engagement Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Smart Engagement Features</h2>
            <p className="text-xl text-gray-600">
              AI-powered assistance, real-time tracking, and seamless mobile experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {smartFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Specialized Solutions</h2>
            <p className="text-xl text-gray-600">
              Tailored printing solutions for different industries and use cases
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Link
                key={index}
                to={useCase.link}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`${useCase.color} p-8 text-white text-center`}>
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
                  <p className="text-sm opacity-90">{useCase.description}</p>
                  <div className="mt-4 inline-flex items-center text-sm font-medium">
                    Learn More <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
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

      {/* Dynamic Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <TestimonialWall />
      </section>

      {/* Testimonial Form Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Share Your Experience
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="John Doe"
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Role
              </label>
              <Input
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                placeholder="Product Manager"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <Input
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="Amazing Corp"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Testimonial *
              </label>
              <Textarea
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Tell us about your experience..."
                required
                className="w-full min-h-[100px] resize-none"
                maxLength={500}
              />
              <div className="text-xs text-gray-500 mt-1">
                {formData.content.length}/500 characters
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avatar URL (optional)
              </label>
              <Input
                value={formData.avatar}
                onChange={(e) => handleChange('avatar', e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
                className="flex-1"
                disabled={isSubmitting}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={isSubmitting || !formData.name || !formData.content}
              >
                {isSubmitting ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                {isSubmitting ? 'Sharing...' : 'Share Testimonial'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

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