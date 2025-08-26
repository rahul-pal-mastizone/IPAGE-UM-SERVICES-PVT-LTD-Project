import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Home, Building } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  style: string;
}

const templates: Template[] = [
  {
    id: "template-1",
    name: "Template 1",
    description: "Modern and clean design with yellow hero section and professional layout",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    features: ["Hero Hero Section", "Professional Layout", "Clean Typography", "Service Cards"],
    style: "Modern & Professional"
  },
  {
    id: "template-2", 
    name: "Template 2",
    description: "Split-screen layout with timeline skills and masonry portfolio grid",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop",
    features: ["Split-screen Layout", "Timeline Skills", "Masonry Portfolio", "Dark Mode Support"],
    style: "Creative & Dynamic"
  }
];

export default function TemplateSelection() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      navigate(`/create-portfolio?template=${selectedTemplate}`);
    }
  };

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
              <Badge variant="outline">Assessment 2: Portfolio Generator</Badge>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/properties")}
              className="text-slate-600 hover:text-slate-900"
            >
              <Building className="h-4 w-4 mr-2" />
              View Assessment 1
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Choose Your <span className="text-blue-600">Template</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Select a professional template that best represents your style and customize it to your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {templates.map((template) => (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-blue-500 shadow-lg' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div className="relative">
                <img 
                  src={template.image} 
                  alt={template.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {selectedTemplate === template.id && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-blue-500 text-white">Selected</Badge>
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {template.name}
                  <Badge variant="outline">{template.style}</Badge>
                </CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-700">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 flex gap-3">
                  <Button 
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplateSelect(template.id);
                    }}
                  >
                    {selectedTemplate === template.id ? "Selected" : "Select Template"}
                  </Button>
                  <Button variant="ghost" size="sm">
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTemplate && (
          <div className="text-center">
            <Button 
              size="lg" 
              onClick={handleContinue}
              className="px-8 py-3 text-lg"
            >
              Continue with Selected Template
            </Button>
          </div>
        )}

        <div className="text-center mt-8">
          <Button variant="link" onClick={() => navigate("/professionals")}>
            View Existing Portfolios
          </Button>
        </div>
      </div>
    </div>
  );
}
