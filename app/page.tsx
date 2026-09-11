import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import CapabilitiesSection from '@/components/sections/CapabilitiesSection';
import ProfileSection from '@/components/sections/ProfileSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <div className="relative bg-[#030303]">
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <CapabilitiesSection />
        <ProfileSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}