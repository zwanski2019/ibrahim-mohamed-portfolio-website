
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const FAQ = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What services does Zwanski Tech provide?",
      answer: "We offer comprehensive digital solutions including web development, mobile app development, cybersecurity services, device repair (IMEI, BIOS), Chrome extension development, and technical consulting."
    },
    {
      question: "How long does a typical web development project take?",
      answer: "Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex web applications can take 2-6 months. We provide detailed timelines during our initial consultation."
    },
    {
      question: "Do you offer 24/7 support?",
      answer: "Yes, we provide 24/7 support for critical issues. Our standard support hours are Monday-Friday 9 AM-6 PM, with emergency support available around the clock for urgent matters."
    },
    {
      question: "Can you help with IMEI and device repair services?",
      answer: "Absolutely! We specialize in IMEI repair, BIOS repair, and various device troubleshooting services. Our team has over 5 years of experience in mobile device repair and system recovery."
    },
    {
      question: "What technologies do you work with?",
      answer: "We work with modern web technologies including React, TypeScript, Node.js, Python, mobile development frameworks, cloud platforms (AWS, Azure), and various databases. We stay current with the latest technology trends."
    },
    {
      question: "Do you provide cybersecurity services?",
      answer: "Yes, we offer comprehensive cybersecurity solutions including security audits, vulnerability assessments, secure coding practices, and ongoing security monitoring to protect your digital assets."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="craft-section bg-craft-gray-50">
      <div className="craft-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 craft-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-craft-gray-900 mb-6">
              Frequently Asked <span className="craft-text-gradient">Questions</span>
            </h2>
            <p className="text-xl text-craft-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our services and how we can help transform your digital presence.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="craft-card overflow-hidden hover-lift"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-craft-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-craft-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={cn(
                      "h-5 w-5 text-craft-mint transition-transform duration-200 flex-shrink-0",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </button>
                
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-8 pb-6">
                    <p className="text-craft-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
