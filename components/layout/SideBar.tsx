'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useUserPlan } from '@/lib/hooks/useUserPlan';
import { Loader2 } from 'lucide-react';

const SideBar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const { plan: userPlanData, loading: planLoading } = useUserPlan();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: 'Create Resume',
      href: '/dashboard/create',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      name: 'My Resumes',
      href: '/dashboard/resumes',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      name: 'Templates',
      href: '/dashboard/templates',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
        </svg>
      ),
    },
    {
      name: 'Plans',
      href: '/dashboard/upgrade',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  // Get plan data from hook
  const userPlan = userPlanData?.planName || 'Free';
  const creditsRemaining = userPlanData?.creditsRemaining || 0;
  const planType = userPlanData?.plan || 'free';

  const getPlanBadgeColor = () => {
    switch (planType) {
      case 'pro':
        return 'from-blue-50 to-blue-100 border-blue-200';
      case 'ultimate':
        return 'from-purple-50 to-pink-100 border-purple-200';
      default:
        return 'from-gray-50 to-gray-100 border-gray-200';
    }
  };

  return (
    <>
      {/* Desktop Sidebar - Hover Expandable */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col lg:pt-16 lg:z-50 group lg:items-center lg:justify-center">
        {/* Sidebar - Expands on hover */}
        <div className="w-20 group-hover:w-64 flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto transition-all duration-300 ease-in-out shadow-lg">
          <div className="flex flex-col flex-grow px-2 group-hover:px-4 justify-center ">
            {/* Navigation - Icons with expandable labels */}
            <nav className="flex-1 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group/item flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    title={item.name}
                  >
                    <span className={`flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover/item:text-gray-500'}`}>
                      {item.icon}
                    </span>
                    <span className="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Plan Badge & Credits - Expandable */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-4">
                {planLoading ? (
                  <div className="flex items-center justify-center p-3">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  </div>
                ) : (
                  <>
                    {/* Plan Badge */}
                    <div className={`flex items-center p-3 bg-gradient-to-r ${getPlanBadgeColor()} rounded-lg border overflow-hidden`}>
                      <svg className={`w-5 h-5  flex-shrink-0 ${userPlan === 'Pro' && 'text-blue-600'} ${userPlan === 'Ultimate' && 'text-purple-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-0 flex-1">
                        <p className="text-xs text-gray-600 whitespace-nowrap">Current Plan</p>
                        <p className={`text-sm font-bold whitespace-nowrap text-gray-600 ${userPlan === 'Ultimate' && 'text-purple-600'}`}>{userPlan}</p>
                      </div>
                      {planType !== 'ultimate' && (
                        <Link
                          href="/dashboard/upgrade"
                          className="ml-2 text-xs font-semibold text-blue-600 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                        >
                          {planType === 'free' || 'Pro' ? 'Upgrade' : 'Ultimate'}
                        </Link>
                      )}
                    </div>

                    {/* Credits */}
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg overflow-hidden">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-0 flex-1">
                        <p className="text-xs text-gray-600 whitespace-nowrap">
                          {planType === 'ultimate' ? 'Credits' : 'Remaining'}
                        </p>
                        <p className="text-sm font-bold text-gray-900 whitespace-nowrap">
                          {planType === 'ultimate' ? 'Unlimited' : creditsRemaining}
                        </p>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg overflow-hidden">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {user?.firstName?.charAt(0) || 'U'}
                      </div>
                      <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-0 flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-gray-900 truncate whitespace-nowrap">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-gray-500 truncate whitespace-nowrap">
                          {user?.primaryEmailAddress?.emailAddress}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden">
        <nav className="flex justify-around">
          {navigation.slice(0, 4).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center py-3 px-2 text-xs font-medium flex-1 ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {item.icon}
                <span className="mt-1">{item.name.split(' ')[0]}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default SideBar;
