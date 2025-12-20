"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import { GeneralInfos } from "@/lib/general_infos"



export function ContactSection({ generalInfos }: { generalInfos: GeneralInfos }) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const contactInfo = [
        {
            icon: Phone,
            label: "Téléphone",
            value: generalInfos.phone_number,
            href: `tel:${generalInfos.phone_number.replace(/\s/g, "")}`,
        },
        {
            icon: Mail,
            label: "Email",
            value: generalInfos.email,
            href: `mailto:${generalInfos.email}`,
        },
        {
            icon: MapPin,
            label: "Zone d'intervention",
            value: generalInfos.localisation,
        },
        {
            icon: Clock,
            label: "Disponibilité",
            value: "Lun-Sam: 8h-19h • Urgences 7j/7",
        },
    ]

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simuler l'envoi
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsSubmitting(false)
        alert("Merci pour votre message ! Nous vous recontacterons rapidement.")
    }

    return (
        <section id="contact" className="py-24 bg-muted/30">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center space-y-4 mb-16">
                    <span className="text-sm font-medium text-primary uppercase tracking-wider">Contact</span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground text-balance">
                        Parlons de votre projet
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Demandez votre devis gratuit ou contactez-nous pour toute question. Nous vous répondons sous 24h.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-4">
                            {contactInfo.map((item) => (
                                <Card key={item.label} className="border-border">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <item.icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-muted-foreground">{item.label}</div>
                                                {item.href ? (
                                                    <a
                                                        href={item.href}
                                                        className="font-medium text-foreground hover:text-primary transition-colors"
                                                    >
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <div className="font-medium text-foreground">{item.value}</div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Card className="border-primary bg-primary/5">
                            <CardContent className="p-6">
                                <h3 className="font-serif font-bold text-lg mb-2">Urgence plomberie ?</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Pour toute urgence (fuite d'eau, dégât des eaux...), appelez-nous directement. Nous intervenons 7j/7.
                                </p>
                                <Button asChild>
                                    <a href={`tel:${generalInfos.phone_number.replace(/\s/g, "")}`}>
                                        <Phone className="mr-2 h-4 w-4" />
                                        Appeler maintenant
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <Card className="border-border">
                        <CardContent className="p-6 sm:p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Prénom</Label>
                                        <Input id="firstName" placeholder="Votre prénom" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Nom</Label>
                                        <Input id="lastName" placeholder="Votre nom" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="votre@email.fr" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Téléphone</Label>
                                    <Input id="phone" type="tel" placeholder={generalInfos.phone_number} required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="service">Type de service</Label>
                                    <select
                                        id="service"
                                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                                        required
                                    >
                                        <option value="">Sélectionnez un service</option>
                                        <option value="plomberie">Plomberie</option>
                                        <option value="renovation">Rénovation</option>
                                        <option value="depannage">Dépannage urgent</option>
                                        <option value="chauffage">Chauffage</option>
                                        <option value="salle-de-bain">Salle de bain</option>
                                        <option value="autre">Autre</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Votre message</Label>
                                    <Textarea id="message" placeholder="Décrivez votre projet ou problème..." rows={4} required />
                                </div>

                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        "Envoi en cours..."
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Envoyer ma demande
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
