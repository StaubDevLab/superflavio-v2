const DIRECTUS_URL_SERVER = "http://directus:8055"
const DIRECTUS_URL_CLIENT = "http://superflavio-api.local"

export interface Feature {
    id: string
    text: string
    icon: string
}

export interface GeneralInfos {
    id: string
    phone_number: string
    email: string
    localisation: string
    sort: number
    features: Feature[]
    experience: number
    status: "published" | "draft" | "archived"
    date_created: string
    date_updated: string
}

export interface GeneralInfosResponse {
    data: GeneralInfos[]
}

export interface SingleGeneralInfosResponse {
    data: GeneralInfos
}

// Client Directus
export async function getGeneralInfos(): Promise<GeneralInfos[]> {
    try {
        const res = await fetch(`${DIRECTUS_URL_SERVER}/items/general_infos?fields=*,features.features_id.*`, {
            next: { revalidate: 60 }, // Cache pendant 60 secondes
        })

        if (!res.ok) {
            throw new Error("Failed to fetch services")
        }

        const data: GeneralInfosResponse = await res.json()
        return data.data
    } catch (error) {
        console.error("Error fetching services:", error)
        return []
    }
}

export async function getFeaturedServices(): Promise<GeneralInfos[]> {
    try {
        const res = await fetch(
            `${DIRECTUS_URL_SERVER}/items/general_infos?filter[status][_eq]=published&filter[is_featured][_eq]=true&sort=sort&limit=6`,
            {
                next: { revalidate: 60 },
            },
        )

        if (!res.ok) {
            throw new Error("Failed to fetch featured services")
        }

        const data: GeneralInfosResponse = await res.json()
        return data.data
    } catch (error) {
        console.error("Error fetching featured services:", error)
        return []
    }
}



