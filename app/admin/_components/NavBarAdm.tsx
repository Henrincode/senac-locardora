'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalsAdm from "./modals";

export default function NavBarAdm() {
    const router = useRouter()

    const [modal, setModal] = useState('')
    return (
        <>
            {/* nav */}
            <nav className="fixed w-full bg-gray-700">

                {/* modals */}
                <ModalsAdm setModal={setModal} modal={modal} />

                <div className="
                    box flex flex-row justify-between items-center
                    gap-2 p-2
                    text-white
                    [&_.link]:hover:text-gray-300
                ">
                    {/* logo */}
                    <div className="font-semibold text-3xl">
                        <Link onClick={() => router.refresh()} href={'/admin'} className="link">
                            CPainel - Alucar
                        </Link>
                    </div>
                    {/* links */}
                    <ul className="
                        flex flex-row gap-4

                        [&_li]:relative

                        [&_.drop]:group-hover:absolute
                        [&_.drop]:group-hover:flex
                        [&_.drop]:left-1/2
                        [&_.drop]:-translate-x-1/2
                        [&_.drop]:hidden
                        [&_.drop]:flex-col
                        [&_.drop]:gap-2
                        [&_.drop]:p-4
                        [&_.drop]:mx-auto
                        [&_.drop]:rounded-xl
                        [&_.drop]:bg-gray-800

                        [&_p]:text-sm
                        [&_p]:whitespace-nowrap
                        [&_p]:cursor-pointer
                        [&_p]:hover:text-gray-400

                        [&_p.sub]:mt-2
                        [&_p.sub]:text-[12px]
                        [&_p.sub]:font-semibold
                        [&_p.sub]:cursor-auto
                        [&_p.sub]:text-gray-500
                    ">
                        <li>
                            <Link onClick={() => router.refresh()} href={'/admin/clientes'} className="link">Clientes</Link>
                        </li>
                        <li className="group">
                            <Link onClick={() => router.refresh()} href={'/admin/reservas'} className="link">Reservas</Link>
                            <div className="drop">
                                <p>Ver reservas</p>
                                <p className="sub">add / editar / apagar</p>
                                <p>Status</p>
                            </div>
                        </li>
                        <li className="group">
                            <Link onClick={() => router.refresh()} href={'/admin/carros'} className="link">Carros</Link>
                            <div className="drop">
                                <p>Ver carros</p>
                                <p className="sub">add / editar / apagar</p>
                                <p>modelo</p>
                                <p onClick={() => setModal('brand')}>marca</p>
                                <p>categoria</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}