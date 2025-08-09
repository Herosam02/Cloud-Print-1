import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cloud, Menu, X, Phone, Mail, User, Crown, Star } from 'lucide-react';
import UserMenu from './UserMenu';
import AuthModal from './AuthModal';
import { useAuth } from '../hooks/useAuth';
import coudprintngimg from './Gemini_Generated_Image_29l8nx29l8nx29l8-removebg-preview.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const location = useLocation();
  const { user, isAuthenticated, signOut } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Templates', href: '/templates' },
    { name: 'Professionals', href: '/professionals' },
    { name: 'Order Now', href: '/order' },
    { name: 'Invoices', href: '/invoices' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = () => {
    signOut();
  };

  const openSignIn = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const openSignUp = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        {/* Top bar */}
        <div className="bg-blue-600 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+234-800-CLOUD-PRINT</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>orders@cloudprint.dev</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                {isAuthenticated && user ? (
                  <div className="flex items-center space-x-4">
                    {/* User Info Display */}
                    <div className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg px-4 py-2">
                      <div className="relative">
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4" />
                          </div>
                        )}
                        {user.loyaltyPoints >= 1000 && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
                            <Crown className="h-2 w-2 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="hidden md:block">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-white">{user.name}</span>
                          <span className="text-blue-200">•</span>
                          <span className="text-blue-100">{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full capitalize">
                            {user.accountType}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-300" />
                            <span className="text-xs text-blue-100">{user.loyaltyPoints} pts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <span className="hidden md:block">Free delivery within Lagos • 24-48hr turnaround</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img src={coudprintngimg} alt="" className='h-20 w-20' />
                <span className="text-2xl font-bold text-gray-900">CloudPrintng</span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-1 py-1 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons / User Menu */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated && user ? (
                <UserMenu user={user} onSignOut={handleSignOut} />
              ) : (
                <>
                  <button
                    onClick={openSignIn}
                    className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={openSignUp}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Auth Buttons / User Info */}
                {isAuthenticated && user ? (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="px-3 py-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          {user.avatar ? (
                            <img 
                              src={user.avatar} 
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          {user.loyaltyPoints >= 1000 && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                              <Crown className="h-2 w-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-base font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                              {user.accountType}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span className="text-xs text-gray-600">{user.loyaltyPoints}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 mt-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <button
                      onClick={() => {
                        openSignIn();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        openSignUp();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode={authMode}
        />
      )}
    </>
  );
};

export default Header;