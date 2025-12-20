import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import { GeneralInfos } from "@/lib/general_infos"
import { Service } from "@/lib/services"

const navigation = {
    services: [
        { name: "Plomberie", href: "/services/plomberie" },
        { name: "Rénovation", href: "/services/renovation" },
        { name: "Dépannage", href: "/services/depannage" },
        { name: "Chauffage", href: "/services/chauffage" },
    ],
    company: [
        { name: "À propos", href: "#about" },
        { name: "Nos services", href: "/services" },
        { name: "Contact", href: "#contact" },
    ],
}

export function Footer({ generalInfos, services }: { generalInfos: GeneralInfos, services: Service[] }) {
    return (
        <footer className="bg-foreground text-background">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src="/images/logo.webp"
                                alt="Super Flavio Plomberie"
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <span className="font-serif text-xl font-bold">Super Flavio</span>
                        </Link>
                        <p className="text-sm text-background/70 leading-relaxed">
                            Votre artisan plombier de confiance pour tous vos travaux de plomberie, rénovation et dépannage.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-semibold mb-4">Services</h3>
                        <ul className="space-y-3">
                            {services.map((item) => (
                                <li key={item.id}>
                                    <Link href={`/services/${item.slug}`} className="text-sm text-background/70 hover:text-background transition-colors">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold mb-4">Navigation</h3>
                        <ul className="space-y-3">
                            {navigation.company.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-sm text-background/70 hover:text-background transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href={`tel:${generalInfos.phone_number.replace(/\s/g, "")}`}
                                    className="flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors"
                                >
                                    <Phone className="h-4 w-4" />
                                    {generalInfos.phone_number}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${generalInfos.email}`}
                                    className="flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors"
                                >
                                    <Mail className="h-4 w-4" />
                                    {generalInfos.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-background/70">
                                <MapPin className="h-4 w-4 mt-0.5" />
                                <span>{generalInfos.localisation}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-background/50">
                        © {new Date().getFullYear()} Super Flavio Plomberie. Tous droits réservés.
                    </p>
                    <p className="text-sm text-background/50">SIRET: 000 000 000 00000</p>
                </div>
            </div>
        </footer>
    )
}
