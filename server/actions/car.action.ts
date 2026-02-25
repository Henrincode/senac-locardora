'use server'

import { CarModelErrors, CarModel, CarModelReturn } from "@/types/car.types";
import carService from "../services/car.service";
import { updateTag } from "next/cache";

// findModel
export async function findCarModel(): Promise<CarModelReturn<CarModel[]>> {
    try {
        const data = await carService.findModels()
        return { success: true, data }
    } catch (error) {
        console.error('ERROR findCarModel', error)
        return { success: false }
    }
}

// createModel
export async function createCarModel(
    params: CarModel & { name: string }
): Promise<CarModelReturn<CarModel>> {
    if (!params) return { success: false, message: 'Não foi passado nenhum pârametro' }
    const id_car_category_fk = params.id_car_category_fk
    const id_car_brand_fk = params.id_car_brand_fk
    const name = params.name?.toString().trim()
    const image_url = params.image_url?.toString().trim() || null
    const details = params.details?.toString().trim() || null

    const errors: CarModelErrors = {}

    if (!id_car_category_fk || isNaN(id_car_category_fk)) errors.id_car_category_fk = true
    if (!id_car_brand_fk || isNaN(id_car_brand_fk)) errors.id_car_brand_fk = true
    if (!name) errors.name = true

    if (Object.keys(errors).length > 0) return { success: false, errors }

    try {
        params = {
            id_car_category_fk, id_car_brand_fk, name, image_url, details
        }

        const data = await carService.createModel(params)
        updateTag('cars')
        return { success: true, data }
    } catch (error) {
        console.error('ERROR createCarModel', error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}

// updateModel

// deleteModel
export async function deleteCarModel(id: number): Promise<CarModelReturn<CarModel>> {
    if (!id || isNaN(id)) return { success: false, message: 'ID não informado' }
    try {
        const data = await carService.deleteModel(id)
        updateTag('cars')
        return { success: true, data }
    } catch (error) {
        console.error(error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}