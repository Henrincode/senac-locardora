// ------------------|
// ------------------| Car
// ------------------|

export type Car = {
    id_car?: number | string
    id_car_model_fk?: number | string
    id_car_color_fk?: number | string
    id_car_status_fk?: number | string
    plate?: string
    year_manufacture?: number
    year_model?: number
    created_at?: number
    deleted_at?: number

    category?: string
    brand?: string
    color?: string
    color_hex?: string
    status?: string
}

export type CarErrors = {
    [K in keyof Omit<Car, 'category' | 'brand' | 'color' | 'color_hex' | 'status'>]?: boolean
}

export type CarReturn<T> =
    | { success: true; data: T; message?: string }
    | { success: false; data?: never; message: string; errors?: CarErrors };

// ------------------|
// ------------------| Model
// ------------------|

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

export type CarModelReturn<T> =
    | { success: true; data: T; message?: string }
    | { success: false; data?: never; message: string; errors?: CarModelErrors };

// ------------------|
// ------------------| Category
// ------------------|

export interface CarCategory {
    id_car_category?: number
    name?: string
    price?: number
    description?: string
    created_at?: Date
    deleted_at?: Date
}

export type CarCategoryErrors = {
    [K in keyof CarCategory]?: boolean
}

export type CarCategoryReturn<T> =
    | { success: true; data: T; message?: string }
    | { success: false; data?: never; message: string; errors?: CarCategoryErrors };

// ------------------|
// ------------------| brand
// ------------------|

export interface CarBrand {
    id_car_brand?: number
    name?: string
    image_url?: string
    created_at?: Date
    deleted_at?: Date
}

export type CarBrandErrors = {
    [K in keyof CarBrand]?: boolean
}

export type CarBrandReturn<T> =
    | { success: true; data: T; message?: string }
    | { success: false; data?: never; message: string; errors?: CarBrandErrors };