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
import { countdownStats } from "@/data/countdownUtils";
import { testimonialsData } from "@/data/testimonials";

export default function Home() {
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