import { Helmet } from "react-helmet-async";

interface SEOHelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  type?: string;
  structuredData?: object;
}

export const SEOHelmet = ({
  title = "Zwanski Tech - Professional IT Services & Digital Education Platform in Tunisia",
  description = "Expert IT services in Tunisia: computer repair, cybersecurity, web development, and digital education. Professional solutions for businesses and individuals.",
  keywords = "IT services Tunisia, computer repair Tunisia, cybersecurity Tunisia, web development Tunisia, digital education, Mohamed Ibrahim Zwanski",
  ogImage = "https://zwanski.org/og-image.png",
  canonical = "https://zwanski.org/",
  type = "website",
  structuredData
}: SEOHelmetProps) => {
  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : 'https://zwanski.org');
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Mohamed Ibrahim Zwanski" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Zwanski Tech" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@zwanski" />
      <meta name="twitter:creator" content="@zwanski" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Geo Location */}
      <meta name="geo.region" content="TN" />
      <meta name="geo.placename" content="Tunis" />
      <meta name="geo.position" content="36.8065;10.1815" />
      <meta name="ICBM" content="36.8065, 10.1815" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};