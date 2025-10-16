'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Sparkles, Crown, Loader2 } from 'lucide-react';
import { useUserPlan } from '@/lib/hooks/useUserPlan';

function PlansPageContent() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const { plan: userPlanData, loading: planLoading } = useUserPlan();

  const currentPlan = userPlanData?.plan || 'free';

  const handleUpgrade = async (plan: 'pro' | 'ultimate') => {
    try {
      setLoading(plan);

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error upgrading:', error);
      alert('Failed to start checkout. Please try again.');
      setLoading(null);
    }
  };

  const getPlanButton = (plan: 'free' | 'pro' | 'ultimate') => {
    if (planLoading) {
      return (
        <button
          disabled
          className="w-full py-3 px-6 rounded-lg border border-gray-300 text-gray-400 cursor-not-allowed flex items-center justify-center"
        >
          <Loader2 className="w-4 h-4 animate-spin" />
        </button>
      );
    }

    if (currentPlan === plan) {
      return (
        <button
          disabled
          className="w-full py-3 px-6 rounded-lg border-2 border-green-600 bg-green-50 text-green-700 font-semibold cursor-default"
        >
          Current Plan
        </button>
      );
    }

    // Free plan - never show upgrade button
    if (plan === 'free') {
      return (
        <button
          disabled
          className="w-full py-3 px-6 rounded-lg border border-gray-300 text-gray-400 cursor-not-allowed"
        >
          Free Plan
        </button>
      );
    }

    // Pro plan button
    if (plan === 'pro') {
      // If user is already Ultimate, don't allow downgrade
      if (currentPlan === 'ultimate') {
        return (
          <button
            disabled
            className="w-full py-3 px-6 rounded-lg border border-gray-300 text-gray-400 cursor-not-allowed"
          >
            Not Available
          </button>
        );
      }

      return (
        <button
          onClick={() => handleUpgrade('pro')}
          disabled={loading !== null}
          className="w-full py-3 px-6 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading === 'pro' ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Loading...
            </span>
          ) : (
            'Upgrade to Pro'
          )}
        </button>
      );
    }

    // Ultimate plan button
    if (plan === 'ultimate') {
      return (
        <button
          onClick={() => handleUpgrade('ultimate')}
          disabled={loading !== null}
          className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading === 'ultimate' ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Loading...
            </span>
          ) : (
            'Upgrade to Ultimate'
          )}
        </button>
      );
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-gray-600 text-lg">
          Select the perfect plan for your resume needs
        </p>
        {!planLoading && currentPlan && (
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
            <span className="font-medium">Your current plan: </span>
            <span className="ml-2 font-bold capitalize">{currentPlan}</span>
          </div>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Free Plan */}
        <div className={`border rounded-2xl p-8 bg-white shadow-sm ${currentPlan === 'free' ? 'border-2 border-green-600' : ''}`}>
          {currentPlan === 'free' && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Active
            </div>
          )}
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">$0</span>
            </div>
            <p className="text-gray-600 mt-2">Get started with basics</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>1 Resume Generation</span>
            </li>
            <li className="flex gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>ATS Score Analysis</span>
            </li>
            <li className="flex gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>3 Templates</span>
            </li>
            <li className="flex gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>PDF Export</span>
            </li>
          </ul>

          {getPlanButton('free')}
        </div>

        {/* Pro Plan */}
        <div className={`border-2 rounded-2xl p-8 bg-white shadow-lg relative ${currentPlan === 'pro' ? 'border-green-600' : 'border-blue-600'}`}>
          {currentPlan === 'pro' ? (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Active
            </div>
          ) : (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              Most Popular
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">$19</span>
              <span className="text-gray-600">one-time</span>
            </div>
            <p className="text-gray-600 mt-2">Perfect for active job seekers</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="font-semibold">10 Resume Generations</span>
            </li>
            <li className="flex gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>10 Cover Letters</span>
            </li>
            <li className="flex gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>All Templates</span>
            </li>
            <li className="flex gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Advanced ATS Insights</span>
            </li>
            <li className="flex gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>AI Optimization</span>
            </li>
            <li className="flex gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Multiple Export Formats</span>
            </li>
          </ul>

          {getPlanButton('pro')}
        </div>

        {/* Ultimate Plan */}
        <div className={`border-2 rounded-2xl p-8 bg-gradient-to-br from-purple-50 to-white shadow-lg relative ${currentPlan === 'ultimate' ? 'border-green-600' : 'border-purple-600'}`}>
          {currentPlan === 'ultimate' ? (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Active
            </div>
          ) : (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <Crown className="w-4 h-4" />
              Best Value
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ultimate
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">$49</span>
              <span className="text-gray-600">90 days</span>
            </div>
            <p className="text-gray-600 mt-2">Unlimited power for 3 months</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex gap-3">
              <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <span className="font-semibold">Unlimited Resumes</span>
            </li>
            <li className="flex gap-3">
              <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <span className="font-semibold">Unlimited Cover Letters</span>
            </li>
            <li className="flex gap-3">
              <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <span>All Pro Features</span>
            </li>
            <li className="flex gap-3">
              <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <span>Human Review by Experts</span>
            </li>
            <li className="flex gap-3">
              <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <span>Priority Support</span>
            </li>
            <li className="flex gap-3">
              <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <span>LinkedIn Profile Optimization</span>
            </li>
          </ul>

          {getPlanButton('ultimate')}
        </div>
      </div>
    </div>
  );
}

export default function PlansPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Loading plans...</h2>
        </div>
      </div>
    }>
      <PlansPageContent />
    </Suspense>
  );
}
