'use client'

import { useEffect, useState } from "react"
import ModalCreateCar from "./_components/ModalCreateCar"
import ModalCreateCategory from "./_components/ModalCreateCategory"
import ModalCreateBrand from "./_components/ModalCreateBrand"
import { CarBrand, CarBrandReturn, CarCategory, CarCategoryReturn, CarModel, CarModelReturn } from "@/types/car.types"
import { deleteCarCategory, deleteCarModel } from "@/server/actions/car.action"

interface Params {
    cars: CarModelReturn<CarModel[]>
    categories: CarCategoryReturn<CarCategory[]>
    brands: CarBrandReturn<CarBrand[]>
}

export default function ClientViewAdmin({ cars, categories, brands }: Params) {
    const [modal, setModal] = useState('')
    const [catForDel, setCatForDel] = useState<number | null>(null)

    function openModal(param: string) {
        setModal(param)
    }

    function closeModal() {
        setModal('')
    }

    async function btn_delCat() {
        if (!catForDel) return
        await deleteCarCategory(catForDel)
        setCatForDel(null)
    }

    useEffect(() => {
        if (modal) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }

        return () => document.body.classList.remove('overflow-hidden')
    }, [modal])

    return (
        <div className="
            flex flex-col gap-4
            min-h-dvh
            bg-gray-300
        ">
            {/* modal */}
            <div onMouseDown={closeModal} className={`${modal ? "absolute" : "hidden"} flex justify-center items-center w-dvw h-dvh backdrop-blur`}>
                {modal === 'car' && <ModalCreateCar closeModal={closeModal} />}
                {modal === 'category' && <ModalCreateCategory />}
                {modal === 'brand' && <ModalCreateBrand />}
            </div>
            {/* nav */}
            <div className="bg-gray-700">
                <div className="box flex flex-row justify-between items-center gap-2 p-2 text-white">
                    {/* logo */}
                    <div className="font-semibold text-3xl">CPainel - Alucar</div>
                    {/* links */}
                    <ul className="flex flex-row gap-4">
                        <li>Carros</li>
                        <li>Reservas</li>
                        <li>Clientes</li>
                    </ul>
                </div>
            </div>

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
                    <div className="flex flex-row justify-between px-4">
                        <label htmlFor="" className="label">Categoria</label>
                        <button onClick={() => openModal('category')} className="text-sm">Novo</button>
                    </div>

                    <select onChange={(e) => setCatForDel(Number(e.target.value))} name="" id="" className="input">
                        <option value="0">Todas as categorias</option>
                        {categories.success && categories.data ? categories.data.map((d: CarCategory, i: number) => (
                            <option key={i} value={d.id_car_category}>{d.name}</option>
                        )) : (<option defaultValue={0}>Sem categoria</option>)}
                    </select>

                    <div className="flex flex-row justify-between px-4">
                        <label htmlFor="" className="label">Marca</label>
                        <button onClick={() => setModal('brand')} className="text-sm">Novo</button>
                    </div>

                    <select name="" id="" className="input">
                        <option value="0">Todas</option>
                    </select>
                </div>
                {/* list */}
                <div className="flex-1 p-2 border-3 rounded-lg border-gray-400">
                    <ul className="flex flex-row gap-2">
                        <li>
                            <button onClick={() => setModal('car')} className="p-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">Adicionar</button>
                        </li>
                        {cars.data?.map((c: CarModel, i: number) => (
                            <li onClick={() => c.id_car_model && deleteCarModel(c.id_car_model)} key={i} className="bg-amber-50">{c.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}