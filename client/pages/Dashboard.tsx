import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, User, ArrowRight, Building, Users, Search, Filter, PlusCircle, Eye } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const assessments = [
    {
      id: 1,
      title: "Property Listings Dashboard",
      description: "A React app that fetches, displays, filters, and manages property listings with a user-friendly UI.",
      status: "completed",
      features: [
        "Property Listings Page",
        "Add Property Form", 
        "View Details Modal",
        "Filter by Property Type",
        "Search by Name/Location",
        "Real-time API Integration"
      ],
      routes: [
        { path: "/properties", label: "View Properties" },
        { path: "/add-property", label: "Add Property" }
      ],
      icon: Building,
      color: "blue",
      tech: ["React", "TypeScript", "Express API", "Form Handling"]
    },
    {
      id: 2,
      title: "Dynamic Portfolio Generator", 
      description: "Build a React app where users select templates, fill forms, and generate professional portfolios.",
      status: "completed",
      features: [
        "Template Selection",
        "Multi-Section Portfolio Form",
        "Professionals List Page", 
        "Dynamic Portfolio Pages",
        "Filtering & Search",
        "Template-based Rendering"
      ],
      routes: [
        { path: "/", label: "Select Template" },
        { path: "/professionals", label: "View Professionals" },
        { path: "/create-portfolio", label: "Create Portfolio" }
      ],
      icon: Users,
      color: "purple",
      tech: ["React Router", "Dynamic Forms", "Template System", "Portfolio Management"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          icon: "text-blue-600 bg-blue-100",
          border: "border-l-blue-500",
          button: "bg-blue-600 hover:bg-blue-700"
        };
      case "purple":
        return {
          icon: "text-purple-600 bg-purple-100", 
          border: "border-l-purple-500",
          button: "bg-purple-600 hover:bg-purple-700"
        };
      default:
        return {
          icon: "text-gray-600 bg-gray-100",
          border: "border-l-gray-500", 
          button: "bg-gray-600 hover:bg-gray-700"
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Home className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900">React Developer Assessment Dashboard</h1>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive showcase of React development skills through two complete full-stack applications
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1">
                ✅ Assessment 1 Complete
              </Badge>
              <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1">
                ✅ Assessment 2 Complete
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">2</div>
              <p className="text-sm text-slate-600">Projects Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <p className="text-sm text-slate-600">Requirements Met</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600">8+</div>
              <p className="text-sm text-slate-600">Key Features</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600">Full Stack</div>
              <p className="text-sm text-slate-600">React + API</p>
            </CardContent>
          </Card>
        </div>

        {/* Project Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {assessments.map((assessment) => {
            const colors = getColorClasses(assessment.color);
            const IconComponent = assessment.icon;
            
            return (
              <Card key={assessment.id} className={`hover:shadow-xl transition-all duration-300 border-l-4 ${colors.border}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${colors.icon}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{assessment.title}</CardTitle>
                        <Badge className={`mt-1 ${getStatusColor(assessment.status)}`}>
                          {assessment.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-3 leading-relaxed">
                    {assessment.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Key Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {assessment.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span className="text-slate-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {assessment.tech.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Quick Access</h4>
                    <div className="space-y-2">
                      {assessment.routes.map((route, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full justify-between"
                          onClick={() => navigate(route.path)}
                        >
                          <span>{route.label}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Main Action */}
                  <Button 
                    className={`w-full ${colors.button}`}
                    onClick={() => navigate(assessment.routes[0].path)}
                  >
                    Launch {assessment.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Development Highlights</CardTitle>
              <CardDescription>
                Key technical achievements and implementation details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Frontend Excellence</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• React 18 with TypeScript</li>
                    <li>• Responsive design patterns</li>
                    <li>• Component composition</li>
                    <li>• Modern UI with Tailwind CSS</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Backend Integration</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• RESTful API design</li>
                    <li>• Express.js server setup</li>
                    <li>• Data validation & error handling</li>
                    <li>• Real-time updates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">User Experience</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Intuitive navigation</li>
                    <li>• Advanced filtering & search</li>
                    <li>• Modal interactions</li>
                    <li>• Form validation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
