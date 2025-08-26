import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreatePropertyRequest, CreatePropertyResponse } from "@shared/api";
import { ArrowLeft, Plus, X, IndianRupee, MapPin, Home } from "lucide-react";

const propertyTypes = ['Plot', 'Shed', 'Retail Store', 'Plot Store', 'Residential', 'Commercial', 'Industrial'] as const;

export default function AddProperty() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentFeature, setCurrentFeature] = useState("");

  const [formData, setFormData] = useState<CreatePropertyRequest>({
    name: "",
    type: "Plot",
    location: "",
    price: 0,
    description: "",
    image: "",
    coordinates: {
      lat: 0,
      lng: 0
    },
    features: []
  });

  const updateFormData = (field: keyof CreatePropertyRequest, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addFeature = () => {
    if (currentFeature.trim() && !formData.features?.includes(currentFeature.trim())) {
      updateFormData("features", [...(formData.features || []), currentFeature.trim()]);
      setCurrentFeature("");
    }
  };

  const removeFeature = (featureToRemove: string) => {
    updateFormData("features", formData.features?.filter(feature => feature !== featureToRemove) || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.location || !formData.price) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as CreatePropertyResponse;
      
      if (response.ok) {
        alert("Property added successfully!");
        navigate("/properties");
      } else {
        console.error("Error creating property:", data);
        alert("Error adding property. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting property:", error);
      alert("Error adding property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/properties")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Add Property</h1>
              <p className="text-slate-600">Add a new property to the listings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Property Information
                </CardTitle>
                <CardDescription>
                  Fill in the details about the property you want to list
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Property Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter property name"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Property Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => updateFormData("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        placeholder="Enter location"
                        value={formData.location}
                        onChange={(e) => updateFormData("location", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="Enter price"
                        value={formData.price || ""}
                        onChange={(e) => updateFormData("price", Number(e.target.value))}
                        className="pl-10"
                        required
                        min="0"
                      />
                    </div>
                    {formData.price > 0 && (
                      <p className="text-sm text-green-600 mt-1">
                        {formatPrice(formData.price)}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the property..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="image">Property Image URL (Optional)</Label>
                  <Input
                    id="image"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={(e) => updateFormData("image", e.target.value)}
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={formData.image}
                        alt="Property preview"
                        className="w-full h-32 object-cover rounded-md"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Features */}
                <div>
                  <Label>Property Features (Optional)</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add a feature and press Enter"
                      value={currentFeature}
                      onChange={(e) => setCurrentFeature(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    />
                    <Button type="button" onClick={addFeature} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.features?.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {feature}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeFeature(feature)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Coordinates (Optional) */}
                <div>
                  <Label>Coordinates (Optional)</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="lat" className="text-sm">Latitude</Label>
                      <Input
                        id="lat"
                        type="number"
                        step="any"
                        placeholder="e.g., 18.5204"
                        value={formData.coordinates?.lat || ""}
                        onChange={(e) => updateFormData("coordinates", {
                          ...formData.coordinates,
                          lat: Number(e.target.value)
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lng" className="text-sm">Longitude</Label>
                      <Input
                        id="lng"
                        type="number"
                        step="any"
                        placeholder="e.g., 73.8567"
                        value={formData.coordinates?.lng || ""}
                        onChange={(e) => updateFormData("coordinates", {
                          ...formData.coordinates,
                          lng: Number(e.target.value)
                        })}
                      />
                    </div>
                  </div>
                </div>

                {/* Preview */}
                {formData.name && formData.type && formData.location && formData.price > 0 && (
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-3">Preview</h3>
                    <Card className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{formData.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-100 text-blue-800">{formData.type}</Badge>
                          <div className="flex items-center text-sm text-slate-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            {formData.location}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-lg font-bold text-green-600 mb-2">
                          <IndianRupee className="h-4 w-4 mr-1" />
                          {formatPrice(formData.price)}
                        </div>
                        <p className="text-sm text-slate-600">{formData.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate("/properties")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting || !formData.name || !formData.type || !formData.location || !formData.price}
                  >
                    {isSubmitting ? "Adding..." : "Add Property"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
