'use client'

import { FaPaintbrush } from "react-icons/fa6"
import { IoClose } from "react-icons/io5"

export default function ModalCreateCarColor({ closeModal }: { closeModal: () => void }) {

    return (
        <div onMouseDown={(e) => e.stopPropagation()} className="
            w-full
            sm:max-w-xl

            drop-shadow-xl
            drop-shadow-black/50
        ">
            <div className="
                relative
                flex flex-row items-center gap-2
                p-4 sm:p-6 rounded-t-2xl
                font-bold
                text-2xl sm:text-4xl italic
                text-gray-700
                bg-amber-400
                ">
                <FaPaintbrush />
                <p>Cores dos carros</p>
                <div className="
                    absolute right-6
                    rounded-full
                    bg-gray-700 text-amber-200

                    hover:bg-gray-800 hover:text-amber-500
                    cursor-pointer transition-all
                ">
                    <IoClose />
                </div>
            </div>

            <div className="h-1 bg-gray-500"></div>

            <div className="
                flex flex-row justify-center items-center  gap-2
                p-2
                bg-white
                
                [&_button]:flex-1
                [&_button]:py-2
                [&_button]:rounded-lg
                [&_button]:font-semibold
                [&_button]:text-center
                [&_button]:text-gray-500
                [&_button]:bg-gray-100
                [&_button]:select-none
                [&_button]:cursor-pointer

                ">
                <button className="hover:bg-blue-200">
                    Adicionar
                </button>
                <button className="hover:bg-blue-200">
                    Editar
                </button>
                <button className="hover:bg-red-200">
                    Apagar
                </button>
            </div>

            <div className="h-0.5 bg-gray-100"></div>

            <div className="
                h-100 p-2 rounded-b-2xl
                
                bg-white
                ">
                Á
            </div>
        </div>
    )
}