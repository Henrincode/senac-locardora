import { CarBrand, CarCategory, CarCategoryReturn, CarModel } from "@/types/car.types";
import sql from "@/server/db";
import { unstable_cache } from "next/cache";

/*
    Fazer
    - Tipar todas as datas de models
*/

// find models
const findModels = unstable_cache(
    async (): Promise<CarModel[]> => {
        const data: CarModel[] = await sql`
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
        return data.map((d: CarModel) => ({
            ...d,
            id_car_model: Number(d.id_car_model),
            id_car_brand_fk: Number(d.id_car_brand_fk),
            id_car_category_fk: Number(d.id_car_category_fk)
        }))
    },
    ['cars-models'],
    { tags: ['cars'] }
)

// create model
async function createModel(
    params: CarModel & { name: string }
): Promise<CarModel> {
    const [data] = await sql`
        INSERT INTO alc_car_models ${sql(params)}
    `
    return data
}

// update model
async function updateModel(
    params: CarModel & { id_car_model: number }
): Promise<CarModel> {
    const [data] = await sql`
        UPDATE alc_car_models set ${sql(params)}
        where id_car_model = ${params.id_car_model}
    `
    return data
}

// delete model
async function deleteModel(
    id: number
): Promise<CarModel> {
    const [data]: CarCategory[] = await sql`
        DELETE from alc_car_models
        where id_car_model = ${id}
    `
    return data
}

// ------------------|
// ------------------| Category
// ------------------|

// find categories
const findCategories = unstable_cache(
    async (): Promise<CarCategory[]> => {
        const data: CarCategory[] = await sql`
        SELECT * from alc_car_categories
    `
        return data.map((d: CarCategory) => ({
            ...d,
            id_car_category: Number(d.id_car_category)
        }))
    },
    ['cars-category'],
    { tags: ['cars'] }
)

// find category by id
const findCategoryById = unstable_cache(
    async (id: number): Promise<CarCategory> => {
        const [data]: [data: CarCategory] = await sql`
        SELECT * from alc_car_categories
        where id_car_category = ${id}
    `
        data.id_car_category = Number(data.id_car_category)
        return data
    },
    ['car-category-by-id'],
    { tags: ['cars'] }
)

// create category
async function createCategory(
    params: CarCategory & { name: string }
): Promise<CarCategory> {
    const [data]: [data: CarCategory] = await sql`
        INSERT INTO alc_car_categories ${sql(params)}
    `
    data.id_car_category = Number(data.id_car_category)
    return data
}

// update category
async function updateCategory(
    params: CarCategory & { id_car_category: number, name: string }
): Promise<CarCategory> {
    const [data]: [data: CarCategory] = await sql`
        UPDATE alc_car_categories set (${sql(params)})
        where id_car_category = ${params.id_car_category}
    `
    data.id_car_category = Number(data.id_car_category)
    return data
}

// delete category
async function deleteCategory(id: number): Promise<CarCategory> {
    const [data]: [data: CarCategory] = await sql`
        DELETE FROM alc_car_categories
        WHERE id_car_category = ${id}
    `
    return data
}

// ------------------|
// ------------------| brand
// ------------------|

// find categories
const findBrands = unstable_cache(
    async (): Promise<CarBrand[]> => {
        const data: CarBrand[] = await sql`
        SELECT * from alc_car_brands
    `
        return data.map((d: CarBrand) => ({
            ...d,
            id_car_brand: Number(d.id_car_brand)
        }))
    },
    ['cars-brand'],
    { tags: ['cars'] }
)

// find brand by id
const findBrandById = unstable_cache(
    async (id: number): Promise<CarBrand> => {
        const [data]: [data: CarBrand] = await sql`
        SELECT * from alc_car_brands
        where id_car_brand = ${id}
    `
        data.id_car_brand = Number(data.id_car_brand)
        return data
    },
    ['car-brand-by-id'],
    { tags: ['cars'] }
)

// create brand
async function createBrand(
    params: CarBrand & { name: string }
): Promise<CarBrand> {
    const [data]: [data: CarBrand] = await sql`
        INSERT INTO alc_car_brands ${sql(params)}
    `
    data.id_car_brand = Number(data.id_car_brand)
    return data
}

// update brand
async function updateBrand(
    params: CarBrand & { id_car_brand: number, name: string }
): Promise<CarBrand> {
    const [data]: [data: CarBrand] = await sql`
        UPDATE alc_car_brands set (${sql(params)})
        where id_car_brand = ${params.id_car_brand}
    `
    data.id_car_brand = Number(data.id_car_brand)
    return data
}

// delete brand
async function deleteBrand(id: number): Promise<CarBrand> {
    const [data]: [data: CarBrand] = await sql`
        DELETE FROM alc_car_brands
        WHERE id_car_brand = ${id}
    `
    return data
}

const carService = {
    findModels,
    createModel,
    updateModel,
    deleteModel,
    // categories
    findCategories,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    // brands
    findBrands,
    findBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
}

export default carService