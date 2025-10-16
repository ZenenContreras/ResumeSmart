import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TermsOfService from '@/components/marketing/TermsOfService'

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <TermsOfService />
      </main>
      <Footer />
    </>
  )
}
