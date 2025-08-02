
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, DollarSign, Star, Clock, Briefcase } from "lucide-react";
import { FreelancerProfile } from "@/hooks/useFreelancerProfiles";

interface FreelancerCardProps {
  freelancer: FreelancerProfile;
  onContact?: (freelancerId: string) => void;
  onViewProfile?: (freelancer: FreelancerProfile) => void;
}

export const FreelancerCard = ({ freelancer, onContact, onViewProfile }: FreelancerCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={freelancer.user.avatar_url || ''}
              alt={freelancer.user.full_name || 'Freelancer avatar'}
            />
            <AvatarFallback>
              {freelancer.user.full_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg line-clamp-1">
              {freelancer.user.full_name}
            </CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {freelancer.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              {freelancer.user.verified && (
                <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                  ✓ Verified
                </Badge>
              )}
              {freelancer.user.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{freelancer.user.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {freelancer.bio && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {freelancer.bio}
          </p>
        )}

        <div className="space-y-2">
          {freelancer.user.location && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{freelancer.user.location}</span>
            </div>
          )}

          {freelancer.hourly_rate && (
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-green-600">{freelancer.hourly_rate} TND/hour</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="capitalize">{freelancer.availability}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span>{freelancer.experience_years} years exp • {freelancer.completed_projects} projects</span>
          </div>
        </div>

        {freelancer.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {freelancer.skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {freelancer.skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{freelancer.skills.length - 4} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onViewProfile?.(freelancer)}
          className="flex-1"
        >
          View Profile
        </Button>
        <Button 
          size="sm" 
          onClick={() => onContact?.(freelancer.id)}
          className="flex-1"
        >
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
};
