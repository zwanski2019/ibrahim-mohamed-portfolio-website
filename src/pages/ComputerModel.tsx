
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import ComputerModelCanvas from "@/components/3d/ComputerModelCanvas";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const ComputerModel = () => {
  const isMobile = useIsMobile();

  return (
    <ThemeProvider>
      <Helmet>
        <title>3D Computer Model | Zwanski - Interactive Web Experience</title>
        <meta 
          name="description" 
          content="Interactive 3D computer model created by Mohamed Ibrahim (Zwanski) using Three.js and React Three Fiber - demonstrating web development expertise and creative coding."
        />
        <meta property="og:title" content="3D Computer Model | Zwanski" />
        <meta property="og:description" content="Interactive 3D computer model created by Mohamed Ibrahim (Zwanski) using Three.js" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen dark:bg-background bg-background">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12">
            <div className="mb-6">
              <Link to="/">
                <Button variant="ghost" size="sm" className="group">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Portfolio
                </Button>
              </Link>
            </div>
            
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Interactive 3D Computer Model</h1>
              <p className="text-muted-foreground max-w-2xl">
                Explore this interactive 3D computer model created with Three.js and React Three Fiber. 
                Click and drag to rotate, scroll to zoom, and interact with the model to see various effects.
              </p>
            </div>
            
            <div className="relative bg-card rounded-xl shadow-lg overflow-hidden border border-border mb-8" style={{ height: isMobile ? "60vh" : "70vh" }}>
              <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              }>
                <ComputerModelCanvas />
              </Suspense>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-xl font-bold mb-3">Interaction Guide</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Click and drag to rotate the model</li>
                  <li>• Scroll to zoom in and out</li>
                  <li>• Click on the screen to change its display color</li>
                  <li>• Hover over parts to see interactive effects</li>
                  <li>• Double-click to reset the view</li>
                </ul>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-xl font-bold mb-3">Technical Details</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Built with Three.js and React Three Fiber</li>
                  <li>• Custom lighting with spot and point lights</li>
                  <li>• PBR materials for realistic rendering</li>
                  <li>• Contact shadows for improved realism</li>
                  <li>• Optimized for both desktop and mobile</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default ComputerModel;
