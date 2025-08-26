import { RequestHandler } from "express";
import { 
  PortfolioData, 
  CreatePortfolioRequest, 
  PortfolioListResponse, 
  CreatePortfolioResponse 
} from "@shared/api";

// In-memory storage for demo purposes
// In a real app, this would be a database
let portfolios: PortfolioData[] = [
  {
    id: "1",
    templateId: "template-1",
    name: "Emma Foster",
    title: "Flight Instructor",
    tagline: "Certified flight instructor specializing in comprehensive drone pilot training",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b494?w=400&h=400&fit=crop&crop=face",
    bio: "Experienced flight instructor with over 8 years in aviation training. Specializing in drone operations, safety protocols, and comprehensive pilot education.",
    email: "emma.foster@example.com",
    phone: "+1 (555) 123-4567",
    location: "Miami, FL",
    socials: {
      linkedin: "https://linkedin.com/in/emmafoster",
      github: "https://github.com/emmafoster",
      website: "https://emmafoster.com"
    },
    skills: ["Pilot Training", "Safety Protocols", "Drone Operations", "Aviation Law", "Emergency Procedures"],
    services: [
      {
        title: "Private Pilot Training",
        description: "One-on-one flight instruction tailored to individual learning pace and goals."
      },
      {
        title: "Commercial Drone Certification",
        description: "Complete preparation for commercial drone pilot certification exams."
      },
      {
        title: "Safety Protocol Training",
        description: "Comprehensive safety training for professional drone operations."
      }
    ],
    portfolio: [
      {
        title: "Commercial Pilot Certification Program",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop",
        description: "Developed comprehensive training program for commercial drone pilots."
      },
      {
        title: "Safety Training Curriculum",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
        description: "Created industry-standard safety protocols and training materials."
      },
      {
        title: "Flight Simulation Platform",
        image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop",
        description: "Integrated virtual training with hands-on flight experience."
      }
    ],
    testimonials: [
      {
        name: "John Smith",
        role: "Commercial Pilot",
        company: "SkyTech Drones",
        quote: "Emma's training was exceptional. Her attention to detail and safety focus gave me confidence in commercial operations."
      },
      {
        name: "Sarah Johnson",
        role: "Flight Operations Manager",
        company: "AerialPro",
        quote: "The best instructor I've worked with. Professional, knowledgeable, and patient."
      }
    ],
    blog: {
      title: "The Future of Drone Training",
      summary: "Exploring emerging technologies and methodologies in modern aviation education."
    },
    contactMessage: "Ready to take your piloting skills to the next level? Let's discuss your training goals.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    templateId: "template-2",
    name: "Kevin Brown",
    title: "Software Engineer",
    tagline: "Backend engineer building scalable drone fleet management and cloud architectures",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Full-stack software engineer with expertise in cloud architectures, drone fleet management systems, and scalable backend solutions.",
    email: "kevin.brown@example.com",
    phone: "+1 (555) 987-6543",
    location: "Seattle, WA",
    socials: {
      linkedin: "https://linkedin.com/in/kevinbrown",
      github: "https://github.com/kevinbrown",
      website: "https://kevinbrown.dev"
    },
    skills: ["Backend Development", "Cloud Architecture", "Drone Fleet Management", "API Design", "Database Design"],
    services: [
      {
        title: "Cloud Architecture Design",
        description: "Scalable cloud solutions for drone operations and data management."
      },
      {
        title: "Fleet Management Systems",
        description: "Custom software for managing large-scale drone operations."
      },
      {
        title: "API Development",
        description: "RESTful APIs and microservices for drone applications."
      }
    ],
    portfolio: [
      {
        title: "Drone Fleet Dashboard",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        description: "Real-time monitoring and management system for enterprise drone fleets."
      },
      {
        title: "Cloud Data Pipeline",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
        description: "Automated data processing pipeline for drone sensor data."
      },
      {
        title: "Flight Analytics Platform",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        description: "Advanced analytics and reporting for flight operations."
      }
    ],
    testimonials: [
      {
        name: "Lisa Chen",
        role: "CTO",
        company: "DroneLogistics",
        quote: "Kevin's technical expertise transformed our operations. His solutions are both innovative and practical."
      }
    ],
    contactMessage: "Looking to scale your drone operations with cutting-edge technology? Let's build something amazing together.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const getPortfolios: RequestHandler = (req, res) => {
  const response: PortfolioListResponse = {
    portfolios: portfolios
  };
  res.status(200).json(response);
};

export const createPortfolio: RequestHandler = (req, res) => {
  const portfolioData: CreatePortfolioRequest = req.body;
  
  // Validate required fields
  if (!portfolioData.name || !portfolioData.title || !portfolioData.email) {
    return res.status(400).json({ 
      error: "Missing required fields: name, title, and email are required" 
    });
  }
  
  const newPortfolio: PortfolioData = {
    id: Date.now().toString(),
    ...portfolioData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  portfolios.push(newPortfolio);
  
  const response: CreatePortfolioResponse = {
    portfolio: newPortfolio,
    message: "Portfolio created successfully"
  };
  
  res.status(201).json(response);
};

export const getPortfolioById: RequestHandler = (req, res) => {
  const { id } = req.params;
  const portfolio = portfolios.find(p => p.id === id);
  
  if (!portfolio) {
    return res.status(404).json({ error: "Portfolio not found" });
  }
  
  res.status(200).json(portfolio);
};
