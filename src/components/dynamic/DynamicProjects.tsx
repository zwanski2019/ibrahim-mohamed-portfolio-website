import React from 'react';
import { useFeaturedProjects } from '@/hooks/useProjects';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
const DynamicProjects = () => {
  const {
    data: projects,
    isLoading,
    error
  } = useFeaturedProjects();
  const {
    t
  } = useLanguage();
  if (isLoading) {
    return <section className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-14" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-20" />
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>;
  }
  if (error) {
    return <section className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{t("projects.featured")}</h2>
            <p className="text-red-600">Error loading projects. Please try again later.</p>
          </div>
        </div>
      </section>;
  }
  return;
};
export default DynamicProjects;