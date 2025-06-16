import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Headphones,
  FileText,
  CheckCircle
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: <Phone className="h-8 w-8 text-blue-600" />,
      title: "Phone Support",
      description: "Speak directly with our printing experts",
      details: ["+234-800-CLOUD-PRINT", "+234-901-234-5678"],
      availability: "Mon-Fri: 8AM-6PM WAT",
      link: "tel:+2348002568637746"
    },
    {
      icon: <Mail className="h-8 w-8 text-green-600" />,
      title: "Email Support",
      description: "Get detailed responses to your questions",
      details: ["orders@cloudprint.dev", "support@cloudprint.dev"],
      availability: "24/7 - Response within 2 hours",
      link: "mailto:orders@cloudprint.dev"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-purple-600" />,
      title: "Live Chat",
      description: "Instant help for urgent inquiries",
      details: ["Available on website", "Real-time assistance"],
      availability: "Mon-Fri: 8AM-8PM WAT",
      link: "https://chat.cloudprint.dev"
    },
    {
      icon: <Headphones className="h-8 w-8 text-orange-600" />,
      title: "WhatsApp Support",
      description: "Quick support via WhatsApp",
      details: ["+234-901-CLOUD-01", "File sharing supported"],
      availability: "Mon-Fri: 8AM-6PM WAT",
      link: "https://wa.me/2349012568601"
    }
  ];

  const officeLocations = [
    {
      name: "Lagos Headquarters",
      address: "123 Victoria Island, Lagos State, Nigeria",
      phone: "+234-901-234-5678",
      email: "lagos@cloudprint.dev",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM"
    },
    {
      name: "Abuja Office",
      address: "456 Central Business District, Abuja, FCT",
      phone: "+234-902-345-6789",
      email: "abuja@cloudprint.dev",
      hours: "Mon-Fri: 8AM-6PM"
    },
    {
      name: "Port Harcourt Branch",
      address: "789 GRA Phase 2, Port Harcourt, Rivers State",
      phone: "+234-903-456-7890",
      email: "portharcourt@cloudprint.dev",
      hours: "Mon-Fri: 8AM-5PM"
    }
  ];

  const faqCategories = [
    {
      title: "Order Process",
      questions: [
        "How do I place an order?",
        "What file formats do you accept?",
        "How long does approval take?",
        "Can I modify my order after submission?"
      ]
    },
    {
      title: "Pricing & Payment",
      questions: [
        "How is pricing calculated?",
        "What payment methods do you accept?",
        "Are there volume discounts?",
        "Do you offer subscription plans?"
      ]
    },
    {
      title: "Delivery & Shipping",
      questions: [
        "What are your delivery areas?",
        "How fast is delivery?",
        "Is delivery free?",
        "Can I track my order?"
      ]
    },
    {
      title: "Technical Support",
      questions: [
        "What resolution should my files be?",
        "Do you provide design services?",
        "Can you help with file preparation?",
        "What if my print quality isn't satisfactory?"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Have questions about our cloud printing services? Our expert team is here to help you 
              with orders, technical support, and custom solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+2348002568637746" 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 inline-flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
              <a 
                href="#contact-form" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 inline-flex items-center justify-center"
              >
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Multiple Ways to Reach Us</h2>
            <p className="text-xl text-gray-600">
              Choose the contact method that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-6">{method.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                
                <div className="space-y-2 mb-4">
                  {method.details.map((detail, idx) => (
                    <p key={idx} className="text-sm font-medium text-gray-700">{detail}</p>
                  ))}
                </div>
                
                <p className="text-sm text-gray-500 mb-6">{method.availability}</p>
                
                <a 
                  href={method.link}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                >
                  Contact Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50" id="contact-form">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you within 2 hours
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for contacting us. We'll respond to your inquiry within 2 hours.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select inquiry type</option>
                      <option value="general">General Information</option>
                      <option value="order">Order Support</option>
                      <option value="technical">Technical Support</option>
                      <option value="pricing">Pricing & Quotes</option>
                      <option value="partnership">Partnership</option>
                      <option value="complaint">Complaint</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    * Required fields. We'll respond within 2 hours during business hours.
                  </p>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Locations</h2>
            <p className="text-xl text-gray-600">
              Visit our offices across Nigeria for in-person support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLocations.map((location, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{location.name}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                    <p className="text-gray-600">{location.address}</p>
                
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <a href={`tel:${location.phone}`} className="text-gray-600 hover:text-blue-600">
                      {location.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-purple-600" />
                    <a href={`mailto:${location.email}`} className="text-gray-600 hover:text-blue-600">
                      {location.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <p className="text-gray-600">{location.hours}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {faqCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.questions.map((question, idx) => (
                    <li key={idx}>
                      <a 
                        href={`/faq#${question.toLowerCase().replace(/\s+/g, '-').replace(/[?]/g, '')}`}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        {question}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <a 
                    href="/faq"
                    className="text-sm text-gray-500 hover:text-blue-600 flex items-center"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    View all FAQs
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Urgent Order Support</h2>
          <p className="text-xl text-red-100 mb-6">
            Need immediate assistance with an urgent order? Our emergency support line is available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+2349011234567" 
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition-all duration-300 inline-flex items-center justify-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              Emergency Line: +234-901-123-4567
            </a>
            <a 
              href="https://wa.me/2349011234567" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 inline-flex items-center justify-center"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;