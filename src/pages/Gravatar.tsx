import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Gravatar = () => {
  return (
    <>
      <Helmet>
        <title>Gravatar Profile Lookup - ZWANSKI TECH</title>
        <meta name="description" content="Fetch and preview Gravatar images by entering an email address." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Gravatar Profile Lookup - ZWANSKI TECH" />
        <meta property="og:description" content="Fetch and preview Gravatar images by entering an email address." />
        <meta property="og:image" content="https://zwanski.org/og-image.png" />
        <meta property="og:url" content="https://zwanski.org/gravatar" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gravatar Profile Lookup - ZWANSKI TECH" />
        <meta name="twitter:description" content="Fetch and preview Gravatar images by entering an email address." />
        <meta name="twitter:image" content="https://zwanski.org/og-image.png" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <section className="py-20 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Gravatar Lookup</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Enter an email address to preview its Gravatar image.
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Gravatar;
