'use client'

import { useEffect, useState } from "react"
import { CarBrand, CarBrandReturn, CarCategory, CarCategoryReturn, CarModel, CarModelReturn } from "@/types/car.types"
import { deleteCarCategory, deleteCarModel } from "@/server/actions/car.action"
import ModalsAdm from "../_components/modals"

interface Params {
    cars: CarModelReturn<CarModel[]>
    categories: CarCategoryReturn<CarCategory[]>
    brands: CarBrandReturn<CarBrand[]>
}

export default function ClientViewAdmin({ cars, categories, brands }: Params) {

    const [catForDel, setCatForDel] = useState<number | null>(null)
    const [modal, setModal] = useState('')

    async function btn_delCat() {
        if (!catForDel) return
        await deleteCarCategory(catForDel)
        setCatForDel(null)
    }

    return (
        <div className="
            flex flex-col gap-4
            bg-gray-300
        ">
            <ModalsAdm setModal={setModal} modal={modal} />


            {/* main */}
            <div className="box flex-1 flex flex-row items-start gap-4">
                {/* left bar */}
                <div className="
                    flex flex-col gap-2
                    w-80 p-2 border-3 rounded-lg
                    border-gray-400

                    [&_.input]:p-2
                    [&_.input]:rounded-lg
                    [&_.input]:outline-none
                    [&_.input]:bg-white

                    [&_.label]:pl-
                    [&_.label]:font-semibold
                    [&_.label]:text-gray-700
                    [&_.label]:
                ">
                    <div className="font-bold text-2xl text-center text-gray-700">
                        Filtrar lista por
                    </div>
                        <div className="h-1 rounded-full bg-gray-400"></div>

                    <div className="flex flex-row justify-between px-4">
                        <label htmlFor="" className="label">Categoria</label>
                        <button onClick={() => setModal('category')} className="text-sm">Novo</button>
                    </div>

                    <select onChange={(e) => setCatForDel(Number(e.target.value))} name="" id="" className="input">
                        <option value="0">Todas as categorias</option>
                        {categories.success ? categories.data.map((d: CarCategory, i: number) => (
                            <option key={i} value={d.id_car_category}>{d.name}</option>
                        )) : (<option defaultValue={0}>Sem categoria</option>)}
                    </select>

                    <div className="flex flex-row justify-between px-4">
                        <label htmlFor="" className="label">Marca</label>
                        <button onClick={() => setModal('brand')} className="text-sm">Novo</button>
                    </div>

                    <select name="" id="" className="input">
                        <option value="0">Todas as narcas</option>
                        {brands.success ? brands.data.map((d: CarCategory, i: number) => (
                            <option key={i} value={d.id_car_category}>{d.name}</option>
                        )) : (<option defaultValue={0}>Sem categoria</option>)}
                    </select>

                    <div className="flex flex-row justify-between px-4">
                        <label htmlFor="" className="label">Cor</label>
                        <button onClick={() => setModal('brand')} className="text-sm">Novo</button>
                    </div>

                    <select name="" id="" className="input">
                        <option value="0">Todas as narcas</option>
                        {brands.success ? brands.data.map((d: CarCategory, i: number) => (
                            <option key={i} value={d.id_car_category}>{d.name}</option>
                        )) : (<option defaultValue={0}>Sem categoria</option>)}
                    </select>

                    <div className="flex flex-row justify-between px-4">
                        <label htmlFor="" className="label">Status do carro</label>
                        <button onClick={() => setModal('brand')} className="text-sm">Novo</button>
                    </div>

                    <select name="" id="" className="input">
                        <option value="0">Todas as narcas</option>
                        {brands.success ? brands.data.map((d: CarCategory, i: number) => (
                            <option key={i} value={d.id_car_category}>{d.name}</option>
                        )) : (<option defaultValue={0}>Sem categoria</option>)}
                    </select>

                    <div className="h-1 my-2 rounded-full bg-gray-400"></div>
                    <button onClick={() => setModal('car')} className="p-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">Adicionar novo carro</button>
                </div>
                {/* list */}
                <div className="flex-1 p-2 border-3 rounded-lg border-gray-400">
                    <ul className="flex flex-row gap-2 min-h-50">
                        {/* <li>
                            <button onClick={() => setModal('car')} className="p-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">Adicionar</button>
                        </li> */}
                        {cars.data?.map((c: CarModel, i: number) => (
                            <li onClick={() => c.id_car_model && deleteCarModel(c.id_car_model)} key={i} className="bg-amber-50">{c.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}