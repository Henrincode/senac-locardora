'use client'

import { createCarModel } from "@/server/actions/car.action"
import { CarModelErrors } from "@/types/car.types"
import { useState } from "react"

export default function ModalCreateCar({ closeModal }: { closeModal: () => void }) {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [work, setWork] = useState(false)
    const [errors, setErrors] = useState<CarModelErrors>({})

    async function create() {
        setWork(true)
        const id_car_category_fk = Number(category)
        const id_car_brand_fk = Number(brand)

        const data = {
            id_car_category_fk, id_car_brand_fk, name
        }

        const response = await createCarModel(data)
        setWork(false)
        if (!response.success) {
            response.errors && setErrors(response.errors)
            return
        }
        closeModal()
    }

    function limpar() {
        setName('')
        setCategory('')
        setBrand('')
    }
    return (
        <div onMouseDown={(e) => e.stopPropagation()} className="min-w-100 bg-white">
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Nome do carro" className={`${errors.name && 'ring-1 ring-red-500'}`} />
            <input onChange={(e) => setCategory(e.target.value)} value={category} type="text" placeholder="Categoria" className={`${errors.id_car_category_fk && 'ring-1 ring-red-500'}`} />
            <input onChange={(e) => setBrand(e.target.value)} value={brand} type="text" placeholder="Marca" className={`${errors.id_car_brand_fk && 'ring-1 ring-red-500'}`} />
            <button disabled={work} onClick={create} type="button" className={`${work && 'text-gray-500'}`}>Cadastrar</button> <button onClick={limpar} type="button">Limpar</button>
        </div>
    )
}