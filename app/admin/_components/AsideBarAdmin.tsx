'use client'

export default function AsideBarAdmin() {
    return (
        <aside className="
            flex
            flex-col
            gap-4
            w-60
            p-4
            rounded-xl
            bg-white

            [&_ul]:ml-4
            [&_p]:text-lg
            [&_li]:text-sm
        ">
            <div>
                <p>Reservas</p>
                <div>
                    <ul>
                        <li>Ver reservas</li>
                        <li>Adicionar reservas</li>
                        <p>ver mais</p>
                        <ul>
                            <li>Adicionar status</li>
                            <li>Ver / editar status</li>
                            <li>Apagar status</li>
                        </ul>
                    </ul>
                </div>
            </div>
            <div>
                <p>Clientes</p>
                <ul>
                    <li>Ver clientes</li>
                    <li>Adicionar</li>
                </ul>
            </div>
            <div>
                <p>Carros</p>
                <ul>
                    <li>Ver carros</li>
                    <li>Adicionar carro</li>
                    <p>ver mais</p>
                    <ul>
                        <li>modelos</li>
                        <li>marcas</li>
                        <li>categorias</li>
                        <li></li>
                    </ul>
                </ul>
            </div>
        </aside>
    )
}