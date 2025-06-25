import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Eye, 
  Search, 
  Filter,
  CreditCard,
  FileText,
  Image,
  Megaphone,
  Package,
  Star,
  Edit,
  Palette,
  Plus,
  Settings
} from 'lucide-react';
import TemplateManager from '../components/TemplateManager';

interface Template {
  id: string;
  name: string;
  category: string;
  elements: any[];
  canvasSize: { width: number; height: number };
  thumbnail: string;
  createdAt: string;
  downloads?: number;
  rating?: number;
  author?: string;
}

const TemplatesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showManager, setShowManager] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);

  const categories = [
    { id: 'all', name: 'All Templates', icon: <Star className="h-5 w-5" /> },
    { id: 'business-cards', name: 'Business Cards', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'flyers', name: 'Flyers', icon: <Image className="h-5 w-5" /> },
    { id: 'brochures', name: 'Brochures', icon: <FileText className="h-5 w-5" /> },
    { id: 'banners', name: 'Banners', icon: <Megaphone className="h-5 w-5" /> },
    { id: 'merchandise', name: 'Merchandise', icon: <Package className="h-5 w-5" /> }
  ];

  // Load templates from localStorage
  useEffect(() => {
    loadTemplates();
    
    // Listen for storage changes to update templates in real-time
    const handleStorageChange = () => {
      loadTemplates();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events when templates are updated
    window.addEventListener('templatesUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('templatesUpdated', handleStorageChange);
    };
  }, []);

  const loadTemplates = () => {
    try {
      const savedTemplates = localStorage.getItem('cloudprint-templates');
      if (savedTemplates) {
        const parsed = JSON.parse(savedTemplates);
        setTemplates(Array.isArray(parsed) ? parsed : []);
      } else {
        // Default templates if none exist
        const defaultTemplates: Template[] = [
          {
            id: 'default-1',
            name: "Modern Business Card",
            category: "business-cards",
            elements: [
              {
                id: 'text-1',
                type: 'text',
                x: 50,
                y: 50,
                width: 200,
                height: 40,
                content: 'Your Name',
                color: '#1F2937',
                fontSize: 24,
                fontFamily: 'Arial',
                rotation: 0,
                zIndex: 1
              }
            ],
            canvasSize: { width: 800, height: 600 },
            thumbnail: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400",
            createdAt: new Date().toISOString(),
            downloads: 1250,
            rating: 4.8,
            author: 'Cloud Print Team'
          },
          {
            id: 'default-2',
            name: "Creative Flyer Design",
            category: "flyers",
            elements: [
              {
                id: 'text-1',
                type: 'text',
                x: 100,
                y: 100,
                width: 400,
                height: 60,
                content: 'Event Title',
                color: '#1F2937',
                fontSize: 36,
                fontFamily: 'Arial',
                rotation: 0,
                zIndex: 1
              }
            ],
            canvasSize: { width: 1200, height: 800 },
            thumbnail: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400",
            createdAt: new Date().toISOString(),
            downloads: 890,
            rating: 4.6,
            author: 'Cloud Print Team'
          },
          {
            id: 'default-3',
            name: "Corporate Brochure",
            category: "brochures",
            elements: [
              {
                id: 'text-1',
                type: 'text',
                x: 50,
                y: 50,
                width: 300,
                height: 50,
                content: 'Company Brochure',
                color: '#1F2937',
                fontSize: 28,
                fontFamily: 'Arial',
                rotation: 0,
                zIndex: 1
              }
            ],
            canvasSize: { width: 1000, height: 700 },
            thumbnail: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400",
            createdAt: new Date().toISOString(),
            downloads: 675,
            rating: 4.7,
            author: 'Cloud Print Team'
          },
          {
            id: 'default-4',
            name: "Event Banner Template",
            category: "banners",
            elements: [
              {
                id: 'text-1',
                type: 'text',
                x: 200,
                y: 150,
                width: 600,
                height: 80,
                content: 'Event Banner',
                color: '#FFFFFF',
                fontSize: 48,
                fontFamily: 'Arial',
                rotation: 0,
                zIndex: 2
              },
              {
                id: 'shape-1',
                type: 'shape',
                x: 0,
                y: 0,
                width: 1000,
                height: 400,
                backgroundColor: '#3B82F6',
                rotation: 0,
                zIndex: 1,
                content: 'rectangle'
              }
            ],
            canvasSize: { width: 1600, height: 900 },
            thumbnail: "https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=400",
            createdAt: new Date().toISOString(),
            downloads: 543,
            rating: 4.5,
            author: 'Cloud Print Team'
          },
          {
            id: 'default-5',
            name: "T-Shirt Design Template",
            category: "merchandise",
            elements: [
              {
                id: 'text-1',
                type: 'text',
                x: 150,
                y: 200,
                width: 300,
                height: 60,
                content: 'Custom Design',
                color: '#FFFFFF',
                fontSize: 32,
                fontFamily: 'Arial',
                rotation: 0,
                zIndex: 2
              },
              {
                id: 'shape-1',
                type: 'shape',
                x: 100,
                y: 150,
                width: 400,
                height: 150,
                backgroundColor: '#10B981',
                rotation: 0,
                zIndex: 1,
                content: 'rectangle'
              }
            ],
            canvasSize: { width: 600, height: 600 },
            thumbnail: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400",
            createdAt: new Date().toISOString(),
            downloads: 432,
            rating: 4.4,
            author: 'Cloud Print Team'
          },
          {
            id: 'default-6',
            name: "Minimalist Business Card",
            category: "business-cards",
            elements: [
              {
                id: 'text-1',
                type: 'text',
                x: 50,
                y: 80,
                width: 250,
                height: 35,
                content: 'John Doe',
                color: '#000000',
                fontSize: 20,
                fontFamily: 'Arial',
                rotation: 0,
                zIndex: 1
              },
              {
                id: 'text-2',
                type: 'text',
                x: 50,
                y: 120,
                width: 250,
                height: 25,
                content: 'Creative Director',
                color: '#6B7280',
                fontSize: 14,
                fontFamily: 'Arial',
                rotation: 0,
                zIndex: 2
              }
            ],
            canvasSize: { width: 800, height: 600 },
            thumbnail: "https://images.pexels.com/photos/6801647/pexels-photo-6801647.jpeg?auto=compress&cs=tinysrgb&w=400",
            createdAt: new Date().toISOString(),
            downloads: 1100,
            rating: 4.9,
            author: 'Cloud Print Team'
          }
        ];
        setTemplates(defaultTemplates);
        localStorage.setItem('cloudprint-templates', JSON.stringify(defaultTemplates));
      }
    } catch (error) {
      console.error('Error loading templates:', error);
      setTemplates([]);
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.author?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (showManager) {
    return <TemplateManager />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Design Templates</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Professional, customizable templates for all your printing needs. 
              Edit with our drag-and-drop editor, customize, and print with Cloud Print.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowManager(true)}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 inline-flex items-center justify-center"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create New Template
              </button>
              <button
                onClick={() => setShowManager(true)}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 inline-flex items-center justify-center"
              >
                <Settings className="mr-2 h-5 w-5" />
                Manage Templates
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Design Editor Highlight */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <Palette className="h-12 w-12" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">Built-in Drag & Drop Editor</h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Create and customize templates with our powerful built-in editor. 
              Drag and drop elements, change colors, add text, and create stunning designs in minutes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <Edit className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Easy Editing</h3>
                <p className="text-sm text-purple-100">Drag and drop interface for quick customization</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <Download className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Instant Export</h3>
                <p className="text-sm text-purple-100">Export your designs in high-resolution formats</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <Package className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Print Ready</h3>
                <p className="text-sm text-purple-100">High-resolution files ready for professional printing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50" id="templates">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedCategory === 'all' ? 'All Templates' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-600">
                {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <button
              onClick={() => setShowManager(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Template
            </button>
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria, or create a new template</p>
              <button
                onClick={() => setShowManager(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Template
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredTemplates.map(template => (
                <div key={template.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative group">
                    <img 
                      src={template.thumbnail} 
                      alt={template.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setShowManager(true)}
                        className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-colors"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{template.rating?.toFixed(1) || '5.0'}</span>
                      </div>
                      <span className="text-sm text-gray-500">{template.downloads || 0} downloads</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize">
                        {template.category.replace('-', ' ')}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                        {template.author || 'User'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => setShowManager(true)}
                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm flex items-center justify-center"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Template
                      </button>
                      <Link 
                        to={`/order?template=${template.id}`}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center text-sm block"
                      >
                        Print with Cloud Print
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Template Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Use Our Template Editor?</h2>
            <p className="text-xl text-gray-600">
              Professional designs with powerful editing tools, ready for immediate use
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Edit className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Drag & Drop Editor</h3>
              <p className="text-gray-600">Intuitive interface for easy customization without design skills</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Professional Quality</h3>
              <p className="text-gray-600">Designed by professionals for business use</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Download className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Instant Export</h3>
              <p className="text-gray-600">Export your customized design immediately after editing</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Package className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold">Print Ready</h3>
              <p className="text-gray-600">High-resolution files optimized for professional printing</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Template Editing Works</h2>
            <p className="text-xl text-gray-600">
              From template selection to professional printing in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold">Choose Template</h3>
              <p className="text-gray-600">Browse our gallery and select the perfect template for your needs</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold">Edit & Customize</h3>
              <p className="text-gray-600">Use our drag-and-drop editor to personalize your design</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold">Export Design</h3>
              <p className="text-gray-600">Export your customized, print-ready design file</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-semibold">Print with Us</h3>
              <p className="text-gray-600">Upload to Cloud Print for professional printing and delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Create Your Design?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Start with a professional template, customize it with our drag-and-drop editor, 
            and let us handle the printing and delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowManager(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 inline-flex items-center justify-center"
            >
              <Edit className="mr-2 h-5 w-5" />
              Start Designing Now
            </button>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Need Custom Design Help?
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TemplatesPage;