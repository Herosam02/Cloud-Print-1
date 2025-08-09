import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin,
  Phone,
  MessageCircle,
  Eye,
  Download
} from 'lucide-react';

interface OrderTrackingProps {
  orderId: string;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId }) => {
  const [orderStatus, setOrderStatus] = useState('processing');
  const [trackingData, setTrackingData] = useState({
    orderId: 'ORD-2024-001',
    status: 'printing',
    estimatedDelivery: '2024-01-22 14:00',
    currentLocation: 'Cloud Print Lagos Facility',
    driverName: 'Adebayo Johnson',
    driverPhone: '+234-901-234-5678',
    orderDetails: {
      items: ['Business Cards - 500 pcs', 'Letterheads - 100 pcs'],
      total: '₦25,000',
      paymentStatus: 'Paid'
    }
  });

  const statusSteps = [
    {
      id: 'received',
      name: 'Order Received',
      description: 'Your order has been received and is being reviewed',
      icon: <Package className="h-5 w-5" />,
      completed: true,
      timestamp: '2024-01-20 09:30'
    },
    {
      id: 'approved',
      name: 'Approved',
      description: 'Order approved and ready for printing',
      icon: <CheckCircle className="h-5 w-5" />,
      completed: true,
      timestamp: '2024-01-20 11:15'
    },
    {
      id: 'printing',
      name: 'Printing',
      description: 'Your order is currently being printed',
      icon: <Clock className="h-5 w-5" />,
      completed: false,
      current: true,
      timestamp: '2024-01-21 08:00'
    },
    {
      id: 'quality-check',
      name: 'Quality Check',
      description: 'Ensuring print quality meets our standards',
      icon: <Eye className="h-5 w-5" />,
      completed: false,
      current: false
    },
    {
      id: 'packaging',
      name: 'Packaging',
      description: 'Carefully packaging your order for delivery',
      icon: <Package className="h-5 w-5" />,
      completed: false,
      current: false
    },
    {
      id: 'out-for-delivery',
      name: 'Out for Delivery',
      description: 'Your order is on its way to you',
      icon: <Truck className="h-5 w-5" />,
      completed: false,
      current: false
    },
    {
      id: 'delivered',
      name: 'Delivered',
      description: 'Order successfully delivered',
      icon: <CheckCircle className="h-5 w-5" />,
      completed: false,
      current: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Track Your Order</h1>
            <p className="text-gray-600">Order ID: {trackingData.orderId}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Estimated Delivery</div>
            <div className="text-lg font-semibold text-blue-600">
              {new Date(trackingData.estimatedDelivery).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-full">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-blue-900">Currently Printing</div>
              <div className="text-sm text-blue-700">Your order is being processed at our Lagos facility</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Progress</h2>
        
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          <div className="space-y-6">
            {statusSteps.map((step, index) => (
              <div key={step.id} className="relative flex items-start space-x-4">
                {/* Status Icon */}
                <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step.completed 
                    ? 'bg-green-600 border-green-600 text-white' 
                    : step.current
                      ? 'bg-blue-600 border-blue-600 text-white animate-pulse'
                      : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {step.icon}
                </div>
                
                {/* Status Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-medium ${
                      step.completed || step.current ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </h3>
                    {step.timestamp && (
                      <span className="text-xs text-gray-500">{step.timestamp}</span>
                    )}
                  </div>
                  <p className={`text-sm ${
                    step.completed || step.current ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
          <div className="space-y-3">
            {trackingData.orderDetails.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{item}</span>
              </div>
            ))}
            <div className="border-t pt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{trackingData.orderDetails.total}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Payment Status</span>
                <span>{trackingData.orderDetails.paymentStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">Current Location</div>
                <div className="text-sm text-gray-600">{trackingData.currentLocation}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">Delivery Driver</div>
                <div className="text-sm text-gray-600">{trackingData.driverName}</div>
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <a
                href={`tel:${trackingData.driverPhone}`}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center flex items-center justify-center"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Driver
              </a>
              <a
                href={`https://wa.me/${trackingData.driverPhone.replace(/[^0-9]/g, '')}`}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors text-center flex items-center justify-center"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="bg-blue-100 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-200 transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download Invoice
          </button>
          <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center">
            <Package className="h-4 w-4 mr-2" />
            Reorder Items
          </button>
          <button className="bg-green-100 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-200 transition-colors flex items-center">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Support
          </button>
        </div>
      </div>

      {/* Live Updates */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Clock className="h-5 w-5 text-yellow-600" />
          <div>
            <div className="font-medium text-yellow-900">Live Updates</div>
            <div className="text-sm text-yellow-700">
              You'll receive SMS and email notifications as your order progresses. 
              Track in real-time or contact us for immediate updates.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;