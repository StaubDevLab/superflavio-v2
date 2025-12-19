// Configuration Directus API
const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055"

// Types pour les services Directus
export interface Service {
    id: string
    slug: string
    title: string
    description: string
    short_description: string
    icon: string
    image: string | null
    features: string[]
    price_from: number | null
    duration_estimate: string | null // ex: "1-2 heures"
    warranty: string | null // ex: "Garantie 2 ans"
    areas_served: string[] // zones d'intervention
    certifications: string[] // certifications/qualifications
    faq: { question: string; answer: string }[] // FAQ du service
    gallery: string[] // galerie d'images
    is_featured: boolean
    is_emergency: boolean // service d'urgence
    sort: number
    status: "published" | "draft" | "archived"
    date_created: string
    date_updated: string
}

export interface ServiceResponse {
    data: Service[]
}

export interface SingleServiceResponse {
    data: Service
}

// Client Directus
export async function getServices(): Promise<Service[]> {
    try {
        const res = await fetch(`${DIRECTUS_URL}/items/services?filter[status][_eq]=published&sort=sort`, {
            next: { revalidate: 60 }, // Cache pendant 60 secondes
        })

        if (!res.ok) {
            throw new Error("Failed to fetch services")
        }

        const data: ServiceResponse = await res.json()
        return data.data
    } catch (error) {
        console.error("Error fetching services:", error)
        return []
    }
}

export async function getFeaturedServices(): Promise<Service[]> {
    try {
        const res = await fetch(
            `${DIRECTUS_URL}/items/services?filter[status][_eq]=published&filter[is_featured][_eq]=true&sort=sort&limit=6`,
            {
                next: { revalidate: 60 },
            },
        )

        if (!res.ok) {
            throw new Error("Failed to fetch featured services")
        }

        const data: ServiceResponse = await res.json()
        return data.data
    } catch (error) {
        console.error("Error fetching featured services:", error)
        return []
    }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
    try {
        const res = await fetch(
            `${DIRECTUS_URL}/items/services?filter[slug][_eq]=${slug}&filter[status][_eq]=published&limit=1`,
            {
                next: { revalidate: 60 },
            },
        )

        if (!res.ok) {
            throw new Error("Failed to fetch service")
        }

        const data: ServiceResponse = await res.json()
        return data.data[0] || null
    } catch (error) {
        console.error("Error fetching service:", error)
        return null
    }
}

export function getDirectusImageUrl(imageId: string | null): string {
    if (!imageId) return "/service-artisan.jpg"
    return `${DIRECTUS_URL}/assets/${imageId}`
}
