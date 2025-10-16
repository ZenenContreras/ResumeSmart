import { ClerkLoaded, ClerkLoading, SignIn } from '@clerk/nextjs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Loader2 } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-1 flex-col items-center bg-gradient-to-br from-blue-50 to-purple-50 pt-16">
      <Header />
      <ClerkLoading>
          <Loader2 className="w-4 h-4 animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <div className="flex-1 flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <SignIn
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-xl",
                }
              }}
            />
          </div>
        </div>
      </ClerkLoaded>

      <Footer />
    </div>
  );
}
