import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustPillars from "@/components/TrustPillars";
import About from "@/components/About";
import Inspection3DSection from "@/components/Inspection3DSection";
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
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#060A14] text-slate-900 dark:text-white selection:bg-emerald-accent/30 selection:text-white">
      {/* 01. Glassmorphic Navigation */}
      <Navbar />

      {/* 02. Cinematic Engineering Hero with 3D Pressure Vessel Component */}
      <Hero />

      {/* 03. Scroll Storytelling Trust Section: INSPECT • ASSURE • DELIVER • ADD VALUE */}
      <TrustPillars />

      {/* 04. About UIIS: Split-Screen "INSPECTION WITHOUT COMPROMISE" */}
      <About />

      {/* 05. 3D Inspection Verification: MATERIAL • WELD • THICKNESS • SURFACE • DIMENSION • QUALITY */}
      <Inspection3DSection />

      {/* 06. Industries We Serve: High-Resolution Industrial Cards with 3D Depth */}
      <Industries />

      {/* 07. Services: 01 to 07 Large Immersive Cards with Modal Expansion */}
      <Services />

      {/* 08. NDT Solutions: 3D Physics Visualizer (UT, RT, MT, PT, VT) & Educational Principles */}
      <NDTSection />

      {/* 09. Technical Capabilities: 10 Disciplines & Standards */}
      <Capabilities />

      {/* 10. 11-Step Inspection Workflow with 3D Technical Conduit Pipeline */}
      <WorkflowAndOrg />

      {/* 11. Global Network with 3D Engineering Globe & Deployment Hubs */}
      <GlobalNetwork />

      {/* 12. UIIS Partner Ecosystem: 12 Verified Logos Marquee */}
      <PartnerEcosystem />

      {/* 13. Contact: "LET'S BUILD A SAFER, STRONGER TOMORROW" & HQ */}
      <Contact />

      {/* 14. Minimalist Engineering Footer */}
      <Footer />
    </main>
  );
}
