import { FC } from "react"
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa";
import { TbFileFilled } from "react-icons/tb";
import { Link } from "react-router";

interface ItemColecctionProp {
  encript: boolean;
  title: string;
  amount: number;
  type: 'group' | 'file'
}
const ItemCollection: FC<ItemColecctionProp> = ({ encript, amount, title, type }) => {
  return (<Link to={"/temporal"} className='w-full p-4 transition-colors rounded-lg cursor-pointer bg-gray-700/50 hover:bg-gray-700 group'>
    <div>
      <header className='flex items-center justify-between gap-3 '>
        <div className='flex items-center max-w-full gap-3 overflow-hidden'>
          {type == 'group' && (
            <FaLayerGroup />
          )}
          {type == 'file' && (
            <TbFileFilled />
          )}
          <div>
            <div className='flex-1 overflow-hidden break-words'>
              {title}
            </div>
            {amount != undefined && (
              <span className="block text-xs text-slate-400"> {amount} {" "}
                {type === "file" ? amount > 1 ? "archivos" : "archivo" : amount > 1 ? "colecciones" : "coleccion"}</span>
            )}
          </div>
        </div>
        <div className='flex items-center justify-center w-6 h-6 rounded-md hover:bg-slate-500'>
          {encript ? <FaLock /> : <FaUnlock />}
        </div>
      </header>

    </div>
  </Link>)
}


const HomePage: FC = () => {
  return (
    <main className='w-full h-screen grid grid-rows-[auto_1fr] bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6'>
      <header className='max-w-2xl pb-4 mx-auto '>
        <div className='text-2xl font-bold text-center' >Credentials Manager</div>
        <p className="px-2 pt-2 text-xs text-slate-400">
          La encriptacion de credenciales unicamente funcionan en el modo de coleccion, los modos temporal y coleccion temporal solo almacenan las rutas de csv.
        </p>
      </header>
      <div className='flex flex-col w-full px-2 pb-8 gap-y-2 '>
        <h3 className="text-sm text-slate-400">Modos de guardado</h3>
        <h3 className="text-sm text-slate-300">Encriptado</h3>
        <ItemCollection encript={true} title="Coleccion" amount={24} type="group" />
        <h3 className="text-sm text-slate-300">Sin encriptar</h3>
        <ItemCollection encript={false} title="Temporal" amount={1} type="file" />
        <ItemCollection encript={false} title="Coleccion temporal" amount={24} type="group" />
      </div>
    </main>
  )
}
export default HomePage
