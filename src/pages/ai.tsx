import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEOHelmet } from "@/components/SEOHelmet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CVGenerator from "@/components/CVGenerator";
import NewsGenerator from "@/components/NewsGenerator";
import SEOScanner from "@/components/SEOScanner";
import MentalHealthBot from "@/components/MentalHealthBot";
import GameGenerator from "@/components/GameGenerator";
import StudentAssistant from "@/components/StudentAssistant";
import VulnerabilityScanner from "@/components/VulnerabilityScanner";
import LanguageHelper from "@/components/LanguageHelper";
import VideoFinder from "@/components/VideoFinder";

export default function AIDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHelmet
        title="AI Utilities - Zwanski Tech"
        description="Dashboard of helpful AI tools including CV generator, news creator and more."
        canonical="https://zwanski.org/ai"
      />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="gap-1 mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Home
        </Button>
        <Tabs defaultValue="cv" className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-5">
            <TabsTrigger value="cv">CV Generator</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="seo">SEO Scanner</TabsTrigger>
            <TabsTrigger value="mental">Mental Health</TabsTrigger>
            <TabsTrigger value="game">Mini-Game</TabsTrigger>
            <TabsTrigger value="student">Student Assistant</TabsTrigger>
            <TabsTrigger value="vuln">Vulnerability Scan</TabsTrigger>
            <TabsTrigger value="language">Language Helper</TabsTrigger>
            <TabsTrigger value="video">Video Finder</TabsTrigger>
          </TabsList>
          <TabsContent value="cv" className="mt-6">
            <CVGenerator />
          </TabsContent>
          <TabsContent value="news" className="mt-6">
            <NewsGenerator />
          </TabsContent>
          <TabsContent value="seo" className="mt-6">
            <SEOScanner />
          </TabsContent>
          <TabsContent value="mental" className="mt-6">
            <MentalHealthBot />
          </TabsContent>
          <TabsContent value="game" className="mt-6">
            <GameGenerator />
          </TabsContent>
          <TabsContent value="student" className="mt-6">
            <StudentAssistant />
          </TabsContent>
          <TabsContent value="vuln" className="mt-6">
            <VulnerabilityScanner />
          </TabsContent>
          <TabsContent value="language" className="mt-6">
            <LanguageHelper />
          </TabsContent>
          <TabsContent value="video" className="mt-6">
            <VideoFinder />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
