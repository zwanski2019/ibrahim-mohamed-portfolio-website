import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const MigrantSupport = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Helmet>
        <title>Migrant Support - Zwanski Tech</title>
        <meta
          name="description"
          content="Resources and services for migrants provided by Zwanski Tech."
        />
      </Helmet>

      <Navbar />

      <main className="flex-1 axeptio-section">
        <div className="axeptio-container text-center">
          <h1 className="axeptio-heading mb-4">Migrant Support</h1>
          <p className="text-muted-foreground">
            This page provides dedicated resources for migrants and newcomers.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MigrantSupport;
