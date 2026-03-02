'use client'

import imageCompression from "browser-image-compression"
import { useEffect, useState } from "react"
import Image from 'next/image'
import { CarBrand, CarCategory, CarCategoryReturn } from "@/types/car.types"
import { findCarBrands, findCarCategories } from "@/server/actions/car.action"

interface FileToUpload {
    image: File
    name: string
}

export default function ModalCreateCarModel({ closeModal }: { closeModal: () => void }) {

    const [addCar, setAddCar] = useState(false)

    const [categories, setCategories] = useState<CarCategory[]>([])
    const [brands, setBrands] = useState<CarBrand[]>([])

    const [imageUrl, setImageUrl] = useState('')
    const [fileToUpload, setFileUpload] = useState<FileToUpload>()

    async function loadCategories() {
        const response = await findCarCategories()
        if (response.success) setCategories(response.data)
    }
    async function loadBrands() {
        const response = await findCarBrands()
        if (response.success) setBrands(response.data)
    }

    // capturar o arquivo do input, comprimir e enviar o obj para um hook
    async function renderImage(e: React.ChangeEvent<HTMLInputElement>) {

        // captura o arquivo do input
        const imageFile = e.target.files?.[0]
        if (!imageFile) return

        // configuração da compressão, useWebWorker não trava o component
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1000,
            useWebWorker: true,
        }

        try {
            // comprime o arquivo
            const compressedFile = await imageCompression(imageFile, options)

            // cria url para preview
            const url = URL.createObjectURL(compressedFile)
            setImageUrl(url)

            // cria obj para tratar no backend
            const fileToUpload = {
                image: compressedFile,
                name: imageFile.name
            }

            // salva no hook
            setFileUpload(fileToUpload)

        } catch (error) {
            console.error("Erro:", error)
        }
    }

    useEffect(() => {
        loadCategories()
        loadBrands()
    }, [])


    return (
        <>
            <div onMouseDown={(e) => e.stopPropagation()} className="
                flex
                flex-col
                items-center
                gap-2

                w-full
                lg:max-w-4xl
                p-2
                rounded-2xl
                **:rounded-2xl
                **:outline-none
                
                text-white
                bg-blue-600

                [&_.h-line]:self-stretch
                [&_.h-line]:w-full
                [&_.h-line]:lg:w-1
                [&_.h-line]:h-1
                [&_.h-line]:lg:h-auto
                [&_.h-line]:rounded-full
                [&_.h-line]:bg-white/20

                [&_.campo]:w-full
                [&_.campo]:px-2
                [&_.campo]:py-1
                [&_.campo]:text-gray-700
                [&_.campo]:bg-blue-50

                [&_.button]:w-full
                [&_.button]:px-2
                [&_.button]:py-1
                [&_.button]:lg:text-sm
                [&_.button]:transition-all
                [&_.button]:text-gray-800
                [&_.button]:hover:text-white
                [&_.button]:bg-blue-300
                [&_.button]:hover:bg-blue-500
                [&_.button]:cursor-pointer
            ">
                <div className="relative flex flex-row items-center lg:gap-2 w-full text-2xl">
                    <button onClick={() => setAddCar(true)} className="lg:absolute px-2 py-1 text-sm text-gray-800 bg-blue-300">Adicionar</button>
                    <p onClick={() => setAddCar(false)} className="flex-1 text-right lg:text-center"><span className="hidden lg:inline">Carro</span> modelos</p>
                </div>

                <div className="w-full h-1 rounded-full bg-white/20"></div>

                {addCar && (
                    <>
                        {/* form create car */}
                        <div className="grid grid-cols-1 lg:grid-cols-8 gap-2 w-full">
                            {/* Coluna da Imagem */}
                            <div className="col-span-1 lg:row-span-3 lg:col-span-4"> {/* Garante que ocupa 2 linhas no desktop */}
                                <input id="foto" onChange={renderImage} type="file" accept="image/*" className="hidden" />

                                {/* Adicionei h-full e removi aspect-video */}
                                <div className="relative flex justify-center items-center h-full bg-amber-100 rounded-lg aspect-video lg:aspect-auto overflow-hidden">
                                    <Image
                                        alt=""
                                        width={400}
                                        height={400}
                                        src={imageUrl || 'https://st2.depositphotos.com/2268879/7526/v/450/depositphotos_75266819-stock-illustration-car-silhouette-modern.jpg'}
                                        className="absolute inset-0 size-full object-cover"
                                    />
                                    <label htmlFor="foto" className={`
                                        ${imageUrl ? "opacity-0" : "opacity-100"}
                                        cursor-pointer absolute transition-all hover:opacity-100 flex justify-center items-center size-full bg-black/30`}
                                    >
                                        <p className="size-fit p-2 shadow-lg shadow-black/50 text-gray-700 bg-white/90 rounded hover:bg-blue-200/90">
                                            enviar foto
                                        </p>
                                    </label>
                                </div>
                            </div>

                            {/* campos */}
                            <input type="text" placeholder="Nome do modelo" className="campo lg:col-span-2" />

                            <select name="" id="" className="campo">
                                {categories.map((d, i) => (
                                    <option key={i} value={d.id_car_category}>{d.name}</option>
                                ))}
                            </select>

                            <select name="" id="" className="campo">
                                {brands.map((d, i) => (
                                    <option key={i} value={d.id_car_brand}>{d.name}</option>
                                ))}
                            </select>

                            {/* Textarea que define a altura da segunda linha */}
                            <textarea rows={8} className="campo lg:col-span-4 resize-none"></textarea>
                            <div className=" lg:col-span-4 flex flex-row gap-2">
                                <button type="button" className="button">Cadastrar</button>
                                <button onClick={() => setAddCar(false)} type="button" className="button">Cancelar</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}