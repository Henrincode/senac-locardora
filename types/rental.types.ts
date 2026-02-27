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

export type RentalErrors = {
    [K in keyof Rental]?: boolean
}

export type RentalReturn<T> =
    | { success: true; data: T; message?: string }
    | { success: false; data?: never; message: string; errors?: RentalErrors };