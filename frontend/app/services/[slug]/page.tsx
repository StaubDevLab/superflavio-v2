import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockServices } from "@/lib/mock-data"
import { ArrowLeft, CheckCircle, Phone, ArrowRight } from "lucide-react"

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params
  // En production: const service = await getServiceBySlug(slug)
  const service = mockServices.find((s) => s.slug === slug)

  if (!service) {
    return { title: "Service non trouvé" }
  }

  return {
    title: `${service.title} | Super Flavio Plomberie`,
    description: service.short_description,
  }
}

export async function generateStaticParams() {
  // En production: const services = await getServices()
  return mockServices.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  // En production: const service = await getServiceBySlug(slug)
  const service = mockServices.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  const relatedServices = mockServices.filter((s) => s.slug !== slug && s.is_featured).slice(0, 3)

  return (
    <main>
      <Header />

      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="pl-0">
              <Link href="/services">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux services
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-muted">
              <Image
                src={`/.jpg?height=600&width=800&query=${encodeURIComponent(service.title + " artisan plomberie")}`}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Service
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground">
                  {service.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{service.description}</p>
              </div>

              {service.price_from && (
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground">À partir de</span>
                  <span className="text-3xl font-bold text-primary">{service.price_from}€</span>
                </div>
              )}

              {/* Features */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Ce service comprend :</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="#contact">Demander un devis</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+33600000000">
                    <Phone className="mr-2 h-4 w-4" />
                    Appeler
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <div className="mt-24">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold">Autres services</h2>
                <Button variant="ghost" asChild>
                  <Link href="/services">
                    Voir tout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedServices.map((related) => (
                  <Card key={related.id} className="group border-border hover:border-primary/50 transition-all">
                    <CardContent className="p-6">
                      <h3 className="font-serif font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{related.short_description}</p>
                      <Button variant="ghost" className="p-0 h-auto text-primary" asChild>
                        <Link href={`/services/${related.slug}`}>
                          En savoir plus
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
