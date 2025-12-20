import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { mockServices } from "@/lib/mock-data"
import { getServices } from "@/lib/services"
import { getGeneralInfos } from "@/lib/general_infos"

export default async function HomePage() {
  // En production, remplacer par: const services = await getServices()
  const services = await getServices()
  const generalInfos = await getGeneralInfos()
  console.log("generalInfos", generalInfos)
  return (
    <main>
      <Header generalInfos={generalInfos[0]} />
      <Hero generalInfos={generalInfos[0]} />
      <ServicesSection services={services} />
      <AboutSection generalInfos={generalInfos[0]} />
      <ContactSection generalInfos={generalInfos[0]} />
      <Footer generalInfos={generalInfos[0]} services={services} />
    </main>
  )
}
