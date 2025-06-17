
import { Helmet } from "react-helmet-async";
import Jobs from "./Jobs";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SOS Jobs - Find Work & Hire Talent in Tunisia</title>
        <meta 
          name="description" 
          content="SOS Jobs - Tunisia's premier job marketplace. Find work opportunities or hire talented professionals across all industries."
        />
        <meta name="keywords" content="jobs, employment, hiring, Tunisia, freelance, work, careers" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SOS Jobs - Find Work & Hire Talent in Tunisia" />
        <meta property="og:description" content="Tunisia's premier job marketplace. Find work opportunities or hire talented professionals." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="SOS Jobs - Find Work & Hire Talent in Tunisia" />
        <meta property="twitter:description" content="Tunisia's premier job marketplace. Find work opportunities or hire talented professionals." />
      </Helmet>
      
      <Jobs />
    </>
  );
};

export default Index;
