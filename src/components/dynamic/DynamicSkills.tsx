
import React from 'react';
import { useSkillsByCategory } from '@/hooks/useSkills';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import ServiceCards from '../ServiceCards';

const categoryIcons = {
  frontend: '🎨',
  backend: '⚙️',
  mobile: '📱',
  devops: '🔧',
  design: '✨',
  other: '💡'
};

const DynamicSkills = () => {
  const { data: skillsByCategory, isLoading, error } = useSkillsByCategory();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <>
        <ServiceCards />
        <section className="py-20 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
          
          <div className="section-container relative z-10">
            <div className="text-center mb-12">
              <Skeleton className="h-12 w-48 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="glass-card">
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="space-y-2">
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-12" />
                        </div>
                        <Skeleton className="h-2 w-full" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ServiceCards />
        <section className="py-20 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
          
          <div className="section-container relative z-10">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">{t("skills.title")}</h2>
              <p className="text-red-400 bg-red-900/20 px-4 py-2 rounded-lg border border-red-500/30">Error loading skills. Please try again later.</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <ServiceCards />
      <section className="py-20 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
        
        <div className="section-container relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {t("skills.title")} & <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">{t("nav.experience")}</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {t("skills.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsByCategory && Object.entries(skillsByCategory).map(([category, skills]) => (
              <Card key={category} className="glass-card animate-on-scroll hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-purple-500/20">
                <CardHeader className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <span className="text-3xl">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                    <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent font-bold">
                      {t(`skills.categories.${category}`)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  {skills.map((skill) => (
                    <div key={skill.id} className="space-y-3 group">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-foreground group-hover:text-purple-300 transition-colors">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-blue-400">{skill.proficiency}%</span>
                          {skill.years_experience && (
                            <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
                              {skill.years_experience}y
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Progress 
                        value={skill.proficiency} 
                        className="h-3 bg-muted/50 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-blue-500" 
                      />
                      {skill.description && (
                        <p className="text-sm text-muted-foreground/80 italic">{skill.description}</p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DynamicSkills;
