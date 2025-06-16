import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Move, 
  Type, 
  Image, 
  Square, 
  Circle, 
  Save, 
  Download, 
  Undo, 
  Redo,
  Trash2,
  Plus,
  Palette,
  Upload,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Copy,
  Layers,
  X,
  Focus,
  Eye,
  Crop,
  PaintBucket,
  MousePointer2,
  Hand,
  Pen,
  Eraser,
  Pipette,
  Zap,
  Filter,
  Brush,
  Scissors,
  FlipHorizontal,
  FlipVertical,
  MoreHorizontal,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Hash,
  Star,
  Heart,
  Triangle,
  Hexagon
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Element {
  id: string;
  type: 'text' | 'image' | 'shape';
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  src?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  fontFamily?: string;
  rotation?: number;
  zIndex: number;
  opacity?: number;
  borderWidth?: number;
  borderColor?: string;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: string;
}

interface Template {
  id: string;
  name: string;
  category: string;
  elements: Element[];
  canvasSize: { width: number; height: number };
  thumbnail: string;
  createdAt: string;
  downloads?: number;
  rating?: number;
  author?: string;
}

interface TemplateEditorProps {
  template?: Template;
  onSave: (template: Template) => void;
  onClose: () => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({ template, onSave, onClose }) => {
  const [elements, setElements] = useState<Element[]>(template?.elements || []);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState(template?.canvasSize || { width: 800, height: 600 });
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState<Element[][]>([template?.elements || []]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [templateName, setTemplateName] = useState(template?.name || 'My Design');
  const [templateCategory, setTemplateCategory] = useState(template?.category || 'business-cards');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'png' | 'jpg' | 'jpeg' | 'pdf'>('png');
  const [exportQuality, setExportQuality] = useState(1);
  const [activeTool, setActiveTool] = useState('select');
  const [isExporting, setIsExporting] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (template) {
      setElements(template.elements);
      setCanvasSize(template.canvasSize);
      setTemplateName(template.name);
      setTemplateCategory(template.category);
      setHistory([template.elements]);
      setHistoryIndex(0);
    }
  }, [template]);

  const addToHistory = useCallback((newElements: Element[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newElements]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements([...history[historyIndex - 1]]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements([...history[historyIndex + 1]]);
    }
  };

  const addTextElement = () => {
    const newElement: Element = {
      id: `text-${Date.now()}`,
      type: 'text',
      x: 100,
      y: 100,
      width: 200,
      height: 40,
      content: 'Click to edit text',
      color: '#000000',
      fontSize: 16,
      fontFamily: 'Arial',
      rotation: 0,
      zIndex: elements.length,
      opacity: 1,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      textAlign: 'left'
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
    setSelectedElement(newElement.id);
  };

  const addShapeElement = (shapeType: 'rectangle' | 'circle' | 'triangle' | 'star' | 'heart' | 'hexagon') => {
    const newElement: Element = {
      id: `shape-${Date.now()}`,
      type: 'shape',
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      backgroundColor: '#3B82F6',
      rotation: 0,
      zIndex: elements.length,
      content: shapeType,
      opacity: 1,
      borderWidth: 0,
      borderColor: '#000000'
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
    setSelectedElement(newElement.id);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newElement: Element = {
          id: `image-${Date.now()}`,
          type: 'image',
          x: 200,
          y: 200,
          width: 150,
          height: 150,
          src: e.target?.result as string,
          rotation: 0,
          zIndex: elements.length,
          opacity: 1
        };
        const newElements = [...elements, newElement];
        setElements(newElements);
        addToHistory(newElements);
        setSelectedElement(newElement.id);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateElement = (id: string, updates: Partial<Element>) => {
    const newElements = elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    );
    setElements(newElements);
  };

  const commitElementUpdate = (id: string, updates: Partial<Element>) => {
    const newElements = elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    );
    setElements(newElements);
    addToHistory(newElements);
  };

  const deleteElement = (id: string) => {
    const newElements = elements.filter(el => el.id !== id);
    setElements(newElements);
    setSelectedElement(null);
    addToHistory(newElements);
  };

  const duplicateElement = (id: string) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      const newElement = {
        ...element,
        id: `${element.type}-${Date.now()}`,
        x: element.x + 20,
        y: element.y + 20,
        zIndex: elements.length
      };
      const newElements = [...elements, newElement];
      setElements(newElements);
      addToHistory(newElements);
      setSelectedElement(newElement.id);
    }
  };

  const rotateElement = (id: string) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      const currentRotation = element.rotation || 0;
      const newRotation = (currentRotation + 90) % 360;
      commitElementUpdate(id, { rotation: newRotation });
    }
  };

  const flipElement = (id: string, direction: 'horizontal' | 'vertical') => {
    const element = elements.find(el => el.id === id);
    if (element) {
      const currentRotation = element.rotation || 0;
      if (direction === 'horizontal') {
        commitElementUpdate(id, { rotation: (currentRotation + 180) % 360 });
      } else {
        commitElementUpdate(id, { rotation: (360 - currentRotation) % 360 });
      }
    }
  };

  const bringToFront = (id: string) => {
    const maxZ = Math.max(...elements.map(el => el.zIndex));
    commitElementUpdate(id, { zIndex: maxZ + 1 });
  };

  const sendToBack = (id: string) => {
    const minZ = Math.min(...elements.map(el => el.zIndex));
    commitElementUpdate(id, { zIndex: minZ - 1 });
  };

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedElement(elementId);
    setIsDragging(true);
    
    const element = elements.find(el => el.id === elementId);
    if (element && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoom;
      const y = (e.clientY - rect.top) / zoom;
      setDragOffset({
        x: x - element.x,
        y: y - element.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedElement && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoom;
      const y = (e.clientY - rect.top) / zoom;
      
      updateElement(selectedElement, { 
        x: Math.max(0, x - dragOffset.x), 
        y: Math.max(0, y - dragOffset.y) 
      });
    }
  };

  const handleMouseUp = () => {
    if (isDragging && selectedElement) {
      const element = elements.find(el => el.id === selectedElement);
      if (element) {
        addToHistory(elements);
      }
    }
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const generateThumbnail = (): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 400, 300);
      
      const scaleX = 400 / canvasSize.width;
      const scaleY = 300 / canvasSize.height;
      const scale = Math.min(scaleX, scaleY);
      
      elements.forEach(element => {
        ctx.save();
        ctx.globalAlpha = element.opacity || 1;
        
        const x = element.x * scale;
        const y = element.y * scale;
        const width = element.width * scale;
        const height = element.height * scale;
        
        if (element.type === 'text') {
          ctx.fillStyle = element.color || '#000000';
          ctx.font = `${element.fontWeight || 'normal'} ${element.fontStyle || 'normal'} ${(element.fontSize || 16) * scale}px ${element.fontFamily || 'Arial'}`;
          ctx.textAlign = (element.textAlign as CanvasTextAlign) || 'left';
          ctx.fillText(element.content || '', x, y + height / 2);
        } else if (element.type === 'shape') {
          ctx.fillStyle = element.backgroundColor || '#3B82F6';
          if (element.borderWidth && element.borderWidth > 0) {
            ctx.strokeStyle = element.borderColor || '#000000';
            ctx.lineWidth = element.borderWidth * scale;
          }
          
          if (element.content === 'circle') {
            ctx.beginPath();
            ctx.arc(x + width / 2, y + height / 2, width / 2, 0, 2 * Math.PI);
            ctx.fill();
            if (element.borderWidth && element.borderWidth > 0) ctx.stroke();
          } else {
            ctx.fillRect(x, y, width, height);
            if (element.borderWidth && element.borderWidth > 0) ctx.strokeRect(x, y, width, height);
          }
        }
        
        ctx.restore();
      });
    }
    
    return canvas.toDataURL('image/png');
  };

  const saveTemplate = () => {
    if (!templateName.trim()) {
      alert('Please enter a template name');
      return;
    }

    const newTemplate: Template = {
      id: template?.id || `template-${Date.now()}`,
      name: templateName.trim(),
      category: templateCategory,
      elements: [...elements],
      canvasSize: { ...canvasSize },
      thumbnail: generateThumbnail(),
      createdAt: template?.createdAt || new Date().toISOString(),
      downloads: template?.downloads || 0,
      rating: template?.rating || 5.0,
      author: template?.author || 'User'
    };
    
    onSave(newTemplate);
  };

  const exportDesign = async () => {
    if (!canvasRef.current) {
      alert('Canvas not found');
      return;
    }

    setIsExporting(true);
    try {
      console.log('Starting export process...');
      
      const canvas = await html2canvas(canvasRef.current, {
        scale: exportQuality,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: false,
        logging: true,
        width: canvasSize.width,
        height: canvasSize.height,
        scrollX: 0,
        scrollY: 0,
        windowWidth: canvasSize.width,
        windowHeight: canvasSize.height
      });

      const fileName = templateName.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'design';

      if (exportFormat === 'pdf') {
        const pdf = new jsPDF({
          orientation: canvasSize.width > canvasSize.height ? 'landscape' : 'portrait',
          unit: 'px',
          format: [canvasSize.width, canvasSize.height]
        });
        
        const imgData = canvas.toDataURL('image/png', 1.0);
        pdf.addImage(imgData, 'PNG', 0, 0, canvasSize.width, canvasSize.height);
        pdf.save(`${fileName}.pdf`);
        console.log('PDF exported successfully');
      } else {
        const mimeType = exportFormat === 'jpg' || exportFormat === 'jpeg' ? 'image/jpeg' : 'image/png';
        const extension = exportFormat === 'jpg' ? 'jpg' : exportFormat;
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${fileName}.${extension}`;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            console.log(`${extension.toUpperCase()} exported successfully`);
          } else {
            throw new Error('Failed to create blob');
          }
        }, mimeType, exportQuality);
      }

      setShowExportModal(false);
      alert(`Design exported successfully as ${exportFormat.toUpperCase()}!`);
    } catch (error) {
      console.error('Export failed:', error);
      alert(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  const selectedEl = elements.find(el => el.id === selectedElement);

  const toolbarItems = [
    { id: 'select', icon: MousePointer2, label: 'Select', action: () => setActiveTool('select') },
    { id: 'move', icon: Hand, label: 'Move', action: () => setActiveTool('move') },
    { id: 'text', icon: Type, label: 'Text', action: addTextElement },
    { id: 'rectangle', icon: Square, label: 'Rectangle', action: () => addShapeElement('rectangle') },
    { id: 'circle', icon: Circle, label: 'Circle', action: () => addShapeElement('circle') },
    { id: 'triangle', icon: Triangle, label: 'Triangle', action: () => addShapeElement('triangle') },
    { id: 'star', icon: Star, label: 'Star', action: () => addShapeElement('star') },
    { id: 'heart', icon: Heart, label: 'Heart', action: () => addShapeElement('heart') },
    { id: 'hexagon', icon: Hexagon, label: 'Hexagon', action: () => addShapeElement('hexagon') },
    { id: 'image', icon: Image, label: 'Image', action: () => fileInputRef.current?.click() },
    { id: 'pen', icon: Pen, label: 'Pen', action: () => setActiveTool('pen') },
    { id: 'brush', icon: Brush, label: 'Brush', action: () => setActiveTool('brush') },
    { id: 'eraser', icon: Eraser, label: 'Eraser', action: () => setActiveTool('eraser') },
    { id: 'fill', icon: PaintBucket, label: 'Fill', action: () => setActiveTool('fill') },
    { id: 'eyedropper', icon: Eye, label: 'Eyedropper', action: () => setActiveTool('eyedropper') },
    { id: 'crop', icon: Crop, label: 'Crop', action: () => setActiveTool('crop') },
    { id: 'blur', icon: Focus, label: 'Blur', action: () => setActiveTool('blur') },
    { id: 'sharpen', icon: Zap, label: 'Sharpen', action: () => setActiveTool('sharpen') },
    { id: 'filter', icon: Filter, label: 'Filter', action: () => setActiveTool('filter') },
    { id: 'cut', icon: Scissors, label: 'Cut', action: () => setActiveTool('cut') },
    { id: 'rotate', icon: RotateCw, label: 'Rotate', action: () => selectedElement && rotateElement(selectedElement) },
    { id: 'flip-h', icon: FlipHorizontal, label: 'Flip Horizontal', action: () => selectedElement && flipElement(selectedElement, 'horizontal') },
    { id: 'flip-v', icon: FlipVertical, label: 'Flip Vertical', action: () => selectedElement && flipElement(selectedElement, 'vertical') },
    { id: 'more', icon: MoreHorizontal, label: 'More', action: () => setActiveTool('more') }
  ];

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex">
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-60 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-96 max-w-full mx-4 text-white">
            <h3 className="text-lg font-semibold mb-4">Export Design</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Format</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['png', 'jpg', 'jpeg', 'pdf'] as const).map((format) => (
                    <button
                      key={format}
                      onClick={() => setExportFormat(format)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                        exportFormat === format
                          ? 'border-blue-500 bg-blue-900 text-blue-300'
                          : 'border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {exportFormat !== 'pdf' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quality ({Math.round(exportQuality * 100)}%)
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={exportQuality}
                    onChange={(e) => setExportQuality(parseFloat(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
              )}

              <div className="text-sm text-gray-400 bg-gray-700 p-3 rounded">
                <p><strong>Name:</strong> {templateName}</p>
                <p><strong>Size:</strong> {canvasSize.width} × {canvasSize.height}px</p>
                <p><strong>Elements:</strong> {elements.length}</p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowExportModal(false)}
                disabled={isExporting}
                className="flex-1 bg-gray-600 text-gray-300 py-2 px-4 rounded font-medium hover:bg-gray-500 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={exportDesign}
                disabled={isExporting}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-800 w-16 flex flex-col items-center py-4 space-y-1 overflow-y-auto">
        {toolbarItems.map((tool) => (
          <button
            key={tool.id}
            onClick={() => {
              setActiveTool(tool.id);
              if (tool.action) tool.action();
            }}
            className={`p-2 rounded-lg transition-colors group relative ${
              activeTool === tool.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
            title={tool.label}
          >
            <tool.icon className="h-4 w-4" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
              {tool.label}
            </div>
          </button>
        ))}
      </div>

      <div className="w-80 bg-gray-800 text-white shadow-lg flex flex-col max-h-screen overflow-hidden border-l border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Template Editor</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Template name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            />
            
            <select
              value={templateCategory}
              onChange={(e) => setTemplateCategory(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              <option value="business-cards">Business Cards</option>
              <option value="flyers">Flyers</option>
              <option value="brochures">Brochures</option>
              <option value="banners">Banners</option>
              <option value="merchandise">Merchandise</option>
              <option value="logos">Logos</option>
              <option value="posters">Posters</option>
              <option value="social-media">Social Media</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {selectedEl && (
            <div className="p-4 border-b border-gray-700">
              <h3 className="font-semibold mb-3">Properties</h3>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">X</label>
                    <input
                      type="number"
                      value={Math.round(selectedEl.x)}
                      onChange={(e) => updateElement(selectedEl.id, { x: parseInt(e.target.value) || 0 })}
                      onBlur={(e) => commitElementUpdate(selectedEl.id, { x: parseInt(e.target.value) || 0 })}
                      className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Y</label>
                    <input
                      type="number"
                      value={Math.round(selectedEl.y)}
                      onChange={(e) => updateElement(selectedEl.id, { y: parseInt(e.target.value) || 0 })}
                      onBlur={(e) => commitElementUpdate(selectedEl.id, { y: parseInt(e.target.value) || 0 })}
                      className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Width</label>
                    <input
                      type="number"
                      value={Math.round(selectedEl.width)}
                      onChange={(e) => updateElement(selectedEl.id, { width: parseInt(e.target.value) || 1 })}
                      onBlur={(e) => commitElementUpdate(selectedEl.id, { width: parseInt(e.target.value) || 1 })}
                      className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Height</label>
                    <input
                      type="number"
                      value={Math.round(selectedEl.height)}
                      onChange={(e) => updateElement(selectedEl.id, { height: parseInt(e.target.value) || 1 })}
                      onBlur={(e) => commitElementUpdate(selectedEl.id, { height: parseInt(e.target.value) || 1 })}
                      className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Opacity</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={selectedEl.opacity || 1}
                    onChange={(e) => updateElement(selectedEl.id, { opacity: parseFloat(e.target.value) })}
                    onMouseUp={(e) => commitElementUpdate(selectedEl.id, { opacity: parseFloat((e.target as HTMLInputElement).value) })}
                    className="w-full accent-blue-500"
                  />
                  <span className="text-xs text-gray-400">{Math.round((selectedEl.opacity || 1) * 100)}%</span>
                </div>

                {selectedEl.type === 'text' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Text</label>
                      <textarea
                        value={selectedEl.content || ''}
                        onChange={(e) => updateElement(selectedEl.id, { content: e.target.value })}
                        onBlur={(e) => commitElementUpdate(selectedEl.id, { content: e.target.value })}
                        className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white"
                        rows={2}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Font Size</label>
                        <input
                          type="number"
                          value={selectedEl.fontSize || 16}
                          onChange={(e) => updateElement(selectedEl.id, { fontSize: parseInt(e.target.value) || 16 })}
                          onBlur={(e) => commitElementUpdate(selectedEl.id, { fontSize: parseInt(e.target.value) || 16 })}
                          className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Font Family</label>
                        <select
                          value={selectedEl.fontFamily || 'Arial'}
                          onChange={(e) => commitElementUpdate(selectedEl.id, { fontFamily: e.target.value })}
                          className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white"
                        >
                          <option value="Arial">Arial</option>
                          <option value="Times New Roman">Times</option>
                          <option value="Helvetica">Helvetica</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Verdana">Verdana</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Text Color</label>
                      <input
                        type="color"
                        value={selectedEl.color || '#000000'}
                        onChange={(e) => updateElement(selectedEl.id, { color: e.target.value })}
                        onBlur={(e) => commitElementUpdate(selectedEl.id, { color: e.target.value })}
                        className="w-full h-8 bg-gray-700 border border-gray-600 rounded"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-400">Text Style</label>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => commitElementUpdate(selectedEl.id, { fontWeight: selectedEl.fontWeight === 'bold' ? 'normal' : 'bold' })}
                          className={`p-2 rounded ${selectedEl.fontWeight === 'bold' ? 'bg-blue-600' : 'bg-gray-600'} text-white`}
                        >
                          <Bold className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => commitElementUpdate(selectedEl.id, { fontStyle: selectedEl.fontStyle === 'italic' ? 'normal' : 'italic' })}
                          className={`p-2 rounded ${selectedEl.fontStyle === 'italic' ? 'bg-blue-600' : 'bg-gray-600'} text-white`}
                        >
                          <Italic className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => commitElementUpdate(selectedEl.id, { textDecoration: selectedEl.textDecoration === 'underline' ? 'none' : 'underline' })}
                          className={`p-2 rounded ${selectedEl.textDecoration === 'underline' ? 'bg-blue-600' : 'bg-gray-600'} text-white`}
                        >
                          <Underline className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-400">Text Align</label>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => commitElementUpdate(selectedEl.id, { textAlign: 'left' })}
                          className={`p-2 rounded ${selectedEl.textAlign === 'left' ? 'bg-blue-600' : 'bg-gray-600'} text-white`}
                        >
                          <AlignLeft className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => commitElementUpdate(selectedEl.id, { textAlign: 'center' })}
                          className={`p-2 rounded ${selectedEl.textAlign === 'center' ? 'bg-blue-600' : 'bg-gray-600'} text-white`}
                        >
                          <AlignCenter className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => commitElementUpdate(selectedEl.id, { textAlign: 'right' })}
                          className={`p-2 rounded ${selectedEl.textAlign === 'right' ? 'bg-blue-600' : 'bg-gray-600'} text-white`}
                        >
                          <AlignRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {selectedEl.type === 'shape' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Background Color</label>
                      <input
                        type="color"
                        value={selectedEl.backgroundColor || '#3B82F6'}
                        onChange={(e) => updateElement(selectedEl.id, { backgroundColor: e.target.value })}
                        onBlur={(e) => commitElementUpdate(selectedEl.id, { backgroundColor: e.target.value })}
                        className="w-full h-8 bg-gray-700 border border-gray-600 rounded"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Border Width</label>
                        <input
                          type="number"
                          min="0"
                          value={selectedEl.borderWidth || 0}
                          onChange={(e) => updateElement(selectedEl.id, { borderWidth: parseInt(e.target.value) || 0 })}
                          onBlur={(e) => commitElementUpdate(selectedEl.id, { borderWidth: parseInt(e.target.value) || 0 })}
                          className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Border Color</label>
                        <input
                          type="color"
                          value={selectedEl.borderColor || '#000000'}
                          onChange={(e) => updateElement(selectedEl.id, { borderColor: e.target.value })}
                          onBlur={(e) => commitElementUpdate(selectedEl.id, { borderColor: e.target.value })}
                          className="w-full h-8 bg-gray-700 border border-gray-600 rounded"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-400">Actions</label>
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      onClick={() => duplicateElement(selectedEl.id)}
                      className="bg-blue-900 text-blue-300 py-1 px-2 rounded text-xs hover:bg-blue-800 transition-colors flex items-center justify-center"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </button>
                    <button
                      onClick={() => deleteElement(selectedEl.id)}
                      className="bg-red-900 text-red-300 py-1 px-2 rounded text-xs hover:bg-red-800 transition-colors flex items-center justify-center"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </button>
                    <button
                      onClick={() => bringToFront(selectedEl.id)}
                      className="bg-green-900 text-green-300 py-1 px-2 rounded text-xs hover:bg-green-800 transition-colors flex items-center justify-center"
                    >
                      <Layers className="h-3 w-3 mr-1" />
                      Front
                    </button>
                    <button
                      onClick={() => sendToBack(selectedEl.id)}
                      className="bg-purple-900 text-purple-300 py-1 px-2 rounded text-xs hover:bg-purple-800 transition-colors flex items-center justify-center"
                    >
                      <Layers className="h-3 w-3 mr-1" />
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="p-4 border-b border-gray-700">
            <h3 className="font-semibold mb-3">Layers</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {elements
                .sort((a, b) => b.zIndex - a.zIndex)
                .map((element) => (
                  <div
                    key={element.id}
                    onClick={() => setSelectedElement(element.id)}
                    className={`p-2 rounded cursor-pointer transition-colors ${
                      selectedElement === element.id
                        ? 'bg-blue-900 text-blue-300'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {element.type === 'text' && <Type className="h-4 w-4" />}
                      {element.type === 'image' && <Image className="h-4 w-4" />}
                      {element.type === 'shape' && <Square className="h-4 w-4" />}
                      <span className="text-sm truncate">
                        {element.type === 'text' ? (element.content || 'Text').substring(0, 15) : 
                         element.type === 'image' ? 'Image' : 
                         element.content || 'Shape'}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="flex space-x-2 mb-3">
            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              className="flex-1 bg-gray-700 text-gray-300 py-2 px-3 rounded text-sm hover:bg-gray-600 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              <Undo className="h-4 w-4 mr-1" />
              Undo
            </button>
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="flex-1 bg-gray-700 text-gray-300 py-2 px-3 rounded text-sm hover:bg-gray-600 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              <Redo className="h-4 w-4 mr-1" />
              Redo
            </button>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={saveTemplate}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </button>
            
            <button
              onClick={() => setShowExportModal(true)}
              className="w-full bg-green-600 text-white py-2 px-4 rounded font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Design
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gray-900 flex flex-col">
        <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-white"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium min-w-[60px] text-center text-white">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-white"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-white">Canvas:</label>
              <select
                value={`${canvasSize.width}x${canvasSize.height}`}
                onChange={(e) => {
                  const [width, height] = e.target.value.split('x').map(Number);
                  setCanvasSize({ width, height });
                }}
                className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white"
              >
                <option value="800x600">Business Card (800x600)</option>
                <option value="1200x800">Flyer (1200x800)</option>
                <option value="1600x900">Banner (1600x900)</option>
                <option value="1000x1000">Square (1000x1000)</option>
                <option value="1920x1080">HD (1920x1080)</option>
                <option value="1080x1080">Instagram Square (1080x1080)</option>
                <option value="1080x1920">Instagram Story (1080x1920)</option>
              </select>
            </div>
          </div>
          
          <div className="text-sm text-gray-400">
            Elements: {elements.length} | Selected: {selectedElement ? '1' : '0'} | Tool: {activeTool}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
          <div
            ref={canvasRef}
            className="bg-white shadow-lg relative border"
            style={{
              width: canvasSize.width * zoom,
              height: canvasSize.height * zoom,
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onClick={() => setSelectedElement(null)}
          >
            {elements
              .sort((a, b) => a.zIndex - b.zIndex)
              .map((element) => (
                <div
                  key={element.id}
                  className={`absolute cursor-move border-2 ${
                    selectedElement === element.id ? 'border-blue-500' : 'border-transparent'
                  } hover:border-blue-300 transition-colors`}
                  style={{
                    left: element.x * zoom,
                    top: element.y * zoom,
                    width: element.width * zoom,
                    height: element.height * zoom,
                    transform: `rotate(${element.rotation || 0}deg)`,
                    zIndex: element.zIndex,
                    opacity: element.opacity || 1
                  }}
                  onMouseDown={(e) => handleMouseDown(e, element.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedElement(element.id);
                  }}
                >
                  {element.type === 'text' && (
                    <div
                      className="w-full h-full flex items-center p-1 overflow-hidden"
                      style={{
                        color: element.color,
                        fontSize: (element.fontSize || 16) * zoom,
                        fontFamily: element.fontFamily,
                        fontWeight: element.fontWeight,
                        fontStyle: element.fontStyle,
                        textDecoration: element.textDecoration,
                        justifyContent: element.textAlign === 'center' ? 'center' : 
                                       element.textAlign === 'right' ? 'flex-end' : 'flex-start'
                      }}
                      onDoubleClick={() => {
                        const newContent = prompt('Edit text:', element.content);
                        if (newContent !== null) {
                          commitElementUpdate(element.id, { content: newContent });
                        }
                      }}
                    >
                      {element.content}
                    </div>
                  )}
                  
                  {element.type === 'image' && element.src && (
                    <img
                      src={element.src}
                      alt="Element"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  )}
                  
                  {element.type === 'shape' && (
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundColor: element.backgroundColor,
                        borderRadius: element.content === 'circle' ? '50%' : 
                                     element.content === 'hexagon' ? '10%' : '0',
                        borderWidth: element.borderWidth || 0,
                        borderColor: element.borderColor || '#000000',
                        borderStyle: element.borderWidth ? 'solid' : 'none',
                        clipPath: element.content === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
                                 element.content === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' :
                                 element.content === 'heart' ? 'path("M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z")' :
                                 element.content === 'hexagon' ? 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' :
                                 'none'
                      }}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default TemplateEditor;