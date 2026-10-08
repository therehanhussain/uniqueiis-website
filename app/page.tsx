import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustPillars from "@/components/TrustPillars";
import About from "@/components/About";
import Industries from "@/components/Industries";
import Services from "@/components/Services";
import NDTSection from "@/components/NDTSection";
import Capabilities from "@/components/Capabilities";
import WorkflowAndOrg from "@/components/WorkflowAndOrg";
import GlobalNetwork from "@/components/GlobalNetwork";
import PartnerEcosystem from "@/components/PartnerEcosystem";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060A14] text-white selection:bg-emerald-accent/30 selection:text-white">
      {/* 01. Glassmorphic Navigation */}
      <Navbar />

      {/* 02. Cinematic Engineering Hero */}
      <Hero />

      {/* 03. Scroll Storytelling Trust Section: INSPECT • ASSURE • DELIVER • ADD VALUE */}
      <TrustPillars />

      {/* 04. About UIIS: Split-Screen "INSPECTION WITHOUT COMPROMISE" */}
      <About />

      {/* 05. Industries We Serve: Horizontal / Scroll-driven Experience */}
      <Industries />

      {/* 06. Services: 01 to 07 Large Immersive Cards with Modal Expansion */}
      <Services />

      {/* 07. NDT Solutions: "INSPECTION WITHOUT DESTRUCTION" */}
      <NDTSection />

      {/* 08. Technical Capabilities: 10 Disciplines & Standards */}
      <Capabilities />

      {/* 09. 11-Step Inspection Workflow & "PEOPLE. PROCESS. PARTNERSHIP." */}
      <WorkflowAndOrg />

      {/* 10. Global Network: Worldwide Network & Deployment Hubs */}
      <GlobalNetwork />

      {/* 11. UIIS Partner Ecosystem: 12 Verified Logos Marquee */}
      <PartnerEcosystem />

      {/* 12. Contact: "LET'S BUILD A SAFER, STRONGER TOMORROW" & HQ */}
      <Contact />

      {/* 13. Minimalist Engineering Footer */}
      <Footer />
    </main>
  );
}
