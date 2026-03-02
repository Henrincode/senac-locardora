'use client'

import { useState } from "react"
import ModalsAdm from "."

export default function ModalNavMobile({ setModal, closeModal }: { setModal: (p: string) => void, closeModal: () => void }) {

    return (
        <div onMouseDown={(e) => e.stopPropagation()} className="
            flex flex-col gap-8
            w-full lg:w-auto p-8 rounded-2xl text-white bg-gray-800
            [&_p]:text-4xl
            [&_li]:text-2xl
            [&_li]:ml-4

            [&_.area]:flex
            [&_.area]:flex-row
            [&_.area]:gap-2

            [&_.area-border]:w-1.5
            [&_.area-border]:rounded-full
            [&_.area-border]:bg-gray-600

            [&_ul]:flex
            [&_ul]:flex-col
            [&_ul]:gap-1

            [&_.divider]:w-full
            [&_.divider]:h-1
            [&_.divider]:rounded-full
            [&_.divider]:bg-gray-600

            [&_.sub]:mt-2
            [&_.sub]:ml-4
            [&_.sub]:text-sm
            [&_.sub]:font-semibold
            [&_.sub]:cursor-auto
            [&_.sub]:text-gray-500
        ">
            <div className="area">
                <div className="area-border"></div>
                <ul>
                    <p>Clientes</p>
                </ul>
            </div>

            {/* divider
            <div className="divider"></div> */}

            <div className="area">
                <div className="area-border"></div>
                <ul>
                    <p>Reservas</p>
                    <li>Ver Todas</li>
                    <div className="sub">add / editar / apagar</div>
                    <li>Status</li>
                </ul>
            </div>

            <div className="area">
                <div className="area-border"></div>
                <ul>
                    <p>Carros</p>
                    <li>Ver todos</li>
                    <div className="sub">add / editar / apagar</div>
                    <li onClick={() => setModal('carModel')}>Modelos</li>
                    <li onClick={() => setModal('carBrand')}>Marcas</li>
                    <li onClick={() => setModal('carColor')}>Cores</li>
                    <li onClick={() => setModal('carCategory')}>Categorias</li>
                </ul>
            </div>
        </div>
    )
}