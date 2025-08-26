import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PortfolioData } from "@shared/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter, 
  Globe,
  Star,
  Quote
} from "lucide-react";

// Template 1 Component
const Template1Portfolio = ({ portfolio }: { portfolio: PortfolioData }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-yellow-400 text-black py-20">
        <div className="container mx-auto px-4 text-center">
          <img
            src={portfolio.profileImage}
            alt={portfolio.name}
            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg object-cover"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{portfolio.name}</h1>
          <p className="text-xl md:text-2xl mb-2">{portfolio.title}</p>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{portfolio.tagline}</p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-black text-white hover:bg-gray-800">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
              View Work
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{portfolio.bio}</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-yellow-500" />
                  <span>{portfolio.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-yellow-500" />
                  <span>{portfolio.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-yellow-500" />
                  <span>{portfolio.location}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">My Skills</h3>
              <div className="flex flex-wrap gap-2">
                {portfolio.skills.map((skill, index) => (
                  <Badge key={index} className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">My Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Portfolio</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.portfolio.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {portfolio.testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <Quote className="h-8 w-8 text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-yellow-400 text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">{portfolio.contactMessage}</p>
          <div className="flex justify-center space-x-4 mb-8">
            <Button className="bg-black text-white hover:bg-gray-800">
              <Mail className="mr-2 h-4 w-4" />
              {portfolio.email}
            </Button>
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
              <Phone className="mr-2 h-4 w-4" />
              {portfolio.phone}
            </Button>
          </div>
          <div className="flex justify-center space-x-4">
            {portfolio.socials.linkedin && (
              <Button variant="ghost" size="sm">
                <Linkedin className="h-5 w-5" />
              </Button>
            )}
            {portfolio.socials.github && (
              <Button variant="ghost" size="sm">
                <Github className="h-5 w-5" />
              </Button>
            )}
            {portfolio.socials.twitter && (
              <Button variant="ghost" size="sm">
                <Twitter className="h-5 w-5" />
              </Button>
            )}
            {portfolio.socials.website && (
              <Button variant="ghost" size="sm">
                <Globe className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// Template 2 Component
const Template2Portfolio = ({ portfolio }: { portfolio: PortfolioData }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 to-blue-900 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{portfolio.name}</h1>
              <p className="text-xl md:text-2xl text-purple-200 mb-2">{portfolio.title}</p>
              <p className="text-lg opacity-90 mb-8">{portfolio.tagline}</p>
              <div className="flex space-x-4">
                <Button className="bg-white text-gray-900 hover:bg-gray-100">
                  <Mail className="mr-2 h-4 w-4" />
                  Get In Touch
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                  View Projects
                </Button>
              </div>
            </div>
            <div className="text-center">
              <img
                src={portfolio.profileImage}
                alt={portfolio.name}
                className="w-64 h-64 rounded-full mx-auto border-4 border-purple-300 shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Timeline */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">My Skills</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {portfolio.skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{skill}</h3>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${85 + (index * 3)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">{portfolio.bio}</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-purple-400" />
                  <span className="text-gray-300">{portfolio.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-purple-400" />
                  <span className="text-gray-300">{portfolio.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-purple-400" />
                  <span className="text-gray-300">{portfolio.location}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {portfolio.services.slice(0, 4).map((service, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700 text-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-purple-300">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400">{service.description.substring(0, 80)}...</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Masonry Grid */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Projects</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {portfolio.portfolio.map((project, index) => (
              <div key={index} className="break-inside-avoid">
                <Card className="bg-gray-900 border-gray-700 overflow-hidden hover:scale-105 transition-transform">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="text-white">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm">{project.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Clients Say</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {portfolio.testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 p-6">
                <div className="flex items-start space-x-4">
                  <Quote className="h-8 w-8 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-300 mb-4 italic text-lg">"{testimonial.quote}"</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start a Project?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-purple-100">{portfolio.contactMessage}</p>
          <div className="flex justify-center space-x-4 mb-8">
            <Button className="bg-white text-gray-900 hover:bg-gray-100">
              <Mail className="mr-2 h-4 w-4" />
              {portfolio.email}
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
              <Phone className="mr-2 h-4 w-4" />
              Call Me
            </Button>
          </div>
          <div className="flex justify-center space-x-4">
            {portfolio.socials.linkedin && (
              <Button variant="ghost" size="sm" className="text-white hover:text-purple-200">
                <Linkedin className="h-5 w-5" />
              </Button>
            )}
            {portfolio.socials.github && (
              <Button variant="ghost" size="sm" className="text-white hover:text-purple-200">
                <Github className="h-5 w-5" />
              </Button>
            )}
            {portfolio.socials.twitter && (
              <Button variant="ghost" size="sm" className="text-white hover:text-purple-200">
                <Twitter className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default function PortfolioPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchPortfolio(id);
    }
  }, [id]);

  const fetchPortfolio = async (portfolioId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/portfolios/${portfolioId}`);
      
      if (response.ok) {
        const data = await response.json();
        setPortfolio(data);
      } else {
        setError("Portfolio not found");
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      setError("Failed to load portfolio");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Portfolio Not Found</h1>
          <p className="text-gray-600 mb-4">{error || "The portfolio you're looking for doesn't exist."}</p>
          <Button onClick={() => navigate("/professionals")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Professionals
          </Button>
        </div>
      </div>
    );
  }

  // Render the appropriate template
  if (portfolio.templateId === "template-2") {
    return <Template2Portfolio portfolio={portfolio} />;
  } else {
    return <Template1Portfolio portfolio={portfolio} />;
  }
}
