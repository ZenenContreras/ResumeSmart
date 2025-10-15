'use client';

import { useEffect, useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

interface UserPlan {
  plan: string;
  creditsRemaining: number;
  creditsTotal: number;
  expiresAt?: string | null;
  daysRemaining?: number | null;
  expired?: boolean;
}

export function CreditsDisplay() {
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserPlan();
  }, []);

  const fetchUserPlan = async () => {
    try {
      const response = await fetch('/api/user/plan');
      if (response.ok) {
        const data = await response.json();
        setUserPlan(data);
      }
    } catch (error) {
      console.error('Error fetching user plan:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !userPlan) {
    return null;
  }

  const { plan, creditsRemaining, creditsTotal, daysRemaining, expired } = userPlan;

  // Color based on plan
  const getPlanColor = () => {
    if (plan === 'ultimate') return { bg: 'bg-gradient-to-r from-purple-600 to-pink-600', text: 'text-white' };
    if (plan === 'pro') return { bg: 'bg-gradient-to-r from-blue-600 to-cyan-600', text: 'text-white' };
    return { bg: 'bg-gray-100', text: 'text-gray-700' };
  };

  // Get status icon and color based on credits
  const getCreditsStatus = () => {
    if (plan === 'ultimate') {
      return { icon: <Sparkles className="h-4 w-4" />, color: 'text-purple-600', status: 'Unlimited' };
    }

    const percentage = (creditsRemaining / creditsTotal) * 100;

    if (percentage === 0) {
      return { icon: <Zap className="h-4 w-4" />, color: 'text-red-600', status: 'Empty' };
    } else if (percentage < 30) {
      return { icon: <Zap className="h-4 w-4" />, color: 'text-orange-600', status: 'Low' };
    } else {
      return { icon: <Zap className="h-4 w-4" />, color: 'text-green-600', status: 'Good' };
    }
  };

  const colors = getPlanColor();
  const status = getCreditsStatus();

  return (
    <Link
      href={plan === 'free' && creditsRemaining === 0 ? '/dashboard/upgrade' : '/dashboard'}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${colors.bg} ${colors.text} hover:opacity-90 transition-opacity`}
    >
      {/* Icon */}
      <div className={plan === 'free' ? status.color : ''}>
        {status.icon}
      </div>

      {/* Credits Info */}
      <div className="flex items-center gap-1.5">
        {plan === 'ultimate' ? (
          <>
            <span className="font-bold text-sm">Unlimited</span>
            <span className="text-xs hidden sm:inline">
              {daysRemaining !== null && daysRemaining !== undefined && daysRemaining > 0
                ? `${daysRemaining}d left`
                : 'Unlimited'}
            </span>
          </>
        ) : (
          <>
            <span className="font-bold text-sm">
              {creditsRemaining}
            </span>
            <span className="text-xs hidden sm:inline">
              / {creditsTotal} {creditsRemaining === 1 ? 'CV' : 'CVs'}
            </span>
          </>
        )}
      </div>

      {/* Plan Badge */}
      <div className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
        plan === 'ultimate' ? 'bg-white/20' :
        plan === 'pro' ? 'bg-white/20' :
        'bg-gray-200'
      }`}>
        {plan.toUpperCase()}
      </div>

      {/* Upgrade prompt if out of credits */}
      {plan === 'free' && creditsRemaining === 0 && (
        <span className="hidden md:inline text-xs font-medium animate-pulse">
          → Upgrade
        </span>
      )}
    </Link>
  );
}
