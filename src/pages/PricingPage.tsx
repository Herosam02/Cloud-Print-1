import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  X, 
  Crown, 
  Zap, 
  Users, 
  Clock,
  Shield,
  Truck,
  Phone,
  Mail
} from 'lucide-react';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  const subscriptionPlans = [
    {
      name: "Starter",
      icon: <Zap className="h-8 w-8" />,
      description: "Perfect for small businesses and individuals",
      monthlyPrice: 15000,
      quarterlyPrice: 40000,
      features: [
        "Up to 1,000 pages/month",
        "Black & white printing",
        "Basic templates",
        "Email support",
        "24-48hr delivery",
        "Lagos delivery included"
      ],
      limitations: [
        "No color printing",
        "Limited template access",
        "No priority support"
      ],
      popular: false,
      link: "/order?plan=starter"
    },
    {
      name: "Professional",
      icon: <Crown className="h-8 w-8" />,
      description: "Ideal for growing businesses with regular printing needs",
      monthlyPrice: 35000,
      quarterlyPrice: 90000,
      features: [
        "Up to 5,000 pages/month",
        "Color & B&W printing",
        "Premium templates",
        "Priority email support",
        "24hr delivery guarantee",
        "Nationwide delivery",
        "Design assistance",
        "Bulk order discounts"
      ],
      limitations: [
        "Limited to 5,000 pages"
      ],
      popular: true,
      link: "/order?plan=professional"
    },
    {
      name: "Enterprise",
      icon: <Users className="h-8 w-8" />,
      description: "For large organizations with high-volume printing",
      monthlyPrice: 75000,
      quarterlyPrice: 200000,
      features: [
        "Unlimited printing",
        "All printing options",
        "Custom templates",
        "Dedicated account manager",
        "Same-day delivery*",
        "Global delivery options",
        "Custom design service",
        "Volume pricing",
        "API integration",
        "White-label options"
      ],
      limitations: [],
      popular: false,
      link: "/order?plan=enterprise"
    }
  ];

  const payAsYouGoPricing = [
    {
      category: "Document Printing",
      items: [
        { name: "Black & White (A4)", price: "₦50", unit: "per page" },
        { name: "Color (A4)", price: "₦150", unit: "per page" },
        { name: "Black & White (A3)", price: "₦100", unit: "per page" },
        { name: "Color (A3)", price: "₦300", unit: "per page" }
      ]
    },
    {
      category: "Business Cards",
      items: [
        { name: "Standard (500 pcs)", price: "₦15,000", unit: "per batch" },
        { name: "Premium (500 pcs)", price: "₦25,000", unit: "per batch" },
        { name: "Luxury (500 pcs)", price: "₦40,000", unit: "per batch" }
      ]
    },
    {
      category: "Marketing Materials",
      items: [
        { name: "Flyers (A5)", price: "₦200", unit: "per piece" },
        { name: "Brochures (A4)", price: "₦500", unit: "per piece" },
        { name: "Posters (A2)", price: "₦2,000", unit: "per piece" },
        { name: "Banners", price: "₦5,000", unit: "per sqm" }
      ]
    },
    {
      category: "Merchandise",
      items: [
        { name: "T-Shirts", price: "₦3,500", unit: "per piece" },
        { name: "Mugs", price: "₦2,500", unit: "per piece" },
        { name: "Bags", price: "₦4,000", unit: "per piece" },
        { name: "Custom Items", price: "Quote", unit: "on request" }
      ]
    }
  ];

  const bulkDiscounts = [
    { quantity: "1,000 - 9,999", discount: "5%" },
    { quantity: "10,000 - 49,999", discount: "10%" },
    { quantity: "50,000 - 99,999", discount: "15%" },
    { quantity: "100,000 - 299,999", discount: "20%" },
    { quantity: "300,000+", discount: "25%" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Transparent Pricing</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Choose between flexible subscription plans or pay-as-you-go pricing. 
              No hidden fees, no setup costs, no maintenance charges.
            </p>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Subscription Plans</h2>
            <p className="text-xl text-gray-600 mb-8">
              Save money with our subscription plans. Cancel anytime, no contracts.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`font-medium ${billingCycle === 'monthly' ? 'text-blue-600' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'quarterly' : 'monthly')}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'quarterly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`font-medium ${billingCycle === 'quarterly' ? 'text-blue-600' : 'text-gray-500'}`}>
                Quarterly
                <span className="ml-1 text-sm text-green-600 font-semibold">(Save 20%)</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative rounded-2xl shadow-lg ${
                  plan.popular 
                    ? 'border-2 border-blue-500 bg-white' 
                    : 'border border-gray-200 bg-white'
                } p-8 hover:shadow-xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    plan.popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold text-gray-900">
                    ₦{(billingCycle === 'monthly' ? plan.monthlyPrice : plan.quarterlyPrice).toLocaleString()}
                    <span className="text-lg font-normal text-gray-500">
                      /{billingCycle === 'monthly' ? 'month' : '3 months'}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, idx) => (
                    <li key={idx} className="flex items-center">
                      <X className="h-5 w-5 text-red-400 mr-3" />
                      <span className="text-gray-500">{limitation}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.link}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-center block transition-all duration-300 ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pay-as-you-go Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pay-as-you-go Pricing</h2>
            <p className="text-xl text-gray-600">
              No commitments. Pay only for what you print with our transparent pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {payAsYouGoPricing.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                <div className="space-y-4">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-700 font-medium">{item.name}</span>
                      <div className="text-right">
                        <span className="text-xl font-bold text-blue-600">{item.price}</span>
                        <span className="text-sm text-gray-500 ml-1">{item.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Discounts */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Volume Discounts</h2>
            <p className="text-xl text-gray-600">
              The more you print, the more you save. Automatic discounts applied to large orders.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white py-4 px-6">
              <h3 className="text-xl font-semibold">Bulk Order Discounts</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bulkDiscounts.map((tier, index) => (
                  <div key={index} className="flex justify-between items-center py-4 px-6 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{tier.quantity} units</span>
                    <span className="text-2xl font-bold text-green-600">{tier.discount} OFF</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-center">
                  <strong>Special:</strong> Orders of 300,000+ units qualify for custom pricing and dedicated support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What's Included</h2>
            <p className="text-xl text-gray-600">
              All plans include these essential services at no extra cost
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Quality Guarantee</h3>
              <p className="text-gray-600">100% satisfaction guarantee on all prints</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Free Delivery</h3>
              <p className="text-gray-600">Free delivery within Lagos State</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Fast Turnaround</h3>
              <p className="text-gray-600">24-48 hour delivery guarantee</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Phone className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold">Approval Process</h3>
              <p className="text-gray-600">Email/call approval for every job</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Saving?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Choose the plan that fits your needs or start with pay-as-you-go. 
            No setup fees, no hidden costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/order" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300"
            >
              Start Printing Now
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;