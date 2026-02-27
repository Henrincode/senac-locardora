import { Car, CarBrand, CarCategory, CarModel } from "@/types/car.types";
import sql from "@/server/db";
import { unstable_cache } from "next/cache";

/*
    Fazer
    - fazer required * onde for necessário
*/

// ------------------|
// ------------------| Car
// ------------------|

// find car
const find = unstable_cache(
    async (): Promise<Car[]> => {
        const data = await sql<Car[]>`
            SELECT
                car.id_car,
                car.id_car_model_fk,
                car.id_car_color_fk,
                car.id_car_status_fk,
                car.plate,
                car.year_manufacture,
                car.year_model,
                car.created_at,
                car.deleted_at,
                mod.name model,
                cat.name category,
                bra.name brand,
                cor.name color,
                cor.color_hex color_hex,
                stu.name status
            FROM alc_cars car
            inner join alc_car_models mod
                on car.id_car_model_fk = mod.id_car_model
            inner join alc_car_categories cat
                on car.id_car_category_fk = cat.id_car_category
            inner join alc_car_brands bra
                on car.id_car_brand_fk = bra.id_car_brand
            inner join alc_car_colors cor
                on car.id_car_color_fk = cor.id_car_color
        `
        return data.map((d: Car) => ({
            ...d,
            id_car: Number(d.id_car),
            id_car_model_fk: Number(d.id_car_model_fk),
            id_car_color_fk: Number(d.id_car_color_fk),
            id_car_status_fk: Number(d.id_car_status_fk),
        }))
    },
    ['cars-find'],
    { tags: ['cars'] }
)

// find car by id
const findById = unstable_cache(
    async (id: number): Promise<Car | null> => {
        const [data] = await sql<Car[]>`
            SELECT
                car.id_car,
                car.id_car_model_fk,
                car.id_car_color_fk,
                car.id_car_status_fk,
                car.plate,
                car.year_manufacture,
                car.year_model,
                car.created_at,
                car.deleted_at,
                mod.name model,
                cat.name category,
                bra.name brand,
                cor.name color,
                cor.color_hex color_hex,
                stu.name status
            FROM alc_cars car
            inner join alc_car_models mod
                on car.id_car_model_fk = mod.id_car_model
            inner join alc_car_categories cat
                on car.id_car_category_fk = cat.id_car_category
            inner join alc_car_brands bra
                on car.id_car_brand_fk = bra.id_car_brand
            inner join alc_car_colors cor
                on car.id_car_color_fk = cor.id_car_color
            where id_car = ${id}
        `
        if (!data) return null
        return {
            ...data,
            id_car: Number(data.id_car),
            id_car_model_fk: Number(data.id_car_model_fk),
            id_car_color_fk: Number(data.id_car_color_fk),
            id_car_status_fk: Number(data.id_car_status_fk)
        }
    },
    ['cars-findById'],
    { tags: ['cars'] }
)

// create car
async function create(
    params: Car & {
        id_car_model_fk: number
        id_car_color_fk: number
        id_car_status_fk: number
        plate: string
        year_manufacture: number
        year_model: number
    }): Promise<Car> {

    const [data] = await sql<Car[]>`
            INSERT INTO alc_cars ${sql(params)}
            RETURNING *
        `

    return {
        ...data,
        id_car: Number(data.id_car),
        id_car_model_fk: Number(data.id_car_model_fk),
        id_car_color_fk: Number(data.id_car_color_fk),
        id_car_status_fk: Number(data.id_car_status_fk)
    }
}

// update car
async function update(
    params: Car & {
        id_car: number
        id_car_model_fk: number
        id_car_color_fk: number
        id_car_status_fk: number
        plate: string
        year_manufacture: number
        year_model: number
    }): Promise<Car | null> {

    const [data] = await sql<Car[]>`
            UPDATE alc_cars SET ${sql(params)}
            WHERE id_car = ${params.id_car}
            RETURNING *
        `
    if (!data) return null

    return {
        ...data,
        id_car: Number(data.id_car),
        id_car_model_fk: Number(data.id_car_model_fk),
        id_car_color_fk: Number(data.id_car_color_fk),
        id_car_status_fk: Number(data.id_car_status_fk)
    }
}

// delete car
async function remove(id: number): Promise<Car> {
    const [data] = await sql<Car[]>`
        DELETE FROM alc_cars
        WHERE id_car = ${id}
        RETURNING *
    `

    return {
        ...data,
        id_car: Number(data.id_car),
        id_car_model_fk: Number(data.id_car_model_fk),
        id_car_color_fk: Number(data.id_car_color_fk),
        id_car_status_fk: Number(data.id_car_status_fk)
    }
}

// ------------------|
// ------------------| Models
// ------------------|

// find models
const findModels = unstable_cache(
    async (): Promise<CarModel[]> => {
        const data = await sql<CarModel[]>`
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
    ['cars-findModels'],
    { tags: ['cars'] }
)

// create model
async function createModel(
    params: CarModel & { name: string }
): Promise<CarModel> {
    const [data] = await sql<CarModel[]>`
        INSERT INTO alc_car_models ${sql(params)}
        RETURNING *
    `
    return data
}

// update model
async function updateModel(
    params: CarModel & { id_car_model: number }
): Promise<CarModel> {
    const [data] = await sql<CarModel[]>`
        UPDATE alc_car_models set ${sql(params)}
        where id_car_model = ${params.id_car_model}
        RETURNING *
    `
    return data
}

// delete model
async function deleteModel(
    id: number
): Promise<CarModel> {
    const [data] = await sql<CarModel[]>`
        DELETE from alc_car_models
        where id_car_model = ${id}
        RETURNING *
    `
    return data
}

// ------------------|
// ------------------| Category
// ------------------|

// find categories
const findCategories = unstable_cache(
    async (): Promise<CarCategory[]> => {
        const data = await sql<CarCategory[]>`
        SELECT * from alc_car_categories
    `
        return data.map((d: CarCategory) => ({
            ...d,
            id_car_category: Number(d.id_car_category)
        }))
    },
    ['cars-findCategories'],
    { tags: ['cars'] }
)

// find category by id
const findCategoryById = unstable_cache(
    async (id: number): Promise<CarCategory> => {
        const [data] = await sql<CarCategory[]>`
        SELECT * from alc_car_categories
        where id_car_category = ${id}
    `
        data.id_car_category = Number(data.id_car_category)
        return data
    },
    ['car-findCategoryById'],
    { tags: ['cars'] }
)

// create category
async function createCategory(
    params: CarCategory & { name: string }
): Promise<CarCategory> {
    const [data] = await sql<CarCategory[]>`
        INSERT INTO alc_car_categories ${sql(params)}
        RETURNING *
    `
    data.id_car_category = Number(data.id_car_category)
    return data
}

// update category
async function updateCategory(
    params: CarCategory & { id_car_category: number, name: string }
): Promise<CarCategory> {
    const [data] = await sql<CarCategory[]>`
        UPDATE alc_car_categories set (${sql(params)})
        where id_car_category = ${params.id_car_category}
        RETURNING *
    `
    data.id_car_category = Number(data.id_car_category)
    return data
}

// delete category
async function deleteCategory(id: number): Promise<CarCategory> {
    const [data] = await sql<CarCategory[]>`
        DELETE FROM alc_car_categories
        WHERE id_car_category = ${id}
        RETURNING *
    `
    return data
}

// ------------------|
// ------------------| brand
// ------------------|

// find categories
const findBrands = unstable_cache(
    async (): Promise<CarBrand[]> => {
        const data = await sql<CarBrand[]>`
        SELECT * from alc_car_brands
    `
        return data.map((d: CarBrand) => ({
            ...d,
            id_car_brand: Number(d.id_car_brand)
        }))
    },
    ['cars-findBrands'],
    { tags: ['cars'] }
)

// find brand by id
const findBrandById = unstable_cache(
    async (id: number): Promise<CarBrand> => {
        const [data] = await sql<CarBrand[]>`
        SELECT * from alc_car_brands
        where id_car_brand = ${id}
    `
        data.id_car_brand = Number(data.id_car_brand)
        return data
    },
    ['car-findBrandById'],
    { tags: ['cars'] }
)

// create brand
async function createBrand(
    params: CarBrand & { name: string }
): Promise<CarBrand> {
    const [data] = await sql<CarBrand[]>`
        INSERT INTO alc_car_brands ${sql(params)}
        RETURNING *
    `
    data.id_car_brand = Number(data.id_car_brand)
    return data
}

// update brand
async function updateBrand(
    params: CarBrand & { id_car_brand: number, name: string }
): Promise<CarBrand> {
    const [data] = await sql<CarBrand[]>`
        UPDATE alc_car_brands set (${sql(params)})
        where id_car_brand = ${params.id_car_brand}
        RETURNING *
    `
    data.id_car_brand = Number(data.id_car_brand)
    return data
}

// delete brand
async function deleteBrand(id: number): Promise<CarBrand> {
    const [data] = await sql<CarBrand[]>`
        DELETE FROM alc_car_brands
        WHERE id_car_brand = ${id}
    `
    return data
}

const carService = {
    find,
    findById,
    create,
    update,
    delete: remove,
    // models
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