
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, BookOpen, Briefcase, Settings, CreditCard } from "lucide-react";

export default function FAQ() {
  const { t } = useLanguage();

  const faqSections = [
    {
      title: "General Questions",
      icon: HelpCircle,
      questions: [
        {
          question: "What services does Zwanski Tech offer?",
          answer: "We offer web and mobile development services, educational courses through our academy, a job marketplace connecting freelancers with employers, and free tools like IMEI checking and computer model lookup."
        },
        {
          question: "How can I contact Zwanski Tech?",
          answer: "You can reach us via email at support@zwanski.org, through our contact form, or join our Telegram channel for instant updates and community support."
        },
        {
          question: "Is Zwanski Tech available internationally?",
          answer: "Yes, we work with clients globally. Our services are available worldwide, and we support multiple languages to serve our international community."
        }
      ]
    },
    {
      title: "Academy & Courses",
      icon: BookOpen,
      questions: [
        {
          question: "Are the courses really free?",
          answer: "Yes, our educational content is completely free. We support this through ads and donations to maintain our mission of providing accessible tech education."
        },
        {
          question: "Do I get certificates for completing courses?",
          answer: "Yes, you receive completion certificates for finished courses that you can add to your professional profile and resume."
        },
        {
          question: "What programming languages and technologies do you teach?",
          answer: "We cover modern web technologies including React, JavaScript, TypeScript, Node.js, Python, mobile development, and emerging technologies in AI and blockchain."
        },
        {
          question: "Can I access courses offline?",
          answer: "Currently, our courses require an internet connection. We're working on offline access features for the future."
        }
      ]
    },
    {
      title: "Job Marketplace",
      icon: Briefcase,
      questions: [
        {
          question: "How do I post a job?",
          answer: "Navigate to the Jobs section, click 'Post a Job', fill out the job details including requirements, budget, and timeline, then submit for review."
        },
        {
          question: "What fees are charged for using the marketplace?",
          answer: "Basic job posting and freelancer profiles are free. We charge a small service fee only on successful project completions to maintain the platform."
        },
        {
          question: "How are freelancers vetted?",
          answer: "Freelancers undergo a review process including portfolio evaluation, skill verification, and background checks to ensure quality matches."
        },
        {
          question: "What if I'm not satisfied with the work?",
          answer: "We have a dispute resolution system and offer mediation services. Payment is held in escrow until project milestones are satisfactorily completed."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: Settings,
      questions: [
        {
          question: "How do I use the IMEI checker?",
          answer: "Simply enter your device's IMEI number (found in Settings > About Phone) into our IMEI check tool to get information about your device's status and specifications."
        },
        {
          question: "What browsers are supported?",
          answer: "Our platform works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience."
        },
        {
          question: "I'm having trouble with the website. What should I do?",
          answer: "Try refreshing the page, clearing your browser cache, or using a different browser. If issues persist, contact our support team with details about the problem."
        }
      ]
    },
    {
      title: "Billing & Payments",
      icon: CreditCard,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept major credit cards, PayPal, and bank transfers. Payment methods may vary by region and service type."
        },
        {
          question: "Can I get a refund?",
          answer: "Refund policies vary by service. Development services have milestone-based payments, while marketplace transactions are protected by our escrow system."
        },
        {
          question: "Do you offer payment plans?",
          answer: "Yes, for larger development projects, we offer flexible payment plans based on project milestones and timelines."
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions - Zwanski Tech</title>
        <meta name="description" content="Find answers to common questions about Zwanski Tech services, academy, job marketplace, and technical support." />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our services, academy, and platform. 
              Can't find what you're looking for? Contact our support team.
            </p>
          </div>

          <div className="space-y-8">
            {faqSections.map((section, sectionIndex) => (
              <Card key={sectionIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <section.icon className="h-5 w-5" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {section.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${sectionIndex}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Still Have Questions?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:support@zwanski.org"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Email Support
                </a>
                <a 
                  href="https://t.me/zwanski_tech" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  Join Telegram Community
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
