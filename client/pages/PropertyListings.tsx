import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropertyData, PropertyListResponse } from "@shared/api";
import { Search, Plus, MapPin, IndianRupee, Eye, Filter, Home, Users, Building } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function PropertyListings() {
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, searchTerm, typeFilter]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/properties");
      const data = (await response.json()) as PropertyListResponse;
      setProperties(data.properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterProperties = () => {
    let filtered = properties;

    // Filter by search term (name or location)
    if (searchTerm) {
      filtered = filtered.filter(
        (property) =>
          property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by property type
    if (typeFilter !== "all") {
      filtered = filtered.filter((property) => property.type === typeFilter);
    }

    setFilteredProperties(filtered);
  };

  const getUniqueTypes = () => {
    const allTypes = properties.map((p) => p.type);
    return [...new Set(allTypes)];
  };

  const handleViewProperty = (property: PropertyData) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="text-slate-600 hover:text-slate-900"
              >
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <div className="text-sm text-slate-500">•</div>
              <Badge variant="outline">Assessment 1: Property Listings</Badge>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="text-slate-600 hover:text-slate-900"
            >
              <Users className="h-4 w-4 mr-2" />
              View Assessment 2
            </Button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Mini Property Listing Dashboard</h1>
              <p className="text-slate-600">Find your perfect property</p>
            </div>
            <Button
              onClick={() => navigate("/add-property")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-900">Filter Properties</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Filter by Name or Location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {getUniqueTypes().map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center text-sm text-slate-600">
              <span className="font-medium">{filteredProperties.length}</span>
              <span className="ml-1">properties found</span>
            </div>
          </div>
        </div>

        {/* Property Listings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-slate-900">{property.name}</CardTitle>
                    <Badge className="mt-1 bg-blue-100 text-blue-800">{property.type}</Badge>
                  </div>
                </div>
                <div className="flex items-center text-sm text-slate-600 mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {property.image && (
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-32 object-cover rounded-md"
                  />
                )}

                <CardDescription className="text-sm">
                  {property.description.length > 80 
                    ? `${property.description.substring(0, 80)}...` 
                    : property.description}
                </CardDescription>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-lg font-bold text-green-600">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {formatPrice(property.price)}
                  </div>
                </div>

                {property.features && property.features.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {property.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {property.features.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{property.features.length - 2}
                      </Badge>
                    )}
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleViewProperty(property)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">No properties found matching your criteria</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setTypeFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Property Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Property Details</DialogTitle>
            <DialogDescription>
              Complete information about this property
            </DialogDescription>
          </DialogHeader>
          
          {selectedProperty && (
            <div className="space-y-6">
              {selectedProperty.image && (
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{selectedProperty.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Badge className="mr-2">{selectedProperty.type}</Badge>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-slate-500" />
                      <span>{selectedProperty.location}</span>
                    </div>
                    <div className="flex items-center text-lg font-bold text-green-600">
                      <IndianRupee className="h-5 w-5 mr-1" />
                      {formatPrice(selectedProperty.price)}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Features</h4>
                  {selectedProperty.features && selectedProperty.features.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedProperty.features.map((feature, index) => (
                        <Badge key={index} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">No features listed</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedProperty.description}
                </p>
              </div>

              {selectedProperty.coordinates && (
                <div>
                  <h4 className="font-semibold mb-2">Location</h4>
                  <div className="bg-slate-100 p-4 rounded-lg text-sm">
                    <p>Coordinates: {selectedProperty.coordinates.lat}, {selectedProperty.coordinates.lng}</p>
                    <p className="text-slate-500 mt-1">Google Maps integration can be added here</p>
                  </div>
                </div>
              )}
              
              <div className="flex gap-3 pt-4">
                <Button className="flex-1">Contact Owner</Button>
                <Button variant="outline" className="flex-1">Schedule Visit</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
