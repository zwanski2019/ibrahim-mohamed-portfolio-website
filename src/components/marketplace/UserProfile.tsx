
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, Briefcase, User } from "lucide-react";

const profileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().min(2, "Location must be at least 2 characters"),
  user_type: z.enum(["employer", "worker"]),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface UserProfileProps {
  user?: {
    id: string;
    full_name: string;
    email: string;
    phone?: string;
    location?: string;
    user_type: "employer" | "worker";
    avatar_url?: string;
    rating?: number;
    verified: boolean;
    created_at: string;
  };
  onSave?: (data: ProfileFormData) => void;
  isEditing?: boolean;
}

export const UserProfile = ({ user, onSave, isEditing = false }: UserProfileProps) => {
  const [editMode, setEditMode] = useState(isEditing);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: user?.full_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
      user_type: user?.user_type || "worker",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      onSave?.(data);
      setEditMode(false);
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  if (!editMode && user) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback className="text-2xl">
                {user.full_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl">{user.full_name}</CardTitle>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge variant={user.user_type === "employer" ? "default" : "secondary"}>
              {user.user_type === "employer" ? "Employer" : "Worker"}
            </Badge>
            {user.verified && (
              <Badge variant="outline" className="text-green-600 border-green-600">
                ✓ Verified
              </Badge>
            )}
          </div>
          {user.rating && (
            <div className="flex items-center justify-center gap-1 mt-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{user.rating.toFixed(1)}</span>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Email:</span>
              <span className="text-sm">{user.email}</span>
            </div>
            
            {user.phone && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Phone:</span>
                <span className="text-sm">{user.phone}</span>
              </div>
            )}

            {user.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Location:</span>
                <span className="text-sm">{user.location}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Joined:</span>
              <span className="text-sm">
                {new Date(user.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button onClick={() => setEditMode(true)}>
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{user ? 'Edit Profile' : 'Create Profile'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+216 XX XXX XXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Tunis, Tunisia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="user_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="worker">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Worker - Looking for jobs
                        </div>
                      </SelectItem>
                      <SelectItem value="employer">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          Employer - Posting jobs
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                {user ? 'Update Profile' : 'Create Profile'}
              </Button>
              {user && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
