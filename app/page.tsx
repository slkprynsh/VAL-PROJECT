import { HeroSection } from '@/components/hero/hero-section';
import { TrustedBySection } from '@/components/sections/trusted-by';
import { StatsSection } from '@/components/sections/stats';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { CTABanner } from '@/components/sections/cta-banner';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TrustedBySection />
      <StatsSection />
      <TestimonialsSection />
      <CTABanner />
    </div>
  );
}
