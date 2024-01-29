

export const metadata = {
  title: 'Home - Simple',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import FeaturesBlocks from '@/components/features-blocks'
import ContactForm from '@/components/contactForm'
export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
        <FeaturesBlocks />
        {/*<Testimonials />*/}
      <ContactForm />
    </main>
  )
}
