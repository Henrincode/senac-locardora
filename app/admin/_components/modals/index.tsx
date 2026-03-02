'use client'

import { useEffect } from "react"
import ModalCreateCar from "./ModalCreateCar"
import ModalCreateCarModel from "./ModalCreateCarModel"
import ModalCreateCarCategory from "./ModalCreateCarCategory"
import ModalCreateCarBrand from "./ModalCreateCarBrand"
import ModalCreateCarColor from "./ModalCreateCarColor"
import ModalNavMobile from "./ModalNavMobile"

export default function ModalsAdm({ setModal, modal }: { setModal: any, modal: string }) {

    useEffect(() => {
        if (modal) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }

        return () => document.body.classList.remove('overflow-hidden')
    }, [modal])

    return (
        <div onMouseDown={() => setModal('')} className={
            `
                ${modal ? "absolute" : "hidden"}
                z-100 left-0 top-0 overflow-auto
                w-dvw h-dvh p-2 backdrop-blur
            `}>
            <div className="flex justify-center items-center h-full">
                {modal === 'navMobile' && <ModalNavMobile setModal={setModal} closeModal={() => setModal('')} />}
                {modal === 'car' && <ModalCreateCar closeModal={() => setModal('')} />}
                {modal === 'carModel' && <ModalCreateCarModel closeModal={() => setModal('')} />}
                {modal === 'carCategory' && <ModalCreateCarCategory closeModal={() => setModal('')} />}
                {modal === 'carBrand' && <ModalCreateCarBrand closeModal={() => setModal('')} />}
                {modal === 'carColor' && <ModalCreateCarColor closeModal={() => setModal('')} />}
            </div>
        </div >
    )
}