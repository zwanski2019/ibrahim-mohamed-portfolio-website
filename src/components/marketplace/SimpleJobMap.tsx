import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Building2 } from "lucide-react";
import { JobPost } from "@/types/marketplace";

interface SimpleJobMapProps {
  jobs: (JobPost & {
    employer: {
      id: string;
      full_name: string;
      avatar_url: string | null;
      rating: number | null;
      verified: boolean;
    };
  })[];
  onJobSelect?: (job: JobPost) => void;
}

const SimpleJobMap: React.FC<SimpleJobMapProps> = ({ jobs = [], onJobSelect }) => {
  const formatSalary = (job: JobPost) => {
    if (!job.salary_min && !job.salary_max) return null;
    const min = job.salary_min ? `${job.salary_min} TND` : '';
    const max = job.salary_max ? `${job.salary_max} TND` : '';
    const range = min && max ? `${min} - ${max}` : min || max;
    return `${range} / ${job.salary_type}`;
  };

  // Group jobs by location
  const jobsByLocation = jobs.reduce((acc, job) => {
    const location = job.location || 'Unknown Location';
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(job);
    return acc;
  }, {} as Record<string, typeof jobs>);

  return (
    <Card className="h-96">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Jobs by Location</h3>
          <Badge variant="outline">{jobs.length} total</Badge>
        </div>
        
        <div className="h-80 overflow-y-auto space-y-4">
          {Object.entries(jobsByLocation).map(([location, locationJobs]) => (
            <div key={location} className="border rounded-lg p-4 bg-muted/30">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{location}</span>
                <Badge variant="secondary" className="text-xs">
                  {locationJobs.length} job{locationJobs.length !== 1 ? 's' : ''}
                </Badge>
              </div>
              
              <div className="space-y-2">
                {locationJobs.slice(0, 3).map((job) => (
                  <div 
                    key={job.id} 
                    className="flex items-center justify-between p-2 bg-background rounded border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{job.title}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{job.category}</span>
                        {formatSalary(job) && (
                          <span className="text-green-600 font-medium">
                            {formatSalary(job)}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onJobSelect?.(job)}
                      className="ml-2 flex-shrink-0"
                    >
                      View
                    </Button>
                  </div>
                ))}
                
                {locationJobs.length > 3 && (
                  <p className="text-xs text-muted-foreground text-center py-1">
                    +{locationJobs.length - 3} more job{locationJobs.length - 3 !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          ))}
          
          {Object.keys(jobsByLocation).length === 0 && (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">No jobs available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleJobMap;