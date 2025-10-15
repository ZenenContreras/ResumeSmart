import Header from '@/components/layout/Header';
import Hero from '@/components/marketing/Hero';
import HowItWorks from '@/components/marketing/HowItWorks';
import PricingCards from '@/components/marketing/PricingCards';
import Footer from '@/components/layout/Footer';
import WhyYoursDontWork from '@/components/marketing/WhyYoursDontWork';
import Testimonials from '@/components/marketing/Testimonials';
import { ClerkProvider } from '@clerk/nextjs';

export default function Home() {
  return (
    <ClerkProvider>
      <div className="relative min-h-screen bg-white overflow-hidden">
        <Header />
        <Hero />
        <Testimonials />
        <WhyYoursDontWork />
        <HowItWorks/>
        <PricingCards/>
        <Footer />
      </div>
    </ClerkProvider>
  );
}