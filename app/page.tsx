'use client';

import { useState, useEffect } from "react";
import Navbar from "@/components/common/navbar";
import Hero from "@/components/sections/hero";
import OurClientsSection from "@/components/sections/ourclientssection";
import About from "@/components/sections/about";
import Work from "@/components/sections/ourwork";
import CountdownSection from "@/components/sections/countdownsection";
import Services from "@/components/sections/ourservices";
import Team from "@/components/sections/team";
import Testimonials from "@/components/sections/testimonials";
import Footer from "@/components/common/footer";
import PopupSection from "@/components/popup-sections/popup";
import Loader from "@/components/ui/Loader";
import { countdownStats } from "@/data/countdownUtils";
import { testimonialsData } from "@/data/testimonials";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensuring the loader stays for a minimum of 2 seconds for visibility
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <Hero />
      <OurClientsSection />
      <About />
      <Work />
      <CountdownSection stats={countdownStats} />
      <Services />
      <Team />
      <Testimonials testimonials={testimonialsData} />
      <PopupSection />
      <Footer />
    </>
  );
}