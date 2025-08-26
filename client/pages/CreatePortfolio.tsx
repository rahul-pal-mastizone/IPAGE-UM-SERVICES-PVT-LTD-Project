import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CreatePortfolioRequest, CreatePortfolioResponse } from "@shared/api";
import { Plus, X, ArrowLeft, ArrowRight } from "lucide-react";

interface FormSection {
  id: string;
  title: string;
  description: string;
}

const formSections: FormSection[] = [
  { id: "basic", title: "Basic Details", description: "Your name, company name and basic information" },
  { id: "hero", title: "Header & Hero", description: "Your main profile information" },
  { id: "about", title: "About Section", description: "Tell us about yourself" },
  { id: "services", title: "Services", description: "What services do you offer?" },
  { id: "portfolio", title: "Portfolio", description: "Showcase your best work" },
  { id: "testimonials", title: "Clients & Testimonials", description: "What clients say about you" },
  { id: "contact", title: "Contact", description: "How can people reach you?" }
];

export default function CreatePortfolio() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const templateId = searchParams.get("template") || "template-1";
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<CreatePortfolioRequest>({
    templateId,
    name: "",
    title: "",
    tagline: "",
    profileImage: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    socials: {
      linkedin: "",
      github: "",
      twitter: "",
      website: ""
    },
    skills: [],
    services: [
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" }
    ],
    portfolio: [
      { title: "", image: "", description: "" },
      { title: "", image: "", description: "" },
      { title: "", image: "", description: "" }
    ],
    testimonials: [
      { name: "", role: "", company: "", quote: "" }
    ],
    blog: {
      title: "",
      summary: ""
    },
    contactMessage: ""
  });

  const [currentSkill, setCurrentSkill] = useState("");

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedFormData = (section: string, index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section as keyof CreatePortfolioRequest].map((item: any, i: number) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      updateFormData("skills", [...formData.skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateFormData("skills", formData.skills.filter(skill => skill !== skillToRemove));
  };

  const addTestimonial = () => {
    updateFormData("testimonials", [
      ...formData.testimonials,
      { name: "", role: "", company: "", quote: "" }
    ]);
  };

  const removeTestimonial = (index: number) => {
    if (formData.testimonials.length > 1) {
      updateFormData("testimonials", formData.testimonials.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/portfolios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as CreatePortfolioResponse;
      
      if (response.ok) {
        navigate(`/portfolio/${data.portfolio.id}`);
      } else {
        console.error("Error creating portfolio:", data);
      }
    } catch (error) {
      console.error("Error submitting portfolio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextSection = () => {
    if (currentSection < formSections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const isLastSection = currentSection === formSections.length - 1;
  const isFirstSection = currentSection === 0;

  const renderCurrentSection = () => {
    const section = formSections[currentSection];

    switch (section.id) {
      case "basic":
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+1 987 654 3210"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={(e) => updateFormData("location", e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case "hero":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Professional Title *</Label>
              <Input
                id="title"
                placeholder="Software Engineer"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                placeholder="Building the future, one line of code at a time"
                value={formData.tagline}
                onChange={(e) => updateFormData("tagline", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="profileImage">Profile Image URL</Label>
              <Input
                id="profileImage"
                placeholder="https://example.com/your-photo.jpg"
                value={formData.profileImage}
                onChange={(e) => updateFormData("profileImage", e.target.value)}
              />
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="bio">Bio / About Me</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself, your experience, and what drives you..."
                rows={4}
                value={formData.bio}
                onChange={(e) => updateFormData("bio", e.target.value)}
              />
            </div>
            <div>
              <Label>Skills</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add a skill and press Enter"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.socials.linkedin}
                  onChange={(e) => updateFormData("socials", { ...formData.socials, linkedin: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  placeholder="https://github.com/yourusername"
                  value={formData.socials.github}
                  onChange={(e) => updateFormData("socials", { ...formData.socials, github: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      case "services":
        return (
          <div className="space-y-6">
            {formData.services.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">Service {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`service-title-${index}`}>Service Title</Label>
                    <Input
                      id={`service-title-${index}`}
                      placeholder="Web Development"
                      value={service.title}
                      onChange={(e) => updateNestedFormData("services", index, "title", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`service-desc-${index}`}>Description</Label>
                    <Textarea
                      id={`service-desc-${index}`}
                      placeholder="Describe what this service includes..."
                      value={service.description}
                      onChange={(e) => updateNestedFormData("services", index, "description", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "portfolio":
        return (
          <div className="space-y-6">
            {formData.portfolio.map((project, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">Project {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`project-title-${index}`}>Project Title</Label>
                    <Input
                      id={`project-title-${index}`}
                      placeholder="Amazing Project"
                      value={project.title}
                      onChange={(e) => updateNestedFormData("portfolio", index, "title", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`project-image-${index}`}>Project Image URL</Label>
                    <Input
                      id={`project-image-${index}`}
                      placeholder="https://example.com/project-image.jpg"
                      value={project.image}
                      onChange={(e) => updateNestedFormData("portfolio", index, "image", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`project-desc-${index}`}>Description</Label>
                    <Textarea
                      id={`project-desc-${index}`}
                      placeholder="Describe the project, technologies used, and outcomes..."
                      value={project.description}
                      onChange={(e) => updateNestedFormData("portfolio", index, "description", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "testimonials":
        return (
          <div className="space-y-6">
            {formData.testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Testimonial {index + 1}</CardTitle>
                  {formData.testimonials.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeTestimonial(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`testimonial-name-${index}`}>Client Name</Label>
                      <Input
                        id={`testimonial-name-${index}`}
                        placeholder="John Smith"
                        value={testimonial.name}
                        onChange={(e) => updateNestedFormData("testimonials", index, "name", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`testimonial-role-${index}`}>Role</Label>
                      <Input
                        id={`testimonial-role-${index}`}
                        placeholder="CEO"
                        value={testimonial.role}
                        onChange={(e) => updateNestedFormData("testimonials", index, "role", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`testimonial-company-${index}`}>Company</Label>
                    <Input
                      id={`testimonial-company-${index}`}
                      placeholder="Company Name"
                      value={testimonial.company}
                      onChange={(e) => updateNestedFormData("testimonials", index, "company", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`testimonial-quote-${index}`}>Quote</Label>
                    <Textarea
                      id={`testimonial-quote-${index}`}
                      placeholder="What did they say about working with you?"
                      value={testimonial.quote}
                      onChange={(e) => updateNestedFormData("testimonials", index, "quote", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={addTestimonial}>
              <Plus className="h-4 w-4 mr-2" />
              Add Another Testimonial
            </Button>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="contactMessage">Contact Message</Label>
              <Textarea
                id="contactMessage"
                placeholder="Ready to work together? Let's discuss your project..."
                rows={4}
                value={formData.contactMessage}
                onChange={(e) => updateFormData("contactMessage", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="blogTitle">Blog Title (Optional)</Label>
              <Input
                id="blogTitle"
                placeholder="My Latest Thoughts"
                value={formData.blog?.title || ""}
                onChange={(e) => updateFormData("blog", { ...formData.blog, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="blogSummary">Blog Summary (Optional)</Label>
              <Textarea
                id="blogSummary"
                placeholder="A brief summary of your latest blog post or thoughts..."
                value={formData.blog?.summary || ""}
                onChange={(e) => updateFormData("blog", { ...formData.blog, summary: e.target.value })}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Templates
          </Button>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Your Portfolio</h1>
          <p className="text-slate-600">Fill out the sections below to create your professional portfolio</p>
        </div>

        {/* Progress Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {formSections.map((section, index) => (
              <Button
                key={section.id}
                variant={index === currentSection ? "default" : index < currentSection ? "secondary" : "outline"}
                size="sm"
                onClick={() => setCurrentSection(index)}
                className="text-xs"
              >
                {section.title}
              </Button>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / formSections.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>{formSections[currentSection].title}</CardTitle>
            <CardDescription>{formSections[currentSection].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderCurrentSection()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between max-w-4xl mx-auto mt-8">
          <Button 
            variant="outline" 
            onClick={prevSection}
            disabled={isFirstSection}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {isLastSection ? (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.name || !formData.email}
            >
              {isSubmitting ? "Creating..." : "Create Portfolio"}
            </Button>
          ) : (
            <Button onClick={nextSection}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
