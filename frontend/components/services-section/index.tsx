import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/service-card"
import { ArrowRight } from "lucide-react"
import type { Service } from "@/lib/services"

interface ServicesSectionProps {
    services: Service[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
    const featuredServices = services.filter((s) => s.is_featured).slice(0, 4)

    return (
        <section id="services" className="py-24 bg-muted/30">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center space-y-4 mb-16">
                    <span className="text-sm font-medium text-primary uppercase tracking-wider">Nos expertises</span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground text-balance">
                        Des services adaptés à vos besoins
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        De la plomberie à la rénovation complète, Super Flavio vous accompagne dans tous vos projets avec expertise
                        et professionnalisme.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredServices.map((service) => (
                        <ServiceCard key={service.id} service={service} variant="featured" />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/services">
                            Voir tous les services
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
