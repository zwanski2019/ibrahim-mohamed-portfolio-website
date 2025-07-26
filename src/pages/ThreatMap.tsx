import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";

const ThreatMap = () => {
  const { t } = useLanguage();
  return (
    <>
      <Helmet>
        <title>{t("threatMap.title") + " - ZWANSKI TECH"}</title>
        <meta name="description" content={t("threatMap.description")}
        />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <section className="py-20 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
                {t("threatMap.title").split(" ")[0]} <span className="text-gradient">{t("threatMap.title").split(" ").slice(1).join(" ")}</span>
              </h1>
              <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                {t("threatMap.description")}
              </p>
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src="https://livethreatmap.radware.com/"
                  className="absolute top-0 left-0 w-full h-full rounded-lg border-none"
                  allowFullScreen
                  title="Radware Live Threat Map"
                />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ThreatMap;
