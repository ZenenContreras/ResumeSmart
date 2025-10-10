import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FAQ from '@/components/marketing/FAQ'

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
