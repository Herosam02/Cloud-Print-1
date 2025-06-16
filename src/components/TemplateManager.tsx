import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Search, 
  Filter,
  Star,
  Calendar,
  User,
  Copy,
  Upload
} from 'lucide-react';
import TemplateEditor from './TemplateEditor';

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

const TemplateManager: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'business-cards', name: 'Business Cards' },
    { id: 'flyers', name: 'Flyers' },
    { id: 'brochures', name: 'Brochures' },
    { id: 'banners', name: 'Banners' },
    { id: 'merchandise', name: 'Merchandise' }
  ];

  // Load templates from localStorage on component mount
  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    try {
      const savedTemplates = localStorage.getItem('cloudprint-templates');
      if (savedTemplates) {
        const parsed = JSON.parse(savedTemplates);
        setTemplates(Array.isArray(parsed) ? parsed : []);
      } else {
        // Initialize with default templates
        const defaultTemplates: Template[] = [
          {
            id: 'default-1',
            name: 'Modern Business Card',
            category: 'business-cards',
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
              },
              {
                id: 'text-2',
                type: 'text',
                x: 50,
                y: 100,
                width: 200,
                height: 30,
                content: 'Your Title',
                color: '#6B7280',
                fontSize: 16,
                fontFamily: 'Arial',
                rotation: 0,
                zIndex: 2
              }
            ],
            canvasSize: { width: 800, height: 600 },
            thumbnail: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400',
            createdAt: new Date().toISOString(),
            downloads: 1250,
            rating: 4.8,
            author: 'Cloud Print Team'
          },
          {
            id: 'default-2',
            name: 'Event Flyer Template',
            category: 'flyers',
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
              },
              {
                id: 'shape-1',
                type: 'shape',
                x: 50,
                y: 200,
                width: 500,
                height: 200,
                backgroundColor: '#3B82F6',
                rotation: 0,
                zIndex: 0,
                content: 'rectangle'
              }
            ],
            canvasSize: { width: 1200, height: 800 },
            thumbnail: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400',
            createdAt: new Date().toISOString(),
            downloads: 890,
            rating: 4.6,
            author: 'Cloud Print Team'
          }
        ];
        setTemplates(defaultTemplates);
        saveTemplates(defaultTemplates);
      }
    } catch (error) {
      console.error('Error loading templates:', error);
      setTemplates([]);
    }
  };

  const saveTemplates = (templatesToSave: Template[]) => {
    try {
      localStorage.setItem('cloudprint-templates', JSON.stringify(templatesToSave));
    } catch (error) {
      console.error('Error saving templates:', error);
    }
  };

  const handleSaveTemplate = (template: Template) => {
    try {
      let updatedTemplates: Template[];
      
      if (editingTemplate) {
        // Update existing template
        updatedTemplates = templates.map(t => t.id === template.id ? template : t);
      } else {
        // Add new template
        updatedTemplates = [...templates, template];
      }
      
      setTemplates(updatedTemplates);
      saveTemplates(updatedTemplates);
      setShowEditor(false);
      setEditingTemplate(undefined);
      
      // Force re-render
      setTimeout(() => {
        loadTemplates();
      }, 100);
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Error saving template. Please try again.');
    }
  };

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    setShowEditor(true);
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      const updatedTemplates = templates.filter(t => t.id !== templateId);
      setTemplates(updatedTemplates);
      saveTemplates(updatedTemplates);
    }
  };

  const handleDuplicateTemplate = (template: Template) => {
    const duplicatedTemplate: Template = {
      ...template,
      id: `template-${Date.now()}`,
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString(),
      downloads: 0
    };
    const updatedTemplates = [...templates, duplicatedTemplate];
    setTemplates(updatedTemplates);
    saveTemplates(updatedTemplates);
  };

  const exportTemplate = (template: Template) => {
    try {
      const dataStr = JSON.stringify(template, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `${template.name.replace(/\s+/g, '-').toLowerCase()}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      console.error('Error exporting template:', error);
      alert('Error exporting template. Please try again.');
    }
  };

  const importTemplate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTemplate = JSON.parse(e.target?.result as string);
          
          // Validate template structure
          if (importedTemplate.name && importedTemplate.elements && importedTemplate.canvasSize) {
            const newTemplate: Template = {
              ...importedTemplate,
              id: `template-${Date.now()}`,
              createdAt: new Date().toISOString(),
              downloads: 0,
              rating: 5.0,
              author: 'Imported'
            };
            
            const updatedTemplates = [...templates, newTemplate];
            setTemplates(updatedTemplates);
            saveTemplates(updatedTemplates);
            alert('Template imported successfully!');
          } else {
            alert('Invalid template file format.');
          }
        } catch (error) {
          console.error('Error importing template:', error);
          alert('Error importing template. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredTemplates = templates
    .filter(template => {
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'popular':
          return (b.downloads || 0) - (a.downloads || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  if (showEditor) {
    return (
      <TemplateEditor
        template={editingTemplate}
        onSave={handleSaveTemplate}
        onClose={() => {
          setShowEditor(false);
          setEditingTemplate(undefined);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Template Manager</h1>
              <p className="text-gray-600 mt-1">Create, edit, and manage your design templates</p>
            </div>
            <div className="flex space-x-3">
              <label className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center cursor-pointer">
                <Upload className="h-5 w-5 mr-2" />
                Import Template
                <input
                  type="file"
                  accept=".json"
                  onChange={importTemplate}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => setShowEditor(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Template
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map(template => (
            <div key={template.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="relative group">
                <img 
                  src={template.thumbnail} 
                  alt={template.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2 rounded-t-lg">
                  <button
                    onClick={() => handleEditTemplate(template)}
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                    title="Edit Template"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDuplicateTemplate(template)}
                    className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                    title="Duplicate Template"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => exportTemplate(template)}
                    className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
                    title="Export Template"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                    title="Delete Template"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 truncate">{template.name}</h3>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span className="capitalize">{template.category.replace('-', ' ')}</span>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                    <span>{template.rating?.toFixed(1) || 'N/A'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{new Date(template.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="h-3 w-3 mr-1" />
                    <span>{template.downloads || 0}</span>
                  </div>
                </div>

                {template.author && (
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <User className="h-3 w-3 mr-1" />
                    <span>{template.author}</span>
                  </div>
                )}

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditTemplate(template)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => exportTemplate(template)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'Create your first template to get started'
              }
            </p>
            <button
              onClick={() => setShowEditor(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Template
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateManager;