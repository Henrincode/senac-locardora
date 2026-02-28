'use client'

import { useEffect, useState } from "react"
import ModalCreateCar from "./ModalCreateCar"
import ModalCreateCategory from "./ModalCreateCategory"
import ModalCreateBrand from "./ModalCreateBrand"

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
        < div onMouseDown={() => setModal('')} className={
            `
                ${modal ? "absolute" : "hidden"}
                z-100 left-0 top-0
                flex justify-center items-center
                w-dvw h-dvh backdrop-blur
            `}>
            {modal === 'car' && <ModalCreateCar closeModal={() => setModal('')} />}
            {modal === 'category' && <ModalCreateCategory />}
            {modal === 'brand' && <ModalCreateBrand />}
        </div >
    )
}