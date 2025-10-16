import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PrivacyPolicy from '@/components/marketing/PrivacyPolicy'

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <PrivacyPolicy />
      </main>
      <Footer />
    </>
  )
}
