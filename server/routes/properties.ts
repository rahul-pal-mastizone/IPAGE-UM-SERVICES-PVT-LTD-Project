import { RequestHandler } from "express";
import { 
  PropertyData, 
  CreatePropertyRequest, 
  PropertyListResponse, 
  CreatePropertyResponse 
} from "@shared/api";

// In-memory storage for demo purposes
// In a real app, this would be a database
let properties: PropertyData[] = [
  {
    id: "1",
    name: "Plot",
    type: "Plot",
    location: "Pune",
    price: 250000,
    description: "A large plot of land available for development.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    coordinates: { lat: 18.5204, lng: 73.8567 },
    features: ["Development Ready", "Clear Title", "Road Access"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Shed",
    type: "Shed",
    location: "Bangalore",
    price: 75000,
    description: "An industrial shed for manufacturing or storage.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    features: ["High Ceiling", "Loading Dock", "Power Supply"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "Retail Store",
    type: "Retail Store",
    location: "Kolkata",
    price: 180000,
    description: "A commercial unit space in a city center.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    coordinates: { lat: 22.5726, lng: 88.3639 },
    features: ["High Footfall", "AC", "Parking"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "4",
    name: "Plot Store",
    type: "Plot Store",
    location: "Chennai",
    price: 300000,
    description: "A spacious plot situated in prime area for development.",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop",
    coordinates: { lat: 13.0827, lng: 80.2707 },
    features: ["Corner Plot", "Metro Connectivity", "School Nearby"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "5",
    name: "Shed",
    type: "Shed",
    location: "Mumbai",
    price: 120000,
    description: "Industrial space with all facilities.",
    image: "https://images.unsplash.com/photo-1541976590-713941681591?w=600&h=400&fit=crop",
    coordinates: { lat: 19.0760, lng: 72.8777 },
    features: ["24/7 Security", "Fire Safety", "Crane Facility"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "6",
    name: "Retail Store",
    type: "Retail Store",
    location: "Kolkata",
    price: 175000,
    description: "Premium retail space in commercial hub.",
    image: "https://images.unsplash.com/photo-1555529669-2269763671c0?w=600&h=400&fit=crop",
    coordinates: { lat: 22.5726, lng: 88.3639 },
    features: ["Mall Location", "Brand Presence", "Food Court Access"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "7",
    name: "Plot",
    type: "Plot",
    location: "Jaipur",
    price: 160000,
    description: "A beautiful plot in scenic area.",
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=600&h=400&fit=crop",
    coordinates: { lat: 26.9124, lng: 75.7873 },
    features: ["Scenic View", "Peaceful", "Investment Potential"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "8",
    name: "Plot Store",
    type: "Plot Store",
    location: "Jaipur",
    price: 200000,
    description: "Large plot of land available for development purposes.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    coordinates: { lat: 26.9124, lng: 75.7873 },
    features: ["Heritage Zone", "Tourism Potential", "Government Approved"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const getProperties: RequestHandler = (req, res) => {
  const response: PropertyListResponse = {
    properties: properties
  };
  res.status(200).json(response);
};

export const createProperty: RequestHandler = (req, res) => {
  const propertyData: CreatePropertyRequest = req.body;
  
  // Validate required fields
  if (!propertyData.name || !propertyData.type || !propertyData.location || !propertyData.price) {
    return res.status(400).json({ 
      error: "Missing required fields: name, type, location, and price are required" 
    });
  }
  
  const newProperty: PropertyData = {
    id: Date.now().toString(),
    ...propertyData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  properties.push(newProperty);
  
  const response: CreatePropertyResponse = {
    property: newProperty,
    message: "Property created successfully"
  };
  
  res.status(201).json(response);
};

export const getPropertyById: RequestHandler = (req, res) => {
  const { id } = req.params;
  const property = properties.find(p => p.id === id);
  
  if (!property) {
    return res.status(404).json({ error: "Property not found" });
  }
  
  res.status(200).json(property);
};
