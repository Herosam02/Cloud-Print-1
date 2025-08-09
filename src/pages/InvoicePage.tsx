import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InvoiceDownloader from '../components/InvoiceDownloader';
import { Download, Printer as Print, Mail, ArrowLeft, Calendar, MapPin, Phone, CreditCard, CheckCircle, FileText, Building, User, Hash, DollarSign } from 'lucide-react';

interface InvoiceData {
  id: string;
  invoiceNumber: string;
  orderNumber: string;
  type: 'invoice' | 'receipt';
  date: string;
  dueDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  customer: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    address: string;
    city: string;
    state: string;
  };
  items: {
    id: string;
    name: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod?: string;
  paymentDate?: string;
  transactionId?: string;
  notes?: string;
}

const InvoicePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDownloader, setShowDownloader] = useState(false);
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoice();
  }, [id]);

  const loadInvoice = () => {
    // In a real app, this would fetch from an API
    // For demo, we'll create mock data
    const mockInvoice: InvoiceData = {
      id: id || '1',
      invoiceNumber: `INV-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      orderNumber: `ORD-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      type: Math.random() > 0.5 ? 'invoice' : 'receipt',
      date: new Date().toISOString(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: Math.random() > 0.3 ? 'paid' : 'pending',
      customer: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+234-901-234-5678',
        company: 'TechCorp Nigeria Ltd',
        address: '123 Victoria Island',
        city: 'Lagos',
        state: 'Lagos'
      },
      items: [
        {
          id: '1',
          name: 'Business Cards',
          description: 'Premium business cards - 500 pieces',
          quantity: 1,
          unitPrice: 25000,
          total: 25000
        },
        {
          id: '2',
          name: 'Letterheads',
          description: 'Company letterheads - 100 pieces',
          quantity: 1,
          unitPrice: 15000,
          total: 15000
        },
        {
          id: '3',
          name: 'Flyers',
          description: 'Marketing flyers - A5 size, 200 pieces',
          quantity: 1,
          unitPrice: 20000,
          total: 20000
        }
      ],
      subtotal: 60000,
      tax: 3000,
      discount: 5000,
      total: 58000,
      paymentMethod: 'Credit Card',
      paymentDate: new Date().toISOString(),
      transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      notes: 'Thank you for your business! All items printed with premium quality materials.'
    };

    setInvoice(mockInvoice);
    setLoading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setShowDownloader(true);
  };

  const handleEmail = () => {
    if (invoice) {
      const subject = `${invoice.type === 'invoice' ? 'Invoice' : 'Receipt'} ${invoice.invoiceNumber}`;
      const body = `Please find attached your ${invoice.type} for order ${invoice.orderNumber}.`;
      window.open(`mailto:${invoice.customer.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (showDownloader && invoice) {
    return (
      <InvoiceDownloader
        invoice={invoice}
        onClose={() => setShowDownloader(false)}
      />
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invoice Not Found</h2>
          <p className="text-gray-600 mb-6">The requested invoice could not be found.</p>
          <button
            onClick={() => navigate('/orders')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Hidden in print */}
      <div className="bg-white shadow-sm print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleEmail}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </button>
              <button
                onClick={handleDownload}
                className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg font-medium hover:bg-amber-200 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </button>
              <button
                onClick={handlePrint}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center"
              >
                <Print className="h-4 w-4 mr-2" />
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:max-w-none">
        <div className="bg-white shadow-lg rounded-lg print:shadow-none print:rounded-none">
          {/* Invoice Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-600 text-white p-2 rounded-lg">
                    <FileText className="h-8 w-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Cloud Print</h1>
                    <p className="text-gray-600">.dev</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>123 Victoria Island, Lagos State</p>
                  <p>Lagos, Nigeria</p>
                  <p>Phone: +234-800-CLOUD-PRINT</p>
                  <p>Email: orders@cloudprint.dev</p>
                </div>
              </div>
              
              <div className="text-right">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                  {invoice.type}
                </h2>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-end space-x-2">
                    <Hash className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{invoice.invoiceNumber}</span>
                  </div>
                  <div className="flex items-center justify-end space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{new Date(invoice.date).toLocaleDateString()}</span>
                  </div>
                  {invoice.dueDate && invoice.type === 'invoice' && (
                    <div className="flex items-center justify-end space-x-2">
                      <span className="text-gray-500">Due:</span>
                      <span>{new Date(invoice.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                    invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {invoice.status === 'paid' && <CheckCircle className="h-4 w-4 mr-1" />}
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Bill To:</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{invoice.customer.name}</span>
                  </div>
                  {invoice.customer.company && (
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span>{invoice.customer.company}</span>
                    </div>
                  )}
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p>{invoice.customer.address}</p>
                      <p>{invoice.customer.city}, {invoice.customer.state}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{invoice.customer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{invoice.customer.email}</span>
                  </div>
                </div>
              </div>

              {invoice.status === 'paid' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Information:</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                      <span>{invoice.paymentMethod}</span>
                    </div>
                    {invoice.paymentDate && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Paid on {new Date(invoice.paymentDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {invoice.transactionId && (
                      <div className="flex items-center space-x-2">
                        <Hash className="h-4 w-4 text-gray-400" />
                        <span className="font-mono text-sm">{invoice.transactionId}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Item</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Qty</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Unit Price</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">{item.quantity}</td>
                      <td className="py-4 px-4 text-right">₦{item.unitPrice.toLocaleString()}</td>
                      <td className="py-4 px-4 text-right font-medium">₦{item.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="mt-8 flex justify-end">
              <div className="w-full max-w-sm space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">₦{invoice.subtotal.toLocaleString()}</span>
                </div>
                {invoice.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-₦{invoice.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (5%):</span>
                  <span className="font-medium">₦{invoice.tax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-emerald-600 break-words">₦{invoice.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {invoice.notes && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Notes:</h4>
                <p className="text-gray-700">{invoice.notes}</p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
              <p className="mb-2">Thank you for choosing Cloud Print!</p>
              <p>For support, contact us at support@cloudprint.dev or +234-800-CLOUD-PRINT</p>
              <p className="mt-2 text-xs">This is a computer-generated document and does not require a signature.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;