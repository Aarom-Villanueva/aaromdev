import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import PrincipleSection from '@/components/sections/PrincipleSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SystemsSection from '@/components/sections/SystemsSection';
import CapabilitiesSection from '@/components/sections/CapabilitiesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ProfileSection from '@/components/sections/ProfileSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <div className="relative bg-[#030303]">
      <Navbar />
      <main>
        <HeroSection />
        <PrincipleSection />
        <ProjectsSection />
        <SystemsSection />
        <CapabilitiesSection />
        <ProcessSection />
        <ProfileSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
