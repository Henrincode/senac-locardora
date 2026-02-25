export interface CarModel {
    id_car_model?: number
    id_car_brand_fk?: number
    id_car_category_fk?: number
    name?: string
    category?: string | null
    brand?: string | null
    details?: string | null
    image_url?: string | null
    created_at?: Date | null
    deleted_at?: Date | null
}

export type CarModelErrors = {
    [K in keyof Omit<CarModel, 'category' | 'brand'>]?: boolean
}

export interface CarModelReturn<T> {
    data?: T
    success: boolean
    message?: string
    errors?: CarModelErrors
}