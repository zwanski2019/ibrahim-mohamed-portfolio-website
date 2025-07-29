import React from 'react';
import { useSkillsByCategory } from '@/hooks/useSkills';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
const categoryIcons = {
  frontend: '🎨',
  backend: '⚙️',
  mobile: '📱',
  devops: '🔧',
  design: '✨',
  other: '💡'
};
const DynamicSkills = () => {
  const {
    data: skillsByCategory,
    isLoading,
    error
  } = useSkillsByCategory();
  const {
    t
  } = useLanguage();
  if (isLoading) {
    return <>
        <section className="py-20">
          <div className="section-container">
            <div className="text-center mb-12">
              <Skeleton className="h-12 w-48 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[...Array(3)].map((_, j) => <div key={j} className="space-y-2">
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-12" />
                        </div>
                        <Skeleton className="h-2 w-full" />
                      </div>)}
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>
      </>;
  }
  if (error) {
    return <>
        <section className="py-20">
          <div className="section-container">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">{t("skills.title")}</h2>
              <p className="text-red-600">Error loading skills. Please try again later.</p>
            </div>
          </div>
        </section>
      </>;
  }
  return <>
      <section className="py-20">
        
      </section>
    </>;
};
export default DynamicSkills;