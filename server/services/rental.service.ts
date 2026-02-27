import { Rental, RentalDB } from "@/types/rental.types";
import { unstable_cache } from "next/cache";
import sql from "@/server/db";
import { parseRentalDB, QUERY_RENTAL_SELECT } from "../db/querys/rental_select";

// find rental
const find = unstable_cache(
    async (): Promise<Rental[]> => {
        const data = await sql<RentalDB[]>`
            ${QUERY_RENTAL_SELECT}
        `
        return data.map(parseRentalDB)
    },
    ['rentals'],
    { tags: ['rentals'] }
)

// find rental by id
const findById = unstable_cache(
    async (id: number): Promise<Rental> => {
        const data = await sql<RentalDB[]>`
            ${QUERY_RENTAL_SELECT}
            where id_rental = ${id}
        `
        return data.map(parseRentalDB)[0]
    },
    ['client-find-by-id'],
    { tags: ['clients'] }
)

// create rental
// 
// Tratar melhor os parametros que chegam pelo TS
// 
async function create(
    params: Rental & {
        id_client_fk: number, id_car_fk: number, id_rental_status_fk: number,
        pickup_date: Date, return_date: Date | null, total_price: number
    }
): Promise<Rental> {
    const data = await sql<RentalDB[]>`
        INSERT INTO alc_rentals ${sql(params)}
        returning *
    `
    return data.map(parseRentalDB)[0]
}

// update client
async function update(
    params: Rental & {
        id_rental: number, id_client_fk: number, id_car_fk: number, id_rental_status_fk: number,
        pickup_date: Date, return_date: Date | null, total_price: number
    }
): Promise<Rental> {
    const data = await sql<RentalDB[]>`
        UPDATE alc_rentals set ${sql(params)}
        where id_rental = ${params.id_rental}
        returning *
    `
    return data.map(parseRentalDB)[0]
}

// delete Rental
async function remove(id: number): Promise<Rental> {
    const data = await sql<RentalDB[]>`
        DELETE FROM alc_rentals
        where id_rental = ${id}
        returning *
    `
    return data.map(parseRentalDB)[0]
}

const clientService = {
    find,
    findById,
    create,
    update,
    delete: remove
}

export default clientService