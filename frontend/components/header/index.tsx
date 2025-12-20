"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createPortal } from "react-dom"
import { GeneralInfos } from "@/lib/general_infos"

const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/services" },
    { name: "À propos", href: "#about" },
    { name: "Contact", href: "#contact" },
]

function MobileMenu({
    generalInfos,
    isOpen,
    onClose,
}: {
    generalInfos: GeneralInfos
    isOpen: boolean
    onClose: () => void
}) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    if (!mounted || !isOpen) return null

    return createPortal(
        <div className="lg:hidden fixed inset-0 z-[9999]">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            {/* Menu panel */}
            <div className="fixed inset-y-0 right-0 w-full sm:max-w-sm overflow-y-auto bg-background px-6 py-6 border-l border-border shadow-2xl">
                <div className="flex items-center justify-between">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3" onClick={onClose}>
                        <Image
                            src="/images/logo.webp"
                            alt="Super Flavio Plomberie"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <span className="font-serif text-lg font-bold text-foreground">Super Flavio</span>
                    </Link>
                    <button
                        type="button"
                        className="-m-2.5 rounded-md p-2.5 text-foreground hover:bg-muted transition-colors"
                        onClick={onClose}
                    >
                        <span className="sr-only">Fermer le menu</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-border">
                        <div className="space-y-2 py-6">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={onClose}
                                    className="-mx-3 block rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="py-6 space-y-4">
                            <a href={`tel:${generalInfos.phone_number.replace(/\s/g, "")}`} className="flex items-center gap-2 text-base font-medium text-foreground">
                                <Phone className="h-5 w-5 text-primary" />
                                {generalInfos.phone_number}
                            </a>
                            <Button asChild className="w-full">
                                <Link href="#contact" onClick={onClose}>
                                    Devis gratuit
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    )
}

export function Header({ generalInfos }: { generalInfos: GeneralInfos }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    const isHomePage = pathname === "/"
    const showTransparent = isHomePage && !scrolled

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    showTransparent
                        ? "bg-transparent border-b border-transparent"
                        : "bg-background/95 backdrop-blur-md border-b border-border shadow-sm",
                )}
            >
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
                            <Image
                                src="/images/logo.webp"
                                alt="Super Flavio Plomberie"
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <span
                                className={cn(
                                    "font-serif text-xl font-bold hidden sm:block transition-colors",
                                    showTransparent ? "text-white" : "text-foreground",
                                )}
                            >
                                Super Flavio
                            </span>
                        </Link>
                    </div>

                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className={cn(
                                "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors",
                                showTransparent ? "text-white" : "text-foreground",
                            )}
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Ouvrir le menu</span>
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:gap-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors",
                                    showTransparent ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground",
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
                        <a
                            href={`tel:${generalInfos.phone_number.replace(/\s/g, "")}`}
                            className={cn(
                                "flex items-center gap-2 text-sm font-medium transition-colors",
                                showTransparent ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            <Phone className="h-4 w-4" />
                            {generalInfos.phone_number}
                        </a>
                        <Button asChild>
                            <Link href="#contact">Devis gratuit</Link>
                        </Button>
                    </div>
                </nav>
            </header>

            <MobileMenu generalInfos={generalInfos} isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        </>
    )
}
