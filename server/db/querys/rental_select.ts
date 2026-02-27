import sql from "@/server/db"
import { Rental, RentalDB } from "@/types/rental.types";

export const QUERY_RENTAL_SELECT = sql`
    SELECT 
    rentals.id_rental,
    rentals.id_rental_status_fk,
    rentals.id_client_fk,
    rentals.id_car_fk,
    rentals.pickup_date,
    rentals.return_date,
    rentals.total_price,
    rentals.notes,

    rental_status.name rental_status_name,
    rental_status.color_hex rental_status_color,

    client.name client_name,
    client.email client_email,

    car.plate car_plate,
    car.year_manufacture car_year_manufacture,
    car.year_model car_year_model,

    car_model.name car_model_name,
    car_model.image_url car_model_image_url,

    car_brand.name car_brand_name,
    car_brand.image_url car_brand_image_url,

    car_category.name car_category_name,
    car_category.price car_category_price,

    car_color.name car_color_name,
    car_color.color_hex car_color_hex,

    car_status.name car_status_name,
    car_status.block car_status_block,
    car_status.color_hex car_status_color_hex

    FROM alc_rentals rentals

    inner join alc_rental_statuses rental_status
        on rentals.id_rental_status_fk = rental_status.id_rental_status

    inner join alc_clients client
        on rentals.id_client_fk = client.id_client

    inner join alc_cars car
        on rentals.id_car_fk = car.id_car

    inner join alc_car_models car_model
        on car.id_car_model_fk = car_model.id_car_model

    inner join alc_car_brands car_brand
        on car_model.id_car_brand_fk = car_brand.id_car_brand

    inner join alc_car_categories car_category
        on car_model.id_car_category_fk = car_category.id_car_category
        
    inner join alc_car_colors car_color
        on car.id_car_color_fk = car_color.id_car_color

    INNER JOIN alc_car_statuses car_status
        on car.id_car_status_fk = car_status.id_car_status
`

export const parseRentalDB = (d: RentalDB): RentalDB & {
    id_rental: number, id_client_fk: number, id_car_fk: number, id_rental_status_fk: number
} => ({
    ...d,
    id_rental: Number(d.id_rental),
    id_client_fk: Number(d.id_client_fk),
    id_car_fk: Number(d.id_car_fk),
    id_rental_status_fk: Number(d.id_rental_status_fk)
});