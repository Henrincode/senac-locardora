'use client'

import { createCarBrand, findCarBrands } from "@/server/actions/car.action"
import { CarBrand } from "@/types/car.types"
import { useEffect, useState } from "react"

export default function ModalCreateBrand() {
    const [brands, setBrands] = useState<CarBrand[]>([])
    const [name, setName] = useState('')
    const [foi, setFoi] = useState('cadastrando')


    async function loadDatas() {
        const res = await findCarBrands()
        if(res.success) setBrands(res.data)
    }

    async function btn_create(){
        const res = await createCarBrand({name})
        if(!res.success) {
            setFoi('Erro')
            return
        }
        setFoi(`${res.data.id_car_brand} - ${res.data.name}`)
    }
    
    useEffect(() => {
        loadDatas()
    },[foi])

    return (
        <div onMouseDown={(e) => e.stopPropagation()} className="min-w-100 bg-white">
            {brands.map((b: CarBrand, i: number) => b.name)}
            <div>
                <p>{foi}</p>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="nome" />
                <button onClick={btn_create} type="button">enviar</button>
            </div>
        </div>
    )
}