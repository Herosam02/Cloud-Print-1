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
    printType: '',
    quantity: '',
    files: [],
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      city: '',
      state: ''
    },
    deliveryOption: '',
    paymentMethod: '',
    specialInstructions: ''
  });

  const services = [
    {
      id: 'business-cards',
      name: 'Business Cards',
      icon: <CreditCard className="h-8 w-8" />,
      description: 'Professional business cards with premium finishes',
      basePrice: 15000,
      unit: '500 cards'
    },
    {
      id: 'documents',
      name: 'Document Printing',
      icon: <FileText className="h-8 w-8" />,
      description: 'High-quality document printing in B&W or color',
      basePrice: 50,
      unit: 'per page'
    },
    {
      id: 'flyers',
      name: 'Flyers & Brochures',
      icon: <Image className="h-8 w-8" />,
      description: 'Eye-catching marketing materials',
      basePrice: 200,
      unit: 'per piece'
    },
    {
      id: 'banners',
      name: 'Banners & Posters',
      icon: <Megaphone className="h-8 w-8" />,
      description: 'Large format printing for events and advertising',
      basePrice: 5000,
      unit: 'per sqm'
    },
    {
      id: 'merchandise',
      name: 'Merchandise',
      icon: <Package className="h-8 w-8" />,
      description: 'Custom branded merchandise and promotional items',
      basePrice: 2500,
      unit: 'per item'
    },
    {
      id: 'bulk',
      name: 'Bulk Orders',
      icon: <Users className="h-8 w-8" />,
      description: 'Large volume printing with competitive rates',
      basePrice: 0,
      unit: 'Custom pricing'
    }
  ];

  const steps = [
    { number: 1, title: 'Service Selection', description: 'Choose your printing service' },
    { number: 2, title: 'Upload Files', description: 'Upload your design files' },
    { number: 3, title: 'Customer Details', description: 'Provide your information' },
    { number: 4, title: 'Review & Submit', description: 'Review and place order' }
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
    
    // Volume discounts
    if (quantity >= 1000) baseTotal *= 0.95;
    if (quantity >= 10000) baseTotal *= 0.9;
    if (quantity >= 50000) baseTotal *= 0.85;
    
    return Math.round(baseTotal);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const submitOrder = () => {
    // Handle order submission
    alert('Order submitted successfully! You will receive a confirmation email shortly.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Place Your Order</h1>
          <p className="text-gray-600">Get professional printing delivered to your door in 24-48 hours</p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <span className="font-semibold">{step.number}</span>
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ml-4 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Service</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map(service => (
                    <div 
                      key={service.id}
                      onClick={() => handleServiceSelect(service.id)}
                      className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        orderData.service === service.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${
                          orderData.service === service.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                          <p className="text-gray-600 text-sm">{service.description}</p>
                          <p className="text-blue-600 font-semibold mt-1">
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

                {orderData.service && orderData.service !== 'bulk' && (
                  <div className="space-y-4 pt-6 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Print Type
                        </label>
                        <select
                          value={orderData.printType}
                          onChange={(e) => setOrderData({ ...orderData, printType: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select print type</option>
                          <option value="bw">Black & White</option>
                          <option value="color">Color</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity
                        </label>
                        <input
                          type="number"
                          value={orderData.quantity}
                          onChange={(e) => setOrderData({ ...orderData, quantity: e.target.value })}
                          placeholder="Enter quantity"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {orderData.quantity && orderData.printType && calculateEstimate() > 0 && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Estimated Total:</span>
                          <span className="text-2xl font-bold text-blue-600">
                            ₦{calculateEstimate().toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Final price will be confirmed after file review
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {orderData.service === 'bulk' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                      <div>
                        <h4 className="text-sm font-medium text-yellow-800">Bulk Order Information</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          For bulk orders (300,000+ units), please proceed to upload your files and provide details. 
                          Our team will contact you with a custom quote within 2 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: File Upload */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Your Files</h2>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Design Files</h3>
                  <p className="text-gray-600 mb-4">
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
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer inline-block"
                  >
                    Choose Files
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    Supported formats: PDF, JPG, PNG, AI, PSD, EPS (Max 50MB per file)
                  </p>
                </div>

                {orderData.files.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Uploaded Files:</h4>
                    {orderData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">Important Notes:</h4>
                      <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                        <li>• All files will be reviewed before printing</li>
                        <li>• You'll receive approval confirmation via email/call</li>
                        <li>• High-resolution files ensure best print quality</li>
                        <li>• Include bleed areas for full-coverage designs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Customer Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={orderData.customerInfo.name}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, name: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={orderData.customerInfo.email}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, email: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={orderData.customerInfo.phone}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, phone: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      value={orderData.customerInfo.company}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, company: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Company name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    value={orderData.customerInfo.address}
                    onChange={(e) => setOrderData({
                      ...orderData,
                      customerInfo: { ...orderData.customerInfo, address: e.target.value }
                    })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter complete delivery address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={orderData.customerInfo.city}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, city: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <select
                      value={orderData.customerInfo.state}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        customerInfo: { ...orderData.customerInfo, state: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Option
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="delivery"
                        value="standard"
                        checked={orderData.deliveryOption === 'standard'}
                        onChange={(e) => setOrderData({ ...orderData, deliveryOption: e.target.value })}
                        className="mr-3"
                      />
                      <span>Standard Delivery (24-48 hours) - Free within Lagos</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="delivery"
                        value="express"
                        checked={orderData.deliveryOption === 'express'}
                        onChange={(e) => setOrderData({ ...orderData, deliveryOption: e.target.value })}
                        className="mr-3"
                      />
                      <span>Express Delivery (Same day) - ₦5,000 extra</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Service Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Service:</span>
                          <span className="font-medium">
                            {services.find(s => s.id === orderData.service)?.name}
                          </span>
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
                        <div className="flex justify-between">
                          <span>Files:</span>
                          <span className="font-medium">{orderData.files.length} file(s)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Customer Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Name:</span>
                          <span className="font-medium">{orderData.customerInfo.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Email:</span>
                          <span className="font-medium">{orderData.customerInfo.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Phone:</span>
                          <span className="font-medium">{orderData.customerInfo.phone}</span>
                        </div>
                        {orderData.deliveryOption && (
                          <div className="flex justify-between">
                            <span>Delivery:</span>
                            <span className="font-medium capitalize">{orderData.deliveryOption}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {calculateEstimate() > 0 && (
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Estimated Total:</span>
                        <span className="text-2xl font-bold text-blue-600">
                          ₦{calculateEstimate().toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Final price will be confirmed after file review and approval
                      </p>
                    </div>
                  )}

                  {orderData.service === 'bulk' && (
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Pricing:</span>
                        <span className="text-lg font-bold text-blue-600">Custom Quote</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Our team will contact you with a detailed quote within 2 hours
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    value={orderData.specialInstructions}
                    onChange={(e) => setOrderData({ ...orderData, specialInstructions: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special requirements or instructions..."
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">What happens next?</h4>
                      <ul className="text-sm text-blue-700 mt-1 space-y-1">
                        <li>• We'll review your files and contact you for approval</li>
                        <li>• You'll receive a call or email within 2 hours</li>
                        <li>• Payment is required before printing begins</li>
                        <li>• Delivery within 24-48 hours after approval</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-semibold ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              
              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !orderData.service) ||
                    (currentStep === 1 && orderData.service !== 'bulk' && (!orderData.printType || !orderData.quantity)) ||
                    (currentStep === 2 && orderData.files.length === 0) ||
                    (currentStep === 3 && (!orderData.customerInfo.name || !orderData.customerInfo.email || !orderData.customerInfo.phone))
                  }
                  className={`px-6 py-3 rounded-lg font-semibold ${
                    (currentStep === 1 && !orderData.service) ||
                    (currentStep === 1 && orderData.service !== 'bulk' && (!orderData.printType || !orderData.quantity)) ||
                    (currentStep === 2 && orderData.files.length === 0) ||
                    (currentStep === 3 && (!orderData.customerInfo.name || !orderData.customerInfo.email || !orderData.customerInfo.phone))
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={submitOrder}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Submit Order
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Need Help with Your Order?</h2>
            <p className="text-blue-100">Our team is here to assist you every step of the way</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <Phone className="h-8 w-8 mx-auto text-blue-200" />
              <h3 className="font-semibold">Call Us</h3>
              <p className="text-blue-100">+234-800-CLOUD-PRINT</p>
            </div>
            
            <div className="space-y-2">
              <Mail className="h-8 w-8 mx-auto text-blue-200" />
              <h3 className="font-semibold">Email Us</h3>
              <p className="text-blue-100">orders@cloudprint.dev</p>
            </div>
            
            <div className="space-y-2">
              <Calendar className="h-8 w-8 mx-auto text-blue-200" />
              <h3 className="font-semibold">Support Hours</h3>
              <p className="text-blue-100">Mon-Fri: 8AM-6PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderPage;