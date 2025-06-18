
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';
import { UserPlus, Briefcase, Code, GraduationCap, Users } from 'lucide-react';
import SocialLoginButtons from './SocialLoginButtons';

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
    user_type: '' as 'employer' | 'worker',
    user_roles: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { signUp } = useEnhancedAuth();

  const validateStep1 = () => {
    const newErrors: string[] = [];
    
    if (!formData.email) newErrors.push('Email is required');
    if (!formData.password) newErrors.push('Password is required');
    if (formData.password.length < 6) newErrors.push('Password must be at least 6 characters');
    if (formData.password !== formData.confirmPassword) newErrors.push('Passwords do not match');
    if (!formData.full_name) newErrors.push('Full name is required');
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const validateStep2 = () => {
    const newErrors: string[] = [];
    
    if (!formData.user_type) newErrors.push('Please select if you are looking to hire or find work');
    if (formData.user_roles.length === 0) newErrors.push('Please select at least one role');
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleRoleToggle = (role: string) => {
    setFormData(prev => ({
      ...prev,
      user_roles: prev.user_roles.includes(role)
        ? prev.user_roles.filter(r => r !== role)
        : [...prev.user_roles, role]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    
    setLoading(true);
    setErrors([]);
    
    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.full_name,
      user_type: formData.user_type,
      user_roles: formData.user_roles
    });

    setLoading(false);

    if (!error) {
      onSuccess?.();
    }
  };

  const getAvailableRoles = () => {
    if (formData.user_type === 'employer') {
      return [
        { id: 'employer', label: 'Employer', icon: Briefcase, description: 'Post jobs and hire talent' },
        { id: 'admin', label: 'Admin', icon: Users, description: 'Platform administration' }
      ];
    } else {
      return [
        { id: 'student', label: 'Student', icon: GraduationCap, description: 'Learning and taking courses' },
        { id: 'job_seeker', label: 'Job Seeker', icon: Briefcase, description: 'Looking for employment' },
        { id: 'freelancer', label: 'Freelancer', icon: Code, description: 'Offering services and skills' },
        { id: 'instructor', label: 'Instructor', icon: GraduationCap, description: 'Teaching and creating courses' }
      ];
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <UserPlus className="h-6 w-6" />
          {step === 1 ? 'Create Account' : 'Choose Your Path'}
        </CardTitle>
        <CardDescription>
          {step === 1 
            ? 'Join Zwanski Tech to get started' 
            : 'Tell us about yourself to personalize your experience'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
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

            {errors.length > 0 && (
              <div className="text-sm text-red-600 space-y-1">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            <Button onClick={handleNext} className="w-full">
              Next: Choose Your Role
            </Button>

            <div className="mt-4">
              <SocialLoginButtons />
            </div>

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
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>I am looking to:</Label>
                <Select 
                  value={formData.user_type} 
                  onValueChange={(value: 'employer' | 'worker') => 
                    setFormData(prev => ({ ...prev, user_type: value, user_roles: [] }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your primary goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="worker">Find work or learn new skills</SelectItem>
                    <SelectItem value="employer">Hire talent or post jobs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.user_type && (
                <div>
                  <Label>Select your roles (you can choose multiple):</Label>
                  <div className="grid grid-cols-1 gap-3 mt-2">
                    {getAvailableRoles().map((role) => (
                      <div key={role.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                        <Checkbox
                          id={role.id}
                          checked={formData.user_roles.includes(role.id)}
                          onCheckedChange={() => handleRoleToggle(role.id)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <role.icon className="h-4 w-4" />
                            <Label htmlFor={role.id} className="font-medium cursor-pointer">
                              {role.label}
                            </Label>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {role.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {errors.length > 0 && (
              <div className="text-sm text-red-600 space-y-1">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setStep(1)}
                className="flex-1"
              >
                Back
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default RoleBasedSignUp;
