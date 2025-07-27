import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { usePendingJobs, useApproveJob, useRejectJob, useAllJobs } from "@/hooks/useAdminJobs";
import { toast } from "sonner";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  MapPin, 
  DollarSign,
  Users,
  Loader2,
  Mail
} from "lucide-react";
import { JobPost } from "@/types/marketplace";
import { Profile } from "@/types/profile";

const AdminJobs = () => {
  const [selectedTab, setSelectedTab] = useState("pending");
  const { data: pendingJobs = [], isLoading: pendingLoading } = usePendingJobs();
  const { data: allJobs = [], isLoading: allLoading } = useAllJobs();
  const approveJob = useApproveJob();
  const rejectJob = useRejectJob();

  const handleApprove = async (jobId: string, title: string) => {
    try {
      await approveJob.mutateAsync(jobId);
      toast.success(`Job "${title}" has been approved and published!`);
    } catch (error) {
      toast.error("Failed to approve job. Please try again.");
    }
  };

  const handleReject = async (jobId: string, title: string) => {
    try {
      await rejectJob.mutateAsync(jobId);
      toast.success(`Job "${title}" has been rejected.`);
    } catch (error) {
      toast.error("Failed to reject job. Please try again.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'published':
        return <Badge variant="default" className="text-green-600"><CheckCircle className="h-3 w-3 mr-1" />Published</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      case 'closed':
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatSalary = (job: JobPost) => {
    const min = job.salary_min || 0;
    const max = job.salary_max;
    const type = job.salary_type;
    
    if (max) {
      return `${min}-${max} TND/${type}`;
    }
    return `${min} TND/${type}`;
  };

  const JobCard = ({ 
    job, 
    showActions = false 
  }: { 
    job: JobPost & { employer: Profile; applications?: { count: number }[] }; 
    showActions?: boolean;
  }) => (
    <Card key={job.id} className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{job.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mb-2">
              {getStatusBadge(job.status)}
              <Badge variant="outline">{job.job_type}</Badge>
              <Badge variant="outline">{job.urgency} priority</Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {job.employer?.full_name || job.contact_name || 'Unknown Employer'}
              </span>
              {!job.employer_id && job.contact_email && (
                <span className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {job.contact_email}
                </span>
              )}
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {job.location}
              </span>
              <span className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                {formatSalary(job)}
              </span>
              {job.applications && (
                <span>{job.applications.length} applications</span>
              )}
            </div>
          </div>
          {showActions && (
            <div className="flex gap-2 ml-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleApprove(job.id, job.title)}
                disabled={approveJob.isPending}
              >
                {approveJob.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleReject(job.id, job.title)}
                disabled={rejectJob.isPending}
              >
                {rejectJob.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                Reject
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {job.description}
        </p>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Posted: {new Date(job.created_at).toLocaleDateString()}</span>
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Job Management</h1>
          <p className="text-muted-foreground">
            Review and manage job postings on the platform
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending Review ({pendingJobs.length})
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              All Jobs ({allJobs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Jobs Pending Review</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Review these job postings before they go live on the platform
                </p>
              </CardHeader>
              <CardContent>
                {pendingLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin mr-2" />
                    <span>Loading pending jobs...</span>
                  </div>
                ) : pendingJobs.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">All caught up!</h3>
                    <p className="text-muted-foreground">
                      No jobs are currently waiting for review.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingJobs.map((job) => (
                      <JobCard key={job.id} job={job} showActions={true} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Job Posts</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Complete overview of all job postings on the platform
                </p>
              </CardHeader>
              <CardContent>
                {allLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin mr-2" />
                    <span>Loading all jobs...</span>
                  </div>
                ) : allJobs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No jobs have been posted yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {allJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminJobs;