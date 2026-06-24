import { HeroSection } from '@/components/hero/hero-section';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { CTABanner } from '@/components/sections/cta-banner';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TestimonialsSection />
      <CTABanner />
    </div>
  );
}
