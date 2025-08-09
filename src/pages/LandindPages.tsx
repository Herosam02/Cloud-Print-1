import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Church, 
  Calendar, 
  Building,
  Star,
  CheckCircle,
  Users,
  Award,
  Clock,
  Truck
} from 'lucide-react';

// Students Landing Page
export const StudentsPage = () => {
  const studentServices = [
    {
      title: 'Thesis & Dissertations',
      description: 'Professional binding and printing for your academic work',
      price: 'From ₦200/page',
      features: ['Hard & soft binding', 'Multiple copies', 'Same-day service']
    },
    {
      title: 'Assignment Printing',
      description: 'Quick and affordable printing for daily assignments',
      price: 'From ₦50/page',
      features: ['Black & white printing', 'Bulk discounts', 'Mobile upload']
    },
    {
      title: 'Project Posters',
      description: 'Large format printing for presentations and exhibitions',
      price: 'From ₦2,000/poster',
      features: ['A0, A1, A2 sizes', 'Glossy finish', 'Weather resistant']
    }
  ];

  const testimonials = [
    {
      name: 'Chioma Okafor',
      school: 'University of Lagos',
      text: 'Printed my entire thesis here. Great quality and saved me so much time!',
      rating: 5
    },
    {
      name: 'Ahmed Bello',
      school: 'Ahmadu Bello University',
      text: 'Best prices for students. The bulk discount really helped with my project.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <GraduationCap className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Student Printing Made Easy</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Affordable, fast, and reliable printing services for students. 
              From assignments to thesis binding - we've got you covered!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/order?student=true" 
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-all duration-300"
              >
                Start Printing Now
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300">
                Get Student Discount
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Special Offers</h2>
            <p className="text-xl text-gray-600">Exclusive discounts for students</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">20%</div>
              <div className="text-lg font-semibold mb-2">Student Discount</div>
              <div className="text-gray-600">On all printing services with valid student ID</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">₦500</div>
              <div className="text-lg font-semibold mb-2">First Order Bonus</div>
              <div className="text-gray-600">Off your first order above ₦2,000</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">FREE</div>
              <div className="text-lg font-semibold mb-2">Campus Delivery</div>
              <div className="text-gray-600">Free delivery to major universities in Lagos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Services</h2>
            <p className="text-xl text-gray-600">Everything you need for your academic journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studentServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-2xl font-bold text-green-600 mb-4">{service.price}</div>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/order"
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center block"
                >
                  Order Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Students Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <div className="text-gray-500 text-sm">{testimonial.school}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Churches Landing Page
export const ChurchesPage = () => {
  const churchServices = [
    {
      title: 'Program Booklets',
      description: 'Beautiful service programs and event booklets',
      price: 'From ₦100/booklet',
      features: ['Custom designs', 'Bulk pricing', 'Same-week delivery']
    },
    {
      title: 'Church Envelopes',
      description: 'Offering and tithe envelopes with custom branding',
      price: 'From ₦50/envelope',
      features: ['Custom printing', 'Various sizes', 'Quality paper']
    },
    {
      title: 'Event Banners',
      description: 'Large format banners for church events and campaigns',
      price: 'From ₦8,000/banner',
      features: ['Weather resistant', 'Custom sizes', 'Vibrant colors']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <Church className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Church Printing Services</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Professional printing services for churches and religious organizations. 
              From program booklets to event banners - spreading the word beautifully.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/order?church=true" 
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-all duration-300"
              >
                Start Your Order
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300">
                Get Church Discount
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Church Services</h2>
            <p className="text-xl text-gray-600">Everything your church needs for effective communication</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {churchServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-2xl font-bold text-purple-600 mb-4">{service.price}</div>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/order"
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-center block"
                >
                  Order Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Event Planners Landing Page
export const EventPlannersPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <Calendar className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Event Printing Solutions</h1>
            <p className="text-xl text-pink-100 max-w-3xl mx-auto mb-8">
              Complete printing solutions for event planners. From invitations to signage - 
              make every event memorable with professional printing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/order?events=true" 
                className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-pink-50 transition-all duration-300"
              >
                Plan Your Printing
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-pink-600 transition-all duration-300">
                Bulk Event Pricing
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Offices Landing Page
export const OfficesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <Building className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Office Printing Solutions</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Professional printing services for offices and businesses. 
              Letterheads, business cards, reports - everything your office needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/order?office=true" 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300"
              >
                Start Office Order
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                Corporate Accounts
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};