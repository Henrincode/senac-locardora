'use server'

import { Client, ClientErrors, ClientReturn } from "@/types/client.types";
import clientService from "../services/client.service";
import { updateTag } from "next/cache";

// find client
export async function findClient(): Promise<ClientReturn<Client[]>> {
    try {
        const data = await clientService.find()
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION findClient', error)
        return { success: false, message: 'Erro interno do servidor' }
    }
}

// find client by id
export async function findClientById(id: number): Promise<ClientReturn<Client>> {
    if (!id) return { success: false, message: 'Não foi passado nenhum pârametro' }
    if (typeof id === 'undefined') return { success: false, message: 'Parametro ID faltando' }
    if (isNaN(id) || id === null) return { success: false, message: 'Parametro id deve ser do um número' }

    id = Number(id)

    try {
        const data = await clientService.findById(id)
        if (!data) return { success: false, message: 'Categoria não existe' }
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION findClientById', error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}

// create client
export async function createClient(params: Client & { name: string, email: string }): Promise<ClientReturn<Client | null>> {
    if (!params) return { success: false, message: 'Não foi passado nenhum pârametro' }
    const name = params.name?.toString().trim()
    const email = params.email?.toString().trim()

    const errors: ClientErrors = {}

    if (!name) errors.name = true
    if (!email) errors.email = true

    if (Object.keys(errors).length > 0) return { success: false, errors, message: 'Campos inválidos' }

    try {
        params = {
            name, email
        }
        const data = await clientService.create(params)
        updateTag('clients')
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION createClient', error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}

// update client
export async function updateClient(params: Client & { id_client: number, name: string, email: string }): Promise<ClientReturn<Client | null>> {
    if (!params) return { success: false, message: 'Não foi passado nenhum pârametro' }
    const id_client = params.id_client
    const name = params.name?.toString().trim()
    const email = params.email?.toString().trim()

    const errors: ClientErrors = {}

    if (!id_client || isNaN(id_client)) errors.id_client = true
    if (!name) errors.name = true
    if (!email) errors.email = true

    if (Object.keys(errors).length > 0) return { success: false, errors, message: 'Campos inválidos' }

    try {
        params = {
            id_client, name, email
        }
        const data = await clientService.update(params)
        updateTag('clients')
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION updateClient', error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}

// delete client
export async function deleteClient(id: number): Promise<ClientReturn<Client | null>> {
    if (!id) return { success: false, message: 'Parametro ID faltando' }
    if (isNaN(id)) return { success: false, message: 'Parametro id deve ser do tipo' }

    try {
        const data = await clientService.delete(id)
        updateTag('clients')
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION deleteClient', error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}