import { Rental } from "@/types/rental.types";
import { unstable_cache } from "next/cache";
import sql from "../db";

// find rental
const find = unstable_cache(
    async (): Promise<Rental[]> => {
        const data = await sql<Rental[]>`
            SELECT 
            ren.id_rental,
            ren.id_client_fk,
            ren.id_car_fk,
            ren.id_rental_status_fk,
            pickup_date,
            return_date,
            notes,
            cli
        `
        // id_rental?: number
        // id_client_fk?: number
        // id_car_model_fk?: number
        // id_status_fk?: number
        // pickup_date?: Date
        // return_date?: Date
        // total_price?: number
        // notes?: string
        // created_at?: Date
        // deleted_at?: Date
        return data.map((d: Rental) => ({
            ...d,
            id_rental: Number(d.id_rental),
            id_client_fk: Number(d.id_client_fk),
            id_car_model_fk: Number(d.id_car_model_fk),
            id_status_fk: Number(d.id_status_fk)
        }))
    },
    ['rentals'],
    { tags: ['rentals'] }
)

// find client by id
const findById = unstable_cache(
    async (id: number): Promise<Client | null> => {
        const [data] = await sql<Client[]>`
            SELECT * FROM alc_clients
            where id_client = ${id}
        `
        if (!data) return null
        return { ...data, id_client: Number(data.id_client) } as Client
    },
    ['client-find-by-id'],
    { tags: ['clients'] }
)

// create client
async function create(params: Client & { name: string }): Promise<Client | null> {
    const [data] = await sql<Client[]>`
        INSERT INTO alc_clients ${sql(params)}
        returning *
    `
    if (!data) return null
    return { ...data, id_client: Number(data.id_client) } as Client
}

// update client
async function update(params: Client & { id_client: number, name: string }): Promise<Client | null> {
    const [data] = await sql<Client[]>`
        UPDATE alc_clients set ${sql(params)}
        where id_client = ${params.id_client}
        returning *
    `
    if (!data) return null
    return { ...data, id_client: Number(data.id_client) } as Client
}

// delete client
async function remove(id: number): Promise<Client | null> {
    const [data] = await sql<Client[]>`
        DELETE FROM alc_clients
        where id_client = ${id}
        returning *
    `
    if (!data) return null
    return { ...data, id_client: Number(data.id_client) } as Client
}

const clientService = {
    find,
    findById,
    create,
    update,
    delete: remove
}

export default clientService