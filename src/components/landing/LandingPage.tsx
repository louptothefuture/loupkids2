import {
  AudienceSection,
} from "@/components/landing/AudienceSection";
import { LandingFooterStrip } from "@/components/landing/ColorBlock";
import {
  HeroSection,
  PreOrderSection,
} from "@/components/landing/HeroSection";
import { JournalSection } from "@/components/landing/JournalSection";
import { LandingNav } from "@/components/landing/LandingNav";
import {
  NothingSection,
  PhoneSection,
  StoryTeaserSection,
} from "@/components/landing/PhoneSections";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { TrustMarquee } from "@/components/landing/TrustMarquee";

export function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      <LandingNav />
      <HeroSection />
      <TrustMarquee />
      <ProblemSection />
      <AudienceSection />
      <PhoneSection />
      <NothingSection />
      <StoryTeaserSection />
      <JournalSection />
      <PreOrderSection />
      <LandingFooterStrip />
    </div>
  );
}
