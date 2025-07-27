import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnhancedContact from "@/components/EnhancedContact";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us - Zwanski Tech</title>
        <meta
          name="description"
          content="Get in touch with Zwanski Tech for services, inquiries or support."
        />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-grow">
          <section className="py-16">
            <div className="container mx-auto px-4 space-y-10">
              <EnhancedContact />
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.7178757754437!2d10.16579!3d36.806495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34a2bf7ceef1%3A0x1c1b4a93a8f8e741!2sTunis%2C%20Tunisia!5e0!3m2!1sen!2stn!4v1717937045032!5m2!1sen!2stn"
                  title="Zwanski Tech Location Map"
                  aria-label="Map showing Zwanski Tech location"
                  className="absolute top-0 left-0 w-full h-full rounded-lg border-none"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
