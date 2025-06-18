
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';
import { UserCircle, Briefcase, GraduationCap, Wrench, Building } from 'lucide-react';

interface RoleBasedSignUpProps {
  onSuccess?: () => void;
  onSwitchToSignIn?: () => void;
}

const RoleBasedSignUp: React.FC<RoleBasedSignUpProps> = ({ onSuccess, onSwitchToSignIn }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    user_type: '' as 'employer' | 'worker' | '',
    user_roles: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useEnhancedAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    setLoading(true);
    
    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.full_name,
      user_type: formData.user_type,
      user_roles: formData.user_roles,
    });

    setLoading(false);

    if (!error) {
      onSuccess?.();
    }
  };

  const updateUserRoles = (role: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      user_roles: checked 
        ? [...prev.user_roles, role]
        : prev.user_roles.filter(r => r !== role)
    }));
  };

  const getRoleOptions = () => {
    if (formData.user_type === 'worker') {
      return [
        { id: 'student', label: 'Student', icon: GraduationCap, description: 'Access courses and learning materials' },
        { id: 'job_seeker', label: 'Job Seeker', icon: Briefcase, description: 'Find job opportunities' },
        { id: 'freelancer', label: 'Freelancer', icon: Wrench, description: 'Offer services and find projects' },
      ];
    } else {
      return [
        { id: 'instructor', label: 'Instructor', icon: GraduationCap, description: 'Create and teach courses' },
        { id: 'employer', label: 'Employer', icon: Building, description: 'Post jobs and hire talent' },
      ];
    }
  };

  if (step === 1) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <UserCircle className="h-6 w-6" />
            Create Account
          </CardTitle>
          <CardDescription>
            Join Zwanski Tech community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>I am a:</Label>
              <Select onValueChange={(value: 'employer' | 'worker') => setFormData(prev => ({ ...prev, user_type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="worker">Student/Job Seeker/Freelancer</SelectItem>
                  <SelectItem value="employer">Instructor/Employer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={!formData.user_type}>
              Continue
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <button
                onClick={onSwitchToSignIn}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Choose Your Interests</CardTitle>
        <CardDescription>
          Select what you'd like to do on Zwanski Tech
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {getRoleOptions().map((role) => {
              const Icon = role.icon;
              return (
                <div key={role.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={role.id}
                    checked={formData.user_roles.includes(role.id)}
                    onCheckedChange={(checked) => updateUserRoles(role.id, checked as boolean)}
                  />
                  <div className="flex-1">
                    <label htmlFor={role.id} className="flex items-center gap-2 cursor-pointer">
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{role.label}</span>
                    </label>
                    <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={loading || formData.user_roles.length === 0}
              className="flex-1"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RoleBasedSignUp;
