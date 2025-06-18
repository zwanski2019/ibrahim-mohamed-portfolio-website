
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IMEIChecker from "@/components/IMEIChecker";
import { useLanguage } from "@/context/LanguageContext";

const IMEICheck = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t("imei.title")} - ZWANSKI TECH</title>
        <meta name="description" content={t("imei.description")} />
        <meta name="keywords" content="IMEI checker, free IMEI check, phone verification, device check" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <section className="py-20 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {t("nav.freeImeiCheck").split(" ")[0]} <span className="text-gradient">{t("nav.freeImeiCheck").split(" ").slice(1).join(" ")}</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  {t("imei.description")}
                </p>
              </div>
              
              <IMEIChecker />
              
              <div className="mt-16 text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="p-6">
                    <div className="text-3xl mb-4">🔒</div>
                    <h3 className="font-semibold mb-2">{t("imei.features.secure")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t("imei.features.secureDesc")}
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="text-3xl mb-4">⚡</div>
                    <h3 className="font-semibold mb-2">{t("imei.features.instant")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t("imei.features.instantDesc")}
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="text-3xl mb-4">💯</div>
                    <h3 className="font-semibold mb-2">{t("imei.features.free")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t("imei.features.freeDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default IMEICheck;
