
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Cookie, Database, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Zwanski Tech</title>
        <meta name="description" content="Learn how Zwanski Tech protects your privacy and handles your personal data." />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <h3>Personal Information</h3>
                <ul>
                  <li>Name and email address (when you contact us or sign up)</li>
                  <li>Profile information for job marketplace and freelancer profiles</li>
                  <li>Course enrollment and progress data in our academy</li>
                  <li>Messages and communications through our chat system</li>
                </ul>

                <h3>Technical Information</h3>
                <ul>
                  <li>Device information and browser type</li>
                  <li>IP address and location data</li>
                  <li>Usage patterns and site interaction data</li>
                  <li>IMEI data (only when using our free IMEI check tool)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <ul>
                  <li>Provide and improve our services</li>
                  <li>Communicate with you about your account and our services</li>
                  <li>Process job applications and freelancer connections</li>
                  <li>Deliver educational content and track course progress</li>
                  <li>Send newsletters and updates (with your consent)</li>
                  <li>Analyze usage to improve user experience</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cookie className="h-5 w-5" />
                  Cookies and Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>We use cookies and similar technologies for:</p>
                <ul>
                  <li><strong>Essential cookies:</strong> Required for basic site functionality</li>
                  <li><strong>Analytics cookies:</strong> Help us understand how you use our site</li>
                  <li><strong>Advertising cookies:</strong> Support our free services through relevant ads</li>
                  <li><strong>Preference cookies:</strong> Remember your language and theme settings</li>
                </ul>
                <p>You can manage your cookie preferences through our cookie consent banner.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Protection & Your Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>Under GDPR and other privacy laws, you have the right to:</p>
                <ul>
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate personal data</li>
                  <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong>Portability:</strong> Receive your data in a portable format</li>
                  <li><strong>Objection:</strong> Object to processing of your personal data</li>
                  <li><strong>Restriction:</strong> Request restriction of processing</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>If you have questions about this Privacy Policy or want to exercise your rights:</p>
                <ul>
                  <li><strong>Email:</strong> support@zwanski.org</li>
                  <li><strong>Address:</strong> Tunis, Tunisia</li>
                </ul>
                <p>We will respond to your request within 30 days.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
