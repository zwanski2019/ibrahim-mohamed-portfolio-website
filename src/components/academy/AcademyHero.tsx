
import { BookOpen, Users, Globe, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const AcademyHero = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: BookOpen, label: "Free Courses", value: "1000+" },
    { icon: Users, label: "Global Students", value: "50K+" },
    { icon: Globe, label: "Languages", value: "25+" },
    { icon: Award, label: "Certificates", value: "Free" }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Zwanski Academy
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Learn Anything, Anywhere, Anytime - Completely Free
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access thousands of high-quality courses from top universities and educators worldwide. 
            From programming to photography, mathematics to music - all free for everyone.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <a
              href="#courses"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Start Learning Now
            </a>
            <a
              href="#become-instructor"
              className="px-8 py-4 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Become an Instructor
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-background/80 backdrop-blur border border-border/50"
            >
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademyHero;
