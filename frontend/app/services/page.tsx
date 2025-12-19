import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceCard } from "@/components/service-card"
import { mockServices } from "@/lib/mock-data"

export const metadata = {
  title: "Nos Services | Super Flavio Plomberie",
  description: "Découvrez tous nos services : plomberie, rénovation, dépannage, chauffage et plus encore.",
}

export default function ServicesPage() {
  // En production: const services = await getServices()
  const services = mockServices

  return (
    <main>
      <Header />

      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Nos services</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground text-balance">
              Tous nos services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Super Flavio Plomberie vous accompagne dans tous vos projets de plomberie et rénovation avec expertise et
              professionnalisme.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
