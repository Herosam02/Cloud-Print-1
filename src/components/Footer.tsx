import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Cloud className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Cloud Print</span>
              <span className="text-sm text-gray-400">.dev</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Professional cloud-based printing services for businesses and individuals. 
              No printers needed - we handle everything from design to delivery.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/cloudprint" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/cloudprint" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/cloudprint" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/cloudprint" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Our Services</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing Plans</Link></li>
              <li><Link to="/templates" className="text-gray-300 hover:text-white transition-colors">Free Templates</Link></li>
              <li><Link to="/order" className="text-gray-300 hover:text-white transition-colors">Place Order</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><a href="https://support.cloudprint.dev" className="text-gray-300 hover:text-white transition-colors">Support Center</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li><a href="/services/business-cards" className="text-gray-300 hover:text-white transition-colors">Business Cards</a></li>
              <li><a href="/services/flyers" className="text-gray-300 hover:text-white transition-colors">Flyers & Brochures</a></li>
              <li><a href="/services/banners" className="text-gray-300 hover:text-white transition-colors">Banners & Posters</a></li>
              <li><a href="/services/documents" className="text-gray-300 hover:text-white transition-colors">Document Printing</a></li>
              <li><a href="/services/merchandise" className="text-gray-300 hover:text-white transition-colors">Merchandise</a></li>
              <li><a href="/services/bulk" className="text-gray-300 hover:text-white transition-colors">Bulk Orders</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-gray-300">+234-800-CLOUD-PRINT</p>
                  <p className="text-gray-300">+234-901-234-5678</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-gray-300">orders@cloudprint.dev</p>
                  <p className="text-gray-300">support@cloudprint.dev</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <p className="text-gray-300">Lagos, Nigeria<br />Nationwide Delivery</p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-400 mt-0.5" />
                <p className="text-gray-300">24/7 Online Orders<br />Mon-Fri: 8AM-6PM Support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Cloud Print. All rights reserved. | 
              <a href="/privacy" className="hover:text-white ml-1">Privacy Policy</a> | 
              <a href="/terms" className="hover:text-white ml-1">Terms of Service</a>
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400 text-sm">
                Powered by advanced cloud printing technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;