
import React, { useState } from 'react';
import { useContact } from '@/hooks/useContact';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageSquare, Send } from 'lucide-react';

const DynamicContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactMutation = useContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    contactMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-indigo-900/30 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15),transparent_50%)]" />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="animate-on-scroll">
            <Card className="glass-card border border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                  Send me a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-slate-300">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="bg-slate-800/50 border-purple-500/30 text-white placeholder:text-slate-500 focus:border-purple-400 focus:ring-purple-500/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-300">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="bg-slate-800/50 border-purple-500/30 text-white placeholder:text-slate-500 focus:border-purple-400 focus:ring-purple-500/50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-slate-300">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className="bg-slate-800/50 border-purple-500/30 text-white placeholder:text-slate-500 focus:border-purple-400 focus:ring-purple-500/50"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-slate-300">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell me about your project or inquiry..."
                      rows={6}
                      className="bg-slate-800/50 border-purple-500/30 text-white placeholder:text-slate-500 focus:border-purple-400 focus:ring-purple-500/50"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={contactMutation.isPending}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {contactMutation.isPending ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="animate-on-scroll space-y-6">
            <Card className="glass-card border border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email me directly</h3>
                    <p className="text-slate-400">support@zwanski.org</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="prose prose-invert max-w-none">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Let's work together</h3>
              <p className="text-slate-300 leading-relaxed">
                I'm always interested in new opportunities and collaborations. 
                Whether you have a project in mind, want to discuss potential partnerships, 
                or just want to say hello, feel free to reach out.
              </p>
              
              <h4 className="text-xl font-semibold text-purple-300 mt-6 mb-4">What I can help with:</h4>
              <ul className="text-slate-400 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                  Web application development
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                  Mobile app development
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                  UI/UX design and consultation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                  Technical consulting and code reviews
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                  System architecture and optimization
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicContact;
