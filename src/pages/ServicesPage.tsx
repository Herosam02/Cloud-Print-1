import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  CreditCard, 
  Image, 
  Megaphone, 
  Package, 
  Users,
  CheckCircle,
  Clock,
  Palette,
  Truck,
  Shirt,
  Coffee,
  Home,
  Baby,
  Laptop,
  Briefcase,
  Star,
  Dog
} from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      icon: <CreditCard className="h-12 w-12 text-blue-600" />,
      title: "Business Cards",
      description: "Professional business cards with premium finishes",
      features: ["Premium cardstock", "Multiple finishes", "Custom designs", "Bulk discounts"],
      pricing: "From ₦15/card",
      link: "/order?service=business-cards"
    },
    {
      icon: <FileText className="h-12 w-12 text-green-600" />,
      title: "Document Printing",
      description: "High-quality document printing in B&W or color",
      features: ["Black & white printing", "Color printing", "Various paper sizes", "Binding options"],
      pricing: "From ₦50/page",
      link: "/order?service=documents"
    },
    {
      icon: <Image className="h-12 w-12 text-purple-600" />,
      title: "Flyers & Brochures",
      description: "Eye-catching marketing materials",
      features: ["Glossy or matte finish", "Multiple sizes", "Folding options", "Design assistance"],
      pricing: "From ₦200/piece",
      link: "/order?service=flyers"
    },
    {
      icon: <Megaphone className="h-12 w-12 text-orange-600" />,
      title: "Banners & Posters",
      description: "Large format printing for events and advertising",
      features: ["Weather resistant", "Multiple materials", "Custom sizes", "Indoor/outdoor options"],
      pricing: "From ₦5,000/sqm",
      link: "/order?service=banners"
    },
    {
      icon: <Package className="h-12 w-12 text-pink-600" />,
      title: "Merchandise Printing",
      description: "Custom branded merchandise and promotional items",
      features: ["T-shirts & apparel", "Mugs & drinkware", "Bags & accessories", "Corporate gifts"],
      pricing: "From ₦2,500/item",
      link: "/order?service=merchandise"
    },
    {
      icon: <Users className="h-12 w-12 text-indigo-600" />,
      title: "Bulk Orders",
      description: "Large volume printing with competitive rates",
      features: ["300,000+ units", "Volume discounts", "Dedicated support", "Custom logistics"],
      pricing: "Custom pricing",
      link: "/order?service=bulk"
    }
  ];

  const productCategories = [
    {
      title: "Apparel",
      icon: <Shirt className="h-10 w-10 text-red-600" />,
      description: "Custom t-shirts, hoodies, and clothing with your designs",
      features: ["High-quality fabrics", "Multiple sizes", "Durable prints", "Fast turnaround"],
      link: "/order?category=apparel"
    },
    {
      title: "Accessories",
      icon: <Package className="h-10 w-10 text-green-600" />,
      description: "Bags, hats, and custom accessories for every occasion",
      features: ["Premium materials", "Custom branding", "Bulk discounts", "Gift packaging"],
      link: "/order?category=accessories"
    },
    {
      title: "Home Decor",
      icon: <Home className="h-10 w-10 text-blue-600" />,
      description: "Wall art, cushions, and personalized home items",
      features: ["Canvas prints", "Custom cushions", "Wall decals", "Photo frames"],
      link: "/order?category=home-decor"
    },
    {
      title: "Drinkware",
      icon: <Coffee className="h-10 w-10 text-amber-600" />,
      description: "Mugs, bottles, and custom drinkware for any brand",
      features: ["Ceramic & steel", "Dishwasher safe", "Custom colors", "Logo printing"],
      link: "/order?category=drinkware"
    },
    {
      title: "Stationery",
      icon: <FileText className="h-10 w-10 text-purple-600" />,
      description: "Notebooks, pens, and professional office supplies",
      features: ["Premium paper", "Custom covers", "Bulk orders", "Corporate branding"],
      link: "/order?category=stationery"
    },
    {
      title: "Art Prints",
      icon: <Image className="h-10 w-10 text-pink-600" />,
      description: "High-quality canvas prints and wall art",
      features: ["Gallery quality", "Multiple sizes", "Framing options", "Fine art paper"],
      link: "/order?category=art-prints"
    },
    {
      title: "Kids & Baby",
      icon: <Baby className="h-10 w-10 text-cyan-600" />,
      description: "Safe, custom children's clothing and accessories",
      features: ["Organic materials", "Safe inks", "Fun designs", "Size variety"],
      link: "/order?category=kids-baby"
    },
    {
      title: "Pet Products",
      icon: <Dog className="h-10 w-10 text-orange-600" />,
      description: "Custom pet accessories, toys, and supplies",
      features: ["Pet-safe materials", "Durable designs", "Custom sizing", "Fun patterns"],
      link: "/order?category=pet-products"
    },
    {
      title: "Tech Accessories",
      icon: <Laptop className="h-10 w-10 text-indigo-600" />,
      description: "Phone cases, laptop sleeves, and tech gear",
      features: ["Device protection", "Custom fit", "Durable materials", "Modern designs"],
      link: "/order?category=tech-accessories"
    },
    {
      title: "Office & Business",
      icon: <Briefcase className="h-10 w-10 text-gray-600" />,
      description: "Professional business cards, folders, and corporate items",
      features: ["Professional finish", "Brand consistency", "Bulk pricing", "Quick delivery"],
      link: "/order?category=office-business"
    },
    {
      title: "Specialty Items",
      icon: <Star className="h-10 w-10 text-yellow-600" />,
      description: "Unique and custom specialty products for special occasions",
      features: ["Custom designs", "Premium materials", "Personal touch", "Gift wrapping"],
      link: "/order?category=specialty-items"
    }
  ];

  const printingOptions = [
    {
      title: "Black & White Printing",
      description: "Cost-effective monochrome printing for documents, reports, and text-heavy materials",
      benefits: ["Lower cost per page", "Fast processing", "Professional quality", "Ideal for documents"]
    },
    {
      title: "Color Printing",
      description: "Vibrant full-color printing for marketing materials, presentations, and visual content",
      benefits: ["High-quality colors", "Professional finish", "Brand consistency", "Eye-catching results"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Our Cloud Printing Services</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Professional printing services delivered through our advanced cloud infrastructure. 
              No printers needed - we handle everything from design to delivery.
            </p>
            <Link 
              to="/order" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 inline-flex items-center"
            >
              Get Started Now
              <CheckCircle className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Printing Solutions</h2>
            <p className="text-xl text-gray-600">
              From business cards to large format banners, we've got all your printing needs covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">{service.pricing}</span>
                    <span className="text-sm text-gray-500">Starting price</span>
                  </div>
                  <Link 
                    to={service.link}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories - Now with Card Layout */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Product Categories</h2>
            <p className="text-xl text-gray-600">
              Explore our wide range of customizable products for every need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-6">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {category.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  to={category.link}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                >
                  Explore {category.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Printing Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Printing Options</h2>
            <p className="text-xl text-gray-600">
              Choose between black & white or color printing based on your needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {printingOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{option.title}</h3>
                <p className="text-gray-600 mb-6">{option.description}</p>
                
                <ul className="space-y-3">
                  {option.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Service Process</h2>
            <p className="text-xl text-gray-600">
              Every print job goes through our quality-controlled approval process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                <Palette className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Design Upload</h3>
              <p className="text-gray-600">Upload your files or use our free templates</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Approval Required</h3>
              <p className="text-gray-600">We contact you via email or call for job approval</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                <Clock className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Cloud Processing</h3>
              <p className="text-gray-600">Your job is processed in our cloud infrastructure</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                <Truck className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold">Fast Delivery</h3>
              <p className="text-gray-600">Delivered within 24-48 hours to your location</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Cloud Printing?</h2>
          <p className="text-xl mb-8 text-blue-100">
            No setup fees, no maintenance costs, no hassle. Just professional printing delivered fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/order" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300"
            >
              Place Your Order
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Get Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
