export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Zwanski Tech",
  "alternateName": "ZWANSKI TECH",
  "url": "https://zwanski.org",
  "logo": "https://zwanski.org/favicon-professional.svg",
  "description": "Professional IT services, web development, cybersecurity consulting, and digital education platform based in Tunisia.",
  "foundingDate": "2019",
  "founder": {
    "@type": "Person",
    "name": "Mohamed Ibrahim",
    "alternateName": "Zwanski"
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
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+216-XX-XXX-XXX",
    "contactType": "customer service",
    "areaServed": "TN",
    "availableLanguage": ["en", "fr", "ar"]
  },
  "sameAs": [
    "https://github.com/zwanski2019",
    "https://www.linkedin.com/company/zwanski-tech"
  ],
  "serviceArea": {
    "@type": "Place",
    "name": "Tunisia"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "IT Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web Development",
          "description": "Professional web development services including React, Node.js, and full-stack solutions"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "IT Support",
          "description": "Comprehensive IT support including computer repair, network setup, and technical consulting"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Cybersecurity",
          "description": "Cybersecurity consulting, penetration testing, and security audit services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Digital Education",
          "description": "Online courses and tutorials for web development, cybersecurity, and IT skills"
        }
      }
    ]
  }
};

export const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Zwanski Tech",
  "image": "https://zwanski.org/og-image.png",
  "description": "Leading IT services provider in Tunisia offering web development, cybersecurity, and digital education",
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
  "name": "Zwanski Tech",
  "url": "https://zwanski.org",
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
    "https://www.linkedin.com/company/zwanski-tech"
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