/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Portfolio related types
 */
export interface PortfolioData {
  id: string;
  templateId: string;

  // Hero Section
  name: string;
  title: string;
  tagline: string;
  profileImage: string;

  // About Me
  bio: string;
  email: string;
  phone: string;
  location: string;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };

  // Skills
  skills: string[];

  // Services
  services: Array<{
    title: string;
    description: string;
  }>;

  // Portfolio Projects
  portfolio: Array<{
    title: string;
    image: string;
    description: string;
  }>;

  // Testimonials
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    quote: string;
  }>;

  // Blog (optional)
  blog?: {
    title: string;
    summary: string;
  };

  // Contact
  contactMessage: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreatePortfolioRequest {
  templateId: string;
  name: string;
  title: string;
  tagline: string;
  profileImage: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  skills: string[];
  services: Array<{
    title: string;
    description: string;
  }>;
  portfolio: Array<{
    title: string;
    image: string;
    description: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    quote: string;
  }>;
  blog?: {
    title: string;
    summary: string;
  };
  contactMessage: string;
}

export interface PortfolioListResponse {
  portfolios: PortfolioData[];
}

export interface CreatePortfolioResponse {
  portfolio: PortfolioData;
  message: string;
}

/**
 * Property related types for Assessment 1
 */
export interface PropertyData {
  id: string;
  name: string;
  type: 'Plot' | 'Shed' | 'Retail Store' | 'Plot Store' | 'Residential' | 'Commercial' | 'Industrial';
  location: string;
  price: number;
  description: string;
  image?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  features?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyRequest {
  name: string;
  type: 'Plot' | 'Shed' | 'Retail Store' | 'Plot Store' | 'Residential' | 'Commercial' | 'Industrial';
  location: string;
  price: number;
  description: string;
  image?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  features?: string[];
}

export interface PropertyListResponse {
  properties: PropertyData[];
}

export interface CreatePropertyResponse {
  property: PropertyData;
  message: string;
}
