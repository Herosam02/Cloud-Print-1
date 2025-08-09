import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Lock,
  Shield,
  DollarSign,
  Banknote,
  Wallet,
  Globe,
  X
} from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'bank' | 'mobile' | 'crypto' | 'paypal';
  icon: React.ReactNode;
  description: string;
  processingFee?: string;
  available: boolean;
}

interface PaymentProcessorProps {
  amount: number;
  orderData: any;
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentError: (error: string) => void;
  onClose: () => void;
}

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  amount,
  orderData,
  onPaymentSuccess,
  onPaymentError,
  onClose
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'method' | 'details' | 'processing' | 'success'>('method');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    phone: '',
    bankCode: '',
    accountNumber: ''
  });

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'paypal',
      name: 'PayPal',
      type: 'paypal',
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      description: 'Pay securely with your PayPal account',
      processingFee: 'Free',
      available: true
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      type: 'card',
      icon: <CreditCard className="h-6 w-6 text-green-600" />,
      description: 'Visa, Mastercard, Verve accepted',
      processingFee: '2.9%',
      available: true
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      type: 'bank',
      icon: <Building className="h-6 w-6 text-blue-700" />,
      description: 'Direct bank transfer (USSD/Internet Banking)',
      processingFee: 'Free',
      available: true
    },
    {
      id: 'mobile-money',
      name: 'Mobile Money',
      type: 'mobile',
      icon: <Smartphone className="h-6 w-6 text-purple-600" />,
      description: 'MTN, Airtel, 9mobile, Glo',
      processingFee: '1.5%',
      available: true
    },
    {
      id: 'ussd',
      name: 'USSD Payment',
      type: 'mobile',
      icon: <Smartphone className="h-6 w-6 text-orange-600" />,
      description: 'Pay with *737# or bank USSD codes',
      processingFee: 'Free',
      available: true
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      type: 'crypto',
      icon: <Wallet className="h-6 w-6 text-yellow-600" />,
      description: 'Bitcoin, Ethereum, USDT',
      processingFee: '1%',
      available: true
    }
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setPaymentStep('details');
  };

  const processPayment = async () => {
    setIsProcessing(true);
    setPaymentStep('processing');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      const method = paymentMethods.find(m => m.id === selectedMethod);
      
      // Simulate different payment flows
      if (selectedMethod === 'paypal') {
        // PayPal integration simulation
        const paypalResult = await simulatePayPalPayment();
        if (paypalResult.success) {
          handlePaymentSuccess(paypalResult);
        } else {
          throw new Error('PayPal payment failed');
        }
      } else if (selectedMethod === 'card') {
        // Card payment simulation
        const cardResult = await simulateCardPayment();
        if (cardResult.success) {
          handlePaymentSuccess(cardResult);
        } else {
          throw new Error('Card payment failed');
        }
      } else {
        // Other payment methods
        const result = await simulateOtherPayment(selectedMethod);
        if (result.success) {
          handlePaymentSuccess(result);
        } else {
          throw new Error(`${method?.name} payment failed`);
        }
      }
    } catch (error) {
      setIsProcessing(false);
      onPaymentError(error instanceof Error ? error.message : 'Payment failed');
    }
  };

  const simulatePayPalPayment = async () => {
    // In production, this would integrate with PayPal SDK
    return {
      success: true,
      transactionId: `PP_${Date.now()}`,
      method: 'PayPal',
      amount: amount,
      currency: 'NGN',
      status: 'completed',
      timestamp: new Date().toISOString()
    };
  };

  const simulateCardPayment = async () => {
    // In production, this would integrate with Paystack, Flutterwave, etc.
    return {
      success: true,
      transactionId: `CARD_${Date.now()}`,
      method: 'Credit Card',
      amount: amount,
      currency: 'NGN',
      status: 'completed',
      timestamp: new Date().toISOString(),
      cardLast4: paymentData.cardNumber.slice(-4)
    };
  };

  const simulateOtherPayment = async (method: string) => {
    return {
      success: true,
      transactionId: `${method.toUpperCase()}_${Date.now()}`,
      method: paymentMethods.find(m => m.id === method)?.name,
      amount: amount,
      currency: 'NGN',
      status: 'completed',
      timestamp: new Date().toISOString()
    };
  };

  const handlePaymentSuccess = (result: any) => {
    setPaymentStep('success');
    setTimeout(() => {
      onPaymentSuccess(result);
    }, 2000);
  };

  const calculateTotal = () => {
    const method = paymentMethods.find(m => m.id === selectedMethod);
    if (!method?.processingFee || method.processingFee === 'Free') {
      return amount;
    }
    
    const feePercentage = parseFloat(method.processingFee.replace('%', '')) / 100;
    return Math.round(amount * (1 + feePercentage));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>
            <p className="text-gray-600">Secure payment for your order</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Payment Steps */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${
              paymentStep === 'method' ? 'text-blue-600' : 
              ['details', 'processing', 'success'].includes(paymentStep) ? 'text-green-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                paymentStep === 'method' ? 'bg-blue-100' :
                ['details', 'processing', 'success'].includes(paymentStep) ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {['details', 'processing', 'success'].includes(paymentStep) ? 
                  <CheckCircle className="h-5 w-5" /> : 
                  <span className="font-semibold">1</span>
                }
              </div>
              <span className="font-medium">Payment Method</span>
            </div>
            
            <div className={`w-8 h-0.5 ${
              ['details', 'processing', 'success'].includes(paymentStep) ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            
            <div className={`flex items-center space-x-2 ${
              paymentStep === 'details' ? 'text-blue-600' : 
              ['processing', 'success'].includes(paymentStep) ? 'text-green-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                paymentStep === 'details' ? 'bg-blue-100' :
                ['processing', 'success'].includes(paymentStep) ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {['processing', 'success'].includes(paymentStep) ? 
                  <CheckCircle className="h-5 w-5" /> : 
                  <span className="font-semibold">2</span>
                }
              </div>
              <span className="font-medium">Payment Details</span>
            </div>
            
            <div className={`w-8 h-0.5 ${
              ['success'].includes(paymentStep) ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            
            <div className={`flex items-center space-x-2 ${
              paymentStep === 'success' ? 'text-green-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                paymentStep === 'success' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {paymentStep === 'success' ? 
                  <CheckCircle className="h-5 w-5" /> : 
                  <span className="font-semibold">3</span>
                }
              </div>
              <span className="font-medium">Complete</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₦{amount.toLocaleString()}</span>
              </div>
              {selectedMethod && paymentMethods.find(m => m.id === selectedMethod)?.processingFee !== 'Free' && (
                <div className="flex justify-between text-orange-600">
                  <span>Processing Fee:</span>
                  <span>₦{(calculateTotal() - amount).toLocaleString()}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>₦{(selectedMethod ? calculateTotal() : amount).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Step 1: Payment Method Selection */}
          {paymentStep === 'method' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                    disabled={!method.available}
                    className={`p-4 border-2 rounded-lg text-left transition-all duration-300 ${
                      method.available 
                        ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50' 
                        : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      {method.icon}
                      <span className="font-semibold text-gray-900">{method.name}</span>
                      {method.processingFee && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {method.processingFee}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Payment Details */}
          {paymentStep === 'details' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
                <button
                  onClick={() => setPaymentStep('method')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Change Method
                </button>
              </div>

              {selectedMethod === 'paypal' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-semibold text-blue-900">PayPal Payment</h4>
                        <p className="text-sm text-blue-700">You'll be redirected to PayPal to complete your payment securely.</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={processPayment}
                    disabled={isProcessing}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    Continue with PayPal
                  </button>
                </div>
              )}

              {selectedMethod === 'card' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        value={paymentData.cardName}
                        onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    onClick={processPayment}
                    disabled={isProcessing || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Pay ₦{calculateTotal().toLocaleString()}
                  </button>
                </div>
              )}

              {selectedMethod === 'bank-transfer' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Bank Transfer Details</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p><strong>Account Name:</strong> Cloud Print Nigeria Ltd</p>
                      <p><strong>Account Number:</strong> 1234567890</p>
                      <p><strong>Bank:</strong> GTBank</p>
                      <p><strong>Amount:</strong> ₦{calculateTotal().toLocaleString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={processPayment}
                    disabled={isProcessing}
                    className="w-full bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50"
                  >
                    I've Made the Transfer
                  </button>
                </div>
              )}

              {selectedMethod === 'mobile-money' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={paymentData.phone}
                      onChange={(e) => setPaymentData({...paymentData, phone: e.target.value})}
                      placeholder="+234 xxx xxx xxxx"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={processPayment}
                    disabled={isProcessing || !paymentData.phone}
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    Pay with Mobile Money
                  </button>
                </div>
              )}

              {selectedMethod === 'ussd' && (
                <div className="space-y-4">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">USSD Payment Instructions</h4>
                    <div className="text-sm text-orange-700 space-y-1">
                      <p><strong>GTBank:</strong> *737*1*Amount*ACCT#</p>
                      <p><strong>Access Bank:</strong> *901*0*Amount*2#</p>
                      <p><strong>First Bank:</strong> *894*Amount#</p>
                      <p><strong>Amount:</strong> ₦{calculateTotal().toLocaleString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={processPayment}
                    disabled={isProcessing}
                    className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50"
                  >
                    I've Completed USSD Payment
                  </button>
                </div>
              )}

              {selectedMethod === 'crypto' && (
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-900 mb-2">Cryptocurrency Payment</h4>
                    <div className="text-sm text-yellow-700 space-y-1">
                      <p><strong>Bitcoin Address:</strong> 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</p>
                      <p><strong>Ethereum Address:</strong> 0x742d35Cc6634C0532925a3b8D4C9db4C</p>
                      <p><strong>Amount:</strong> ₦{calculateTotal().toLocaleString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={processPayment}
                    disabled={isProcessing}
                    className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors disabled:opacity-50"
                  >
                    I've Sent Cryptocurrency
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Processing */}
          {paymentStep === 'processing' && (
            <div className="text-center py-12">
              <Loader2 className="h-16 w-16 text-blue-600 animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment</h3>
              <p className="text-gray-600">Please wait while we process your payment securely...</p>
            </div>
          )}

          {/* Step 4: Success */}
          {paymentStep === 'success' && (
            <div className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-4">Your order has been confirmed and will be processed shortly.</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700">
                  You'll receive an email confirmation with your order details and tracking information.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="px-6 pb-6">
          <div className="bg-gray-50 rounded-lg p-4 flex items-center space-x-3">
            <Shield className="h-5 w-5 text-green-600" />
            <div className="text-sm text-gray-600">
              <strong>Secure Payment:</strong> Your payment information is encrypted and secure. We never store your card details.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessor;