import Image from "next/image"
import { CheckCircle } from "lucide-react"
import { GeneralInfos } from "@/lib/general_infos"



export function AboutSection({ generalInfos }: { generalInfos: GeneralInfos }) {
    return (
        <section id="about" className="py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="relative">
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                            <Image src="/plumber-working-professional-artisan.jpg" alt="Super Flavio au travail" fill className="object-cover" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-lg">
                            <div className="text-4xl font-bold font-serif">{generalInfos.experience}</div>
                            <div className="text-sm opacity-90">Années d'expérience</div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-sm font-medium text-primary uppercase tracking-wider">À propos</span>
                            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground text-balance">
                                Un artisan passionné à votre service
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Flavien, c'est avant tout une histoire de passion pour le métier et de dévouement envers
                                ses clients. Depuis plus de 5 ans, je mets mon savoir-faire au service de votre confort.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Que ce soit pour une intervention d'urgence, une rénovation complète ou un simple dépannage, je m'engage
                                à vous fournir un travail de qualité, dans le respect des délais et de votre budget.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {generalInfos.features?.map((feature) => (
                                <div key={feature.id} className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                    <span className="text-sm text-foreground">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
