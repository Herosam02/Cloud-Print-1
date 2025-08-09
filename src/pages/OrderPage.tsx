import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  CreditCard, 
  Image, 
  Megaphone, 
  Package,
  Users,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';

const OrderPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    service: '',
    specifications: {
      size: '',
      paperType: '',
      finishing: '',
      binding: '',
      coating: ''
    },
    designOption: '',
    printType: '',
    quantity: '',
    files: [],
    deliveryOption: '',
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      city: '',
      state: ''
    },
    paymentMethod: '',
    specialInstructions: ''
  });

  const services = [
    // Original services
    {
      id: 'business-cards',
      name: 'Business Cards',
      icon: <CreditCard className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Professional business cards with premium finishes',
      basePrice: 15000,
      unit: '500 cards',
      category: 'original'
    },
    {
      id: 'documents',
      name: 'Document Printing',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'High-quality document printing in B&W or color',
      basePrice: 50,
      unit: 'per page',
      category: 'original'
    },
    {
      id: 'flyers',
      name: 'Flyers & Brochures',
      icon: <Image className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Eye-catching marketing materials',
      basePrice: 200,
      unit: 'per piece',
      category: 'original'
    },
    {
      id: 'banners',
      name: 'Banners & Posters',
      icon: <Megaphone className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Large format printing for events and advertising',
      basePrice: 5000,
      unit: 'per sqm',
      category: 'original'
    },
    {
      id: 'merchandise',
      name: 'Custom Merchandise',
      icon: <Package className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Custom branded merchandise and promotional items',
      basePrice: 2500,
      unit: 'per item',
      category: 'original'
    },
    {
      id: 'bulk',
      name: 'Bulk Orders',
      icon: <Users className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Large volume printing with competitive rates',
      basePrice: 0,
      unit: 'Custom pricing',
      category: 'original'
    },
    {
      id: 'letterheads',
      name: 'Letterheads',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Professional letterheads for your business',
      basePrice: 8000,
      unit: '100 sheets',
      category: 'original'
    },
    {
      id: 'envelopes',
      name: 'Custom Envelopes',
      icon: <Mail className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Branded envelopes in various sizes',
      basePrice: 12000,
      unit: '100 envelopes',
      category: 'original'
    },

    // Student Services (10)
    {
      id: 'thesis-binding',
      name: 'Thesis Binding',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Professional thesis and dissertation binding',
      basePrice: 8500,
      unit: 'per copy',
      category: 'students'
    },
    {
      id: 'project-reports',
      name: 'Project Reports',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Student project report printing and binding',
      basePrice: 3500,
      unit: 'per copy',
      category: 'students'
    },
    {
      id: 'lecture-notes',
      name: 'Lecture Notes',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Course materials and lecture note printing',
      basePrice: 25,
      unit: 'per page',
      category: 'students'
    },
    {
      id: 'student-id-cards',
      name: 'Student ID Cards',
      icon: <CreditCard className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Custom student identification cards',
      basePrice: 1500,
      unit: 'per card',
      category: 'students'
    },
    {
      id: 'exam-pads',
      name: 'Exam Answer Booklets',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Custom exam answer booklets for schools',
      basePrice: 150,
      unit: 'per booklet',
      category: 'students'
    },
    {
      id: 'research-posters',
      name: 'Research Posters',
      icon: <Image className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Academic research presentation posters',
      basePrice: 4500,
      unit: 'per poster',
      category: 'students'
    },
    {
      id: 'course-manuals',
      name: 'Course Manuals',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Student course manuals and handbooks',
      basePrice: 120,
      unit: 'per page',
      category: 'students'
    },
    {
      id: 'assignment-covers',
      name: 'Assignment Covers',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Professional assignment cover pages',
      basePrice: 200,
      unit: 'per cover',
      category: 'students'
    },
    {
      id: 'certificates',
      name: 'Academic Certificates',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Custom academic achievement certificates',
      basePrice: 2500,
      unit: 'per certificate',
      category: 'students'
    },
    {
      id: 'graduation-programs',
      name: 'Graduation Programs',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Graduation ceremony programs and booklets',
      basePrice: 850,
      unit: 'per program',
      category: 'students'
    },

    // Church Services (10)
    {
      id: 'church-bulletins',
      name: 'Church Bulletins',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Weekly church service bulletins',
      basePrice: 180,
      unit: 'per bulletin',
      category: 'church'
    },
    {
      id: 'sermon-booklets',
      name: 'Sermon Booklets',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Compiled sermon booklets and teachings',
      basePrice: 75,
      unit: 'per page',
      category: 'church'
    },
    {
      id: 'church-banners',
      name: 'Church Banners',
      icon: <Megaphone className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Religious event and worship banners',
      basePrice: 6500,
      unit: 'per banner',
      category: 'church'
    },
    {
      id: 'prayer-cards',
      name: 'Prayer Cards',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Memorial and prayer reminder cards',
      basePrice: 350,
      unit: 'per card',
      category: 'church'
    },
    {
      id: 'church-calendars',
      name: 'Church Calendars',
      icon: <Calendar className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Annual church event calendars',
      basePrice: 1800,
      unit: 'per calendar',
      category: 'church'
    },
    {
      id: 'offering-envelopes',
      name: 'Offering Envelopes',
      icon: <Mail className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Custom church offering envelopes',
      basePrice: 85,
      unit: 'per envelope',
      category: 'church'
    },
    {
      id: 'hymn-books',
      name: 'Hymn Books',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Custom church hymn and song books',
      basePrice: 2200,
      unit: 'per book',
      category: 'church'
    },
    {
      id: 'baptism-certificates',
      name: 'Baptism Certificates',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Official baptism certificates',
      basePrice: 1800,
      unit: 'per certificate',
      category: 'church'
    },
    {
      id: 'church-programs',
      name: 'Event Programs',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Church event and conference programs',
      basePrice: 450,
      unit: 'per program',
      category: 'church'
    },
    {
      id: 'membership-cards',
      name: 'Membership Cards',
      icon: <CreditCard className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Church membership identification cards',
      basePrice: 950,
      unit: 'per card',
      category: 'church'
    },

    // Event Planner Services (10)
    {
      id: 'wedding-invitations',
      name: 'Wedding Invitations',
      icon: <Mail className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Elegant wedding invitation cards',
      basePrice: 850,
      unit: 'per invitation',
      category: 'events'
    },
    {
      id: 'event-tickets',
      name: 'Event Tickets',
      icon: <CreditCard className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Custom event admission tickets',
      basePrice: 120,
      unit: 'per ticket',
      category: 'events'
    },
    {
      id: 'table-cards',
      name: 'Table Number Cards',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Event table number and name cards',
      basePrice: 180,
      unit: 'per card',
      category: 'events'
    },
    {
      id: 'menu-cards',
      name: 'Menu Cards',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Restaurant-style event menu cards',
      basePrice: 220,
      unit: 'per menu',
      category: 'events'
    },
    {
      id: 'photo-booth-props',
      name: 'Photo Booth Props',
      icon: <Image className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Custom photo booth signs and props',
      basePrice: 1200,
      unit: 'per prop',
      category: 'events'
    },
    {
      id: 'backdrop-banners',
      name: 'Backdrop Banners',
      icon: <Megaphone className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Large event backdrop banners',
      basePrice: 12000,
      unit: 'per banner',
      category: 'events'
    },
    {
      id: 'program-booklets',
      name: 'Program Booklets',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Event program and schedule booklets',
      basePrice: 680,
      unit: 'per booklet',
      category: 'events'
    },
    {
      id: 'name-tags',
      name: 'Name Tags',
      icon: <CreditCard className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Event attendee name tags and badges',
      basePrice: 150,
      unit: 'per tag',
      category: 'events'
    },
    {
      id: 'thank-you-cards',
      name: 'Thank You Cards',
      icon: <Mail className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Post-event thank you cards',
      basePrice: 280,
      unit: 'per card',
      category: 'events'
    },
    {
      id: 'signage-boards',
      name: 'Directional Signage',
      icon: <Megaphone className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Event directional and information signs',
      basePrice: 3500,
      unit: 'per sign',
      category: 'events'
    },

    // Office Services (10)
    {
      id: 'company-profiles',
      name: 'Company Profiles',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Professional company profile booklets',
      basePrice: 180,
      unit: 'per page',
      category: 'office'
    },
    {
      id: 'presentation-folders',
      name: 'Presentation Folders',
      icon: <Package className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Custom branded presentation folders',
      basePrice: 850,
      unit: 'per folder',
      category: 'office'
    },
    {
      id: 'employee-handbooks',
      name: 'Employee Handbooks',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Company policy and employee handbooks',
      basePrice: 150,
      unit: 'per page',
      category: 'office'
    },
    {
      id: 'corporate-calendars',
      name: 'Corporate Calendars',
      icon: <Calendar className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Branded corporate desk calendars',
      basePrice: 2800,
      unit: 'per calendar',
      category: 'office'
    },
    {
      id: 'annual-reports',
      name: 'Annual Reports',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Professional annual report printing',
      basePrice: 320,
      unit: 'per page',
      category: 'office'
    },
    {
      id: 'invoice-books',
      name: 'Invoice Books',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Custom invoice and receipt books',
      basePrice: 1800,
      unit: 'per book',
      category: 'office'
    },
    {
      id: 'office-stationery',
      name: 'Office Stationery',
      icon: <Package className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Complete branded office stationery sets',
      basePrice: 450,
      unit: 'per item',
      category: 'office'
    },
    {
      id: 'training-manuals',
      name: 'Training Manuals',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Employee training and procedure manuals',
      basePrice: 185,
      unit: 'per page',
      category: 'office'
    },
    {
      id: 'office-forms',
      name: 'Custom Forms',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'NCR forms and custom office documents',
      basePrice: 95,
      unit: 'per form',
      category: 'office'
    },
    {
      id: 'id-badges',
      name: 'Employee ID Badges',
      icon: <CreditCard className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Professional employee identification badges',
      basePrice: 1200,
      unit: 'per badge',
      category: 'office'
    }
  ];

  const steps = [
    { number: 1, title: 'Service Selection', description: 'Choose your printing service' },
    { number: 2, title: 'Specifications', description: 'Select size, paper & finishing' },
    { number: 3, title: 'Design Options', description: 'Choose design assistance' },
    { number: 4, title: 'Upload Files', description: 'Upload your design files' },
    { number: 5, title: 'Quantity & Print', description: 'Set quantity & print type' },
    { number: 6, title: 'Delivery Options', description: 'Choose delivery method' },
    { number: 7, title: 'Customer Details', description: 'Provide your information' },
    { number: 8, title: 'Payment Method', description: 'Select payment option' },
    { number: 9, title: 'Review Order', description: 'Review all details' },
    { number: 10, title: 'Submit Order', description: 'Confirm and place order' }
  ];

  const handleServiceSelect = (serviceId: string) => {
    setOrderData({ ...orderData, service: serviceId });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setOrderData({ ...orderData, files });
  };

  const calculateEstimate = () => {
    const service = services.find(s => s.id === orderData.service);
    if (!service || !orderData.quantity || service.basePrice === 0) return 0;
    
    const quantity = parseInt(orderData.quantity);
    let baseTotal = service.basePrice * quantity;
    
    // Add color printing surcharge
    if (orderData.printType === 'color') {
      baseTotal *= 1.5;
    }
    
    // Finishing surcharges
    if (orderData.specifications.finishing === 'lamination') baseTotal *= 1.2;
    if (orderData.specifications.finishing === 'embossing') baseTotal *= 1.8;
    if (orderData.specifications.coating === 'uv') baseTotal *= 1.3;
    
    // Volume discounts
    if (quantity >= 1000) baseTotal *= 0.95;
    if (quantity >= 10000) baseTotal *= 0.9;
    if (quantity >= 50000) baseTotal *= 0.85;
    
    // Express delivery surcharge
    if (orderData.deliveryOption === 'express') baseTotal += 5000;
    
    return Math.round(baseTotal);
  };

  const nextStep = () => {
    if (currentStep < 10) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const submitOrder = () => {
    alert('Order submitted successfully! You will receive a confirmation email shortly.');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return orderData.service !== '';
      case 2:
        return orderData.specifications.size !== '' && orderData.specifications.paperType !== '';
      case 3:
        return orderData.designOption !== '';
      case 4:
        return orderData.files.length > 0;
      case 5:
        return orderData.quantity !== '' && orderData.printType !== '';
      case 6:
        return orderData.deliveryOption !== '';
      case 7:
        return orderData.customerInfo.name !== '' && orderData.customerInfo.email !== '' && orderData.customerInfo.phone !== '';
      case 8:
        return orderData.paymentMethod !== '';
      default:
        return true;
    }
  };

  const servicesByCategory = {
    original: services.filter(s => s.category === 'original'),
    students: services.filter(s => s.category === 'students'),
    church: services.filter(s => s.category === 'church'),
    events: services.filter(s => s.category === 'events'),
    office: services.filter(s => s.category === 'office')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <section className="bg-white shadow-lg py-6 sm:py-8 lg:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              CloudPrint Order Flow
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              Professional printing services delivered to your door in 24-48 hours. Choose from our comprehensive range of services for students, churches, events, and offices.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-4 sm:py-6 lg:py-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto pb-4 gap-2">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center min-w-0 flex-shrink-0">
                <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.number 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white shadow-lg' 
                    : 'border-gray-300 text-gray-500 bg-white'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  ) : (
                    <span className="font-semibold text-xs sm:text-sm lg:text-base">{step.number}</span>
                  )}
                </div>
                <div className="ml-2 sm:ml-3 hidden md:block">
                  <p className={`text-sm sm:text-base font-medium ${
                    currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 hidden lg:block">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-6 sm:w-12 lg:w-16 h-1 ml-2 sm:ml-3 rounded transition-all duration-300 ${
                    currentStep > step.number ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-white/20">
            
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Select Your Service</h2>
                  <p className="text-gray-600">Choose from our comprehensive range of printing services</p>
                </div>
                
                {/* Original Services */}
                <div className="space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 border-b-2 border-blue-200 pb-2">Popular Services</h3>
                  <a className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6" href='#link'>
                    {servicesByCategory.original.map(service => (
                      <div 
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        className={`group p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          orderData.service === service.id
                            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg'
                            : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-md'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-3 text-center">
                          <div className={`p-3 rounded-lg transition-all duration-300 ${
                            orderData.service === service.id 
                              ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600' 
                              : 'bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-500'
                          }`}>
                            {service.icon}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">{service.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                            <p className="text-sm text-blue-600 font-semibold">
                              {service.basePrice > 0 
                                ? `From ₦${service.basePrice.toLocaleString()} / ${service.unit}`
                                : service.unit
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </a>
                </div>

                {/* Student Services */}
                <div className="space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-green-700 border-b-2 border-green-200 pb-2">
                    📚 Student Services
                  </h3>
                  <a className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6" href='#link'>
                    {servicesByCategory.students.map(service => (
                      <div 
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        className={`group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          orderData.service === service.id
                            ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg'
                            : 'border-green-200 hover:border-green-400 bg-white hover:shadow-md'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2 text-center">
                          <div className={`p-2 rounded-lg transition-all duration-300 ${
                            orderData.service === service.id 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-green-50 text-green-600 group-hover:bg-green-100'
                          }`}>
                            {service.icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">{service.name}</h4>
                            <p className="text-xs text-gray-600 mb-1">{service.description}</p>
                            <p className="text-xs text-green-600 font-semibold">
                              ₦{service.basePrice.toLocaleString()} / {service.unit}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </a>
                </div>

                {/* Church Services */}
                <div className="space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-purple-700 border-b-2 border-purple-200 pb-2">
                    ⛪ Church Services
                  </h3>
                  <a className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6" href='#link'>
                    {servicesByCategory.church.map(service => (
                      <div 
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        className={`group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          orderData.service === service.id
                            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-lg'
                            : 'border-purple-200 hover:border-purple-400 bg-white hover:shadow-md'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2 text-center">
                          <div className={`p-2 rounded-lg transition-all duration-300 ${
                            orderData.service === service.id 
                              ? 'bg-purple-100 text-purple-600' 
                              : 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'
                          }`}>
                            {service.icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">{service.name}</h4>
                            <p className="text-xs text-gray-600 mb-1">{service.description}</p>
                            <p className="text-xs text-purple-600 font-semibold">
                              ₦{service.basePrice.toLocaleString()} / {service.unit}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </a>
                </div>

                {/* Event Planner Services */}
                <div className="space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-pink-700 border-b-2 border-pink-200 pb-2">
                    🎉 Event Planning Services
                  </h3>
                  <a className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6" href='#link'>
                    {servicesByCategory.events.map(service => (
                      <div 
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        className={`group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          orderData.service === service.id
                            ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 shadow-lg'
                            : 'border-pink-200 hover:border-pink-400 bg-white hover:shadow-md'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2 text-center">
                          <div className={`p-2 rounded-lg transition-all duration-300 ${
                            orderData.service === service.id 
                              ? 'bg-pink-100 text-pink-600' 
                              : 'bg-pink-50 text-pink-600 group-hover:bg-pink-100'
                          }`}>
                            {service.icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">{service.name}</h4>
                            <p className="text-xs text-gray-600 mb-1">{service.description}</p>
                            <p className="text-xs text-pink-600 font-semibold">
                              ₦{service.basePrice.toLocaleString()} / {service.unit}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </a>
                </div>

                {/* Office Services */}
                <div className="space-y-6" id='link'>
                  <h3 className="text-xl sm:text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2">
                    🏢 Office Services
                  </h3>
                  <a className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
                    {servicesByCategory.office.map(service => (
                      <div 
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        className={`group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          orderData.service === service.id
                            ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 shadow-lg'
                            : 'border-indigo-200 hover:border-indigo-400 bg-white hover:shadow-md'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2 text-center">
                          <div className={`p-2 rounded-lg transition-all duration-300 ${
                            orderData.service === service.id 
                              ? 'bg-indigo-100 text-indigo-600' 
                              : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'
                          }`}>
                            {service.icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">{service.name}</h4>
                            <p className="text-xs text-gray-600 mb-1">{service.description}</p>
                            <p className="text-xs text-indigo-600 font-semibold">
                              ₦{service.basePrice.toLocaleString()} / {service.unit}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </a>
                </div>
              </div>
            )}

            {/* Step 2: Specifications */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Product Specifications</h2>
                  <p className="text-gray-600">Customize your printing preferences</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Size *</label>
                    <select
                      value={orderData.specifications.size}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        specifications: { ...orderData.specifications, size: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    >
                      <option value="">Select size</option>
                      <option value="a4">A4 (210 × 297 mm)</option>
                      <option value="a3">A3 (297 × 420 mm)</option>
                      <option value="a5">A5 (148 × 210 mm)</option>
                      <option value="letter">Letter (8.5 × 11 in)</option>
                      <option value="business-card">Business Card (85 × 55 mm)</option>
                      <option value="custom">Custom Size</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Paper Type *</label>
                    <select
                      value={orderData.specifications.paperType}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        specifications: { ...orderData.specifications, paperType: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    >
                      <option value="">Select paper type</option>
                      <option value="standard">Standard (80gsm)</option>
                      <option value="premium">Premium (120gsm)</option>
                      <option value="cardstock">Cardstock (250gsm)</option>
                      <option value="glossy">Glossy Photo Paper</option>
                      <option value="matte">Matte Photo Paper</option>
                      <option value="recycled">Recycled Paper</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Finishing</label>
                    <select
                      value={orderData.specifications.finishing}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        specifications: { ...orderData.specifications, finishing: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    >
                      <option value="">No finishing</option>
                      <option value="lamination">Lamination (+20%)</option>
                      <option value="embossing">Embossing (+80%)</option>
                      <option value="die-cutting">Die Cutting</option>
                      <option value="foil-stamping">Foil Stamping</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Binding</label>
                    <select
                      value={orderData.specifications.binding}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        specifications: { ...orderData.specifications, binding: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    >
                      <option value="">No binding</option>
                      <option value="saddle-stitch">Saddle Stitch</option>
                      <option value="perfect-bound">Perfect Bound</option>
                      <option value="spiral">Spiral Binding</option>
                      <option value="wire-o">Wire-O Binding</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Coating</label>
                    <select
                      value={orderData.specifications.coating}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        specifications: { ...orderData.specifications, coating: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    >
                      <option value="">No coating</option>
                      <option value="gloss">Gloss Coating</option>
                      <option value="matte">Matte Coating</option>
                      <option value="uv">UV Coating (+30%)</option>
                      <option value="aqueous">Aqueous Coating</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ... keep existing code (steps 3-10 remain the same) */}
            {/* Step 3: Design Options */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Design Options</h2>
                  <p className="text-gray-600">How would you like to handle your design?</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div 
                    onClick={() => setOrderData({ ...orderData, designOption: 'upload-ready' })}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      orderData.designOption === 'upload-ready'
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <div className="p-4 rounded-lg bg-blue-100 text-blue-600 mx-auto w-fit mb-4">
                        <Upload className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">Upload Ready Design</h3>
                      <p className="text-sm text-gray-600">I have my design files ready to upload</p>
                    </div>
                  </div>
                  
                  <div 
                    onClick={() => setOrderData({ ...orderData, designOption: 'template' })}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      orderData.designOption === 'template'
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <div className="p-4 rounded-lg bg-blue-100 text-blue-600 mx-auto w-fit mb-4">
                        <Image className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">Use Template</h3>
                      <p className="text-sm text-gray-600">Choose from our professional templates</p>
                    </div>
                  </div>
                  
                  <div 
                    onClick={() => setOrderData({ ...orderData, designOption: 'design-service' })}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      orderData.designOption === 'design-service'
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <div className="p-4 rounded-lg bg-blue-100 text-blue-600 mx-auto w-fit mb-4">
                        <Users className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">Design Service</h3>
                      <p className="text-sm text-gray-600">Get professional design assistance (+₦15,000)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: File Upload */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Upload Your Files</h2>
                  <p className="text-gray-600">Share your design files with us</p>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 lg:p-12 text-center hover:border-blue-400 transition-all duration-300 bg-gradient-to-br from-gray-50 to-blue-50">
                  <div className="p-4 rounded-lg bg-blue-100 text-blue-600 mx-auto w-fit mb-6">
                    <Upload className="h-12 w-12" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-medium text-gray-900 mb-3">Upload Design Files</h3>
                  <p className="text-gray-600 mb-6">
                    Drag and drop your files here, or click to browse
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.jpg,.jpeg,.png,.ai,.psd,.eps"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer inline-block transform hover:scale-105"
                  >
                    Choose Files
                  </label>
                  <p className="text-sm text-gray-500 mt-4">
                    Supported formats: PDF, JPG, PNG, AI, PSD, EPS (Max 50MB per file)
                  </p>
                </div>

                {orderData.files.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 text-lg">Uploaded Files:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {orderData.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                          <span className="text-sm text-gray-700 truncate flex-1">{file.name}</span>
                          <span className="text-sm text-gray-500 ml-3 font-medium">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Quantity & Print Type */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Quantity & Print Type</h2>
                  <p className="text-gray-600">Specify your printing requirements</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Print Type *</label>
                    <select
                      value={orderData.printType}
                      onChange={(e) => setOrderData({ ...orderData, printType: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select print type</option>
                      <option value="bw">Black & White</option>
                      <option value="color">Color (+50%)</option>
                      <option value="spot-color">Spot Color</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Quantity *</label>
                    <input
                      type="number"
                      value={orderData.quantity}
                      onChange={(e) => setOrderData({ ...orderData, quantity: e.target.value })}
                      placeholder="Enter quantity"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Sides</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                      <option value="single">Single-sided</option>
                      <option value="double">Double-sided (+30%)</option>
                    </select>
                  </div>
                </div>

                {orderData.quantity && orderData.printType && calculateEstimate() > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-gray-700 text-lg">Estimated Total:</span>
                      <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ₦{calculateEstimate().toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Final price will be confirmed after file review
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 6: Delivery Options */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Delivery Options</h2>
                  <p className="text-gray-600">Choose how you'd like to receive your order</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div 
                    onClick={() => setOrderData({ ...orderData, deliveryOption: 'standard' })}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      orderData.deliveryOption === 'standard'
                        ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg'
                        : 'border-gray-200 hover:border-green-300 bg-white hover:shadow-md'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Standard Delivery</h3>
                    <p className="text-gray-600 mb-3">24-48 hours</p>
                    <p className="text-2xl font-bold text-green-600">Free</p>
                    <p className="text-sm text-gray-500 mt-2">Within Lagos only</p>
                  </div>
                  
                  <div 
                    onClick={() => setOrderData({ ...orderData, deliveryOption: 'express' })}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      orderData.deliveryOption === 'express'
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-md'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Express Delivery</h3>
                    <p className="text-gray-600 mb-3">Same day</p>
                    <p className="text-2xl font-bold text-blue-600">₦5,000</p>
                    <p className="text-sm text-gray-500 mt-2">Within Lagos</p>
                  </div>
                  
                  <div 
                    onClick={() => setOrderData({ ...orderData, deliveryOption: 'pickup' })}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      orderData.deliveryOption === 'pickup'
                        ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-lg'
                        : 'border-gray-200 hover:border-orange-300 bg-white hover:shadow-md'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Self Pickup</h3>
                    <p className="text-gray-600 mb-3">12-24 hours</p>
                    <p className="text-2xl font-bold text-green-600">Free</p>
                    <p className="text-sm text-gray-500 mt-2">From our office</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Customer Details */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Customer Information</h2>
                  <p className="text-gray-600">Tell us how to reach you</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      value={orderData.customerInfo.name}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, name: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                    <input
                      type="email"
                      value={orderData.customerInfo.email}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, email: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                    <input
                      type="tel"
                      value={orderData.customerInfo.phone}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, phone: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Company (Optional)</label>
                    <input
                      type="text"
                      value={orderData.customerInfo.company}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, company: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Company name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">City *</label>
                    <input
                      type="text"
                      value={orderData.customerInfo.city}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, city: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="City"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">State *</label>
                    <select
                      value={orderData.customerInfo.state}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, state: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select state</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja</option>
                      <option value="Kano">Kano</option>
                      <option value="Rivers">Rivers</option>
                      <option value="Oyo">Oyo</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Delivery Address *</label>
                  <textarea
                    value={orderData.customerInfo.address}
                    onChange={(e) => setOrderData({
                      ...orderData,
                      customerInfo: { ...orderData.customerInfo, address: e.target.value }
                    })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter complete delivery address"
                  />
                </div>
              </div>
            )}

            {/* Step 8: Payment Method */}
            {currentStep === 8 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Payment Method</h2>
                  <p className="text-gray-600">Choose your preferred payment option</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div 
                    onClick={() => setOrderData({ ...orderData, paymentMethod: 'bank-transfer' })}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      orderData.paymentMethod === 'bank-transfer'
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <div className="p-4 rounded-lg bg-blue-100 text-blue-600 mx-auto w-fit mb-4">
                        <CreditCard className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">Bank Transfer</h3>
                      <p className="text-sm text-gray-600">Direct bank transfer payment</p>
                    </div>
                  </div>
                  
                  <div 
                    onClick={() => setOrderData({ ...orderData, paymentMethod: 'card' })}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      orderData.paymentMethod === 'card'
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <div className="p-4 rounded-lg bg-blue-100 text-blue-600 mx-auto w-fit mb-4">
                        <CreditCard className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">Credit/Debit Card</h3>
                      <p className="text-sm text-gray-600">Pay with your card online</p>
                    </div>
                  </div>
                  
                  <div 
                    onClick={() => setOrderData({ ...orderData, paymentMethod: 'cash' })}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      orderData.paymentMethod === 'cash'
                        ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg'
                        : 'border-gray-200 hover:border-green-300 bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <div className="p-4 rounded-lg bg-green-100 text-green-600 mx-auto w-fit mb-4">
                        <Package className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">Cash on Delivery</h3>
                      <p className="text-sm text-gray-600">Pay when you receive your order</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 9: Review Order */}
            {currentStep === 9 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Review Your Order</h2>
                  <p className="text-gray-600">Please review all details before proceeding</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 lg:p-8 space-y-6 border border-blue-200">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4 text-lg">Service Details</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span>Service:</span>
                          <span className="font-medium">
                            {services.find(s => s.id === orderData.service)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Size:</span>
                          <span className="font-medium">{orderData.specifications.size}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Paper:</span>
                          <span className="font-medium">{orderData.specifications.paperType}</span>
                        </div>
                        {orderData.printType && (
                          <div className="flex justify-between items-center">
                            <span>Print Type:</span>
                            <span className="font-medium capitalize">{orderData.printType}</span>
                          </div>
                        )}
                        {orderData.quantity && (
                          <div className="flex justify-between items-center">
                            <span>Quantity:</span>
                            <span className="font-medium">{orderData.quantity}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4 text-lg">Customer Details</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span>Name:</span>
                          <span className="font-medium">{orderData.customerInfo.name}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span>Email:</span>
                          <span className="font-medium text-right break-all max-w-[60%]">{orderData.customerInfo.email}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Phone:</span>
                          <span className="font-medium">{orderData.customerInfo.phone}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Delivery:</span>
                          <span className="font-medium capitalize">{orderData.deliveryOption}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Payment:</span>
                          <span className="font-medium capitalize">{orderData.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {calculateEstimate() > 0 && (
                    <div className="border-t border-blue-200 pt-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <span className="text-lg lg:text-xl font-semibold">Estimated Total:</span>
                        <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ₦{calculateEstimate().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Special Instructions (Optional)</label>
                  <textarea
                    value={orderData.specialInstructions}
                    onChange={(e) => setOrderData({ ...orderData, specialInstructions: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Any special requirements or instructions..."
                  />
                </div>
              </div>
            )}

            {/* Step 10: Submit Order */}
            {currentStep === 10 && (
              <div className="space-y-8 text-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Submit Your Order</h2>
                  <p className="text-gray-600">You're ready to place your order!</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8">
                  <div className="p-4 rounded-lg bg-green-100 text-green-600 mx-auto w-fit mb-6">
                    <CheckCircle className="h-16 w-16" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-green-800 mb-3">Ready to Submit!</h3>
                  <p className="text-green-700 mb-6">
                    Please review all details before submitting your order.
                  </p>
                  
                  <div className="bg-white rounded-xl p-6 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">What happens next?</h4>
                    <ul className="text-sm text-gray-700 space-y-3 text-left max-w-md mx-auto">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        We'll review your files and contact you for approval within 2 hours
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        You'll receive a confirmation email with order details
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        Payment is required before printing begins
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        Delivery within your selected timeframe after approval
                      </li>
                    </ul>
                  </div>
                  
                  <button
                    onClick={submitOrder}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-lg transform hover:scale-105"
                  >
                    Submit Order Now
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between pt-8 border-t space-y-4 sm:space-y-0">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
                }`}
              >
                Previous
              </button>
              
              <div className="text-center order-first sm:order-none">
                <p className="text-sm text-gray-500">
                  Step {currentStep} of {steps.length}
                </p>
              </div>

              {currentStep < 10 ? (
                <button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    !isStepValid()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  Next Step
                </button>
              ) : (
                <div className="w-24"></div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">Need Help with Your Order?</h2>
            <p className="text-blue-100 text-lg">Our team is here to assist you every step of the way</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm mx-auto w-fit">
                <Phone className="h-8 w-8 text-blue-200" />
              </div>
              <h3 className="font-semibold text-lg">Call Us</h3>
              <p className="text-blue-100">+234-800-CLOUD-PRINT</p>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm mx-auto w-fit">
                <Mail className="h-8 w-8 text-blue-200" />
              </div>
              <h3 className="font-semibold text-lg">Email Us</h3>
              <p className="text-blue-100">orders@cloudprint.dev</p>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm mx-auto w-fit">
                <Calendar className="h-8 w-8 text-blue-200" />
              </div>
              <h3 className="font-semibold text-lg">Support Hours</h3>
              <p className="text-blue-100">Mon-Fri: 8AM-6PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderPage;



// import React, { useState } from 'react';
// import PaymentProcessor from '../components/PaymentProsessor';
// import { 
//   Upload, 
//   FileText, 
//   CreditCard, 
//   Image, 
//   Megaphone, 
//   Package,
//   CheckCircle,
//   AlertCircle,
//   Phone,
//   Mail,
//   MapPin,
//   Calendar,
//   DollarSign
// } from 'lucide-react';

// const OrderPage = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showPayment, setShowPayment] = useState(false);
//   const [orderSubmitted, setOrderSubmitted] = useState(false);
//   const [orderData, setOrderData] = useState({
//     service: '',
//     printType: '',
//     quantity: '',
//     files: [],
//     customerInfo: {
//       name: '',
//       email: '',
//       phone: '',
//       company: '',
//       address: '',
//       city: '',
//       state: ''
//     },
//     deliveryOption: '',
//     paymentMethod: '',
//     specialInstructions: ''
//   });

//   const services = [
//     {
//       id: 'business-cards',
//       name: 'Business Cards',
//       icon: <CreditCard className="h-8 w-8" />,
//       description: 'Professional business cards',
//       basePrice: 15000,
//       unit: '500 cards'
//     },
//     {
//       id: 'documents',
//       name: 'Document Printing',
//       icon: <FileText className="h-8 w-8" />,
//       description: 'Reports, presentations, documents',
//       basePrice: 50,
//       unit: 'per page'
//     },
//     {
//       id: 'flyers',
//       name: 'Flyers & Brochures',
//       icon: <Image className="h-8 w-8" />,
//       description: 'Marketing materials',
//       basePrice: 200,
//       unit: 'per piece'
//     },
//     {
//       id: 'banners',
//       name: 'Banners & Posters',
//       icon: <Megaphone className="h-8 w-8" />,
//       description: 'Large format printing',
//       basePrice: 5000,
//       unit: 'per sqm'
//     },
//     {
//       id: 'merchandise',
//       name: 'Merchandise',
//       icon: <Package className="h-8 w-8" />,
//       description: 'Custom branded items',
//       basePrice: 2500,
//       unit: 'per item'
//     }
//   ];

//   const steps = [
//     { number: 1, title: 'Service Selection', description: 'Choose your printing service' },
//     { number: 2, title: 'Upload Files', description: 'Upload your design files' },
//     { number: 3, title: 'Customer Details', description: 'Provide your information' },
//     { number: 4, title: 'Review & Submit', description: 'Review and place order' }
//   ];

//   const handleServiceSelect = (serviceId: string) => {
//     setOrderData({ ...orderData, service: serviceId });
//   };

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || []);
//     setOrderData({ ...orderData, files });
//   };

//   const calculateEstimate = () => {
//     const service = services.find(s => s.id === orderData.service);
//     if (!service || !orderData.quantity) return 0;
    
//     const quantity = parseInt(orderData.quantity);
//     let baseTotal = service.basePrice * quantity;
    
//     // Add color printing surcharge
//     if (orderData.printType === 'color') {
//       baseTotal *= 1.5;
//     }
    
//     // Volume discounts
//     if (quantity >= 1000) baseTotal *= 0.95;
//     if (quantity >= 10000) baseTotal *= 0.9;
//     if (quantity >= 50000) baseTotal *= 0.85;
    
//     return Math.round(baseTotal);
//   };

//   const nextStep = () => {
//     if (currentStep < 4) setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     if (currentStep > 1) setCurrentStep(currentStep - 1);
//   };

//   const submitOrder = () => {
//     // Show payment processor instead of alert
//     setShowPayment(true);
//   };

//   const handlePaymentSuccess = (paymentData: any) => {
//     setShowPayment(false);
//     setOrderSubmitted(true);
    
//     // Store order in localStorage (in production, this would be sent to backend)
//     const order = {
//       id: `ORD-${Date.now()}`,
//       orderNumber: `ORD-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
//       date: new Date().toISOString(),
//       status: 'pending',
//       items: [{
//         name: services.find(s => s.id === orderData.service)?.name || 'Custom Order',
//         quantity: parseInt(orderData.quantity),
//         price: calculateEstimate()
//       }],
//       total: calculateEstimate(),
//       deliveryAddress: orderData.customerInfo.address,
//       customerInfo: orderData.customerInfo,
//       paymentData: paymentData,
//       estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days from now
//     };

//     // Save to localStorage
//     const existingOrders = JSON.parse(localStorage.getItem('cloudprint-orders') || '[]');
//     existingOrders.push(order);
//     localStorage.setItem('cloudprint-orders', JSON.stringify(existingOrders));
//   };

//   const handlePaymentError = (error: string) => {
//     alert(`Payment failed: ${error}. Please try again.`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <section className="bg-white shadow-sm py-8">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Place Your Order</h1>
//           <p className="text-gray-600">Get professional printing delivered to your door in 24-48 hours</p>
//         </div>
//       </section>

//       {/* Progress Steps */}
//       <section className="py-8">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             {steps.map((step, index) => (
//               <div key={step.number} className="flex items-center">
//                 <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
//                   currentStep >= step.number 
//                     ? 'bg-blue-600 border-blue-600 text-white' 
//                     : 'border-gray-300 text-gray-500'
//                 }`}>
//                   {currentStep > step.number ? (
//                     <CheckCircle className="h-6 w-6" />
//                   ) : (
//                     <span className="font-semibold">{step.number}</span>
//                   )}
//                 </div>
//                 <div className="ml-3 hidden sm:block">
//                   <p className={`text-sm font-medium ${
//                     currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
//                   }`}>
//                     {step.title}
//                   </p>
//                   <p className="text-xs text-gray-500">{step.description}</p>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className={`w-16 h-0.5 ml-4 ${
//                     currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
//                   }`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Order Form */}
//       <section className="py-8">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white rounded-xl shadow-lg p-8">
            
//             {/* Step 1: Service Selection */}
//             {currentStep === 1 && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Service</h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {services.map(service => (
//                     <div 
//                       key={service.id}
//                       onClick={() => handleServiceSelect(service.id)}
//                       className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
//                         orderData.service === service.id
//                           ? 'border-blue-500 bg-blue-50'
//                           : 'border-gray-200 hover:border-blue-300'
//                       }`}
//                     >
//                       <div className="flex items-center space-x-4">
//                         <div className={`p-3 rounded-lg ${
//                           orderData.service === service.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
//                         }`}>
//                           {service.icon}
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
//                           <p className="text-gray-600 text-sm">{service.description}</p>
//                           <p className="text-blue-600 font-semibold mt-1">
//                             From ₦{service.basePrice.toLocaleString()} / {service.unit}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {orderData.service && (
//                   <div className="space-y-4 pt-6 border-t">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Print Type
//                         </label>
//                         <select
//                           value={orderData.printType}
//                           onChange={(e) => setOrderData({ ...orderData, printType: e.target.value })}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         >
//                           <option value="">Select print type</option>
//                           <option value="bw">Black & White</option>
//                           <option value="color">Color</option>
//                         </select>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Quantity
//                         </label>
//                         <input
//                           type="number"
//                           value={orderData.quantity}
//                           onChange={(e) => setOrderData({ ...orderData, quantity: e.target.value })}
//                           placeholder="Enter quantity"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                       </div>
//                     </div>

//                     {orderData.quantity && orderData.printType && (
//                       <div className="bg-blue-50 p-4 rounded-lg">
//                         <div className="flex items-center justify-between">
//                           <span className="text-gray-700">Estimated Total:</span>
//                           <span className="text-2xl font-bold text-blue-600">
//                             ₦{calculateEstimate().toLocaleString()}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-600 mt-1">
//                           Final price will be confirmed after file review
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Step 2: File Upload */}
//             {currentStep === 2 && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Your Files</h2>
                
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
//                   <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Design Files</h3>
//                   <p className="text-gray-600 mb-4">
//                     Drag and drop your files here, or click to browse
//                   </p>
//                   <input
//                     type="file"
//                     multiple
//                     onChange={handleFileUpload}
//                     className="hidden"
//                     id="file-upload"
//                     accept=".pdf,.jpg,.jpeg,.png,.ai,.psd,.eps"
//                   />
//                   <label
//                     htmlFor="file-upload"
//                     className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer inline-block"
//                   >
//                     Choose Files
//                   </label>
//                   <p className="text-sm text-gray-500 mt-2">
//                     Supported formats: PDF, JPG, PNG, AI, PSD, EPS (Max 50MB per file)
//                   </p>
//                 </div>

//                 {orderData.files.length > 0 && (
//                   <div className="space-y-2">
//                     <h4 className="font-medium text-gray-900">Uploaded Files:</h4>
//                     {orderData.files.map((file, index) => (
//                       <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm text-gray-700">{file.name}</span>
//                         <span className="text-sm text-gray-500">
//                           {(file.size / 1024 / 1024).toFixed(2)} MB
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                   <div className="flex items-start">
//                     <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
//                     <div>
//                       <h4 className="text-sm font-medium text-yellow-800">Important Notes:</h4>
//                       <ul className="text-sm text-yellow-700 mt-1 space-y-1">
//                         <li>• All files will be reviewed before printing</li>
//                         <li>• You'll receive approval confirmation via email/call</li>
//                         <li>• High-resolution files ensure best print quality</li>
//                         <li>• Include bleed areas for full-coverage designs</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 3: Customer Details */}
//             {currentStep === 3 && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Information</h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       value={orderData.customerInfo.name}
//                       onChange={(e) => setOrderData({
//                         ...orderData,
//                         customerInfo: { ...orderData.customerInfo, name: e.target.value }
//                       })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Enter your full name"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       value={orderData.customerInfo.email}
//                       onChange={(e) => setOrderData({
//                         ...orderData,
//                         customerInfo: { ...orderData.customerInfo, email: e.target.value }
//                       })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Enter your email"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number *
//                     </label>
//                     <input
//                       type="tel"
//                       value={orderData.customerInfo.phone}
//                       onChange={(e) => setOrderData({
//                         ...orderData,
//                         customerInfo: { ...orderData.customerInfo, phone: e.target.value }
//                       })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="+234 xxx xxx xxxx"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Company (Optional)
//                     </label>
//                     <input
//                       type="text"
//                       value={orderData.customerInfo.company}
//                       onChange={(e) => setOrderData({
//                         ...orderData,
//                         customerInfo: { ...orderData.customerInfo, company: e.target.value }
//                       })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Company name"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Delivery Address *
//                   </label>
//                   <textarea
//                     value={orderData.customerInfo.address}
//                     onChange={(e) => setOrderData({
//                       ...orderData,
//                       customerInfo: { ...orderData.customerInfo, address: e.target.value }
//                     })}
//                     rows={3}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Enter complete delivery address"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       City *
//                     </label>
//                     <input
//                       type="text"
//                       value={orderData.customerInfo.city}
//                       onChange={(e) => setOrderData({
//                         ...orderData,
//                         customerInfo: { ...orderData.customerInfo, city: e.target.value }
//                       })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="City"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       State *
//                     </label>
//                     <select
//                       value={orderData.customerInfo.state}
//                       onChange={(e) => setOrderData({
//                         ...orderData,
//                         customerInfo: { ...orderData.customerInfo, state: e.target.value }
//                       })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="">Select state</option>
//                       <option value="Lagos">Lagos</option>
//                       <option value="Abuja">Abuja</option>
//                       <option value="Kano">Kano</option>
//                       <option value="Rivers">Rivers</option>
//                       <option value="Oyo">Oyo</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Delivery Option
//                   </label>
//                   <div className="space-y-3">
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="delivery"
//                         value="standard"
//                         checked={orderData.deliveryOption === 'standard'}
//                         onChange={(e) => setOrderData({ ...orderData, deliveryOption: e.target.value })}
//                         className="mr-3"
//                       />
//                       <span>Standard Delivery (24-48 hours) - Free within Lagos</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input
//                         type="radio"
//                         name="delivery"
//                         value="express"
//                         checked={orderData.deliveryOption === 'express'}
//                         onChange={(e) => setOrderData({ ...orderData, deliveryOption: e.target.value })}
//                         className="mr-3"
//                       />
//                       <span>Express Delivery (Same day) - ₦5,000 extra</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 4: Review & Submit */}
//             {currentStep === 4 && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                
//                 <div className="bg-gray-50 rounded-lg p-6 space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <h3 className="font-semibold text-gray-900 mb-3">Service Details</h3>
//                       <div className="space-y-2 text-sm">
//                         <div className="flex justify-between">
//                           <span>Service:</span>
//                           <span className="font-medium">
//                             {services.find(s => s.id === orderData.service)?.name}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span>Print Type:</span>
//                           <span className="font-medium capitalize">{orderData.printType}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span>Quantity:</span>
//                           <span className="font-medium">{orderData.quantity}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span>Files:</span>
//                           <span className="font-medium">{orderData.files.length} file(s)</span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <h3 className="font-semibold text-gray-900 mb-3">Customer Details</h3>
//                       <div className="space-y-2 text-sm">
//                         <div className="flex justify-between">
//                           <span>Name:</span>
//                           <span className="font-medium">{orderData.customerInfo.name}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span>Email:</span>
//                           <span className="font-medium">{orderData.customerInfo.email}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span>Phone:</span>
//                           <span className="font-medium">{orderData.customerInfo.phone}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span>Delivery:</span>
//                           <span className="font-medium capitalize">{orderData.deliveryOption}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="border-t pt-4">
//                     <div className="flex justify-between items-center">
//                       <span className="text-lg font-semibold">Estimated Total:</span>
//                       <span className="text-2xl font-bold text-blue-600">
//                         ₦{calculateEstimate().toLocaleString()}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-600 mt-1">
//                       Final price will be confirmed after file review and approval
//                     </p>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Special Instructions (Optional)
//                   </label>
//                   <textarea
//                     value={orderData.specialInstructions}
//                     onChange={(e) => setOrderData({ ...orderData, specialInstructions: e.target.value })}
//                     rows={3}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Any special requirements or instructions..."
//                   />
//                 </div>

//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <div className="flex items-start">
//                     <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
//                     <div>
//                       <h4 className="text-sm font-medium text-blue-800">What happens next?</h4>
//                       <ul className="text-sm text-blue-700 mt-1 space-y-1">
//                         <li>• We'll review your files and contact you for approval</li>
//                         <li>• You'll receive a call or email within 2 hours</li>
//                         <li>• Payment is required before printing begins</li>
//                         <li>• Delivery within 24-48 hours after approval</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Navigation Buttons */}
//             <div className="flex justify-between pt-8 border-t">
//               <button
//                 onClick={prevStep}
//                 disabled={currentStep === 1}
//                 className={`px-6 py-3 rounded-lg font-semibold ${
//                   currentStep === 1
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 Previous
//               </button>
              
//               {currentStep < 4 ? (
//                 <button
//                   onClick={nextStep}
//                   disabled={
//                     (currentStep === 1 && (!orderData.service || !orderData.printType || !orderData.quantity)) ||
//                     (currentStep === 2 && orderData.files.length === 0) ||
//                     (currentStep === 3 && (!orderData.customerInfo.name || !orderData.customerInfo.email || !orderData.customerInfo.phone))
//                   }
//                   className={`px-6 py-3 rounded-lg font-semibold ${
//                     (currentStep === 1 && (!orderData.service || !orderData.printType || !orderData.quantity)) ||
//                     (currentStep === 2 && orderData.files.length === 0) ||
//                     (currentStep === 3 && (!orderData.customerInfo.name || !orderData.customerInfo.email || !orderData.customerInfo.phone))
//                       ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       : 'bg-blue-600 text-white hover:bg-blue-700'
//                   }`}
//                 >
//                   Next Step
//                 </button>
//               ) : (
//                 !orderSubmitted ? (
//                 <button
//                   onClick={submitOrder}
//                   className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
//                 >
//                   Submit Order
//                 </button>
//                 ) : (
//                   <div className="text-center py-8">
//                     <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
//                     <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Submitted Successfully!</h3>
//                     <p className="text-gray-600 mb-6">
//                       Thank you for your order. You'll receive a confirmation email shortly with tracking details.
//                     </p>
//                     <div className="flex space-x-4 justify-center">
//                       <button
//                         onClick={() => window.location.href = '/orders'}
//                         className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//                       >
//                         View My Orders
//                       </button>
//                       <button
//                         onClick={() => window.location.href = '/'}
//                         className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
//                       >
//                         Continue Shopping
//                       </button>
//                     </div>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Payment Processor Modal */}
//       {showPayment && (
//         <PaymentProcessor
//           amount={calculateEstimate()}
//           orderData={orderData}
//           onPaymentSuccess={handlePaymentSuccess}
//           onPaymentError={handlePaymentError}
//           onClose={() => setShowPayment(false)}
//         />
//       )}

//       {/* Contact Info */}
//       <section className="py-12 bg-blue-600 text-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl font-bold mb-2">Need Help with Your Order?</h2>
//             <p className="text-blue-100">Our team is here to assist you every step of the way</p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
//             <div className="space-y-2">
//               <Phone className="h-8 w-8 mx-auto text-blue-200" />
//               <h3 className="font-semibold">Call Us</h3>
//               <p className="text-blue-100">+234-800-CLOUD-PRINT</p>
//             </div>
            
//             <div className="space-y-2">
//               <Mail className="h-8 w-8 mx-auto text-blue-200" />
//               <h3 className="font-semibold">Email Us</h3>
//               <p className="text-blue-100">orders@cloudprint.dev</p>
//             </div>
            
//             <div className="space-y-2">
//               <Calendar className="h-8 w-8 mx-auto text-blue-200" />
//               <h3 className="font-semibold">Support Hours</h3>
//               <p className="text-blue-100">Mon-Fri: 8AM-6PM</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default OrderPage; 

// import React, { useState } from 'react';
// import PaymentProcessor from '../components/PaymentProsessor';
// import { 
//   Upload, 
//   FileText, 
//   CreditCard, 
//   Image, 
//   Megaphone, 
//   Package,
//   Users,
//   CheckCircle,
//   AlertCircle,
//   Phone,
//   Mail,
//   Calendar
// } from 'lucide-react';

// const OrderPage = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showPayment, setShowPayment] = useState(false);
//   const [orderSubmitted, setOrderSubmitted] = useState(false);
//   const [orderData, setOrderData] = useState({
//     service: '',
//     specifications: {
//       size: '',
//       paperType: '',
//       finishing: '',
//       binding: '',
//       coating: ''
//     },
//     designOption: '',
//     printType: '',
//     quantity: '',
//     files: [],
//     deliveryOption: '',
//     customerInfo: {
//       name: '',
//       email: '',
//       phone: '',
//       company: '',
//       address: '',
//       city: '',
//       state: ''
//     },
//     paymentMethod: '',
//     specialInstructions: ''
//   });

//   const services = [
//     {
//       id: 'business-cards',
//       name: 'Business Cards',
//       icon: <CreditCard className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Professional business cards with premium finishes',
//       basePrice: 15000,
//       unit: '500 cards',
//       category: 'original'
//     },
//     {
//       id: 'documents',
//       name: 'Document Printing',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'High-quality document printing in B&W or color',
//       basePrice: 50,
//       unit: 'per page',
//       category: 'original'
//     },
//     {
//       id: 'flyers',
//       name: 'Flyers & Brochures',
//       icon: <Image className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Eye-catching marketing materials',
//       basePrice: 200,
//       unit: 'per piece',
//       category: 'original'
//     },
//     {
//       id: 'banners',
//       name: 'Banners & Posters',
//       icon: <Megaphone className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Large format printing for events and advertising',
//       basePrice: 5000,
//       unit: 'per sqm',
//       category: 'original'
//     },
//     {
//       id: 'merchandise',
//       name: 'Custom Merchandise',
//       icon: <Package className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Custom branded merchandise and promotional items',
//       basePrice: 2500,
//       unit: 'per item',
//       category: 'original'
//     },
//     {
//       id: 'bulk',
//       name: 'Bulk Orders',
//       icon: <Users className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Large volume printing with competitive rates',
//       basePrice: 0,
//       unit: 'Custom pricing',
//       category: 'original'
//     },
//     {
//       id: 'letterheads',
//       name: 'Letterheads',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Professional letterheads for your business',
//       basePrice: 8000,
//       unit: '100 sheets',
//       category: 'original'
//     },
//     {
//       id: 'envelopes',
//       name: 'Custom Envelopes',
//       icon: <Mail className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Branded envelopes in various sizes',
//       basePrice: 12000,
//       unit: '100 envelopes',
//       category: 'original'
//     },
//     {
//       id: 'thesis-binding',
//       name: 'Thesis Binding',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Professional thesis and dissertation binding',
//       basePrice: 8500,
//       unit: 'per copy',
//       category: 'students'
//     },
//     {
//       id: 'project-reports',
//       name: 'Project Reports',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Student project report printing and binding',
//       basePrice: 3500,
//       unit: 'per copy',
//       category: 'students'
//     },
//     {
//       id: 'lecture-notes',
//       name: 'Lecture Notes',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Course materials and lecture note printing',
//       basePrice: 25,
//       unit: 'per page',
//       category: 'students'
//     },
//     {
//       id: 'student-id-cards',
//       name: 'Student ID Cards',
//       icon: <CreditCard className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Custom student identification cards',
//       basePrice: 1500,
//       unit: 'per card',
//       category: 'students'
//     },
//     {
//       id: 'exam-pads',
//       name: 'Exam Answer Booklets',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Custom exam answer booklets for schools',
//       basePrice: 150,
//       unit: 'per booklet',
//       category: 'students'
//     },
//     {
//       id: 'research-posters',
//       name: 'Research Posters',
//       icon: <Image className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Academic research presentation posters',
//       basePrice: 4500,
//       unit: 'per poster',
//       category: 'students'
//     },
//     {
//       id: 'course-manuals',
//       name: 'Course Manuals',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Student course manuals and handbooks',
//       basePrice: 120,
//       unit: 'per page',
//       category: 'students'
//     },
//     {
//       id: 'assignment-covers',
//       name: 'Assignment Covers',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Professional assignment cover pages',
//       basePrice: 200,
//       unit: 'per cover',
//       category: 'students'
//     },
//     {
//       id: 'certificates',
//       name: 'Academic Certificates',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Custom academic achievement certificates',
//       basePrice: 2500,
//       unit: 'per certificate',
//       category: 'students'
//     },
//     {
//       id: 'graduation-programs',
//       name: 'Graduation Programs',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Graduation ceremony programs and booklets',
//       basePrice: 850,
//       unit: 'per program',
//       category: 'students'
//     },
//     {
//       id: 'church-bulletins',
//       name: 'Church Bulletins',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Weekly church service bulletins',
//       basePrice: 180,
//       unit: 'per bulletin',
//       category: 'church'
//     },
//     {
//       id: 'sermon-booklets',
//       name: 'Sermon Booklets',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Compiled sermon booklets and teachings',
//       basePrice: 75,
//       unit: 'per page',
//       category: 'church'
//     },
//     {
//       id: 'church-banners',
//       name: 'Church Banners',
//       icon: <Megaphone className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Religious event and worship banners',
//       basePrice: 6500,
//       unit: 'per banner',
//       category: 'church'
//     },
//     {
//       id: 'prayer-cards',
//       name: 'Prayer Cards',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Memorial and prayer reminder cards',
//       basePrice: 350,
//       unit: 'per card',
//       category: 'church'
//     },
//     {
//       id: 'church-calendars',
//       name: 'Church Calendars',
//       icon: <Calendar className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Annual church event calendars',
//       basePrice: 1800,
//       unit: 'per calendar',
//       category: 'church'
//     },
//     {
//       id: 'offering-envelopes',
//       name: 'Offering Envelopes',
//       icon: <Mail className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Custom church offering envelopes',
//       basePrice: 85,
//       unit: 'per envelope',
//       category: 'church'
//     },
//     {
//       id: 'hymn-books',
//       name: 'Hymn Books',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Custom church hymn and song books',
//       basePrice: 2200,
//       unit: 'per book',
//       category: 'church'
//     },
//     {
//       id: 'baptism-certificates',
//       name: 'Baptism Certificates',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Official baptism certificates',
//       basePrice: 1800,
//       unit: 'per certificate',
//       category: 'church'
//     },
//     {
//       id: 'church-programs',
//       name: 'Event Programs',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Church event and conference programs',
//       basePrice: 450,
//       unit: 'per program',
//       category: 'church'
//     },
//     {
//       id: 'membership-cards',
//       name: 'Membership Cards',
//       icon: <CreditCard className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Church membership identification cards',
//       basePrice: 950,
//       unit: 'per card',
//       category: 'church'
//     },
//     {
//       id: 'wedding-invitations',
//       name: 'Wedding Invitations',
//       icon: <Mail className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Elegant wedding invitation cards',
//       basePrice: 850,
//       unit: 'per invitation',
//       category: 'events'
//     },
//     {
//       id: 'event-tickets',
//       name: 'Event Tickets',
//       icon: <CreditCard className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Custom event admission tickets',
//       basePrice: 120,
//       unit: 'per ticket',
//       category: 'events'
//     },
//     {
//       id: 'table-cards',
//       name: 'Table Number Cards',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Event table number and name cards',
//       basePrice: 180,
//       unit: 'per card',
//       category: 'events'
//     },
//     {
//       id: 'menu-cards',
//       name: 'Menu Cards',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Restaurant-style event menu cards',
//       basePrice: 220,
//       unit: 'per menu',
//       category: 'events'
//     },
//     {
//       id: 'photo-booth-props',
//       name: 'Photo Booth Props',
//       icon: <Image className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Custom photo booth signs and props',
//       basePrice: 1200,
//       unit: 'per prop',
//       category: 'events'
//     },
//     {
//       id: 'backdrop-banners',
//       name: 'Backdrop Banners',
//       icon: <Megaphone className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Large event backdrop banners',
//       basePrice: 12000,
//       unit: 'per banner',
//       category: 'events'
//     },
//     {
//       id: 'program-booklets',
//       name: 'Program Booklets',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Event program and schedule booklets',
//       basePrice: 680,
//       unit: 'per booklet',
//       category: 'events'
//     },
//     {
//       id: 'name-tags',
//       name: 'Name Tags',
//       icon: <CreditCard className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Event attendee name tags and badges',
//       basePrice: 150,
//       unit: 'per tag',
//       category: 'events'
//     },
//     {
//       id: 'thank-you-cards',
//       name: 'Thank You Cards',
//       icon: <Mail className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Post-event thank you cards',
//       basePrice: 280,
//       unit: 'per card',
//       category: 'events'
//     },
//     {
//       id: 'signage-boards',
//       name: 'Directional Signage',
//       icon: <Megaphone className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Event directional and information signs',
//       basePrice: 3500,
//       unit: 'per sign',
//       category: 'events'
//     },
//     {
//       id: 'company-profiles',
//       name: 'Company Profiles',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Professional company profile booklets',
//       basePrice: 180,
//       unit: 'per page',
//       category: 'office'
//     },
//     {
//       id: 'presentation-folders',
//       name: 'Presentation Folders',
//       icon: <Package className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Custom branded presentation folders',
//       basePrice: 850,
//       unit: 'per folder',
//       category: 'office'
//     },
//     {
//       id: 'employee-handbooks',
//       name: 'Employee Handbooks',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Company policy and employee handbooks',
//       basePrice: 150,
//       unit: 'per page',
//       category: 'office'
//     },
//     {
//       id: 'corporate-calendars',
//       name: 'Corporate Calendars',
//       icon: <Calendar className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Branded corporate desk calendars',
//       basePrice: 2800,
//       unit: 'per calendar',
//       category: 'office'
//     },
//     {
//       id: 'annual-reports',
//       name: 'Annual Reports',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Professional annual report printing',
//       basePrice: 320,
//       unit: 'per page',
//       category: 'office'
//     },
//     {
//       id: 'invoice-books',
//       name: 'Invoice Books',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Custom invoice and receipt books',
//       basePrice: 1800,
//       unit: 'per book',
//       category: 'office'
//     },
//     {
//       id: 'office-stationery',
//       name: 'Office Stationery',
//       icon: <Package className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Complete branded office stationery sets',
//       basePrice: 450,
//       unit: 'per item',
//       category: 'office'
//     },
//     {
//       id: 'training-manuals',
//       name: 'Training Manuals',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Employee training and procedure manuals',
//       basePrice: 185,
//       unit: 'per page',
//       category: 'office'
//     },
//     {
//       id: 'office-forms',
//       name: 'Custom Forms',
//       icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'NCR forms and custom office documents',
//       basePrice: 95,
//       unit: 'per form',
//       category: 'office'
//     },
//     {
//       id: 'id-badges',
//       name: 'Employee ID Badges',
//       icon: <CreditCard className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
//       description: 'Professional employee identification badges',
//       basePrice: 1200,
//       unit: 'per badge',
//       category: 'office'
//     }
//   ];

//   const steps = [
//     { number: 1, title: 'Service Selection', description: 'Choose your printing service' },
//     { number: 2, title: 'Specifications', description: 'Select size, paper & finishing' },
//     { number: 3, title: 'Design Options', description: 'Choose design assistance' },
//     { number: 4, title: 'Upload Files', description: 'Upload your design files' },
//     { number: 5, title: 'Quantity & Print', description: 'Set quantity & print type' },
//     { number: 6, title: 'Delivery Options', description: 'Choose delivery method' },
//     { number: 7, title: 'Customer Details', description: 'Provide your information' },
//     { number: 8, title: 'Payment Method', description: 'Select payment option' },
//     { number: 9, title: 'Review Order', description: 'Review all details' },
//     { number: 10, title: 'Submit Order', description: 'Confirm and place order' }
//   ];

//   const handleServiceSelect = (serviceId: string) => {
//     setOrderData({ ...orderData, service: serviceId });
//     setCurrentStep(2);
//   };

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || []);
//     setOrderData({ ...orderData, files });
//   };

//   const calculateEstimate = () => {
//     const service = services.find(s => s.id === orderData.service);
//     if (!service || !orderData.quantity || service.basePrice === 0) return 0;
    
//     const quantity = parseInt(orderData.quantity);
//     let baseTotal = service.basePrice * quantity;
    
//     if (orderData.printType === 'color') {
//       baseTotal *= 1.5;
//     }
    
//     if (orderData.specifications.finishing === 'lamination') baseTotal *= 1.2;
//     if (orderData.specifications.finishing === 'embossing') baseTotal *= 1.8;
//     if (orderData.specifications.coating === 'uv') baseTotal *= 1.3;
    
//     if (quantity >= 1000) baseTotal *= 0.95;
//     if (quantity >= 10000) baseTotal *= 0.9;
//     if (quantity >= 50000) baseTotal *= 0.85;
    
//     if (orderData.deliveryOption === 'express') baseTotal += 5000;
    
//     return Math.round(baseTotal);
//   };

//   const nextStep = () => {
//     if (currentStep < 10) setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     if (currentStep > 1) setCurrentStep(currentStep - 1);
//   };

//   const submitOrder = () => {
//     setShowPayment(true);
//   };

//   const handlePaymentSuccess = (paymentData: any) => {
//     setShowPayment(false);
//     setOrderSubmitted(true);
    
//     const order = {
//       id: `ORD-${Date.now()}`,
//       orderNumber: `ORD-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
//       date: new Date().toISOString(),
//       status: 'pending',
//       service: services.find(s => s.id === orderData.service)?.name || 'Custom Order',
//       specifications: orderData.specifications,
//       designOption: orderData.designOption,
//       printType: orderData.printType,
//       quantity: parseInt(orderData.quantity),
//       files: orderData.files.map(f => f.name),
//       deliveryOption: orderData.deliveryOption,
//       customerInfo: orderData.customerInfo,
//       paymentMethod: paymentData.method,
//       specialInstructions: orderData.specialInstructions,
//       total: calculateEstimate(),
//       paymentData: paymentData,
//       estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
//     };

//     const existingOrders = JSON.parse(localStorage.getItem('cloudprint-orders') || '[]');
//     existingOrders.push(order);
//     localStorage.setItem('cloudprint-orders', JSON.stringify(existingOrders));

//     const invoice = {
//       id: order.id,
//       invoiceNumber: `RCP-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
//       orderNumber: order.orderNumber,
//       type: 'receipt',
//       date: new Date().toISOString(),
//       status: 'paid',
//       customer: {
//         name: orderData.customerInfo.name,
//         email: orderData.customerInfo.email,
//         phone: orderData.customerInfo.phone,
//         company: orderData.customerInfo.company,
//         address: orderData.customerInfo.address,
//         city: orderData.customerInfo.city,
//         state: orderData.customerInfo.state
//       },
//       items: [{
//         id: '1',
//         name: order.service,
//         description: `${orderData.printType} printing - ${orderData.quantity} units`,
//         quantity: 1,
//         unitPrice: order.total,
//         total: order.total
//       }],
//       subtotal: order.total,
//       tax: Math.round(order.total * 0.05),
//       discount: 0,
//       total: order.total,
//       paymentMethod: paymentData.method,
//       paymentDate: new Date().toISOString(),
//       transactionId: paymentData.transactionId,
//       notes: orderData.specialInstructions || 'Thank you for your business!'
//     };

//     const existingInvoices = JSON.parse(localStorage.getItem('cloudprint-invoices') || '[]');
//     existingInvoices.push(invoice);
//     localStorage.setItem('cloudprint-invoices', JSON.stringify(existingInvoices));
//   };

//   const handlePaymentError = (error: string) => {
//     alert(`Payment failed: ${error}. Please try again.`);
//   };

//   const isStepValid = () => {
//     switch (currentStep) {
//       case 1:
//         return orderData.service !== '';
//       case 2:
//         return orderData.specifications.size !== '' && orderData.specifications.paperType !== '';
//       case 3:
//         return orderData.designOption !== '';
//       case 4:
//         return orderData.files.length > 0;
//       case 5:
//         return orderData.quantity !== '' && orderData.printType !== '';
//       case 6:
//         return orderData.deliveryOption !== '';
//       case 7:
//         return orderData.customerInfo.name !== '' && orderData.customerInfo.email !== '' && orderData.customerInfo.phone !== '';
//       case 8:
//         return orderData.paymentMethod !== '';
//       default:
//         return true;
//     }
//   };

//   const servicesByCategory = {
//     original: services.filter(s => s.category === 'original'),
//     students: services.filter(s => s.category === 'students'),
//     church: services.filter(s => s.category === 'church'),
//     events: services.filter(s => s.category === 'events'),
//     office: services.filter(s => s.category === 'office')
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {showPayment && (
//         <PaymentProcessor
//           amount={calculateEstimate()}
//           orderData={orderData}
//           onPaymentSuccess={handlePaymentSuccess}
//           onPaymentError={handlePaymentError}
//           onClose={() => setShowPayment(false)}
//         />
//       )}

//       <section className="bg-white shadow-lg py-6 sm:py-8 lg:py-12 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="text-center">
//             <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
//               CloudPrint Order Flow
//             </h1>
//             <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
//               Professional printing services delivered to your door in 24-48 hours. Choose from our comprehensive range of services for students, churches, events, and offices.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-4 sm:py-6 lg:py-8 bg-white/80 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between overflow-x-auto pb-4 gap-2">
//             {steps.map((step, index) => (
//               <div key={step.number} className="flex items-center min-w-0 flex-shrink-0">
//                 <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 transition-all duration-300 ${
//                   currentStep >= step.number 
//                     ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white shadow-lg' 
//                     : 'border-gray-300 text-gray-500 bg-white'
//                 }`}>
//                   {currentStep > step.number ? (
//                     <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
//                   ) : (
//                     <span className="font-semibold text-xs sm:text-sm lg:text-base">{step.number}</span>
//                   )}
//                 </div>
//                 <div className="ml-2 sm:ml-3 hidden md:block">
//                   <p className={`text-sm sm:text-base font-medium ${
//                     currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
//                   }`}>
//                     {step.title}
//                   </p>
//                   <p className="text-xs sm:text-sm text-gray-500 hidden lg:block">{step.description}</p>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className={`w-6 sm:w-12 lg:w-16 h-1 ml-2 sm:ml-3 rounded transition-all duration-300 ${
//                     currentStep > step.number ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
//                   }`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-6 sm:py-8 lg:py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-white/20">
            
//             {currentStep === 1 && (
//               <div className="space-y-8">
//                 <div className="text-center">
//                   <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Select Your Service</h2>
//                   <p className="text-gray-600">Choose from our comprehensive range of printing services</p>
//                 </div>
                
//                 <div className="space-y-6">
//                   <h3 className="text-xl sm:text-2xl font-bold text-gray-800 border-b-2 border-blue-200 pb-2">Popular Services</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
//                     {servicesByCategory.original.map(service => (
//                       <div 
//                         key={service.id}
//                         onClick={() => handleServiceSelect(service.id)}
//                         className={`group p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
//                           orderData.service === service.id
//                             ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg'
//                             : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-md'
//                         }`}
//                       >
//                         <div className="flex flex-col items-center space-y-3 text-center">
//                           <div className={`p-3 rounded-lg transition-all duration-300 ${
//                             orderData.service === service.id 
//                               ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600' 
//                               : 'bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-500'
//                           }`}>
//                             {service.icon}
//                           </div>
//                           <div>
//                             <h4 className="text-lg font-semibold text-gray-900 mb-1">{service.name}</h4>
//                             <p className="text-sm text-gray-600 mb-2">{service.description}</p>
//                             <p className="text-sm text-blue-600 font-semibold">
//                               {service.basePrice > 0 
//                                 ? `From ₦${service.basePrice.toLocaleString()} / ${service.unit}`
//                                 : service.unit
//                               }
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   <h3 className="text-xl sm:text-2xl font-bold text-green-700 border-b-2 border-green-200 pb-2">
//                     📚 Student Services
//                   </h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
//                     {servicesByCategory.students.map(service => (
//                       <div 
//                         key={service.id}
//                         onClick={() => handleServiceSelect(service.id)}
//                         className={`group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
//                           orderData.service === service.id
//                             ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg'
//                             : 'border-green-200 hover:border-green-400 bg-white hover:shadow-md'
//                         }`}
//                       >
//                         <div className="flex flex-col items-center space-y-2 text-center">
//                           <div className={`p-2 rounded-lg transition-all duration-300 ${
//                             orderData.service === service.id 
//                               ? 'bg-green-100 text-green-600' 
//                               : 'bg-green-50 text-green-600 group-hover:bg-green-100'
//                           }`}>
//                             {service.icon}
//                           </div>
//                           <div>
//                             <h4 className="text-sm font-semibold text-gray-900 mb-1">{service.name}</h4>
//                             <p className="text-xs text-gray-600 mb-1">{service.description}</p>
//                             <p className="text-xs text-green-600 font-semibold">
//                               ₦{service.basePrice.toLocaleString()} / {service.unit}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   <h3 className="text-xl sm:text-2xl font-bold text-purple-700 border-b-2 border-purple-200 pb-2">
//                     ⛪ Church Services
//                   </h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
//                     {servicesByCategory.church.map(service => (
//                       <div 
//                         key={service.id}
//                         onClick={() => handleServiceSelect(service.id)}
//                         className={`group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
//                           orderData.service === service.id
//                             ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-lg'
//                             : 'border-purple-200 hover:border-purple-400 bg-white hover:shadow-md'
//                         }`}
//                       >
//                         <div className="flex flex-col items-center space-y-2 text-center">
//                           <div className={`p-2 rounded-lg transition-all duration-300 ${
//                             orderData.service === service.id 
//                               ? 'bg-purple-100 text-purple-600' 
//                               : 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'
//                           }`}>
//                             {service.icon}
//                           </div>
//                           <div>
//                             <h4 className="text-sm font-semibold text-gray-900 mb-1">{service.name}</h4>
//                             <p className="text-xs text-gray-600 mb-1">{service.description}</p>
//                             <p className="text-xs text-purple-600 font-semibold">
//                               ₦{service.basePrice.toLocaleString()} / {service.unit}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   <h3 className="text-xl sm:text-2xl font-bold text-pink-700 border-b-2 border-pink-200 pb-2">
//                     🎉 Event Planning Services
//                   </h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
//                     {servicesByCategory.events.map(service => (
//                       <div 
//                         key={service.id}
//                         onClick={() => handleServiceSelect(service.id)}
//                         className={`group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
//                           orderData.service === service.id
//                             ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 shadow-lg'
//                             : 'border-pink-200 hover:border-pink-400 bg-white hover:shadow-md'
//                         }`}
//                       >
//                         <div className="flex flex-col items-center space-y-2 text-center">
//                           <div className={`p-2 rounded-lg transition-all duration-300 ${
//                             orderData.service === service.id 
//                               ? 'bg-pink-100 text-pink-600' 
//                               : 'bg-pink-50 text-pink-600 group-hover:bg-pink-100'
//                           }`}>
//                             {service.icon}
//                           </div>
//                           <div>
//                             <h4 className="text-sm font-semibold text-gray-900 mb-1">{service.name}</h4>
//                             <p className="text-xs text-gray-600 mb-1">{service.description}</p>
//                             <p className="text-xs text-pink-600 font-semibold">
//                               ₦{service.basePrice.toLocaleString()} / {service.unit}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   <h3 className="text-xl sm:text-2xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2">
//                     🏢 Office Services
//                   </h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
//                     {servicesByCategory.office.map(service => (
//                       <div 
//                         key={service.id}
//                         onClick={() => handleServiceSelect(service.id)}
//                         className={`group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
//                           orderData.service === service.id
//                             ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 shadow-lg'
//                             : 'border-indigo-200 hover:border-indigo-400 bg-white hover:shadow-md'
//                         }`}
//                       >
//                         <div className="flex flex-col items-center space-y-2 text-center">
//                           <div className={`p-2 rounded-lg transition-all duration-300 ${
//                             orderData.service === service.id 
//                               ? 'bg-indigo-100 text-indigo-600' 
//                               : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'
//                           }`}>
//                             {service.icon}
//                           </div>
//                           <div>
//                             <h4 className="text-sm font-semibold text-gray-900 mb-1">{service.name}</h4>
//                             <p className="text-xs text-gray-600 mb-1">{service.description}</p>
//                             <p className="text-xs text-indigo-600 font-semibold">
//                               ₦{service.basePrice.toLocaleString()} / {service.unit}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {currentStep === 2 && (
//               <div className="space-y-6">
//                 <div className="text-center">
//                   <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Product Specifications</h2>
//                   <p className="text-gray-600">Customize your printing preferences</p>
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">Size *</label>
//                     <select
//                       value={orderData.specifications.size}
//                       onChange={(e) => setOrderData({
//                         ...orderData,
//                         specifications: { ...orderData.specifications, size: e.target.value }
//                       })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
//                     >
//                       <option value="">Select size</option>
//                       <option value="a4">A4 (210 × 297 mm)</option>
//                       <option value="a3">A3 (297 × 420 mm)</option>
//                       <option value="a5">A5 (148 × 210 mm)</option>
//                       <option value="letter">Letter (8.5 × 11 in)</option>
//                       <option value="business-card">Business Card (85 × 55 mm)</option>
//                       <option value="custom">Custom Size</option>
//                     </select>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">Paper Type *</label>
//                     <select
//                       value={orderData.specifications.paperType}
//                       onChange={(e) => setOrderData({
//                         ...orderData,
//                         specifications: { ...orderData.specifications, paperType: e.target.value }
//                       })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
//                     >
//                       <option value="">Select paper type</option>
//                       <option value="standard">Standard (80gsm)</option>
//                       <option value="premium">Premium (120gsm)</option>
//                       <option value="cardstock">Cardstock (250gsm)</option>
//                       <option value="glossy">Glossy Photo Paper</option>
//                       <option value="matte">Matte Photo Paper</option>
//                       <option value="recycled">Recycled Paper</option>
//                     </select>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">Finishing</label>
//                     <select
//                       value={orderData.specifications.finishing}
//                       onChange={(e) => setOrderData({
//                         ...orderData,
//                         specifications: { ...orderData.specifications, finishing: e.target.value }
//                       })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
//                     >
//                       <option value="">No finishing</option>
//                       <option value="lamination">Lamination (+20%)</option>
//                       <option value="embossing">Embossing (+80%)</option>
//                       <option value="die-cutting">Die Cutting</option>
//                       <option value="foil-stamping">Foil Stamping</option>
//                     </select>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">Binding</label>
//                     <select
//                       value={orderData.specifications.binding}
//                       onChange={(e) => setOrderData({
//                         ...orderData,
//                         specifications: { ...orderData.specifications, binding: e.target.value }
//                       })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
//                     >
//                       <option value="">No binding</option>
//                       <option value="saddle-stitch">Saddle Stitch</option>
//                       <option value="perfect-bound">Perfect Bound</option>
//                       <option value="spiral">Spiral Binding</option>
//                       <option value="wire-o">Wire-O Binding</option>
//                     </select>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">Coating</label>
//                     <select
//                       value={orderData.specifications.coating}
//                       onChange={(e) => setOrderData({
//                         ...orderData,
//                         specifications: { ...orderData.specifications, coating: e.target.value }
//                       })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
//                     >
//                       <option value="">No coating</option>
//                       <option value="gloss">Gloss Coating</option>
//                       <option value="matte">Matte Coating</option>
//                       <option value="uv">UV Coating (+30%)</option>
//                       <option value="aqueous">Aqueous Coating</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 3: Design Options */}
//             {currentStep === 3 && (
//               <div className="space-y-6">
//                 <div className="text-center">
//                   <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Design Options</h2>
//                   <p className="text-gray-600">Choose your design assistance</p>
//                 </div>
//                 {/* Design options content goes here */}
//               </div>
//             )}

//             {/* Step 4: Upload Files */}
//             {currentStep === 4 && (
//               <div className="space-y-6">
//                 <div className="text-center">
//                   <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Upload Your Files</h2>
//                   <p className="text-gray-600">Upload your design files for printing</p>
//                 </div>
//                 <input type="file" multiple onChange={handleFileUpload} />
//               </div>
//             )}

//             {/* Step 5: Quantity & Print Type */}
//             {currentStep === 5 && (
//               <div className="space-y-6">
//                 <div className="text-center">
//                   <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Quantity & Print Type</h2>
//                   <p className="text-gray-600">Set your quantity and print type</p>
//                 </div>
//                 {/* Quantity and print type options go here */}
//               </div>
//             )}

//             {/* Step 6: Delivery Options */}
//             {currentStep === 6 && (
//               <div className="space-y-6">
//                 <div className="text-center">
//                   <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Delivery Options</h2>
//                   <p className="text-gray-600">Choose your delivery method</p>
//                 </div>
//                 {/* Delivery options content goes here */}
//               </div>
//             )}

//             {/* Step 7: Customer Details */}
//             {currentStep === 7 && (
//               <div className="space-y-6">
//                 <div className="text-center">
//                   <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Customer Details</h2>
//                   <p className="text-gray-600">Provide your information</p>
//                 </div>
//                 {/* Customer details form goes here */}
//               </div>
//             )}

//             {/* Step 8: Payment Method */}
//             {currentStep === 8 && (
//               <div className="space-y-6">
//                 <div className="text-center">
//                   <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Payment Method</h2>
//                   <p className="text-gray-600">Select your payment option</p>
//                 </div>
//                 {/* Payment method options go here */}
//               </div>
//             )}

//             {/* Step 9: Review Order */}
//             {currentStep === 9 && (
//               <div className="space-y-6">
//                 <div className="text-center">
//                   <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Review Your Order</h2>
//                   <p className="text-gray-600">Review all details before submission</p>
//                 </div>
//                 {/* Order review content goes here */}
//               </div>
//             )}

//             {/* Step 10: Submit Order */}
//             {currentStep === 10 && (
//               <div className="space-y-6">
//                 <div className="text-center">
//                   <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Submit Your Order</h2>
//                   <p className="text-gray-600">Confirm and place your order</p>
//                 </div>
//                 {/* Submit order button goes here */}
//               </div>
//             )}

//             {/* Navigation Buttons */}
//             {!orderSubmitted && (
//               <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
//                 {currentStep > 1 && (
//                   <button
//                     onClick={prevStep}
//                     className="w-full sm:w-auto px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
//                   >
//                     Previous Step
//                   </button>
//                 )}
                
//                 <div className="flex-1"></div>
                
//                 {currentStep < 10 && (
//                   <button
//                     onClick={nextStep}
//                     disabled={!isStepValid()}
//                     className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
//                       isStepValid()
//                         ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
//                         : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     }`}
//                   >
//                     Next Step
//                   </button>
//                 )}
                
//                 {currentStep === 10 && (
//                   <button
//                     onClick={submitOrder}
//                     disabled={!isStepValid()}
//                     className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
//                       isStepValid()
//                         ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:shadow-lg'
//                         : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     }`}
//                   >
//                     Submit Order
//                   </button>
//                 )}
//               </div>
//             )}

//             {orderSubmitted && (
//               <div className="text-center py-12 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
//                 <div className="p-4 rounded-full bg-green-100 text-green-600 mx-auto w-fit mb-6">
//                   <CheckCircle className="h-16 w-16" />
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Submitted Successfully!</h2>
//                 <p className="text-lg text-gray-600 mb-6">
//                   Thank you for your order. We'll process it within 24 hours and keep you updated via email.
//                 </p>
//                 <div className="space-y-2 text-sm text-gray-500">
//                   <p>Order Number: ORD-2024-{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}</p>
//                   <p>Estimated Delivery: {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default OrderPage;
