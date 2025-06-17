
import { useLanguage } from "@/context/LanguageContext";

const ServiceHero = () => {
  const { language } = useLanguage();

  return (
    <div className="text-center mb-16 animate-on-scroll">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
        {language === 'en' ? 'Professional IT Services' : language === 'fr' ? 'Services IT Professionnels' : 'الخدمات التقنية المهنية'}
      </h2>
      <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-8">
        {language === 'en' 
          ? 'Comprehensive IT solutions from web development to advanced device repair and cybersecurity. Your trusted partner for all technical needs.'
          : language === 'fr'
          ? 'Solutions IT complètes du développement web à la réparation avancée d\'appareils et à la cybersécurité. Votre partenaire de confiance pour tous vos besoins techniques.'
          : 'حلول تقنية شاملة من تطوير الويب إلى الإصلاح المتقدم للأجهزة والأمن السيبراني. شريكك الموثوق لجميع احتياجاتك التقنية.'
        }
      </p>
    </div>
  );
};

export default ServiceHero;
