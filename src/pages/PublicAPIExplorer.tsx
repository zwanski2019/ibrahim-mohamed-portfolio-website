import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApiExplorer from "@/components/api-explorer/ApiExplorer";

const PublicAPIExplorer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Public API Explorer - Zwanski Tech</title>
        <meta
          name="description"
          content="Browse and discover free public APIs."
        />
      </Helmet>
      <Navbar />
      <main className="flex-grow container mx-auto p-4 space-y-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Zwanski Public API Explorer</h1>
        <ApiExplorer />
      </main>
      <Footer />
    </div>
  );
};

export default PublicAPIExplorer;
