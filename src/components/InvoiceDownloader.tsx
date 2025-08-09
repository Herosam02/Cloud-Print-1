import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { 
  Download, 
  FileText, 
  Image, 
  Mail, 
  Printer,
  X,
  CheckCircle,
  Loader2,
  Share2
} from 'lucide-react';

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

interface InvoiceDownloaderProps {
  invoice: InvoiceData;
  onClose: () => void;
}

const InvoiceDownloader: React.FC<InvoiceDownloaderProps> = ({ invoice, onClose }) => {
  const [downloadFormat, setDownloadFormat] = useState<'pdf' | 'png' | 'jpeg'>('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const [emailAddress, setEmailAddress] = useState(invoice.customer.email);
  const [isSending, setIsSending] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      // Create a temporary div with the invoice content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = generateInvoiceHTML();
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '800px';
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.padding = '40px';
      document.body.appendChild(tempDiv);

      // Generate canvas from the HTML
      const canvas = await html2canvas(tempDiv, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      // Remove temporary div
      document.body.removeChild(tempDiv);

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`${invoice.invoiceNumber}.pdf`);
      
      alert('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImage = async (format: 'png' | 'jpeg') => {
    setIsGenerating(true);
    try {
      // Create a temporary div with the invoice content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = generateInvoiceHTML();
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '800px';
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.padding = '40px';
      document.body.appendChild(tempDiv);

      // Generate canvas from the HTML
      const canvas = await html2canvas(tempDiv, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      // Remove temporary div
      document.body.removeChild(tempDiv);

      // Convert canvas to image and download
      const link = document.createElement('a');
      link.download = `${invoice.invoiceNumber}.${format}`;
      
      if (format === 'png') {
        link.href = canvas.toDataURL('image/png');
      } else {
        link.href = canvas.toDataURL('image/jpeg', 0.9);
      }
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert(`${format.toUpperCase()} downloaded successfully!`);
    } catch (error) {
      console.error('Error generating image:', error);
      alert(`Error generating ${format.toUpperCase()}. Please try again.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const sendEmail = async () => {
    if (!emailAddress.trim()) {
      alert('Please enter an email address');
      return;
    }

    setIsSending(true);
    try {
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Invoice sent successfully to ${emailAddress}`);
      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const generateInvoiceHTML = () => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${invoice.invoiceNumber}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .company-info { text-align: left; }
        .invoice-info { text-align: right; }
        .customer-info { margin-bottom: 30px; }
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .items-table th { background-color: #f5f5f5; }
        .totals { text-align: right; }
        .total-row { font-weight: bold; font-size: 18px; }
        .break-words { word-wrap: break-word; word-break: break-all; }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-info">
            <h1>Cloud Print</h1>
            <p>123 Victoria Island, Lagos State<br>
            Lagos, Nigeria<br>
            Phone: +234-800-CLOUD-PRINT<br>
            Email: orders@cloudprint.dev</p>
        </div>
        <div class="invoice-info">
            <h2>${invoice.type.toUpperCase()}</h2>
            <p><strong>${invoice.invoiceNumber}</strong><br>
            Date: ${new Date(invoice.date).toLocaleDateString()}<br>
            ${invoice.dueDate ? `Due: ${new Date(invoice.dueDate).toLocaleDateString()}<br>` : ''}
            Status: ${invoice.status.toUpperCase()}</p>
        </div>
    </div>

    <div class="customer-info">
        <h3>Bill To:</h3>
        <p><strong>${invoice.customer.name}</strong><br>
        ${invoice.customer.company ? `${invoice.customer.company}<br>` : ''}
        ${invoice.customer.address}<br>
        ${invoice.customer.city}, ${invoice.customer.state}<br>
        ${invoice.customer.phone}<br>
        ${invoice.customer.email}</p>
    </div>

    <table class="items-table">
        <thead>
            <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            ${invoice.items.map(item => `
                <tr>
                    <td>${item.name}<br><small>${item.description}</small></td>
                    <td>${item.quantity}</td>
                    <td>₦${item.unitPrice.toLocaleString()}</td>
                    <td>₦${item.total.toLocaleString()}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <div class="totals">
        <p>Subtotal: ₦${invoice.subtotal.toLocaleString()}</p>
        ${invoice.discount > 0 ? `<p>Discount: -₦${invoice.discount.toLocaleString()}</p>` : ''}
        <p>Tax: ₦${invoice.tax.toLocaleString()}</p>
        <p class="total-row break-words">Total: ₦${invoice.total.toLocaleString()}</p>
    </div>

    ${invoice.notes ? `<div style="margin-top: 30px;"><h4>Notes:</h4><p>${invoice.notes}</p></div>` : ''}

    <div style="margin-top: 50px; text-align: center; color: #666; font-size: 12px;">
        <p>Thank you for choosing Cloud Print!</p>
        <p>For support, contact us at support@cloudprint.dev or +234-800-CLOUD-PRINT</p>
    </div>
</body>
</html>
    `;
  };

  const downloadOptions = [
    {
      format: 'pdf' as const,
      icon: <FileText className="h-6 w-6" />,
      title: 'PDF Document',
      description: 'Professional PDF format for printing and sharing',
      action: generatePDF
    },
    {
      format: 'png' as const,
      icon: <Image className="h-6 w-6" />,
      title: 'PNG Image',
      description: 'High-quality image format',
      action: () => generateImage('png')
    },
    {
      format: 'jpeg' as const,
      icon: <Image className="h-6 w-6" />,
      title: 'JPEG Image',
      description: 'Compressed image format',
      action: () => generateImage('jpeg')
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Download Invoice</h2>
            <p className="text-gray-600">{invoice.invoiceNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Download Options */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Format</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {downloadOptions.map((option) => (
                <button
                  key={option.format}
                  onClick={option.action}
                  disabled={isGenerating}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="text-blue-600">{option.icon}</div>
                    <span className="font-semibold text-gray-900">{option.title}</span>
                  </div>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handlePrint}
                className="flex items-center justify-center space-x-3 p-4 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
              >
                <Printer className="h-5 w-5 text-emerald-600" />
                <span className="font-medium text-emerald-900">Print Invoice</span>
              </button>
              
              <button
                onClick={() => {
                  const subject = `${invoice.type === 'invoice' ? 'Invoice' : 'Receipt'} ${invoice.invoiceNumber}`;
                  const body = `Please find attached your ${invoice.type} for order ${invoice.orderNumber}.`;
                  window.open(`mailto:${invoice.customer.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
                }}
                className="flex items-center justify-center space-x-3 p-4 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
              >
                <Share2 className="h-5 w-5 text-amber-600" />
                <span className="font-medium text-amber-900">Share via Email</span>
              </button>
            </div>
          </div>

          {/* Email Invoice */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Invoice</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              
              <button
                onClick={sendEmail}
                disabled={isSending || !emailAddress.trim()}
                className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Invoice via Email
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generation Status */}
          {isGenerating && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Loader2 className="h-5 w-5 text-emerald-600 animate-spin" />
                <div>
                  <p className="font-medium text-emerald-900">Generating Invoice</p>
                  <p className="text-sm text-emerald-700">Please wait while we prepare your download...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDownloader;