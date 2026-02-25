import { CarModel } from "@/types/car.types";
import sql from "@/server/db";
import { unstable_cache } from "next/cache";

// find
const findModels = unstable_cache(
    async (): Promise<CarModel[]> => {
        const data = await sql`
            SELECT
                car.id_car_model,
                car.id_car_brand_fk,
                car.id_car_category_fk,
                car.name,
                car.details,
                car.image_url,
                car.created_at,
                car.deleted_at,
                cat.name as category,
                bra.name as brand
            from alc_car_models car
            inner join alc_car_categories cat
                on car.id_car_category_fk = cat.id_car_category
            inner join alc_car_brands bra
                on car.id_car_brand_fk = bra.id_car_brand
        `
        return data.map((d) => ({
            ...d,
            id_car_model: Number(d.id_car_model),
            id_car_brand_fk: Number(d.id_car_brand_fk),
            id_car_category_fk: Number(d.id_car_category_fk)
        }))
    },
    ['cars-models'],
    { tags: ['cars'] }
)

// create
async function createModel(
    params: CarModel & { name: string }
): Promise<CarModel> {
    const [data] = await sql`
        INSERT INTO alc_car_models ${sql(params)}
    `
    return data
}

// update
async function updateModel(
    params: CarModel & { id_car_model: number }
): Promise<CarModel> {
    const [data] = await sql`
        UPDATE alc_car_models set ${sql(params)}
        where id_car_model = ${params.id_car_model}
    `
    return data
}

// delete
async function deleteModel(
    id: number
): Promise<CarModel> {
    const [data] = await sql`
        DELETE from alc_car_models
        where id_car_model = ${id}
    `
    return data
}

const carService = {
    findModels,
    createModel,
    updateModel,
    deleteModel
}

export default carService