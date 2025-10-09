import Header from '@/components/layout/Header';
import Hero from '@/components/marketing/Hero';
import HowItWorks from '@/components/marketing/HowItWorks';
import PricingCards from '@/components/marketing/PricingCards';
import Footer from '@/components/layout/Footer';
import Testimonials from '@/components/marketing/Testimonials'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Header />
      <Hero />
      <Testimonials />
      <HowItWorks/>
      <PricingCards/>
      <Footer />
    </div>
  );
}