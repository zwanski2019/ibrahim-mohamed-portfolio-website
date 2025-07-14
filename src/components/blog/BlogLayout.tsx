import React from 'react';
import { Helmet } from 'react-helmet-async';

interface BlogLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function BlogLayout({ 
  children, 
  title = "Blog - Zwanski Tech", 
  description = "Stay updated with the latest insights, tutorials, and news from Zwanski Tech. Discover web development tips, IT solutions, and technology trends." 
}: BlogLayoutProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Zwanski Tech Blog",
    "description": description,
    "url": `${window.location.origin}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "Zwanski Tech",
      "url": window.location.origin
    },
    "inLanguage": "en-US"
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/blog`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={`${window.location.origin}/blog`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      {children}
    </>
  );
}