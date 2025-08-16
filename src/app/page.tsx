import HeroSection from "@/components/layout/hero-section";
import Features from "@/components/layout/features";
import FooterSection from "@/components/common/footer-section";
import BecomePartner from "@/components/layout/become-partner";
import BecomeAffiliate from "@/components/layout/become-affiliate";
import JoinWaitlist from "@/components/forms/join-waitlist";
import { HeroHeader } from "@/components/common/header";

export default function Home() {
  return (
    <>
      <HeroHeader />
      <HeroSection />
      <Features />

      <BecomePartner />
      <BecomeAffiliate />

      <JoinWaitlist />

      <FooterSection />
    </>
  );
}
