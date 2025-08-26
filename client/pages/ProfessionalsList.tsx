import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PortfolioData, PortfolioListResponse } from "@shared/api";
import { Search, Plus, MapPin, Mail, Star } from "lucide-react";

export default function ProfessionalsList() {
  const [portfolios, setPortfolios] = useState<PortfolioData[]>([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState<PortfolioData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPortfolios();
  }, []);

  useEffect(() => {
    filterPortfolios();
  }, [portfolios, searchTerm, skillFilter, locationFilter]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/portfolios");
      const data = (await response.json()) as PortfolioListResponse;
      setPortfolios(data.portfolios);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterPortfolios = () => {
    let filtered = portfolios;

    // Filter by search term (name or title)
    if (searchTerm) {
      filtered = filtered.filter(
        (portfolio) =>
          portfolio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          portfolio.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by skill
    if (skillFilter !== "all") {
      filtered = filtered.filter((portfolio) =>
        portfolio.skills.some((skill) =>
          skill.toLowerCase().includes(skillFilter.toLowerCase())
        )
      );
    }

    // Filter by location
    if (locationFilter !== "all") {
      filtered = filtered.filter((portfolio) =>
        portfolio.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredPortfolios(filtered);
  };

  const getUniqueSkills = () => {
    const allSkills = portfolios.flatMap((p) => p.skills);
    return [...new Set(allSkills)];
  };

  const getUniqueLocations = () => {
    const allLocations = portfolios.map((p) => p.location);
    return [...new Set(allLocations)];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading professionals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      {/* Header */}
      <div className="bg-yellow-400 text-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Meet Our Professionals</h1>
          <p className="text-xl mb-8">Meet the experts shaping the future of drone tech</p>
          
          <Button 
            onClick={() => navigate("/")}
            className="bg-black text-white hover:bg-gray-800"
          >
            <Plus className="mr-2 h-4 w-4" />
            List Your Profile
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search professionals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Professions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Professions</SelectItem>
                {getUniqueSkills().map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {getUniqueLocations().map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select defaultValue="name">
              <SelectTrigger>
                <SelectValue placeholder="Sort by Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="location">Sort by Location</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Portfolio Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPortfolios.map((portfolio) => (
            <Card key={portfolio.id} className="bg-yellow-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <img
                    src={portfolio.profileImage}
                    alt={portfolio.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>
                <CardTitle className="text-xl font-bold">{portfolio.name}</CardTitle>
                <Badge className="bg-black text-white w-fit mx-auto">
                  {portfolio.title}
                </Badge>
                <div className="flex items-center justify-center text-sm text-gray-600 mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {portfolio.location}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex justify-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    <span className="font-semibold">4.8</span>
                  </div>
                  <div>
                    <span className="font-semibold">5 years</span>
                    <div className="text-gray-500">Experience</div>
                  </div>
                  <div>
                    <span className="font-semibold">150</span>
                    <div className="text-gray-500">Projects</div>
                  </div>
                </div>

                <CardDescription className="text-center text-sm">
                  {portfolio.bio.length > 100 
                    ? `${portfolio.bio.substring(0, 100)}...` 
                    : portfolio.bio}
                </CardDescription>

                <div className="flex flex-wrap gap-1">
                  {portfolio.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {portfolio.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{portfolio.skills.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 bg-black text-white hover:bg-gray-800"
                    onClick={() => navigate(`/portfolio/${portfolio.id}`)}
                  >
                    View Portfolio
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPortfolios.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">No professionals found matching your criteria</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSkillFilter("all");
              setLocationFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
