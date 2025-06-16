
import React from 'react';
import { useFeaturedProjects } from '@/hooks/useProjects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const DynamicProjects = () => {
  const { data: projects, isLoading, error } = useFeaturedProjects();

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
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
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-red-600">Error loading projects. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience in web development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project) => (
            <Card key={project.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 animate-on-scroll">
              {project.featured_image_url && (
                <div className="relative overflow-hidden">
                  <img 
                    src={project.featured_image_url} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {project.featured && (
                    <Badge className="absolute top-3 right-3 bg-yellow-500 text-black">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                  {project.title}
                </CardTitle>
                {project.category && (
                  <Badge variant="secondary" className="w-fit">
                    {project.category}
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech_stack.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.tech_stack.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.tech_stack.length - 4} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {project.demo_url && (
                    <Button size="sm" asChild>
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.github_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
                
                {project.metrics && Object.keys(project.metrics).length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      {project.metrics.downloads && (
                        <span>{project.metrics.downloads.toLocaleString()} downloads</span>
                      )}
                      {project.metrics.rating && (
                        <span>⭐ {project.metrics.rating}/5</span>
                      )}
                      {project.metrics.users && (
                        <span>{project.metrics.users.toLocaleString()} users</span>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicProjects;
