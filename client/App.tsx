import "./global.css";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Assessment Dashboard
import Dashboard from "./pages/Dashboard";

// Assessment 1: Property Listings
import PropertyListings from "./pages/PropertyListings";
import AddProperty from "./pages/AddProperty";

// Assessment 2: Portfolio Generator
import TemplateSelection from "./pages/TemplateSelection";
import CreatePortfolio from "./pages/CreatePortfolio";
import ProfessionalsList from "./pages/ProfessionalsList";
import PortfolioPage from "./pages/PortfolioPage";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Assessment 1: Property Listings Dashboard */}
          <Route path="/properties" element={<PropertyListings />} />
          <Route path="/add-property" element={<AddProperty />} />

          {/* Assessment 2: Portfolio Generator */}
          <Route path="/" element={<TemplateSelection />} />
          <Route path="/create-portfolio" element={<CreatePortfolio />} />
          <Route path="/professionals" element={<ProfessionalsList />} />
          <Route path="/portfolio/:id" element={<PortfolioPage />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
