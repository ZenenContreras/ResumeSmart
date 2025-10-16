import { SignUp } from '@clerk/nextjs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br  from-blue-50 to-purple-50 ">
      <Header />

      <div className="flex-1 flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-xl",
              }
            }}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
