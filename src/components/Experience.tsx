
import { Calendar } from "lucide-react";
import CompanyLogos from "./CompanyLogos";
import { useExperience } from "@/hooks/useExperience";
import { useLanguage } from "@/context/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function Experience() {
  const { data: experiences, isLoading, error } = useExperience();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <section id="experience" className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="mb-12">
            <CompanyLogos />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="card-3d bg-card rounded-lg p-6 shadow-md border border-border">
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-32 mb-4" />
                    <Skeleton className="h-4 w-24 mb-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{t("experience.title")}</h2>
            <p className="text-red-600">Error loading experience data. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="section-container">
        <h2 className="section-title">
          {t("experience.title")} <span className="text-gradient">{t("nav.experience")}</span>
        </h2>
        
        <p className="section-subtitle">
          {t("experience.subtitle")}
        </p>
        
        <div className="mb-12">
          <CompanyLogos />
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <svg className="mr-2 h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="3" rx="2" ry="2"/>
                <line x1="8" x2="16" y1="21" y2="21"/>
                <line x1="12" x2="12" y1="17" y2="21"/>
              </svg>
              {t("experience.workExperience")}
            </h3>
            
            <div className="space-y-8">
              {experiences && experiences.length > 0 ? (
                experiences.map((exp) => (
                  <div key={exp.id} className="timeline-item">
                    <div className="timeline-dot"></div>
                    
                    <div className="card-3d bg-card rounded-lg p-6 shadow-md border border-border">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold">{exp.position}</h4>
                          <p className="text-primary font-medium">{exp.company}</p>
                          {exp.location && (
                            <p className="text-sm text-muted-foreground">{exp.location}</p>
                          )}
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground mt-2 md:mt-0">
                          <Calendar className="mr-1 h-4 w-4" />
                          {new Date(exp.start_date).toLocaleDateString()} - {
                            exp.current_job 
                              ? t("experience.present") 
                              : exp.end_date 
                                ? new Date(exp.end_date).toLocaleDateString()
                                : t("experience.present")
                          }
                        </div>
                      </div>
                      
                      {exp.description && (
                        <p className="text-muted-foreground mb-4">{exp.description}</p>
                      )}
                      
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No experience data available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
