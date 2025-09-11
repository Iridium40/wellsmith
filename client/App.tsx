import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "@/components/site/Layout";
import PerformanceMonitor from "@/components/site/PerformanceMonitor";

// Lazy load all pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const Recipes = lazy(() => import("./pages/Recipes"));
const Contact = lazy(() => import("./pages/Contact"));
const BookAssessment = lazy(() => import("./pages/BookAssessment"));
const ProgramOverview = lazy(() => import("./pages/ProgramOverview"));
const FAQs = lazy(() => import("./pages/FAQs"));
const MyStory = lazy(() => import("./pages/MyStory"));
const WhyCoaching = lazy(() => import("./pages/WhyCoaching"));
const GetStarted = lazy(() => import("./pages/GetStarted"));
const Privacy = lazy(() => import("./pages/Privacy"));
const BookWithLenee = lazy(() => import("./pages/BookWithLenee"));
const BlogGLP1Eating = lazy(() => import("./pages/blog/GLP1Eating"));
const BlogHydration = lazy(() => import("./pages/blog/Hydration"));
const BlogSleep = lazy(() => import("./pages/blog/Sleep"));
const BlogPortions = lazy(() => import("./pages/blog/Portions"));
const BlogProtein = lazy(() => import("./pages/blog/Protein"));
const BlogMeditationMovement = lazy(() => import("./pages/blog/MeditationMovement"));

const queryClient = new QueryClient();

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <PerformanceMonitor />
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageLoader />}>
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
            <Route path="/book-with-kayce" element={<BookWithLenee />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route
              path="/blog/eating-right-on-glp1"
              element={<BlogGLP1Eating />}
            />
            <Route
              path="/blog/drinking-enough-water"
              element={<BlogHydration />}
            />
            <Route path="/blog/getting-enough-sleep" element={<BlogSleep />} />
            <Route path="/blog/right-portions" element={<BlogPortions />} />
            <Route path="/blog/enough-protein" element={<BlogProtein />} />
            <Route
              path="/blog/meditation-healthy-movement"
              element={<BlogMeditationMovement />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
