export default async function PageAdmin() {
    return (
        <div className="
            flex flex-col gap-4
            min-h-dvh
            bg-gray-300
        ">
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
                    [&_.input]:bg-white

                    [&_.label]:pl-4
                    [&_.label]:font-semibold
                    [&_.label]:text-gray-700
                    [&_.label]:
                ">
                    <label htmlFor="" className="label">Categoria</label>
                    <select name="" id="" className="input">
                        <option value="0">Todas</option>
                        <option value="1">A - Básico</option>
                        <option value="2">B - Intermediário</option>
                        <option value="3">C - TOP</option>
                    </select>
                    <label htmlFor="" className="label">Marca</label>
                    <select name="" id="" className="input">
                        <option value="0">Todas</option>
                    </select>
                </div>
                {/* list */}
                <div className="flex-1 p-2 border-3 rounded-lg border-gray-400">a</div>
            </div>
        </div>
    )
}