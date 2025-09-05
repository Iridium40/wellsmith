import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "@/components/site/Layout";
import About from "@/pages/About";
import Recipes from "@/pages/Recipes";
import Contact from "@/pages/Contact";
import BookAssessment from "@/pages/BookAssessment";
import ProgramOverview from "@/pages/ProgramOverview";
import FAQs from "@/pages/FAQs";
import MyStory from "@/pages/MyStory";
import WhyCoaching from "@/pages/WhyCoaching";
import GetStarted from "@/pages/GetStarted";
import BookWithKayce from "@/pages/BookWithKayce";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/program" element={<ProgramOverview />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/connect" element={<Contact />} />
            <Route path="/book-assessment" element={<BookAssessment />} />
            <Route path="/my-story" element={<MyStory />} />
            <Route path="/why-coaching" element={<WhyCoaching />} />
            <Route path="/book-with-kayce" element={<BookWithKayce />} />
            <Route path="/get-started" element={<GetStarted />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
