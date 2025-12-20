import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Clock, ThumbsUp, Phone } from "lucide-react"
import { GeneralInfos } from "@/lib/general_infos"
import { Icon } from '@iconify/react';
const features = [
    { icon: Shield, text: "Garantie décennale" },
    { icon: Clock, text: "Intervention rapide" },
    { icon: ThumbsUp, text: "Devis gratuit" },
]

export function Hero({ generalInfos }: { generalInfos: GeneralInfos }) {

    return (
        <section className="relative min-h-screen flex items-center">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/professional-plumber-working-on-pipes-in-modern-ba.jpg"
                    alt="Artisan plombier au travail"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
            </div>

            <div className="w-full px-6 py-32 lg:px-12 xl:px-20 lg:py-40">
                <div className="max-w-xl">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <span className="inline-block px-4 py-2 bg-primary/90 text-primary-foreground rounded-full text-sm font-medium">
                                Artisan de confiance depuis 2020
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight text-balance">
                                Votre artisan de confiance à votre service sur la Corrèze
                            </h1>
                            <p className="text-lg text-white/80 leading-relaxed">
                                Plomberie, rénovation, dépannage — On intervient rapidement pour tous vos travaux avec
                                professionnalisme et savoir-faire.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" asChild>
                                <Link href="#contact">
                                    Demander un devis
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
                                asChild
                            >
                                <Link href="/services">Nos services</Link>
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-6 pt-4">
                            {generalInfos.features.map((feature) => (
                                <div key={feature.id} className="flex items-center gap-2 text-sm text-white/90">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Icon icon={`material-symbols:${feature.icon}`} className="h-5 w-5 text-primary" />
                                    </div>
                                    <span>{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-white/20">
                            <p className="text-white/60 text-sm mb-2">Une urgence ?</p>
                            <a
                                href={`tel:${generalInfos.phone_number.replace(/\s/g, "")}`}
                                className="flex items-center gap-3 text-white hover:text-primary transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                    <Phone className="h-5 w-5 text-primary-foreground" />
                                </div>
                                <span className="text-2xl font-bold">{generalInfos.phone_number}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
