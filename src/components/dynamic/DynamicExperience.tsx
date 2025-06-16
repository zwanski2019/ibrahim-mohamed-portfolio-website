
import React from 'react';
import { useExperience } from '@/hooks/useExperience';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { format, parseISO } from 'date-fns';

const DynamicExperience = () => {
  const { data: experiences, isLoading, error } = useExperience();

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full mb-4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
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
            <h2 className="text-3xl font-bold mb-4">Work Experience</h2>
            <p className="text-red-600">Error loading experience. Please try again later.</p>
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
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the companies I've had the pleasure to work with.
          </p>
        </div>
        
        <div className="space-y-8">
          {experiences?.map((experience) => (
            <Card key={experience.id} className="animate-on-scroll hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    {experience.logo_url && (
                      <img 
                        src={experience.logo_url} 
                        alt={`${experience.company} logo`}
                        className="w-12 h-12 object-contain rounded"
                      />
                    )}
                    <div>
                      <CardTitle className="text-xl mb-1">{experience.position}</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {experience.company_url ? (
                          <a 
                            href={experience.company_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-semibold hover:text-purple-600 transition-colors flex items-center gap-1"
                          >
                            {experience.company}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="font-semibold">{experience.company}</span>
                        )}
                        {experience.location && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {experience.location}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(experience.start_date)} - {' '}
                      {experience.current_job 
                        ? 'Present' 
                        : experience.end_date 
                          ? formatDate(experience.end_date)
                          : 'Present'
                      }
                    </span>
                    {experience.current_job && (
                      <Badge variant="secondary" className="ml-2">Current</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {experience.description && (
                  <p className="text-muted-foreground mb-4">{experience.description}</p>
                )}
                
                {experience.achievements && experience.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {experience.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
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

export default DynamicExperience;
