'use server'

import { updateTag } from "next/cache";
import { Rental, RentalErrors, RentalReturn } from "@/types/rental.types";
import rentalService from "../services/rental.service";

// find rental
export async function findRental(): Promise<RentalReturn<Rental[]>> {
    try {
        const data = await rentalService.find()
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION findRental', error)
        return { success: false, message: 'Erro interno do servidor' }
    }
}

// find rental by id
export async function findRentalById(id: number): Promise<RentalReturn<Rental>> {
    if (!id) return { success: false, message: 'Não foi passado nenhum pârametro' }
    if (typeof id === 'undefined') return { success: false, message: 'Parametro ID faltando' }
    if (isNaN(id) || id === null) return { success: false, message: 'Parametro id deve ser do um número' }

    id = Number(id)

    try {
        const data = await rentalService.findById(id)
        if (!data) return { success: false, message: 'Categoria não existe' }
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION findRentalById', error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}

// create rental
export async function createClient(params: Rental & {
    id_client_fk: number, id_car_fk: number, id_rental_status_fk: number,
    pickup_date: Date, return_date: Date | null, total_price: number
}): Promise<RentalReturn<Rental>> {

    if (!params) return { success: false, message: 'Não foi passado nenhum pârametro' }
    const id_client_fk = params.id_client_fk
    const id_car_fk = params.id_car_fk
    const id_rental_status_fk = params.id_rental_status_fk
    const pickup_date = params.pickup_date?.toString().trim()
    const return_date = params.return_date?.toString().trim()
    const total_price = params.total_price

    const errors: RentalErrors = {}

    if (!id_client_fk || isNaN(id_client_fk)) errors.id_client_fk = true
    if (!id_car_fk || isNaN(id_car_fk)) errors.id_car_fk = true
    if (!id_rental_status_fk || isNaN(id_rental_status_fk)) errors.id_rental_status_fk = true
    if (!pickup_date || isNaN(new Date(pickup_date).getTime())) errors.pickup_date = true
    if (!return_date || isNaN(new Date(return_date).getTime())) errors.return_date = true
    if (!total_price || isNaN(total_price)) errors.total_price = true

    if (Object.keys(errors).length > 0) return { success: false, errors, message: 'Campos inválidos' }

    try {
        params = {
            id_client_fk, id_car_fk, id_rental_status_fk,
            pickup_date: new Date(pickup_date), return_date: new Date(return_date), total_price
        }
        const data = await rentalService.create(params)
        updateTag('rentals')
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION createRental', error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}

// update rental
export async function updateRental(params: Rental & {
    id_rental: number, id_client_fk: number, id_car_fk: number,id_rental_status_fk: number,
    pickup_date: Date, return_date: Date | null, total_price: number
}): Promise<RentalReturn<Rental>> {

    if (!params) return { success: false, message: 'Não foi passado nenhum pârametro' }
    const id_rental = params.id_rental
    const id_client_fk = params.id_client_fk
    const id_car_fk = params.id_car_fk
    const id_rental_status_fk = params.id_rental_status_fk
    const pickup_date = params.pickup_date?.toString().trim()
    const return_date = params.return_date?.toString().trim()
    const total_price = params.total_price

    const errors: RentalErrors = {}

    if (!id_rental || isNaN(id_rental)) errors.id_rental = true
    if (!id_client_fk || isNaN(id_client_fk)) errors.id_client_fk = true
    if (!id_car_fk || isNaN(id_car_fk)) errors.id_car_fk = true
    if (!id_rental_status_fk || isNaN(id_rental_status_fk)) errors.id_rental_status_fk = true
    if (!pickup_date || isNaN(new Date(pickup_date).getTime())) errors.pickup_date = true
    if (!return_date || isNaN(new Date(return_date).getTime())) errors.return_date = true
    if (!total_price || isNaN(total_price)) errors.total_price = true

    if (Object.keys(errors).length > 0) return { success: false, errors, message: 'Campos inválidos' }

    try {
        params = {
            id_rental, id_client_fk, id_car_fk, id_rental_status_fk,
            pickup_date: new Date(pickup_date), return_date: new Date(return_date), total_price
        }
        const data = await rentalService.update(params)
        updateTag('rentals')
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION updateRental', error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}

// delete rental
export async function deleteRental(id: number): Promise<RentalReturn<Rental>> {
    if (!id) return { success: false, message: 'Parametro ID faltando' }
    if (isNaN(id)) return { success: false, message: 'Parametro id deve ser do tipo' }

    try {
        const data = await rentalService.delete(id)
        updateTag('rentals')
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION deleteRental', error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}