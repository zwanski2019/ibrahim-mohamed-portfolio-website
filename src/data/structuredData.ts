export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Zwanski Tech",
  "alternateName": "ZWANSKI TECH",
  "url": "https://zwanski.org",
  "logo": "https://zwanski.org/favicon-professional.svg",
  "description": "Zwanski Tech offers expert IT support, website design, computer repair, and iPhone/Android unlocking services. Trusted by individuals and businesses in Tunisia since 2019.",
  "foundingDate": "2019",
  "founder": {
    "@type": "Person",
    "name": "Mohamed Ibrahim",
    "alternateName": "Zwanski",
    "jobTitle": "Founder & CTO"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tunis",
    "addressCountry": "TN",
    "addressRegion": "Tunis Governorate"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 36.8065,
    "longitude": 10.1815
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+216-XX-XXX-XXX",
      "contactType": "customer service",
      "areaServed": "TN",
      "availableLanguage": ["en", "fr", "ar"],
      "email": "support@zwanski.org"
    },
    {
      "@type": "ContactPoint",
      "contactType": "technical support",
      "areaServed": "TN",
      "availableLanguage": ["en", "fr", "ar"],
      "email": "contact@zwanski.org",
      "hoursAvailable": "Mo-Fr 09:00-18:00"
    }
  ],
  "sameAs": [
    "https://github.com/zwanski2019",
    "https://www.linkedin.com/company/zwanski-tech",
    "https://www.facebook.com/ethicalhackerzwanskitech",
    "https://t.me/zwanski_tech"
  ],
  "serviceArea": [
    {
      "@type": "Place",
      "name": "Tunisia"
    },
    {
      "@type": "City",
      "name": "Tunis"
    },
    {
      "@type": "City", 
      "name": "Sfax"
    },
    {
      "@type": "City",
      "name": "Sousse"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "ratingCount": "150"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Professional IT Services Tunisia",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Computer Repair & IT Support",
          "description": "Expert computer repair, laptop fixing, and technical support services in Tunisia with unlocking solutions",
          "provider": {
            "@type": "Organization",
            "name": "Zwanski Tech"
          },
          "areaServed": "Tunisia"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Website Design & Development",
          "description": "Professional website design, custom web development, and mobile-responsive solutions for businesses",
          "provider": {
            "@type": "Organization",
            "name": "Zwanski Tech"
          },
          "areaServed": "Tunisia"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Device Unlocking Solutions",
          "description": "iPhone and Android unlocking services, IMEI unlocking, and mobile device repair solutions",
          "provider": {
            "@type": "Organization",
            "name": "Zwanski Tech"
          },
          "areaServed": "Tunisia"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Cybersecurity & IT Training",
          "description": "Professional cybersecurity consulting, IT training courses, and digital education services",
          "provider": {
            "@type": "Organization",
            "name": "Zwanski Tech"
          },
          "areaServed": "Tunisia"
        }
      }
    ]
  }
};

// FAQ Structured Data for SEO
export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What IT services do you offer in Tunisia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zwanski Tech provides comprehensive IT support including computer repair, smartphone troubleshooting, IMEI unlocking, cybersecurity consulting, web development, and digital education through Zwanski Academy across Tunis, Sfax, and Sousse."
      }
    },
    {
      "@type": "Question", 
      "name": "How much does computer repair cost in Tunisia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Computer repair costs vary by issue complexity. We offer free diagnostics and transparent pricing for laptop repair, desktop maintenance, and hardware replacement throughout Tunisia. Contact us for a personalized quote."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer remote IT support in Tunisia?", 
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we provide 24/7 remote IT support for software issues, cybersecurity concerns, and technical troubleshooting across Tunisia. Our team can assist with system optimization, malware removal, and software installation remotely."
      }
    },
    {
      "@type": "Question",
      "name": "What programming languages do you teach at Zwanski Academy?",
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": "Our online courses cover JavaScript, Python, React, Node.js, PHP, and mobile development. We offer beginner to advanced programming tutorials with practical projects and certification upon completion."
      }
    }
  ]
};

export const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Zwanski Tech",
  "image": "https://zwanski.org/og-image.png",
  "description": "Expert IT support, website design, computer repair, and iPhone/Android unlocking services. Trusted by individuals and businesses in Tunisia.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tunis",
    "addressCountry": "TN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 36.8065,
    "longitude": 10.1815
  },
  "url": "https://zwanski.org",
  "telephone": "+216-XX-XXX-XXX",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "serviceArea": {
    "@type": "Country",
    "name": "Tunisia"
  }
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Zwanski Tech – IT Services, Web Development & Unlocking Solutions",
  "url": "https://zwanski.org",
  "description": "Zwanski Tech offers expert IT support, website design, computer repair, and iPhone/Android unlocking services. Trusted by individuals and businesses in Tunisia.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://zwanski.org/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "sameAs": [
    "https://github.com/zwanski2019",
    "https://www.linkedin.com/company/zwanski-tech",
    "https://www.facebook.com/ethicalhackerzwanskitech"
  ]
};

export const breadcrumbStructuredData = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});