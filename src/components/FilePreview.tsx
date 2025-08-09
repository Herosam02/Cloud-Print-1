import React, { useState, useRef } from 'react';
import { Eye, ZoomIn, ZoomOut, RotateCw, Download, Printer as Print, FileText, Image as ImageIcon, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface FilePreviewProps {
  file: File;
  onApprove?: () => void;
  onReject?: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onApprove, onReject }) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    generatePreview();
  }, [file]);

  const generatePreview = async () => {
    setIsLoading(true);
    
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsLoading(false);
    } else if (file.type === 'application/pdf') {
      // In a real implementation, you'd use PDF.js here
      setPreviewUrl('/api/pdf-preview/' + file.name);
      setIsLoading(false);
    } else {
      // For other file types, show a placeholder
      setPreviewUrl('');
      setIsLoading(false);
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const getFileIcon = () => {
    if (file.type.startsWith('image/')) return <ImageIcon className="h-8 w-8" />;
    return <FileText className="h-8 w-8" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-blue-600">{getFileIcon()}</div>
            <div>
              <h3 className="font-semibold text-gray-900">{file.name}</h3>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={handleRotate}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <RotateCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="relative bg-gray-100 min-h-[400px] flex items-center justify-center p-6">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            <p className="text-gray-600">Generating preview...</p>
          </div>
        ) : previewUrl ? (
          <div 
            className="relative bg-white shadow-lg"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transition: 'transform 0.3s ease'
            }}
          >
            <img 
              src={previewUrl} 
              alt="File preview"
              className="max-w-full max-h-[400px] object-contain"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-gray-400">{getFileIcon()}</div>
            <div>
              <h4 className="font-medium text-gray-900">Preview not available</h4>
              <p className="text-sm text-gray-600">This file type cannot be previewed</p>
            </div>
          </div>
        )}
      </div>

      {/* Print Simulation Info */}
      <div className="bg-blue-50 border-t border-blue-200 px-6 py-4">
        <div className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Print Simulation</h4>
            <p className="text-sm text-blue-700 mt-1">
              This preview shows how your document will appear when printed. 
              Colors may vary slightly due to printer calibration.
            </p>
            <div className="mt-2 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-medium">Paper Size:</span> A4 (210 × 297 mm)
              </div>
              <div>
                <span className="font-medium">Print Quality:</span> 300 DPI
              </div>
              <div>
                <span className="font-medium">Color Mode:</span> CMYK
              </div>
              <div>
                <span className="font-medium">Estimated Pages:</span> 1
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      {(onApprove || onReject) && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex space-x-3">
            {onReject && (
              <button
                onClick={onReject}
                className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-lg font-medium hover:bg-red-200 transition-colors"
              >
                Reject & Re-upload
              </button>
            )}
            {onApprove && (
              <button
                onClick={onApprove}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Approve for Printing
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilePreview;