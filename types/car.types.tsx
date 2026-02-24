export interface CarModel {
    id_car_model?: number | undefined
    id_car_brand_fk?: number | undefined
    id_car_category_fk?: number | undefined
    name?: string | undefined
    category?: string | undefined
    brand?: string | undefined
    details?: string | undefined
    image_url?: string | undefined
    created_at?: Date | undefined
    deleted_at?: Date | undefined
}

export interface CarsReturn {
    // ...
}