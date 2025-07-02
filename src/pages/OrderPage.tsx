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
    {
      id: 'business-cards',
      name: 'Business Cards',
      icon: <CreditCard className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Professional business cards with premium finishes',
      basePrice: 15000,
      unit: '500 cards'
    },
    {
      id: 'documents',
      name: 'Document Printing',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'High-quality document printing in B&W or color',
      basePrice: 50,
      unit: 'per page'
    },
    {
      id: 'flyers',
      name: 'Flyers & Brochures',
      icon: <Image className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Eye-catching marketing materials',
      basePrice: 200,
      unit: 'per piece'
    },
    {
      id: 'banners',
      name: 'Banners & Posters',
      icon: <Megaphone className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Large format printing for events and advertising',
      basePrice: 5000,
      unit: 'per sqm'
    },
    {
      id: 'merchandise',
      name: 'Custom Merchandise',
      icon: <Package className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Custom branded merchandise and promotional items',
      basePrice: 2500,
      unit: 'per item'
    },
    {
      id: 'bulk',
      name: 'Bulk Orders',
      icon: <Users className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Large volume printing with competitive rates',
      basePrice: 0,
      unit: 'Custom pricing'
    },
    {
      id: 'letterheads',
      name: 'Letterheads',
      icon: <FileText className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Professional letterheads for your business',
      basePrice: 8000,
      unit: '100 sheets'
    },
    {
      id: 'envelopes',
      name: 'Custom Envelopes',
      icon: <Mail className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />,
      description: 'Branded envelopes in various sizes',
      basePrice: 12000,
      unit: '100 envelopes'
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm py-3 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <h1 className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Place Your Order</h1>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600">Get professional printing delivered to your door in 24-48 hours</p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-2 sm:py-4 lg:py-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto pb-2 sm:pb-4 gap-1 sm:gap-2">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center min-w-0 flex-shrink-0">
                <div className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                  ) : (
                    <span className="font-semibold text-xs sm:text-sm">{step.number}</span>
                  )}
                </div>
                <div className="ml-1 sm:ml-2 lg:ml-3 hidden md:block">
                  <p className={`text-xs sm:text-sm font-medium ${
                    currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 hidden lg:block">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-4 sm:w-8 lg:w-12 xl:w-16 h-0.5 ml-1 sm:ml-2 lg:ml-3 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section className="py-2 sm:py-4 lg:py-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-6 lg:p-8">
            
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Select Your Service</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  {services.map(service => (
                    <div 
                      key={service.id}
                      onClick={() => handleServiceSelect(service.id)}
                      className={`p-3 sm:p-4 lg:p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        orderData.service === service.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2 sm:space-y-3 text-center">
                        <div className={`p-2 sm:p-3 rounded-lg ${
                          orderData.service === service.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm lg:text-lg font-semibold text-gray-900">{service.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">{service.description}</p>
                          <p className="text-xs sm:text-sm text-blue-600 font-semibold mt-2">
                            {service.basePrice > 0 
                              ? `From ₦${service.basePrice.toLocaleString()} / ${service.unit}`
                              : service.unit
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Specifications */}
            {currentStep === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Product Specifications</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size *</label>
                    <select
                      value={orderData.specifications.size}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        specifications: { ...orderData.specifications, size: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Paper Type *</label>
                    <select
                      value={orderData.specifications.paperType}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        specifications: { ...orderData.specifications, paperType: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Finishing</label>
                    <select
                      value={orderData.specifications.finishing}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        specifications: { ...orderData.specifications, finishing: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option value="">No finishing</option>
                      <option value="lamination">Lamination (+20%)</option>
                      <option value="embossing">Embossing (+80%)</option>
                      <option value="die-cutting">Die Cutting</option>
                      <option value="foil-stamping">Foil Stamping</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Binding</label>
                    <select
                      value={orderData.specifications.binding}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        specifications: { ...orderData.specifications, binding: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option value="">No binding</option>
                      <option value="saddle-stitch">Saddle Stitch</option>
                      <option value="perfect-bound">Perfect Bound</option>
                      <option value="spiral">Spiral Binding</option>
                      <option value="wire-o">Wire-O Binding</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Coating</label>
                    <select
                      value={orderData.specifications.coating}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        specifications: { ...orderData.specifications, coating: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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

            {/* Step 3: Design Options */}
            {currentStep === 3 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Design Options</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div 
                    onClick={() => setOrderData({ ...orderData, designOption: 'upload-ready' })}
                    className={`p-4 sm:p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      orderData.designOption === 'upload-ready'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                      <h3 className="font-semibold text-gray-900 mb-2">Upload Ready Design</h3>
                      <p className="text-sm text-gray-600">I have my design files ready to upload</p>
                    </div>
                  </div>
                  
                  <div 
                    onClick={() => setOrderData({ ...orderData, designOption: 'template' })}
                    className={`p-4 sm:p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      orderData.designOption === 'template'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      <Image className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                      <h3 className="font-semibold text-gray-900 mb-2">Use Template</h3>
                      <p className="text-sm text-gray-600">Choose from our professional templates</p>
                    </div>
                  </div>
                  
                  <div 
                    onClick={() => setOrderData({ ...orderData, designOption: 'design-service' })}
                    className={`p-4 sm:p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      orderData.designOption === 'design-service'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      <Users className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                      <h3 className="font-semibold text-gray-900 mb-2">Design Service</h3>
                      <p className="text-sm text-gray-600">Get professional design assistance (+₦15,000)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: File Upload */}
            {currentStep === 4 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Upload Your Files</h2>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 lg:p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 mb-2">Upload Design Files</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-4">
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
                    className="bg-blue-600 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer inline-block text-xs sm:text-sm lg:text-base"
                  >
                    Choose Files
                  </label>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    Supported formats: PDF, JPG, PNG, AI, PSD, EPS (Max 50MB per file)
                  </p>
                </div>

                {orderData.files.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 text-sm sm:text-base">Uploaded Files:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {orderData.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-xs sm:text-sm text-gray-700 truncate">{file.name}</span>
                          <span className="text-xs sm:text-sm text-gray-500 ml-2 flex-shrink-0">
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
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Quantity & Print Type</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Print Type *</label>
                    <select
                      value={orderData.printType}
                      onChange={(e) => setOrderData({ ...orderData, printType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option value="">Select print type</option>
                      <option value="bw">Black & White</option>
                      <option value="color">Color (+50%)</option>
                      <option value="spot-color">Spot Color</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                    <input
                      type="number"
                      value={orderData.quantity}
                      onChange={(e) => setOrderData({ ...orderData, quantity: e.target.value })}
                      placeholder="Enter quantity"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sides</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option value="single">Single-sided</option>
                      <option value="double">Double-sided (+30%)</option>
                    </select>
                  </div>
                </div>

                {orderData.quantity && orderData.printType && calculateEstimate() > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-gray-700 text-sm sm:text-base">Estimated Total:</span>
                      <span className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                        ₦{calculateEstimate().toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      Final price will be confirmed after file review
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 6: Delivery Options */}
            {currentStep === 6 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Delivery Options</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div 
                    onClick={() => setOrderData({ ...orderData, deliveryOption: 'standard' })}
                    className={`p-4 sm:p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      orderData.deliveryOption === 'standard'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">Standard Delivery</h3>
                    <p className="text-sm text-gray-600 mb-2">24-48 hours</p>
                    <p className="text-lg font-bold text-green-600">Free</p>
                    <p className="text-xs text-gray-500 mt-1">Within Lagos only</p>
                  </div>
                  
                  <div 
                    onClick={() => setOrderData({ ...orderData, deliveryOption: 'express' })}
                    className={`p-4 sm:p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      orderData.deliveryOption === 'express'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">Express Delivery</h3>
                    <p className="text-sm text-gray-600 mb-2">Same day</p>
                    <p className="text-lg font-bold text-blue-600">₦5,000</p>
                    <p className="text-xs text-gray-500 mt-1">Within Lagos</p>
                  </div>
                  
                  <div 
                    onClick={() => setOrderData({ ...orderData, deliveryOption: 'pickup' })}
                    className={`p-4 sm:p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      orderData.deliveryOption === 'pickup'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">Self Pickup</h3>
                    <p className="text-sm text-gray-600 mb-2">12-24 hours</p>
                    <p className="text-lg font-bold text-green-600">Free</p>
                    <p className="text-xs text-gray-500 mt-1">From our office</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Customer Details */}
            {currentStep === 7 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Customer Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={orderData.customerInfo.name}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, name: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={orderData.customerInfo.email}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, email: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={orderData.customerInfo.phone}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, phone: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company (Optional)</label>
                    <input
                      type="text"
                      value={orderData.customerInfo.company}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, company: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      value={orderData.customerInfo.city}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, city: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="City"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <select
                      value={orderData.customerInfo.state}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, state: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address *</label>
                  <textarea
                    value={orderData.customerInfo.address}
                    onChange={(e) => setOrderData({
                      ...orderData,
                      customerInfo: { ...orderData.customerInfo, address: e.target.value }
                    })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter complete delivery address"
                  />
                </div>
              </div>
            )}

            {/* Step 8: Payment Method */}
            {currentStep === 8 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Payment Method</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div 
                    onClick={() => setOrderData({ ...orderData, paymentMethod: 'bank-transfer' })}
                    className={`p-4 sm:p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      orderData.paymentMethod === 'bank-transfer'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      <CreditCard className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                      <h3 className="font-semibold text-gray-900 mb-2">Bank Transfer</h3>
                      <p className="text-sm text-gray-600">Direct bank transfer payment</p>
                    </div>
                  </div>
                  
                  <div 
                    onClick={() => setOrderData({ ...orderData, paymentMethod: 'card' })}
                    className={`p-4 sm:p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      orderData.paymentMethod === 'card'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      <CreditCard className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                      <h3 className="font-semibold text-gray-900 mb-2">Credit/Debit Card</h3>
                      <p className="text-sm text-gray-600">Pay with your card online</p>
                    </div>
                  </div>
                  
                  <div 
                    onClick={() => setOrderData({ ...orderData, paymentMethod: 'cash' })}
                    className={`p-4 sm:p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      orderData.paymentMethod === 'cash'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      <Package className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                      <h3 className="font-semibold text-gray-900 mb-2">Cash on Delivery</h3>
                      <p className="text-sm text-gray-600">Pay when you receive your order</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 9: Review Order */}
            {currentStep === 9 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Review Your Order</h2>
                
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Service Details</h3>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex justify-between">
                          <span>Service:</span>
                          <span className="font-medium">
                            {services.find(s => s.id === orderData.service)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Size:</span>
                          <span className="font-medium">{orderData.specifications.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Paper:</span>
                          <span className="font-medium">{orderData.specifications.paperType}</span>
                        </div>
                        {orderData.printType && (
                          <div className="flex justify-between">
                            <span>Print Type:</span>
                            <span className="font-medium capitalize">{orderData.printType}</span>
                          </div>
                        )}
                        {orderData.quantity && (
                          <div className="flex justify-between">
                            <span>Quantity:</span>
                            <span className="font-medium">{orderData.quantity}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Customer Details</h3>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex justify-between">
                          <span>Name:</span>
                          <span className="font-medium">{orderData.customerInfo.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Email:</span>
                          <span className="font-medium break-all">{orderData.customerInfo.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Phone:</span>
                          <span className="font-medium">{orderData.customerInfo.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery:</span>
                          <span className="font-medium capitalize">{orderData.deliveryOption}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payment:</span>
                          <span className="font-medium capitalize">{orderData.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {calculateEstimate() > 0 && (
                    <div className="border-t pt-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <span className="text-sm sm:text-base lg:text-lg font-semibold">Estimated Total:</span>
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                          ₦{calculateEstimate().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions (Optional)</label>
                  <textarea
                    value={orderData.specialInstructions}
                    onChange={(e) => setOrderData({ ...orderData, specialInstructions: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Any special requirements or instructions..."
                  />
                </div>
              </div>
            )}

            {/* Step 10: Submit Order */}
            {currentStep === 10 && (
              <div className="space-y-4 sm:space-y-6 text-center">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Submit Your Order</h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
                  <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">Ready to Submit!</h3>
                  <p className="text-sm sm:text-base text-green-700 mb-4">
                    Please review all details before submitting your order.
                  </p>
                  
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">What happens next?</h4>
                    <ul className="text-sm text-gray-700 space-y-2 text-left">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        We'll review your files and contact you for approval within 2 hours
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        You'll receive a confirmation email with order details
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        Payment is required before printing begins
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        Delivery within your selected timeframe after approval
                      </li>
                    </ul>
                  </div>
                  
                  <button
                    onClick={submitOrder}
                    className="bg-green-600 text-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base lg:text-lg"
                  >
                    Submit Order Now
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between pt-4 sm:pt-6 lg:pt-8 border-t space-y-3 sm:space-y-0">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm lg:text-base ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              
              <div className="text-center order-first sm:order-none">
                <p className="text-xs sm:text-sm text-gray-500">
                  Step {currentStep} of {steps.length}
                </p>
              </div>

              {currentStep < 10 ? (
                <button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm lg:text-base ${
                    !isStepValid()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Next Step
                </button>
              ) : (
                <div className="w-20 sm:w-24"></div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-6 sm:py-8 lg:py-12 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Need Help with Your Order?</h2>
            <p className="text-blue-100 text-xs sm:text-sm lg:text-base">Our team is here to assist you every step of the way</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="space-y-2">
              <Phone className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 mx-auto text-blue-200" />
              <h3 className="font-semibold text-xs sm:text-sm lg:text-base">Call Us</h3>
              <p className="text-blue-100 text-xs sm:text-sm">+234-800-CLOUD-PRINT</p>
            </div>
            
            <div className="space-y-2">
              <Mail className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 mx-auto text-blue-200" />
              <h3 className="font-semibold text-xs sm:text-sm lg:text-base">Email Us</h3>
              <p className="text-blue-100 text-xs sm:text-sm">orders@cloudprint.dev</p>
            </div>
            
            <div className="space-y-2">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 mx-auto text-blue-200" />
              <h3 className="font-semibold text-xs sm:text-sm lg:text-base">Support Hours</h3>
              <p className="text-blue-100 text-xs sm:text-sm">Mon-Fri: 8AM-6PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderPage;