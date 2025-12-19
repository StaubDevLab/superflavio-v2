import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { mockServices } from "@/lib/mock-data"

export default function HomePage() {
  // En production, remplacer par: const services = await getServices()
  const services = mockServices

  return (
    <main>
      <Header />
      <Hero />
      <ServicesSection services={services} />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
