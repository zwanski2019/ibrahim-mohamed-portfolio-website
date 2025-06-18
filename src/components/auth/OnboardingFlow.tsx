
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';

const OnboardingFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    academy_level: '',
    learning_goals: [] as string[],
    preferred_learning_style: '',
    hourly_rate_min: '',
    hourly_rate_max: '',
    service_categories: [] as string[],
    company_name: '',
    industry: '',
  });
  const { user, updateProfile } = useEnhancedAuth();
  const [loading, setLoading] = useState(false);

  const totalSteps = user?.profile?.user_roles?.includes('student') ? 3 : 
                   user?.profile?.user_roles?.includes('freelancer') ? 3 : 2;

  const handleSubmit = async () => {
    setLoading(true);
    
    const updates: any = {
      bio: formData.bio,
      location: formData.location,
      onboarding_completed: true,
      profile_completion_percentage: 80,
    };

    if (user?.profile?.user_roles?.includes('student')) {
      updates.academy_level = formData.academy_level;
      updates.learning_goals = formData.learning_goals;
      updates.preferred_learning_style = formData.preferred_learning_style;
    }

    if (user?.profile?.user_roles?.includes('freelancer')) {
      updates.hourly_rate_min = parseFloat(formData.hourly_rate_min) || null;
      updates.hourly_rate_max = parseFloat(formData.hourly_rate_max) || null;
      updates.service_categories = formData.service_categories;
    }

    if (user?.profile?.user_roles?.includes('employer')) {
      updates.company_name = formData.company_name;
      updates.industry = formData.industry;
    }

    await updateProfile(updates);
    setLoading(false);
  };

  const addLearningGoal = (goal: string) => {
    if (goal && !formData.learning_goals.includes(goal)) {
      setFormData(prev => ({
        ...prev,
        learning_goals: [...prev.learning_goals, goal]
      }));
    }
  };

  const removeLearningGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      learning_goals: prev.learning_goals.filter(g => g !== goal)
    }));
  };

  const addServiceCategory = (category: string) => {
    if (category && !formData.service_categories.includes(category)) {
      setFormData(prev => ({
        ...prev,
        service_categories: [...prev.service_categories, category]
      }));
    }
  };

  const removeServiceCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      service_categories: prev.service_categories.filter(c => c !== category)
    }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <CheckCircle className="h-6 w-6" />
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Step {step} of {totalSteps} - Help us personalize your experience
          </CardDescription>
          <div className="w-full bg-secondary rounded-full h-2 mt-4">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>
          )}

          {step === 2 && user?.profile?.user_roles?.includes('student') && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Learning Preferences</h3>
              
              <div className="space-y-2">
                <Label>Current Level</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, academy_level: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your current level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Learning Goals</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.learning_goals.map((goal) => (
                    <Badge key={goal} variant="secondary" className="cursor-pointer" onClick={() => removeLearningGoal(goal)}>
                      {goal} ×
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['Web Development', 'Mobile Development', 'Data Science', 'Cybersecurity', 'UI/UX Design', 'DevOps'].map((goal) => (
                    <Button
                      key={goal}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addLearningGoal(goal)}
                      disabled={formData.learning_goals.includes(goal)}
                    >
                      {goal}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferred Learning Style</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, preferred_learning_style: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="How do you prefer to learn?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Tutorials</SelectItem>
                    <SelectItem value="reading">Reading & Documentation</SelectItem>
                    <SelectItem value="hands-on">Hands-on Projects</SelectItem>
                    <SelectItem value="interactive">Interactive Courses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && user?.profile?.user_roles?.includes('freelancer') && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Freelancer Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hourly_rate_min">Min Hourly Rate (TND)</Label>
                  <Input
                    id="hourly_rate_min"
                    type="number"
                    placeholder="50"
                    value={formData.hourly_rate_min}
                    onChange={(e) => setFormData(prev => ({ ...prev, hourly_rate_min: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hourly_rate_max">Max Hourly Rate (TND)</Label>
                  <Input
                    id="hourly_rate_max"
                    type="number"
                    placeholder="150"
                    value={formData.hourly_rate_max}
                    onChange={(e) => setFormData(prev => ({ ...prev, hourly_rate_max: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Service Categories</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.service_categories.map((category) => (
                    <Badge key={category} variant="secondary" className="cursor-pointer" onClick={() => removeServiceCategory(category)}>
                      {category} ×
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Data Analysis', 'Content Writing', 'Digital Marketing'].map((category) => (
                    <Button
                      key={category}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addServiceCategory(category)}
                      disabled={formData.service_categories.includes(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && user?.profile?.user_roles?.includes('employer') && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  placeholder="Your company name"
                  value={formData.company_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Industry</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(prev => Math.max(1, prev - 1))}
              disabled={step === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            {step < totalSteps ? (
              <Button
                type="button"
                onClick={() => setStep(prev => prev + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Completing...' : 'Complete Setup'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
