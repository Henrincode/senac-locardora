'use client'

import { useEffect, useState } from "react"
import ModalCreateCar from "./_components/ModalCreateCar"
import ModalCreateCategory from "./_components/ModalCreateCategory"
import ModalCreateBrand from "./_components/ModalCreateBrand"
import { CarModel, CarModelReturn } from "@/types/car.types"
import { deleteCarModel } from "@/server/actions/car.action"

export default function ClientViewAdmin({ cars }: { cars: CarModelReturn<CarModel[]> }) {
    const [modal, setModal] = useState('')

    function openModal(param: string) {
        setModal(param)
    }

    function closeModal() {
        setModal('')
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
                    <div className="font-semibold text-3xl">Alucar</div>
                    {/* links */}
                    <ul className="flex flex-row gap-4">
                        <li>Carros</li>
                        <li>Reservas</li>
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
                    <select name="" id="" className="input">
                        <option value="0">Todas</option>
                        <option value="1">A - Básico</option>
                        <option value="2">B - Intermediário</option>
                        <option value="3">C - TOP</option>
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