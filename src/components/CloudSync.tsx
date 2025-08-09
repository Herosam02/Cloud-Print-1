import React, { useState } from 'react';
import { Cloud, Upload, Link as LinkIcon, Mail, Smartphone, CheckCircle, AlertCircle, Loader2, ToggleLeft as Google, Droplet as Dropbox, Microscope as Microsoft } from 'lucide-react';

interface CloudSyncProps {
  onFileSelect: (files: File[]) => void;
}

const CloudSync: React.FC<CloudSyncProps> = ({ onFileSelect }) => {
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [connectedServices, setConnectedServices] = useState<string[]>([]);
  const [emailToPrint, setEmailToPrint] = useState('');

  const cloudServices = [
    {
      id: 'google-drive',
      name: 'Google Drive',
      icon: <Google className="h-6 w-6" />,
      color: 'bg-blue-500',
      description: 'Access files from Google Drive'
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      icon: <Dropbox className="h-6 w-6" />,
      color: 'bg-blue-600',
      description: 'Import from Dropbox'
    },
    {
      id: 'onedrive',
      name: 'OneDrive',
      icon: <Microsoft className="h-6 w-6" />,
      color: 'bg-blue-700',
      description: 'Connect to Microsoft OneDrive'
    }
  ];

  const handleCloudConnect = async (serviceId: string) => {
    setIsConnecting(serviceId);
    
    // Simulate connection process
    setTimeout(() => {
      setConnectedServices(prev => [...prev, serviceId]);
      setIsConnecting(null);
      
      // In a real implementation, this would open OAuth flow
      alert(`Connected to ${cloudServices.find(s => s.id === serviceId)?.name}! You can now access your files.`);
    }, 2000);
  };

  const generateEmailToPrint = () => {
    const randomId = Math.random().toString(36).substring(7);
    const email = `print-${randomId}@cloudprint.dev`;
    setEmailToPrint(email);
  };

  return (
    <div className="space-y-6">
      {/* Cloud Services */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect Cloud Storage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cloudServices.map(service => (
            <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`${service.color} text-white p-2 rounded-lg`}>
                  {service.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{service.name}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
              
              {connectedServices.includes(service.id) ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Connected</span>
                </div>
              ) : (
                <button
                  onClick={() => handleCloudConnect(service.id)}
                  disabled={isConnecting === service.id}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isConnecting === service.id ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Connect
                    </>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Email to Print */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Email to Print</h3>
            <p className="text-sm text-gray-600">Send files directly via email</p>
          </div>
        </div>

        {emailToPrint ? (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-purple-900">Your Email-to-Print Address:</span>
            </div>
            <div className="bg-white border border-purple-300 rounded-lg p-3 font-mono text-sm">
              {emailToPrint}
            </div>
            <p className="text-sm text-purple-700 mt-2">
              Send your files to this email address and they'll automatically be added to your print queue.
            </p>
          </div>
        ) : (
          <button
            onClick={generateEmailToPrint}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Generate Email-to-Print Address
          </button>
        )}
      </div>

      {/* Mobile Upload */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-green-100 text-green-600 p-2 rounded-lg">
            <Smartphone className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Mobile Upload</h3>
            <p className="text-sm text-gray-600">Print from your mobile device</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">WhatsApp Upload</span>
            <a 
              href="https://wa.me/2348002568637746"
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Send Files
            </a>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Mobile Web Upload</span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Open Mobile Site
            </button>
          </div>
        </div>
      </div>

      {/* Upload Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Upload Tips</h4>
            <ul className="text-sm text-blue-700 mt-1 space-y-1">
              <li>• Supported formats: PDF, JPG, PNG, DOCX, XLSX, PPTX</li>
              <li>• Maximum file size: 50MB per file</li>
              <li>• For best quality, use 300 DPI resolution</li>
              <li>• Files are automatically synced across all your devices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudSync;