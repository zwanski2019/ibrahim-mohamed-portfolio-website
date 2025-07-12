-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_title VARCHAR(255),
  client_company VARCHAR(255),
  client_avatar_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  service_category VARCHAR(100),
  project_type VARCHAR(100),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (testimonials should be publicly visible)
CREATE POLICY "Testimonials are publicly viewable" 
ON public.testimonials 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to manage testimonials (admin only)
CREATE POLICY "Admin can manage testimonials" 
ON public.testimonials 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND (
      'admin' = ANY(profiles.user_roles) 
      OR profiles.user_type = 'admin'
    )
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample testimonials
INSERT INTO public.testimonials (client_name, client_title, client_company, content, rating, service_category, is_featured) VALUES
('Sarah Johnson', 'CTO', 'TechStart Inc.', 'Zwanski Tech delivered exceptional web development services. Their team built our entire platform from scratch with incredible attention to detail and performance.', 5, 'Web Development', true),
('Ahmed Hassan', 'IT Manager', 'Digital Solutions LLC', 'Outstanding cybersecurity implementation. They secured our entire infrastructure and provided excellent Wazuh monitoring setup. Highly professional team.', 5, 'Cybersecurity', true),
('Maria Garcia', 'Founder', 'Local Business Hub', 'Quick and reliable device repair service. They recovered all my data from a damaged laptop and had it working like new within 24 hours.', 5, 'Device Repair', true),
('David Kim', 'Operations Director', 'CloudFirst Co.', 'Excellent cloud migration services. They moved our entire infrastructure to the cloud seamlessly with zero downtime. Very impressed with their expertise.', 5, 'Cloud Solutions', true),
('Fatima Al-Zahra', 'Marketing Manager', 'Growth Agency', 'Amazing SEO results! Our website traffic increased by 300% within 3 months. Their digital marketing strategies are top-notch.', 5, 'SEO Services', false),
('John Smith', 'Small Business Owner', 'Smith Electronics', 'Professional network setup for our office. WiFi coverage is excellent and the security configuration gives us peace of mind.', 5, 'Network Setup', false);