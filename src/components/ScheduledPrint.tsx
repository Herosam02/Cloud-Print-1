import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Truck, 
  Zap, 
  MapPin,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface ScheduledPrintProps {
  onSchedule: (schedule: any) => void;
}

const ScheduledPrint: React.FC<ScheduledPrintProps> = ({ onSchedule }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [rushOrder, setRushOrder] = useState(false);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: '24-48 hours',
      price: 'Free within Lagos',
      icon: <Truck className="h-5 w-5" />
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: 'Same day delivery',
      price: '₦5,000 extra',
      icon: <Zap className="h-5 w-5" />
    },
    {
      id: 'pickup',
      name: 'Pickup',
      description: 'Collect from our office',
      price: 'Free',
      icon: <MapPin className="h-5 w-5" />
    }
  ];

  const handleSchedule = () => {
    const schedule = {
      date: selectedDate,
      time: selectedTime,
      delivery: deliveryOption,
      rush: rushOrder
    };
    onSchedule(schedule);
  };

  const isValidSchedule = selectedDate && selectedTime && deliveryOption;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
          <Calendar className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Schedule Print & Delivery</h3>
          <p className="text-sm text-gray-600">Choose when you want your order processed and delivered</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Time Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Time
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-2 text-sm font-medium rounded-lg border transition-colors ${
                  selectedTime === time
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Delivery Option
          </label>
          <div className="space-y-3">
            {deliveryOptions.map(option => (
              <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  value={option.id}
                  checked={deliveryOption === option.id}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center space-x-3 flex-1">
                  <div className="text-gray-600">{option.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{option.name}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </div>
                  <div className="text-sm font-medium text-blue-600">{option.price}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Rush Order */}
        <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={rushOrder}
              onChange={(e) => setRushOrder(e.target.checked)}
              className="mt-1 text-orange-600 focus:ring-orange-500"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-900">Rush Order</span>
                <span className="text-sm font-medium text-orange-700">+50% fee</span>
              </div>
              <p className="text-sm text-orange-700 mt-1">
                Priority processing for urgent orders. Your job will be processed immediately.
              </p>
            </div>
          </label>
        </div>

        {/* Schedule Summary */}
        {isValidSchedule && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">Schedule Summary</h4>
                <div className="text-sm text-green-700 mt-1 space-y-1">
                  <p>• Print Date: {new Date(selectedDate).toLocaleDateString()}</p>
                  <p>• Time: {selectedTime}</p>
                  <p>• Delivery: {deliveryOptions.find(o => o.id === deliveryOption)?.name}</p>
                  {rushOrder && <p>• Rush processing enabled</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleSchedule}
          disabled={!isValidSchedule}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isValidSchedule ? 'Confirm Schedule' : 'Please select date and time'}
        </button>
      </div>
    </div>
  );
};

export default ScheduledPrint;