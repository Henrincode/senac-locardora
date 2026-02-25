import { findCarModel } from "@/server/actions/car.action"
import ClientViewAdmin from "./ClientView"

export default async function PageAdmin() {
    const cars = await findCarModel()
    return (
        <ClientViewAdmin cars={cars} />
    )
}