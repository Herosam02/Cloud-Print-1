import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  Eye, 
  Download, 
  RefreshCw,
  Search,
  Filter,
  Calendar,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  AlertCircle,
  FileText,
  CreditCard
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'approved' | 'printing' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    name: string;
    quantity: number;
    price: number;
    thumbnail?: string;
  }[];
  total: number;
  deliveryAddress: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  driverInfo?: {
    name: string;
    phone: string;
  };
}

const OrdersPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('cloudprint-orders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        if (Array.isArray(parsedOrders)) {
          // Merge with mock orders
          setOrders([...parsedOrders, ...orders]);
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    }
  }, []);

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-01-20T10:30:00Z',
      status: 'delivered',
      items: [
        { name: 'Business Cards - Premium', quantity: 500, price: 25000, thumbnail: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=100' },
        { name: 'Letterheads', quantity: 100, price: 15000 }
      ],
      total: 40000,
      deliveryAddress: '123 Victoria Island, Lagos',
      estimatedDelivery: '2024-01-22T14:00:00Z',
      trackingNumber: 'CP2024001',
      driverInfo: {
        name: 'Adebayo Johnson',
        phone: '+234-901-234-5678'
      }
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-01-18T15:45:00Z',
      status: 'printing',
      items: [
        { name: 'Event Flyers', quantity: 200, price: 40000, thumbnail: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=100' }
      ],
      total: 40000,
      deliveryAddress: '456 Ikoyi, Lagos',
      estimatedDelivery: '2024-01-21T16:00:00Z'
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '2024-01-15T09:20:00Z',
      status: 'shipped',
      items: [
        { name: 'Banner - Large Format', quantity: 1, price: 35000 },
        { name: 'Brochures', quantity: 50, price: 25000 }
      ],
      total: 60000,
      deliveryAddress: '789 Lekki, Lagos',
      estimatedDelivery: '2024-01-21T12:00:00Z',
      trackingNumber: 'CP2024003',
      driverInfo: {
        name: 'Fatima Abubakar',
        phone: '+234-902-345-6789'
      }
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-004',
      date: '2024-01-10T14:15:00Z',
      status: 'pending',
      items: [
        { name: 'Custom T-Shirts', quantity: 25, price: 87500 }
      ],
      total: 87500,
      deliveryAddress: '321 Surulere, Lagos'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'printing':
        return 'bg-purple-100 text-purple-800';
      case 'shipped':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'printing':
        return <RefreshCw className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 mt-1">Track and manage your printing orders</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {orders.length} Total Orders
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="printing">Printing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                {/* Order Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                      <Package className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{order.orderNumber}</h3>
                      <p className="text-gray-600">Ordered on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-2 capitalize">{order.status}</span>
                    </span>
                    <span className="text-2xl font-bold text-gray-900">₦{order.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Items Ordered</h4>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          {item.thumbnail ? (
                            <img src={item.thumbnail} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              <FileText className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <span className="font-semibold text-gray-900">₦{item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Delivery Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">Delivery Address</p>
                          <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                        </div>
                      </div>
                      
                      {order.estimatedDelivery && (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">Estimated Delivery</p>
                            <p className="text-sm text-gray-600">{new Date(order.estimatedDelivery).toLocaleString()}</p>
                          </div>
                        </div>
                      )}

                      {order.trackingNumber && (
                        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                          <Truck className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-blue-900">Tracking Number</p>
                            <p className="text-sm text-blue-700 font-mono">{order.trackingNumber}</p>
                          </div>
                        </div>
                      )}

                      {order.driverInfo && (
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                          <Phone className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-900">Driver: {order.driverInfo.name}</p>
                            <p className="text-sm text-green-700">{order.driverInfo.phone}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                  <Link
                    to={`/invoice/${order.id}`}
                    className="bg-purple-100 text-purple-700 py-2 px-4 rounded-lg font-medium hover:bg-purple-200 transition-colors flex items-center"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Invoice
                  </Link>
                  
                  {order.status === 'delivered' && (
                    <>
                      <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition-colors flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Download Invoice
                      </button>
                      <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors flex items-center">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reorder
                      </button>
                      <button className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg font-medium hover:bg-yellow-200 transition-colors flex items-center">
                        <Star className="h-4 w-4 mr-2" />
                        Rate Order
                      </button>
                    </>
                  )}
                  
                  {(order.status === 'shipped' || order.status === 'printing') && order.trackingNumber && (
                    <button className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-medium hover:bg-orange-200 transition-colors flex items-center">
                      <Truck className="h-4 w-4 mr-2" />
                      Track Order
                    </button>
                  )}

                  {order.driverInfo && (order.status === 'shipped') && (
                    <>
                      <a
                        href={`tel:${order.driverInfo.phone}`}
                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors flex items-center"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Driver
                      </a>
                      <a
                        href={`https://wa.me/${order.driverInfo.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition-colors flex items-center"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </a>
                    </>
                  )}

                  {order.status === 'pending' && (
                    <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors">
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Package className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : "You haven't placed any orders yet"
              }
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Place Your First Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;