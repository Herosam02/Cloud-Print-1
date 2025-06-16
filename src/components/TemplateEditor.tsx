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
  FileImage,
  FileText,
  Minus,
  ArrowRight,
  Star,
  Triangle,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  ChevronUp,
  ChevronDown,
  MousePointer,
  Lasso,
  Wand2,
  Brush,
  Pencil,
  Eraser,
  Stamp,
  Sun,
  Moon,
  Crop,
  Maximize,
  Grid3X3,
  Layers2,
  Eye,
  PaintBucket,
  Scissors,
  RotateCcw,
  Settings,
  Focus
} from 'lucide-react';
import { Heart, Shield, Zap } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Element {
  id: string;
  type: 'text' | 'image' | 'shape' | 'line' | 'arrow' | 'brush' | 'selection';
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
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: string;
  rotation?: number;
  zIndex: number;
  strokeWidth?: number;
  borderRadius?: number;
  opacity?: number;
  blur?: number;
  brightness?: number;
  contrast?: number;
  selected?: boolean;
  brushStrokes?: Array<{x: number, y: number}>;
}

interface TemplateEditorProps {
  templateId?: string;
  onSave: (template: any) => void;
  onClose: () => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({ templateId, onSave, onClose }) => {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>('move');
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState<Element[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [templateName, setTemplateName] = useState('');
  const [templateCategory, setTemplateCategory] = useState('business-cards');
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'png' | 'jpg' | 'jpeg' | 'pdf'>('png');
  const [exportQuality, setExportQuality] = useState(1);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectionArea, setSelectionArea] = useState<{x: number, y: number, width: number, height: number} | null>(null);
  const [cropMode, setCropMode] = useState(false);
  const [eyedropperActive, setEyedropperActive] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);

  const toolCategories = [
    {
      name: 'Selection',
      tools: [
        { id: 'move', name: 'Move', icon: Move, shortcut: 'V' },
        { id: 'marquee', name: 'Marquee', icon: Square, shortcut: 'M' },
        { id: 'lasso', name: 'Lasso', icon: Lasso, shortcut: 'L' },
        { id: 'quick-select', name: 'Quick Select', icon: Wand2, shortcut: 'W' },
        { id: 'magic-wand', name: 'Magic Wand', icon: Wand2, shortcut: 'W' }
      ]
    },
    {
      name: 'Paint',
      tools: [
        { id: 'brush', name: 'Brush', icon: Brush, shortcut: 'B' },
        { id: 'pencil', name: 'Pencil', icon: Pencil, shortcut: 'B' },
        { id: 'eraser', name: 'Eraser', icon: Eraser, shortcut: 'E' }
      ]
    },
    {
      name: 'Retouch',
      tools: [
        { id: 'clone', name: 'Clone', icon: Stamp, shortcut: 'S' },
        { id: 'healing', name: 'Healing', icon: Heart, shortcut: 'J' },
        { id: 'dodge', name: 'Dodge', icon: Sun, shortcut: 'O' },
        { id: 'burn', name: 'Burn', icon: Moon, shortcut: 'O' },
        { id: 'smudge', name: 'Smudge', icon: Focus, shortcut: 'R' }
      ]
    },
    {
      name: 'Create',
      tools: [
        { id: 'text', name: 'Text', icon: Type, shortcut: 'T' },
        { id: 'crop', name: 'Crop', icon: Crop, shortcut: 'C' },
        { id: 'upload', name: 'Upload', icon: Upload, shortcut: 'U' },
        { id: 'shape', name: 'Shape', icon: Square, shortcut: 'S' }
      ]
    }
  ];

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
      content: 'Double click to edit',
      color: '#000000',
      fontSize: 16,
      fontFamily: 'Arial',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      textAlign: 'left',
      rotation: 0,
      zIndex: elements.length,
      opacity: 1
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
  };

  const addShapeElement = (shapeType: 'rectangle' | 'circle' | 'triangle' | 'star') => {
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
      borderRadius: shapeType === 'rectangle' ? 0 : undefined,
      opacity: 1
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
  };

  const addLineElement = (lineType: 'line' | 'arrow') => {
    const newElement: Element = {
      id: `${lineType}-${Date.now()}`,
      type: lineType,
      x: 200,
      y: 200,
      width: 100,
      height: 2,
      color: '#000000',
      strokeWidth: 2,
      rotation: 0,
      zIndex: elements.length,
      opacity: 1
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
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
      };
      reader.readAsDataURL(file);
    }
  };

  const updateElement = (id: string, updates: Partial<Element>) => {
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
    }
  };

  const moveElementLayer = (id: string, direction: 'up' | 'down') => {
    const element = elements.find(el => el.id === id);
    if (!element) return;

    const newZIndex = direction === 'up' ? element.zIndex + 1 : element.zIndex - 1;
    if (newZIndex < 0) return;

    updateElement(id, { zIndex: newZIndex });
  };

  const alignElements = (alignment: 'left' | 'center' | 'right') => {
    if (!selectedElement) return;
    
    const element = elements.find(el => el.id === selectedElement);
    if (!element || element.type !== 'text') return;

    updateElement(selectedElement, { textAlign: alignment });
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    if (selectedTool === 'brush' || selectedTool === 'pencil') {
      setIsDrawing(true);
      startDrawing(x, y);
    } else if (selectedTool === 'marquee') {
      setSelectionArea({ x, y, width: 0, height: 0 });
    } else if (selectedTool === 'eyedropper') {
      pickColor(x, y);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    if (isDrawing && (selectedTool === 'brush' || selectedTool === 'pencil')) {
      continueDrawing(x, y);
    } else if (selectionArea && selectedTool === 'marquee') {
      setSelectionArea(prev => prev ? {
        ...prev,
        width: x - prev.x,
        height: y - prev.y
      } : null);
    } else if (draggedElement) {
      updateElement(draggedElement, { x: x - 50, y: y - 20 });
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
    setDraggedElement(null);
    if (selectedTool === 'marquee' && selectionArea) {
      const selectedElements = elements.filter(el => 
        el.x >= selectionArea.x && 
        el.y >= selectionArea.y && 
        el.x + el.width <= selectionArea.x + selectionArea.width &&
        el.y + el.height <= selectionArea.y + selectionArea.height
      );
      selectedElements.forEach(el => updateElement(el.id, { selected: true }));
    }
  };

  const startDrawing = (x: number, y: number) => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const continueDrawing = (x: number, y: number) => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const pickColor = (x: number, y: number) => {
    console.log('Picking color at', x, y);
  };

  const applyFilter = (filter: string, value: number) => {
    if (!selectedElement) return;
    
    switch (filter) {
      case 'blur':
        updateElement(selectedElement, { blur: value });
        break;
      case 'brightness':
        updateElement(selectedElement, { brightness: value });
        break;
      case 'contrast':
        updateElement(selectedElement, { contrast: value });
        break;
      case 'opacity':
        updateElement(selectedElement, { opacity: value });
        break;
    }
  };

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault();
    if (selectedTool === 'move') {
      setSelectedElement(elementId);
      setDraggedElement(elementId);
    }
  };

  const saveTemplate = () => {
    const template = {
      id: templateId || `template-${Date.now()}`,
      name: templateName || 'Untitled Template',
      category: templateCategory,
      elements,
      canvasSize,
      thumbnail: generateThumbnail(),
      createdAt: new Date().toISOString()
    };
    onSave(template);
  };

  const generateThumbnail = () => {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  };

  const exportDesign = async () => {
    if (!canvasRef.current) return;

    try {
      const canvas = await html2canvas(canvasRef.current, {
        scale: exportQuality,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: false,
        logging: false,
        width: canvasSize.width,
        height: canvasSize.height
      });

      const fileName = templateName || 'design';

      if (exportFormat === 'pdf') {
        const pdf = new jsPDF({
          orientation: canvasSize.width > canvasSize.height ? 'landscape' : 'portrait',
          unit: 'px',
          format: [canvasSize.width, canvasSize.height]
        });
        
        const imgData = canvas.toDataURL('image/png', 1.0);
        pdf.addImage(imgData, 'PNG', 0, 0, canvasSize.width, canvasSize.height);
        pdf.save(`${fileName}.pdf`);
      } else {
        const mimeType = exportFormat === 'jpg' || exportFormat === 'jpeg' ? 'image/jpeg' : 'image/png';
        const extension = exportFormat === 'jpg' ? 'jpg' : exportFormat;
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${fileName}.${extension}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }
        }, mimeType, exportQuality);
      }

      setShowExportModal(false);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  const selectedEl = elements.find(el => el.id === selectedElement);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const toolMap: { [key: string]: string } = {
        'v': 'move',
        'm': 'marquee',
        'l': 'lasso',
        'w': 'quick-select',
        'b': 'brush',
        'e': 'eraser',
        's': 'clone',
        'j': 'healing',
        'o': 'dodge',
        'c': 'crop',
        'i': 'eyedropper',
        'g': 'paint-bucket',
        't': 'text'
      };
      
      if (toolMap[key]) {
        setSelectedTool(toolMap[key]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex text-white">
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
                          ? 'border-blue-500 bg-blue-600 text-white'
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
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={exportQuality}
                    onChange={(e) => setExportQuality(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
              )}

              <div className="text-sm text-gray-400 bg-gray-700 p-3 rounded">
                <p><strong>Size:</strong> {canvasSize.width} × {canvasSize.height}px</p>
                <p><strong>Elements:</strong> {elements.length}</p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 bg-gray-600 text-gray-200 py-2 px-4 rounded font-medium hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={exportDesign}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-20 bg-gray-800 flex flex-col border-r border-gray-700">
        <div className="p-2">
          <h3 className="text-xs font-semibold text-gray-400 mb-2">Tools</h3>
          {toolCategories.map((category) => (
            <div key={category.name} className="mb-4">
              <div className="text-xs text-gray-500 mb-1">{category.name}</div>
              {category.tools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setSelectedTool(tool.id);
                      if (tool.id === 'upload') {
                        fileInputRef.current?.click();
                      } else if (tool.id === 'text') {
                        addTextElement();
                      } else if (tool.id === 'shape') {
                        addShapeElement('rectangle');
                      }
                    }}
                    className={`w-full flex flex-col items-center p-2 mb-1 rounded transition-colors ${
                      selectedTool === tool.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                    title={`${tool.name} (${tool.shortcut})`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="text-xs mt-1">{tool.name}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col max-h-screen overflow-y-auto">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Template Editor</h2>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Template name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            <select
              value={templateCategory}
              onChange={(e) => setTemplateCategory(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="business-cards">Business Cards</option>
              <option value="flyers">Flyers</option>
              <option value="brochures">Brochures</option>
              <option value="banners">Banners</option>
              <option value="merchandise">Merchandise</option>
            </select>
          </div>
        </div>

        <div className="p-4 border-b border-gray-700">
          <h3 className="font-semibold text-white mb-3">Add Elements</h3>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={addTextElement}
              className="flex flex-col items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Type className="h-5 w-5 text-gray-300 mb-1" />
              <span className="text-xs text-gray-300">Text</span>
            </button>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Image className="h-5 w-5 text-gray-300 mb-1" />
              <span className="text-xs text-gray-300">Image</span>
            </button>
            
            <button
              onClick={() => addShapeElement('rectangle')}
              className="flex flex-col items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Square className="h-5 w-5 text-gray-300 mb-1" />
              <span className="text-xs text-gray-300">Rect</span>
            </button>
            
            <button
              onClick={() => addShapeElement('circle')}
              className="flex flex-col items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Circle className="h-5 w-5 text-gray-300 mb-1" />
              <span className="text-xs text-gray-300">Circle</span>
            </button>

            <button
              onClick={() => addShapeElement('triangle')}
              className="flex flex-col items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Triangle className="h-5 w-5 text-gray-300 mb-1" />
              <span className="text-xs text-gray-300">Triangle</span>
            </button>

            <button
              onClick={() => addShapeElement('star')}
              className="flex flex-col items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Star className="h-5 w-5 text-gray-300 mb-1" />
              <span className="text-xs text-gray-300">Star</span>
            </button>

            <button
              onClick={() => addLineElement('line')}
              className="flex flex-col items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Minus className="h-5 w-5 text-gray-300 mb-1" />
              <span className="text-xs text-gray-300">Line</span>
            </button>

            <button
              onClick={() => addLineElement('arrow')}
              className="flex flex-col items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <ArrowRight className="h-5 w-5 text-gray-300 mb-1" />
              <span className="text-xs text-gray-300">Arrow</span>
            </button>
          </div>
        </div>

        {(selectedTool === 'brush' || selectedTool === 'pencil') && (
          <div className="p-4 border-b border-gray-700">
            <h3 className="font-semibold text-white mb-3">Brush Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Size: {brushSize}px</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Color</label>
                <input
                  type="color"
                  value={brushColor}
                  onChange={(e) => setBrushColor(e.target.value)}
                  className="w-full h-8 border border-gray-600 rounded"
                />
              </div>
            </div>
          </div>
        )}

        {selectedEl && (
          <div className="p-4 border-b border-gray-700 flex-1 overflow-y-auto">
            <h3 className="font-semibold text-white mb-3">Properties</h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">X</label>
                  <input
                    type="number"
                    value={Math.round(selectedEl.x)}
                    onChange={(e) => updateElement(selectedEl.id, { x: parseInt(e.target.value) })}
                    className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Y</label>
                  <input
                    type="number"
                    value={Math.round(selectedEl.y)}
                    onChange={(e) => updateElement(selectedEl.id, { y: parseInt(e.target.value) })}
                    className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Width</label>
                  <input
                    type="number"
                    value={Math.round(selectedEl.width)}
                    onChange={(e) => updateElement(selectedEl.id, { width: parseInt(e.target.value) })}
                    className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Height</label>
                  <input
                    type="number"
                    value={Math.round(selectedEl.height)}
                    onChange={(e) => updateElement(selectedEl.id, { height: parseInt(e.target.value) })}
                    className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Opacity: {Math.round((selectedEl.opacity || 1) * 100)}%</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={selectedEl.opacity || 1}
                  onChange={(e) => updateElement(selectedEl.id, { opacity: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              {selectedEl.type === 'text' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Text</label>
                    <textarea
                      value={selectedEl.content || ''}
                      onChange={(e) => updateElement(selectedEl.id, { content: e.target.value })}
                      className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white"
                      rows={2}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Font Size</label>
                      <input
                        type="number"
                        value={selectedEl.fontSize || 16}
                        onChange={(e) => updateElement(selectedEl.id, { fontSize: parseInt(e.target.value) })}
                        className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Font Family</label>
                      <select
                        value={selectedEl.fontFamily || 'Arial'}
                        onChange={(e) => updateElement(selectedEl.id, { fontFamily: e.target.value })}
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
                    <label className="block text-xs font-medium text-gray-300 mb-2">Text Style</label>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => updateElement(selectedEl.id, { 
                          fontWeight: selectedEl.fontWeight === 'bold' ? 'normal' : 'bold' 
                        })}
                        className={`p-1 rounded text-xs ${
                          selectedEl.fontWeight === 'bold' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        <Bold className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => updateElement(selectedEl.id, { 
                          fontStyle: selectedEl.fontStyle === 'italic' ? 'normal' : 'italic' 
                        })}
                        className={`p-1 rounded text-xs ${
                          selectedEl.fontStyle === 'italic' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        <Italic className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => updateElement(selectedEl.id, { 
                          textDecoration: selectedEl.textDecoration === 'underline' ? 'none' : 'underline' 
                        })}
                        className={`p-1 rounded text-xs ${
                          selectedEl.textDecoration === 'underline' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        <Underline className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">Text Align</label>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => alignElements('left')}
                        className={`p-1 rounded text-xs ${
                          selectedEl.textAlign === 'left' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        <AlignLeft className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => alignElements('center')}
                        className={`p-1 rounded text-xs ${
                          selectedEl.textAlign === 'center' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        <AlignCenter className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => alignElements('right')}
                        className={`p-1 rounded text-xs ${
                          selectedEl.textAlign === 'right' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        <AlignRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Color</label>
                    <input
                      type="color"
                      value={selectedEl.color || '#000000'}
                      onChange={(e) => updateElement(selectedEl.id, { color: e.target.value })}
                      className="w-full h-8 border border-gray-600 rounded"
                    />
                  </div>
                </>
              )}

              {selectedEl.type === 'shape' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Background Color</label>
                    <input
                      type="color"
                      value={selectedEl.backgroundColor || '#3B82F6'}
                      onChange={(e) => updateElement(selectedEl.id, { backgroundColor: e.target.value })}
                      className="w-full h-8 border border-gray-600 rounded"
                    />
                  </div>
                  {selectedEl.content === 'rectangle' && (
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Border Radius</label>
                      <input
                        type="number"
                        value={selectedEl.borderRadius || 0}
                        onChange={(e) => updateElement(selectedEl.id, { borderRadius: parseInt(e.target.value) })}
                        className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white"
                        min="0"
                      />
                    </div>
                  )}
                </>
              )}

              {(selectedEl.type === 'line' || selectedEl.type === 'arrow') && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Color</label>
                    <input
                      type="color"
                      value={selectedEl.color || '#000000'}
                      onChange={(e) => updateElement(selectedEl.id, { color: e.target.value })}
                      className="w-full h-8 border border-gray-600 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Stroke Width</label>
                    <input
                      type="number"
                      value={selectedEl.strokeWidth || 2}
                      onChange={(e) => updateElement(selectedEl.id, { strokeWidth: parseInt(e.target.value) })}
                      className="w-full px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white"
                      min="1"
                    />
                  </div>
                </>
              )}

              {selectedEl.type === 'image' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Filters</label>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Blur: {selectedEl.blur || 0}px</label>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          value={selectedEl.blur || 0}
                          onChange={(e) => applyFilter('blur', parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Brightness: {Math.round((selectedEl.brightness || 1) * 100)}%</label>
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.1"
                          value={selectedEl.brightness || 1}
                          onChange={(e) => applyFilter('brightness', parseFloat(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Contrast: {Math.round((selectedEl.contrast || 1) * 100)}%</label>
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.1"
                          value={selectedEl.contrast || 1}
                          onChange={(e) => applyFilter('contrast', parseFloat(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Rotation</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={selectedEl.rotation || 0}
                  onChange={(e) => updateElement(selectedEl.id, { rotation: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-xs text-gray-400 text-center">{selectedEl.rotation || 0}°</div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Layer</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => moveElementLayer(selectedEl.id, 'up')}
                    className="flex-1 bg-gray-700 text-gray-300 py-1 px-2 rounded text-xs hover:bg-gray-600 transition-colors flex items-center justify-center"
                  >
                    <ChevronUp className="h-3 w-3 mr-1" />
                    Up
                  </button>
                  <button
                    onClick={() => moveElementLayer(selectedEl.id, 'down')}
                    className="flex-1 bg-gray-700 text-gray-300 py-1 px-2 rounded text-xs hover:bg-gray-600 transition-colors flex items-center justify-center"
                  >
                    <ChevronDown className="h-3 w-3 mr-1" />
                    Down
                  </button>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => duplicateElement(selectedEl.id)}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-xs hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </button>
                <button
                  onClick={() => deleteElement(selectedEl.id)}
                  className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-xs hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 border-t border-gray-700">
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
              className="w-full bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
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
            
            <button
              onClick={onClose}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded font-medium hover:bg-gray-700 transition-colors"
            >
              Close Editor
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gray-700 flex flex-col">
        <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-white">Template Editor</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-gray-300"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium text-gray-300">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-gray-300"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-300">Canvas:</label>
              <select
                value={`${canvasSize.width}x${canvasSize.height}`}
                onChange={(e) => {
                  const [width, height] = e.target.value.split('x').map(Number);
                  setCanvasSize({ width, height });
                }}
                className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-gray-300"
              >
                <option value="800x600">Business Card (800x600)</option>
                <option value="1200x800">Flyer (1200x800)</option>
                <option value="1600x900">Banner (1600x900)</option>
                <option value="1000x1000">Square (1000x1000)</option>
              </select>
            </div>
          </div>
          
          <div className="text-sm text-gray-400">
            Elements: {elements.length} | Selected: {selectedElement ? '1' : '0'}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
          <div
            ref={canvasRef}
            className="bg-white shadow-lg relative border border-gray-600"
            style={{
              width: canvasSize.width,
              height: canvasSize.height,
              transform: `scale(${zoom})`,
              transformOrigin: 'center',
              cursor: selectedTool === 'move' ? 'move' : 
                     selectedTool === 'brush' || selectedTool === 'pencil' ? 'crosshair' :
                     selectedTool === 'eyedropper' ? 'copy' :
                     selectedTool === 'crop' ? 'crosshair' : 'default'
            }}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onClick={() => setSelectedElement(null)}
          >
            <canvas
              ref={drawingCanvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 1000 }}
            />
            
            {selectionArea && (
              <div
                className="absolute border-2 border-dashed border-blue-500 bg-blue-100 bg-opacity-20"
                style={{
                  left: selectionArea.x,
                  top: selectionArea.y,
                  width: Math.abs(selectionArea.width),
                  height: Math.abs(selectionArea.height),
                  zIndex: 999
                }}
              />
            )}

            {elements
              .sort((a, b) => a.zIndex - b.zIndex)
              .map((element) => (
                <div
                  key={element.id}
                  className={`absolute cursor-move border-2 ${
                    selectedElement === element.id ? 'border-blue-500' : 
                    element.selected ? 'border-green-500' : 'border-transparent'
                  } hover:border-blue-300`}
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
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
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        color: element.color,
                        fontSize: element.fontSize,
                        fontFamily: element.fontFamily,
                        fontWeight: element.fontWeight,
                        fontStyle: element.fontStyle,
                        textDecoration: element.textDecoration,
                        textAlign: element.textAlign as any
                      }}
                      onDoubleClick={() => {
                        const newContent = prompt('Edit text:', element.content);
                        if (newContent !== null) {
                          updateElement(element.id, { content: newContent });
                        }
                      }}
                    >
                      {element.content}
                    </div>
                  )}
                  
                  {element.type === 'image' && (
                    <img
                      src={element.src}
                      alt="Element"
                      className="w-full h-full object-cover"
                      style={{
                        filter: `blur(${element.blur || 0}px) brightness(${element.brightness || 1}) contrast(${element.contrast || 1})`
                      }}
                      draggable={false}
                    />
                  )}
                  
                  {element.type === 'shape' && (
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundColor: element.backgroundColor,
                        borderRadius: element.content === 'circle' ? '50%' : `${element.borderRadius || 0}px`,
                        clipPath: element.content === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
                                 element.content === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' :
                                 'none'
                      }}
                    />
                  )}

                  {element.type === 'line' && (
                    <div
                      className="w-full"
                      style={{
                        height: element.strokeWidth,
                        backgroundColor: element.color,
                        marginTop: `${(element.height - (element.strokeWidth || 2)) / 2}px`
                      }}
                    />
                  )}

                  {element.type === 'arrow' && (
                    <div className="relative w-full h-full">
                      <div
                        className="absolute"
                        style={{
                          width: element.width - 10,
                          height: element.strokeWidth,
                          backgroundColor: element.color,
                          top: `${(element.height - (element.strokeWidth || 2)) / 2}px`
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          right: 0,
                          top: `${element.height / 2 - 5}px`,
                          width: 0,
                          height: 0,
                          borderLeft: `10px solid ${element.color}`,
                          borderTop: '5px solid transparent',
                          borderBottom: '5px solid transparent'
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;