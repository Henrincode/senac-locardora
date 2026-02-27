export type Rental = {
    id_rental?: number
    id_rental_status_fk?: number
    id_client_fk?: number
    id_car_fk?: number
    pickup_date?: Date
    return_date?: Date
    total_price?: number
    notes?: string
    created_at?: Date
    deleted_at?: Date
}

export type RentalDB = {
    id_rental: number | string
    id_rental_status_fk: number
    id_client_fk: number
    id_car_fk: number
    pickup_date: Date
    return_date: Date
    total_price: number
    notes: string
    created_at: Date
    deleted_at: Date

    rental_status_name: string
    rental_status_color: string

    client_name: string
    client_email: string

    car_plate: string
    car_year_manufacture: number
    car_year_model: number

    car_model_name: string
    car_model_image_url: string

    car_brand_name: string
    car_brand_image_url: string

    car_category_name: string
    car_category_price: number

    car_color_name: string
    car_color_hex: string

    car_status_name: string
    car_status_block: boolean
    car_status_color_hex: string
}

export type RentalErrors = {
    [K in keyof Rental]?: boolean
}

export type RentalReturn<T> =
    | { success: true; data: T; message?: string }
    | { success: false; data?: never; message: string; errors?: RentalErrors };