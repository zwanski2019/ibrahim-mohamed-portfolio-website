
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Clock, DollarSign, User, Star } from "lucide-react";
import { JobPost } from "@/types/marketplace";
import { formatDistanceToNow } from "date-fns";
import { useLanguage } from "@/context/LanguageContext";

interface JobCardProps {
  job: JobPost & {
    employer: {
      id: string;
      full_name: string;
      avatar_url: string | null;
      rating: number | null;
      verified: boolean;
    };
    applications: { count: number }[];
  };
  onApply?: (jobId: string) => void;
  onViewDetails?: (job: JobPost) => void;
}

export const JobCard = ({ job, onApply, onViewDetails }: JobCardProps) => {
  const { t } = useLanguage();
  const applicationCount = job.applications?.[0]?.count || 0;

  const formatSalary = () => {
    if (!job.salary_min && !job.salary_max) return null;
    
    const min = job.salary_min ? `${job.salary_min} TND` : '';
    const max = job.salary_max ? `${job.salary_max} TND` : '';
    const range = min && max ? `${min} - ${max}` : min || max;
    
    return `${range} / ${job.salary_type}`;
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 line-clamp-2">
              {job.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar className="h-6 w-6">
                <AvatarImage src={job.employer.avatar_url || ''} />
                <AvatarFallback>
                  {job.employer.full_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span>{job.employer.full_name}</span>
              {job.employer.verified && (
                <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                  {t("jobs.verified")}
                </Badge>
              )}
              {job.employer.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{job.employer.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>
          <Badge 
            variant={job.urgency === 'high' ? 'destructive' : 
                   job.urgency === 'medium' ? 'default' : 'secondary'}
          >
            {t(`jobs.urgency.${job.urgency}`)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {job.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{job.location}</span>
          </div>

          {formatSalary() && (
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-green-600">{formatSalary()}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{applicationCount} {t("jobs.applications")}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          <Badge variant="outline">{job.category}</Badge>
          <Badge variant="outline">{t(`jobs.${job.job_type.replace('-', '')}`)}</Badge>
        </div>
      </CardContent>

      <CardFooter className="pt-0 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          asChild
          className="flex-1"
        >
          <Link to={`/jobs/${job.id}`}>
            {t("jobs.viewDetails")}
          </Link>
        </Button>
        <Button 
          size="sm" 
          onClick={() => onApply?.(job.id)}
          className="flex-1"
        >
          {t("jobs.applyNow")}
        </Button>
      </CardFooter>
    </Card>
  );
};
