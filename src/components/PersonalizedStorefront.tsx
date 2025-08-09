import React, { useState, useEffect } from 'react';
import { User, Building, Star, History, BookTemplate as Template, Settings, Download, Eye, Edit, Trash2, Plus, Crown, Award } from 'lucide-react';

interface StorefrontProps {
  userType: 'individual' | 'business' | 'school' | 'church';
  userName: string;
}

const PersonalizedStorefront: React.FC<StorefrontProps> = ({ userType, userName }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [printHistory, setPrintHistory] = useState([]);
  const [savedTemplates, setSavedTemplates] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(1250);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: <User className="h-4 w-4" /> },
    { id: 'templates', name: 'My Templates', icon: <Template className="h-4 w-4" /> },
    { id: 'history', name: 'Print History', icon: <History className="h-4 w-4" /> },
    { id: 'loyalty', name: 'Rewards', icon: <Star className="h-4 w-4" /> },
    { id: 'settings', name: 'Settings', icon: <Settings className="h-4 w-4" /> }
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      type: 'Business Cards',
      quantity: 500,
      status: 'Delivered',
      date: '2024-01-15',
      amount: 15000
    },
    {
      id: 'ORD-002',
      type: 'Flyers',
      quantity: 100,
      status: 'In Progress',
      date: '2024-01-18',
      amount: 20000
    },
    {
      id: 'ORD-003',
      type: 'Banner',
      quantity: 1,
      status: 'Approved',
      date: '2024-01-20',
      amount: 25000
    }
  ];

  const quickActions = [
    { name: 'Business Cards', icon: '💼', popular: true },
    { name: 'Letterheads', icon: '📄', popular: false },
    { name: 'Envelopes', icon: '✉️', popular: true },
    { name: 'ID Cards', icon: '🆔', popular: false },
    { name: 'Certificates', icon: '🏆', popular: true },
    { name: 'Programs', icon: '📋', popular: false }
  ];

  const getStorefrontTitle = () => {
    switch (userType) {
      case 'business':
        return `${userName} Corporate Print Center`;
      case 'school':
        return `${userName} School Print Hub`;
      case 'church':
        return `${userName} Church Print Services`;
      default:
        return `${userName}'s Print Dashboard`;
    }
  };

  const getStorefrontColor = () => {
    switch (userType) {
      case 'business':
        return 'blue';
      case 'school':
        return 'green';
      case 'church':
        return 'purple';
      default:
        return 'indigo';
    }
  };

  const colorClasses = {
    blue: 'bg-blue-600 text-blue-600 border-blue-600',
    green: 'bg-green-600 text-green-600 border-green-600',
    purple: 'bg-purple-600 text-purple-600 border-purple-600',
    indigo: 'bg-indigo-600 text-indigo-600 border-indigo-600'
  };

  const color = getStorefrontColor();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`${colorClasses[color].split(' ')[0]} text-white py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <Building className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{getStorefrontTitle()}</h1>
                <p className="text-white text-opacity-90">
                  Your personalized printing dashboard
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-yellow-300" />
                  <span className="font-semibold">{loyaltyPoints} Points</span>
                </div>
              </div>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-medium transition-colors">
                + New Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? `${colorClasses[color].split(' ')[1]} ${colorClasses[color].split(' ')[2]}`
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${colorClasses[color].split(' ')[0]} bg-opacity-10 rounded-md p-3`}>
                      <History className={`h-6 w-6 ${colorClasses[color].split(' ')[1]}`} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Orders</p>
                    <p className="text-2xl font-semibold text-gray-900">24</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-green-100 rounded-md p-3">
                      <Star className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Loyalty Points</p>
                    <p className="text-2xl font-semibold text-gray-900">{loyaltyPoints}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-yellow-100 rounded-md p-3">
                      <Template className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Saved Templates</p>
                    <p className="text-2xl font-semibold text-gray-900">8</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-purple-100 rounded-md p-3">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">This Month</p>
                    <p className="text-2xl font-semibold text-gray-900">₦85,000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Order</h3>
                <p className="text-sm text-gray-600">Start printing your most common items</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      className={`relative p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-${color}-300 hover:bg-${color}-50 transition-colors text-center group`}
                    >
                      {action.popular && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Popular
                        </div>
                      )}
                      <div className="text-2xl mb-2">{action.icon}</div>
                      <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        {action.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₦{order.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className={`${colorClasses[color].split(' ')[1]} hover:text-${color}-900`}>
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'loyalty' && (
          <div className="space-y-8">
            {/* Loyalty Overview */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-lg text-white p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Loyalty Rewards</h2>
                  <p className="text-yellow-100">Earn points with every order and unlock exclusive benefits</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{loyaltyPoints}</div>
                  <div className="text-yellow-200">Available Points</div>
                </div>
              </div>
            </div>

            {/* Rewards Program */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Redeem Points</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium">₦500 Off Next Order</div>
                      <div className="text-sm text-gray-600">500 points required</div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                      Redeem
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium">Free Business Cards (500 pcs)</div>
                      <div className="text-sm text-gray-600">1000 points required</div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                      Redeem
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg opacity-50">
                    <div>
                      <div className="font-medium">Premium Design Service</div>
                      <div className="text-sm text-gray-600">2000 points required</div>
                    </div>
                    <button className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                      Need More Points
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Referral Program</h3>
                <div className="text-center">
                  <div className="bg-blue-50 rounded-lg p-6 mb-4">
                    <div className="text-2xl font-bold text-blue-600 mb-2">₦500</div>
                    <div className="text-sm text-gray-600">For you and your friend when they place their first order</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Your Referral Code:</div>
                    <div className="font-mono text-lg font-bold text-blue-600">PRINT{userName.toUpperCase()}24</div>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700">
                    Share Referral Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedStorefront;