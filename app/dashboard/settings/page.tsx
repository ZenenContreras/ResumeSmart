'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { User, CreditCard, Bell, Shield, Loader2, Check, ExternalLink } from 'lucide-react';
import Link from 'next/link';

type TabType = 'profile' | 'billing' | 'preferences';

interface UserPlan {
  plan: 'free' | 'pro' | 'ultimate';
  creditsRemaining: number;
  creditsTotal: number;
  purchasedAt: string | null;
}

export default function SettingsPage() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
  const [planLoading, setPlanLoading] = useState(true);

  // Preferences state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [atsAlerts, setAtsAlerts] = useState(true);

  useEffect(() => {
    fetchUserPlan();
  }, []);

  const fetchUserPlan = async () => {
    try {
      setPlanLoading(true);
      const response = await fetch('/api/user/plan');
      if (response.ok) {
        const data = await response.json();
        setUserPlan({
          plan: data.plan,
          creditsRemaining: data.creditsRemaining,
          creditsTotal: data.creditsTotal,
          purchasedAt: data.purchasedAt,
        });
      }
    } catch (error) {
      console.error('Error fetching plan:', error);
    } finally {
      setPlanLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaved(true);
    setLoading(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const getPlanDisplayName = (plan: string) => {
    return plan.charAt(0).toUpperCase() + plan.slice(1);
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'pro':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'ultimate':
        return 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const tabs = [
    { id: 'profile' as TabType, name: 'Profile', icon: User },
    { id: 'billing' as TabType, name: 'Billing & Plan', icon: CreditCard },
    { id: 'preferences' as TabType, name: 'Preferences', icon: Bell },
  ];

  if (!isLoaded) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b mb-8">
        <div className="flex gap-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 px-2 border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 font-semibold'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white border rounded-xl p-6 md:p-8">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

            <div className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <img
                  src={user?.imageUrl}
                  alt={user?.fullName || 'User'}
                  className="w-20 h-20 rounded-full border-2 border-gray-200"
                />
                <div>
                  <div className="font-semibold text-lg">{user?.fullName}</div>
                  <div className="text-gray-600 text-sm">{user?.primaryEmailAddress?.emailAddress}</div>
                </div>
              </div>

              {/* Account Info (Read-only from Clerk) */}
              <div className="border-t pt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user?.fullName || ''}
                    disabled
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.primaryEmailAddress?.emailAddress || ''}
                    disabled
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-blue-900 font-medium mb-1">
                      Profile managed by Clerk
                    </p>
                    <p className="text-blue-800">
                      To update your profile information, visit your{' '}
                      <a
                        href={`${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}?redirect_url=${encodeURIComponent('/dashboard/settings')}`}
                        className="underline font-semibold"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Clerk account settings
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Stats */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Account Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Member Since</div>
                    <div className="font-semibold">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      }) : 'N/A'}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Last Sign In</div>
                    <div className="font-semibold">
                      {user?.lastSignInAt ? new Date(user.lastSignInAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      }) : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Billing & Plan</h2>

            {planLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Current Plan */}
                <div className="border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Current Plan</div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold border-2 ${
                            userPlan ? getPlanBadgeColor(userPlan.plan) : ''
                          }`}
                        >
                          {userPlan ? getPlanDisplayName(userPlan.plan) : 'Free'}
                        </span>
                      </div>
                    </div>
                    {userPlan?.plan === 'free' && (
                      <Link
                        href="/dashboard/upgrade"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                      >
                        Upgrade Plan
                      </Link>
                    )}
                  </div>

                  {/* Credits */}
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                      <div className="text-sm text-blue-800 mb-1">Credits Remaining</div>
                      <div className="text-3xl font-bold text-blue-900">
                        {userPlan?.creditsRemaining || 0}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">Total Credits</div>
                      <div className="text-3xl font-bold text-gray-900">
                        {userPlan?.creditsTotal || 0}
                      </div>
                    </div>
                  </div>

                  {/* Purchase Date (if applicable) */}
                  {userPlan?.purchasedAt && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        {userPlan.plan === 'ultimate' ? 'Active until' : 'Purchased on'}:{' '}
                        <span className="font-semibold text-gray-900">
                          {userPlan.plan === 'ultimate' && userPlan.purchasedAt
                            ? formatDate(
                                new Date(
                                  new Date(userPlan.purchasedAt).getTime() + 90 * 24 * 60 * 60 * 1000
                                ).toISOString()
                              )
                            : formatDate(userPlan.purchasedAt)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Plan Comparison */}
                <div className="border rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4">Available Plans</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-semibold">Free</div>
                        <div className="text-sm text-gray-600">1 Resume • Basic Features</div>
                      </div>
                      <div className="text-2xl font-bold">$0</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                      <div>
                        <div className="font-semibold text-blue-900">Pro</div>
                        <div className="text-sm text-blue-700">
                          10 Resumes • Cover Letters • All Templates
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-blue-900">$19</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
                      <div>
                        <div className="font-semibold text-purple-900">Ultimate</div>
                        <div className="text-sm text-purple-700">
                          Unlimited • 90 Days • Human Review
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-purple-900">$49</div>
                    </div>
                  </div>
                  {userPlan?.plan === 'free' && (
                    <div className="mt-4">
                      <Link
                        href="/dashboard/upgrade"
                        className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                      >
                        View All Plans
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Payment History (Placeholder) */}
                <div className="border rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4">Payment History</h3>
                  {userPlan?.purchasedAt ? (
                    <div className="border-b pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            {getPlanDisplayName(userPlan.plan)} Plan
                          </div>
                          <div className="text-sm text-gray-600">
                            {formatDate(userPlan.purchasedAt)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            ${userPlan.plan === 'pro' ? '19.00' : '49.00'}
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs text-green-600">
                            <Check className="w-3 h-3" />
                            Paid
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-4">
                      No payment history yet
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Preferences</h2>

            <div className="space-y-6">
              {/* Email Notifications */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <div className="font-medium">Resume Generation Complete</div>
                      <div className="text-sm text-gray-600">
                        Get notified when your resume is ready
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <div className="font-medium">ATS Score Alerts</div>
                      <div className="text-sm text-gray-600">
                        Receive alerts when your ATS score is low
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={atsAlerts}
                        onChange={(e) => setAtsAlerts(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <div className="font-medium">Marketing & Updates</div>
                      <div className="text-sm text-gray-600">
                        Receive tips, updates, and special offers
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marketingEmails}
                        onChange={(e) => setMarketingEmails(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Export Preferences */}
              <div className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Export Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Export Format
                    </label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="pdf">PDF (Recommended)</option>
                      <option value="docx" disabled>
                        DOCX (Coming Soon)
                      </option>
                      <option value="txt" disabled>
                        Plain Text (Coming Soon)
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-6 flex gap-4">
                <button
                  onClick={handleSavePreferences}
                  disabled={loading}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : saved ? (
                    <>
                      <Check className="w-5 h-5" />
                      Saved!
                    </>
                  ) : (
                    'Save Preferences'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
