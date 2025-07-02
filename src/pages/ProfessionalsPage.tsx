import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Search, 
  Filter,
  Users,
  Printer,
  Palette,
  Camera,
  Award,
  Clock,
  DollarSign,
  ExternalLink,
  MessageCircle,
  Heart,
  Share2,
  Navigation,
  CheckCircle,
  Briefcase,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';

interface Professional {
  id: string;
  name: string;
  type: 'printer' | 'designer' | 'photographer' | 'both';
  specialties: string[];
  rating: number;
  reviewCount: number;
  location: {
    city: string;
    state: string;
    address: string;
    coordinates: { lat: number; lng: number };
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
    whatsapp?: string;
  };
  social?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  description: string;
  services: string[];
  priceRange: string;
  experience: string;
  portfolio: string[];
  availability: 'available' | 'busy' | 'unavailable';
  responseTime: string;
  verified: boolean;
  featured: boolean;
  joinedDate: string;
  distance?: number; // Distance in kilometers
}

const ProfessionalsPage = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState<'pending' | 'granted' | 'denied'>('pending');

  // Mock data for professionals
  useEffect(() => {
    const mockProfessionals: Professional[] = [
      {
        id: '1',
        name: 'PrintMaster Lagos',
        type: 'printer',
        specialties: ['Large Format', 'Business Cards', 'Banners'],
        rating: 4.9,
        reviewCount: 127,
        location: {
          city: 'Lagos',
          state: 'Lagos',
          address: '15 Victoria Island, Lagos',
          coordinates: { lat: 6.4281, lng: 3.4219 }
        },
        contact: {
          phone: '+234-906-631-0001',
          email: 'info@printmaster.ng',
          website: 'https://printmaster.ng',
          whatsapp: '+234-906-631-0001'
        },
        social: {
          instagram: '@printmaster_ng',
          facebook: 'PrintMasterLagos'
        },
        description: 'Professional printing services with 15+ years experience. Specializing in high-quality large format printing and business materials.',
        services: ['Digital Printing', 'Offset Printing', 'Large Format', 'Binding', 'Lamination'],
        priceRange: '₦₦₦',
        experience: '15+ years',
        portfolio: [
          'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        availability: 'available',
        responseTime: '< 2 hours',
        verified: true,
        featured: true,
        joinedDate: '2020-01-15'
      },
      {
        id: '2',
        name: 'Creative Designs Studio',
        type: 'designer',
        specialties: ['Brand Identity', 'Marketing Materials', 'Web Design'],
        rating: 4.8,
        reviewCount: 89,
        location: {
          city: 'Abuja',
          state: 'FCT',
          address: '23 Central Business District, Abuja',
          coordinates: { lat: 9.0579, lng: 7.4951 }
        },
        contact: {
          phone: '+234-906-631-0001',
          email: 'hello@creativedesigns.ng',
          website: 'https://creativedesigns.ng'
        },
        social: {
          instagram: '@creative_designs_ng',
          linkedin: 'creative-designs-studio'
        },
        description: 'Award-winning design studio creating impactful brand identities and marketing materials for businesses across Nigeria.',
        services: ['Logo Design', 'Branding', 'Print Design', 'Digital Design', 'Packaging'],
        priceRange: '₦₦₦₦',
        experience: '8+ years',
        portfolio: [
          'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        availability: 'busy',
        responseTime: '< 4 hours',
        verified: true,
        featured: true,
        joinedDate: '2019-03-20'
      },
      {
        id: '3',
        name: 'QuickPrint Express',
        type: 'printer',
        specialties: ['Same Day Printing', 'Documents', 'Emergency Orders'],
        rating: 4.6,
        reviewCount: 156,
        location: {
          city: 'Port Harcourt',
          state: 'Rivers',
          address: '45 GRA Phase 2, Port Harcourt',
          coordinates: { lat: 4.8156, lng: 7.0498 }
        },
        contact: {
          phone: '+234-906-631-0001',
          email: 'orders@quickprint.ng',
          whatsapp: '+234-906-631-0001'
        },
        description: 'Fast and reliable printing services with same-day delivery. Perfect for urgent printing needs and last-minute orders.',
        services: ['Document Printing', 'Business Cards', 'Flyers', 'Same Day Service'],
        priceRange: '₦₦',
        experience: '5+ years',
        portfolio: [
          'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        availability: 'available',
        responseTime: '< 1 hour',
        verified: true,
        featured: false,
        joinedDate: '2021-06-10'
      },
      {
        id: '4',
        name: 'Design & Print Hub',
        type: 'both',
        specialties: ['Full Service', 'Custom Projects', 'Event Materials'],
        rating: 4.7,
        reviewCount: 203,
        location: {
          city: 'Kano',
          state: 'Kano',
          address: '12 Bompai Road, Kano',
          coordinates: { lat: 12.0022, lng: 8.5920 }
        },
        contact: {
          phone: '+234-906-631-0001',
          email: 'info@designprinthub.ng',
          website: 'https://designprinthub.ng'
        },
        social: {
          facebook: 'DesignPrintHub',
          twitter: '@designprinthub'
        },
        description: 'One-stop shop for design and printing services. From concept to completion, we handle all your creative and printing needs.',
        services: ['Graphic Design', 'Printing', 'Branding', 'Event Materials', 'Signage'],
        priceRange: '₦₦₦',
        experience: '10+ years',
        portfolio: [
          'https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        availability: 'available',
        responseTime: '< 3 hours',
        verified: true,
        featured: false,
        joinedDate: '2018-11-05'
      },
      {
        id: '5',
        name: 'Elite Graphics Studio',
        type: 'designer',
        specialties: ['Luxury Branding', 'Premium Design', 'Corporate Identity'],
        rating: 4.9,
        reviewCount: 67,
        location: {
          city: 'Lagos',
          state: 'Lagos',
          address: '8 Ikoyi, Lagos',
          coordinates: { lat: 6.4474, lng: 3.4553 }
        },
        contact: {
          phone: '+234-906-631-0001',
          email: 'studio@elitegraphics.ng',
          website: 'https://elitegraphics.ng'
        },
        social: {
          instagram: '@elite_graphics_ng',
          linkedin: 'elite-graphics-studio'
        },
        description: 'Premium design studio specializing in luxury branding and high-end corporate identity design for discerning clients.',
        services: ['Premium Branding', 'Corporate Design', 'Luxury Packaging', 'Annual Reports'],
        priceRange: '₦₦₦₦₦',
        experience: '12+ years',
        portfolio: [
          'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/159832/justice-law-case-hearing-159832.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        availability: 'busy',
        responseTime: '< 6 hours',
        verified: true,
        featured: true,
        joinedDate: '2017-08-12'
      },
      {
        id: '6',
        name: 'Budget Print Solutions',
        type: 'printer',
        specialties: ['Affordable Printing', 'Bulk Orders', 'Student Discounts'],
        rating: 4.4,
        reviewCount: 234,
        location: {
          city: 'Ibadan',
          state: 'Oyo',
          address: '67 Ring Road, Ibadan',
          coordinates: { lat: 7.3775, lng: 3.9470 }
        },
        contact: {
          phone: '+234-906-631-0001',
          email: 'orders@budgetprint.ng',
          whatsapp: '+234-906-631-0001'
        },
        description: 'Affordable printing solutions for students, small businesses, and bulk orders. Quality printing at budget-friendly prices.',
        services: ['Document Printing', 'Thesis Binding', 'Bulk Printing', 'Student Services'],
        priceRange: '₦',
        experience: '6+ years',
        portfolio: [
          'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        availability: 'available',
        responseTime: '< 2 hours',
        verified: true,
        featured: false,
        joinedDate: '2020-09-18'
      }
    ];

    setProfessionals(mockProfessionals);
    setFilteredProfessionals(mockProfessionals);
  }, []);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in kilometers
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
  };

  // Get user location
  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newUserLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newUserLocation);
          setLocationPermission('granted');
          
          // Calculate distances for all professionals
          const professionalsWithDistance = professionals.map(prof => ({
            ...prof,
            distance: calculateDistance(
              newUserLocation.lat,
              newUserLocation.lng,
              prof.location.coordinates.lat,
              prof.location.coordinates.lng
            )
          }));
          
          setProfessionals(professionalsWithDistance);
        },
        (error) => {
          console.log('Location access denied', error);
          setLocationPermission('denied');
        }
      );
    }
  };

  // Update distances when user location changes
  useEffect(() => {
    if (userLocation && professionals.length > 0) {
      const professionalsWithDistance = professionals.map(prof => ({
        ...prof,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          prof.location.coordinates.lat,
          prof.location.coordinates.lng
        )
      }));
      
      setProfessionals(professionalsWithDistance);
    }
  }, [userLocation]);

  // Filter and search logic
  useEffect(() => {
    let filtered = professionals;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(prof => 
        prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase())) ||
        prof.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(prof => prof.type === selectedType || prof.type === 'both');
    }

    // Filter by location
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(prof => prof.location.state === selectedLocation);
    }

    // Filter by specialty
    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter(prof => 
        prof.specialties.some(specialty => specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()))
      );
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'distance':
          if (!a.distance && !b.distance) return 0;
          if (!a.distance) return 1;
          if (!b.distance) return -1;
          return a.distance - b.distance;
        case 'price-low':
          return a.priceRange.length - b.priceRange.length;
        case 'price-high':
          return b.priceRange.length - a.priceRange.length;
        default:
          return 0;
      }
    });

    // Featured professionals first
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    setFilteredProfessionals(filtered);
  }, [professionals, searchTerm, selectedType, selectedLocation, selectedSpecialty, sortBy]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'printer':
        return <Printer className="h-5 w-5" />;
      case 'designer':
        return <Palette className="h-5 w-5" />;
      case 'photographer':
        return <Camera className="h-5 w-5" />;
      case 'both':
        return <Briefcase className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'text-green-600 bg-green-100';
      case 'busy':
        return 'text-yellow-600 bg-yellow-100';
      case 'unavailable':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedLocation('all');
    setSelectedSpecialty('all');
    setSortBy('rating');
  };

  const locations = [...new Set(professionals.map(p => p.location.state))];
  const specialties = [...new Set(professionals.flatMap(p => p.specialties))];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-accent text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Connect with Local Professionals</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Find trusted printers, designers, and creative professionals in your area. 
              Connect directly, compare services, and get your projects done locally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={requestLocation}
                className="bg-background text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300 inline-flex items-center justify-center"
              >
                <Navigation className="mr-2 h-5 w-5" />
                {locationPermission === 'pending' ? 'Find Nearby Professionals' : 
                 locationPermission === 'granted' ? 'Location Enabled' : 
                 'Enable Location Access'}
              </button>
              <button className="border-2 border-background text-background px-8 py-4 rounded-lg font-semibold text-lg hover:bg-background hover:text-primary transition-all duration-300 inline-flex items-center justify-center">
                <Users className="mr-2 h-5 w-5" />
                Join as Professional
              </button>
            </div>
            {locationPermission === 'denied' && (
              <p className="mt-4 text-sm opacity-75">
                Location access is needed to find professionals near you. Please enable location access in your browser.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search professionals, services, or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-input bg-background rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-foreground"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="printer">Printers</option>
                <option value="designer">Designers</option>
                <option value="photographer">Photographers</option>
                <option value="both">Full Service</option>
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                <option value="all">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-4 py-3 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                <option value="all">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="distance">Nearest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {filteredProfessionals.length} Professional{filteredProfessionals.length !== 1 ? 's' : ''} Found
            </h2>
            <p className="text-muted-foreground">
              Connect with verified professionals in your area
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProfessionals.map(professional => (
              <div key={professional.id} className="bg-card rounded-xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Header */}
                <div className="relative p-6 pb-4">
                  {professional.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-full ${
                        professional.type === 'printer' ? 'bg-blue-100 text-blue-600' :
                        professional.type === 'designer' ? 'bg-purple-100 text-purple-600' :
                        professional.type === 'photographer' ? 'bg-green-100 text-green-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {getTypeIcon(professional.type)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-card-foreground flex items-center">
                          {professional.name}
                          {professional.verified && (
                            <CheckCircle className="h-5 w-5 text-blue-500 ml-2" />
                          )}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-card-foreground ml-1">
                              {professional.rating}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            ({professional.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {professional.description}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {professional.specialties.slice(0, 3).map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                    {professional.specialties.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        +{professional.specialties.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Location and Availability */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {professional.location.city}, {professional.location.state}
                      {professional.distance && (
                        <span className="ml-2 text-primary font-medium">
                          ({professional.distance} km away)
                        </span>
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(professional.availability)}`}>
                      {professional.availability}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className="font-semibold text-card-foreground">{professional.priceRange}</div>
                      <div className="text-muted-foreground">Price Range</div>
                    </div>
                    <div>
                      <div className="font-semibold text-card-foreground">{professional.experience}</div>
                      <div className="text-muted-foreground">Experience</div>
                    </div>
                    <div>
                      <div className="font-semibold text-card-foreground">{professional.responseTime}</div>
                      <div className="text-muted-foreground">Response</div>
                    </div>
                  </div>
                </div>

                {/* Portfolio Preview */}
                {professional.portfolio.length > 0 && (
                  <div className="px-6 pb-4">
                    <div className="flex space-x-2 overflow-x-auto">
                      {professional.portfolio.slice(0, 3).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${professional.name} portfolio ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <a
                      href={`tel:${professional.contact.phone}`}
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center text-sm flex items-center justify-center"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </a>
                    {professional.contact.whatsapp && (
                      <a
                        href={`https://wa.me/${professional.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors text-center text-sm flex items-center justify-center"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        WhatsApp
                      </a>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`mailto:${professional.contact.email}`}
                      className="bg-muted text-muted-foreground py-2 px-4 rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors text-center text-sm flex items-center justify-center"
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </a>
                    {professional.contact.website && (
                      <a
                        href={professional.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-accent text-accent-foreground py-2 px-4 rounded-lg font-medium hover:bg-accent/80 transition-colors text-center text-sm flex items-center justify-center"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        Website
                      </a>
                    )}
                  </div>

                  {/* Social Links */}
                  {professional.social && (
                    <div className="flex justify-center space-x-3 mt-4">
                      {professional.social.instagram && (
                        <a
                          href={`https://instagram.com/${professional.social.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-pink-500 transition-colors"
                        >
                          <Instagram className="h-5 w-5" />
                        </a>
                      )}
                      {professional.social.facebook && (
                        <a
                          href={`https://facebook.com/${professional.social.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-blue-600 transition-colors"
                        >
                          <Facebook className="h-5 w-5" />
                        </a>
                      )}
                      {professional.social.twitter && (
                        <a
                          href={`https://twitter.com/${professional.social.twitter.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-blue-400 transition-colors"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {professional.social.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${professional.social.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-blue-700 transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredProfessionals.length === 0 && (
            <div className="text-center py-16">
              <div className="text-muted-foreground mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No professionals found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or expanding your location range
              </p>
              <button 
                onClick={clearFilters}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Are You a Professional?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our network of trusted professionals and connect with clients in your area. 
            Grow your business with Cloud Print's professional directory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-background text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300 inline-flex items-center justify-center">
              <Users className="mr-2 h-5 w-5" />
              Join as Professional
            </button>
            <button className="border-2 border-background text-background px-8 py-4 rounded-lg font-semibold text-lg hover:bg-background hover:text-primary transition-all duration-300 inline-flex items-center justify-center">
              <Award className="mr-2 h-5 w-5" />
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalsPage;