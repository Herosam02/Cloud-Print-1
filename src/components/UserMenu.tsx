import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Settings, 
  Package, 
  Heart, 
  CreditCard, 
  LogOut, 
  ChevronDown,
  Bell,
  Star,
  History,
  Users,
  Crown
} from 'lucide-react';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    accountType: string;
    loyaltyPoints: number;
  };
  onSignOut: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      icon: <User className="h-4 w-4" />,
      label: 'My Profile',
      href: '/profile',
      description: 'Manage your account settings'
    },
    {
      icon: <Package className="h-4 w-4" />,
      label: 'My Orders',
      href: '/orders',
      description: 'View order history and track shipments'
    },
    {
      icon: <Star className="h-4 w-4" />,
      label: 'Loyalty Rewards',
      href: '/rewards',
      description: `${user.loyaltyPoints} points available`
    },
    {
      icon: <Heart className="h-4 w-4" />,
      label: 'Saved Templates',
      href: '/templates',
      description: 'Your favorite designs'
    },
    {
      icon: <CreditCard className="h-4 w-4" />,
      label: 'Invoices & Receipts',
      href: '/invoices',
      description: 'View billing documents'
    },
    {
      icon: <Bell className="h-4 w-4" />,
      label: 'Notifications',
      href: '/profile',
      description: 'Order updates and promotions'
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: 'Settings',
      href: '/profile',
      description: 'Account preferences'
    }
  ];

  if (user.accountType === 'business' || user.accountType === 'organization') {
    menuItems.splice(2, 0, {
      icon: <Users className="h-4 w-4" />,
      label: 'Team Management',
      href: '/profile',
      description: 'Manage team members and permissions'
    });
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="relative">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
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
        
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-xs text-gray-500 capitalize">{user.accountType} Account</div>
        </div>
        
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  {user.loyaltyPoints >= 1000 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Crown className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                      {user.accountType}
                    </span>
                    {user.loyaltyPoints >= 1000 && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        VIP Member
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Loyalty Points */}
              <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">Loyalty Points</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{user.loyaltyPoints}</span>
                </div>
                <div className="mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((user.loyaltyPoints % 1000) / 10, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {1000 - (user.loyaltyPoints % 1000)} points to next reward
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="text-gray-500">{item.icon}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Sign Out */}
            <div className="border-t border-gray-100 pt-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onSignOut();
                }}
                className="flex items-center space-x-3 px-4 py-3 w-full text-left hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4 text-red-500" />
                <div>
                  <div className="text-sm font-medium text-red-600">Sign Out</div>
                  <div className="text-xs text-red-500">Sign out of your account</div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;