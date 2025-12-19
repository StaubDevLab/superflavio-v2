import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Droplets, Hammer, Wrench, Flame, Bath, CookingPot, Clock, CheckCircle2 } from "lucide-react"
import type { Service } from "@/lib/directus"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    droplets: Droplets,
    hammer: Hammer,
    wrench: Wrench,
    flame: Flame,
    bath: Bath,
    "cooking-pot": CookingPot,
}

interface ServiceCardProps {
    service: Service
    variant?: "default" | "featured"
}

export function ServiceCard({ service, variant = "default" }: ServiceCardProps) {
    const Icon = iconMap[service.icon] || Wrench

    if (variant === "featured") {
        return (
            <Card className="group relative overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl h-full flex flex-col p-0">
                <div className="relative h-56 w-full overflow-hidden">
                    <Image
                        src={service.image || "/placeholder.svg?height=224&width=400&query=artisan service"}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    {service.price_from && (
                        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                            À partir de {service.price_from}€
                        </Badge>
                    )}
                    <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 rounded-xl bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                            <Icon className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                </div>

                <CardContent className="flex-1 flex flex-col p-6">
                    <div className="flex-1 space-y-4">
                        <div>
                            <h3 className="text-xl font-serif font-semibold mb-2">{service.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{service.short_description}</p>
                        </div>

                        {service.features && service.features.length > 0 && (
                            <ul className="space-y-2">
                                {service.features.slice(0, 3).map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {service.slug === "depannage" && (
                            <div className="flex items-center gap-2 text-sm text-primary font-medium">
                                <Clock className="h-4 w-4" />
                                <span>Intervention sous 2h</span>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 mt-4 border-t border-border">
                        <Button variant="outline" className="group/btn bg-transparent" asChild>
                            <Link href={`/services/${service.slug}`}>
                                En savoir plus
                                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Link href={`/services/${service.slug}`} className="block group h-full">
            <Card className="h-full border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl overflow-hidden flex flex-col p-0">
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        src={service.image || "/placeholder.svg?height=192&width=400&query=artisan service"}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                        <div className="w-10 h-10 rounded-lg bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                            <Icon className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                    {service.price_from && (
                        <Badge variant="secondary" className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm">
                            Dès {service.price_from}€
                        </Badge>
                    )}
                </div>

                <CardContent className="flex-1 flex flex-col p-5">
                    <h3 className="text-lg font-serif font-semibold mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{service.short_description}</p>

                    {service.features && service.features.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {service.features.slice(0, 2).map((feature) => (
                                <Badge key={feature} variant="outline" className="text-xs font-normal">
                                    {feature}
                                </Badge>
                            ))}
                            {service.features.length > 2 && (
                                <Badge variant="outline" className="text-xs font-normal">
                                    +{service.features.length - 2}
                                </Badge>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    )
}
