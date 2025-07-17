import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useApplyToJob } from "@/hooks/useJobPosts";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building, 
  CheckCircle2,
  AlertCircle,
  Send,
  Bookmark,
  Share
} from "lucide-react";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isApplying, setIsApplying] = useState(false);
  const applyToJob = useApplyToJob();

  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job-detail', id],
    queryFn: async () => {
      if (!id) throw new Error('Job ID is required');
      
      const { data, error } = await supabase
        .from('job_posts')
        .select(`
          *,
          employer:profiles!job_posts_employer_id_fkey(
            id,
            full_name,
            avatar_url,
            email,
            verified,
            rating,
            phone
          ),
          applications(
            id,
            status,
            worker_id
          )
        `)
        .eq('id', id)
        .eq('status', 'published')
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const hasApplied = job?.applications?.some(app => app.worker_id === user?.id);

  const handleApply = async () => {
    if (!user) {
      toast.error("Please sign in to apply for jobs");
      navigate("/auth");
      return;
    }

    if (!job) return;

    try {
      setIsApplying(true);
      await applyToJob.mutateAsync({
        job_id: job.id,
        worker_id: user.id,
        cover_letter: "Application submitted through job board"
      });
      toast.success("Application submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };

  const formatSalary = () => {
    if (!job) return '';
    const min = job.salary_min || 0;
    const max = job.salary_max;
    const type = job.salary_type;
    
    if (max) {
      return `${min}-${max} TND/${type}`;
    }
    return `${min} TND/${type}`;
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <Clock className="h-8 w-8 animate-spin mr-2" />
            <span>Loading job details...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Job Not Found</h2>
                <p className="text-muted-foreground mb-4">
                  This job posting may have been removed or is no longer available.
                </p>
                <Button asChild>
                  <Link to="/jobs">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Jobs
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/jobs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job header */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-3">{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="default">{job.job_type}</Badge>
                        <Badge variant={getUrgencyColor(job.urgency)}>{job.urgency} priority</Badge>
                        <Badge variant="outline">{job.category}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {formatSalary()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Posted {new Date(job.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Job description */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap">{job.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits & Perks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply card */}
              <Card>
                <CardHeader>
                  <CardTitle>Apply for this job</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {hasApplied ? (
                    <div className="text-center py-4">
                      <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                      <h3 className="font-semibold text-green-700 mb-2">Application Submitted</h3>
                      <p className="text-sm text-muted-foreground">
                        You have already applied for this position. The employer will contact you if interested.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground">
                        Submit your application to be considered for this position.
                      </p>
                      <Button 
                        onClick={handleApply} 
                        disabled={isApplying || !user} 
                        className="w-full"
                        size="lg"
                      >
                        {isApplying ? (
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4 mr-2" />
                        )}
                        {!user ? "Sign In to Apply" : isApplying ? "Submitting..." : "Apply Now"}
                      </Button>
                      {!user && (
                        <p className="text-xs text-center text-muted-foreground">
                          You need to sign in to apply for jobs.{" "}
                          <Link to="/auth" className="text-primary hover:underline">
                            Sign in here
                          </Link>
                        </p>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Employer info */}
              <Card>
                <CardHeader>
                  <CardTitle>About the Employer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar>
                      <AvatarImage src={job.employer?.avatar_url || undefined} />
                      <AvatarFallback>
                        {job.employer?.full_name?.[0] || 'E'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{job.employer?.full_name}</h3>
                      {job.employer?.verified && (
                        <div className="flex items-center text-sm text-green-600">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Verified Employer
                        </div>
                      )}
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Professional Services</span>
                    </div>
                    {job.employer?.rating && (
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{job.employer.rating} / 5.0</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Job stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Applications</span>
                    <span className="font-semibold">{job.applications?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Posted</span>
                    <span className="font-semibold">
                      {new Date(job.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-semibold">{job.category}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDetail;