import { FC, useState } from "react"
import { MdOutlineContentCopy } from "react-icons/md"




interface ModalProps {
  nextModal: () => void,
  backModal?: () => void

}
const ModalOne: FC<ModalProps> = ({ nextModal }) => {
  return (
    <>
      <div className="mb-2 text-center">
        <h4 className="text-xl font-semibold">Generar Credenciales</h4>
        <p className="text-sm text-slate-400">Ingrese titulo y descripcion para esta nueva coleccion</p>
      </div>
      <div className="mb-2">
        <label className="text-sm">Titulo</label>
        <input type="text" name="title" placeholder="Titulo de su coleccion" className="w-full px-3 py-1 border rounded-md outline-none bg-slate-800 border-slate-700 text-slate-300" />
      </div>
      <div className="mb-2">
        <label className="text-sm">Descripcion</label>
        <textarea name="description" maxLength={80} className="w-full px-3 py-1 border rounded-md outline-none resize-none bg-slate-800 border-slate-700 text-slate-300" placeholder="Maximo 80 letras..." >

        </textarea>
      </div>
      <button onClick={nextModal} className="w-full py-2 bg-blue-600 rounded-md hover:bg-blue-700">Generar credenciales</button>
    </>
  )
}
const ModalTwo: FC<ModalProps> = ({ nextModal, backModal }) => {
  return (
    <>
      <div className="mb-2">
        <h4 className="text-xl font-semibold">Generar Credenciales</h4>
        <p className="text-sm text-slate-400">Introduzca una constraseña, por favor no olvidar esta contraseña.</p>
      </div>
      <div className="mb-4">
        <label className="text-sm">Contraseña</label>
        <input type="password" name="password" className="w-full px-3 py-1 border rounded-md outline-none bg-slate-800 border-slate-700 text-slate-300" />
      </div>

      <button onClick={nextModal} className="w-full py-2 bg-blue-600 rounded-md hover:bg-blue-700">Generar</button>
      <button onClick={backModal} className="w-full py-2 mt-4 rounded-md hover:bg-blue-950">Vover</button>
    </>
  )
}
const ModalThree: FC<ModalProps> = ({ nextModal, backModal }) => {
  return (
    <>
      <div className="mb-2 text-start">
        <h4 className="text-xl font-semibold">Tus Claves Generadas</h4>
        <p className="text-sm text-slate-400">Guarde su clave privada de forma segura. Puede elegir como guardarla a continuacion.</p>
      </div>
      <div className="mb-6">
        <div className="mb-2">
          <label className="text-sm">Clave publica</label>
          <div className="flex items-center gap-2">
            <input readOnly type="text" name="public_key" value="pk_z15iwjsv6e" className="flex-1 px-3 py-1 border rounded-md outline-none bg-slate-800 border-slate-700 text-slate-300" />
            <div className="flex items-center justify-center w-8 h-8 transition-all bg-gray-700 rounded cursor-pointer hover:bg-gray-600 hover:scale-105 active:scale-100">
              <MdOutlineContentCopy className='flex-shrink-0 text-base' />
            </div>

          </div>
        </div>
        <div className="mb-4">
          <label className="text-sm">Clave privada</label>
          <div className="flex items-center gap-2">
            <input readOnly type="text" name="private_key" value="sk_zn7h2mw1yfg" className="flex-1 px-3 py-1 border rounded-md outline-none bg-slate-800 border-slate-700 text-slate-300" />
            <div className="flex items-center justify-center w-8 h-8 transition-all bg-gray-700 rounded cursor-pointer hover:bg-gray-600 hover:scale-105 active:scale-100">
              <MdOutlineContentCopy className='flex-shrink-0 text-base' />
            </div>

          </div>
        </div>
        <div className="mb-2">
          <h5 className="text-sm text-slate-300">Preferencia de almacenamiento</h5>
          <label className="cursor-pointer">
            <div className="flex gap-2">
              <input type="checkbox" name="" id="" />
              <span >Almacena la clave privada en el sistema</span>
            </div>
            <div className="ml-5 text-xs text-slate-400">Solamente debera guardar su contraseña</div>
          </label>
        </div>
      </div>
      <button onClick={nextModal} className="w-full py-2 bg-blue-600 rounded-md hover:bg-blue-700">Confirmar</button>
      <button onClick={backModal} className="w-full py-2 mt-4 rounded-md hover:bg-blue-950">Vover</button>
    </>
  )
}


const SaveCollectionModal: FC = () => {
  const [position, setPosition] = useState(0);
  const nextModal = (): void => {
    setPosition(pos => pos + 1)
  }
  const backModal = (): void => {
    setPosition(pos => pos - 1)
  }
  const steps = [ModalOne, ModalTwo, ModalThree]
  const ModalComponent = steps?.[position]

  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-slate-900/90">
      <div className="max-w-80">
        {position < steps.length ? (
          <ModalComponent nextModal={nextModal} backModal={backModal} />
        ) : (
          <div>
            <div className="mb-4 text-center">
              <h4 className="mb-1 text-xl font-semibold">¡Completado!</h4>
              <p className="text-sm text-slate-400">La configuración se ha guardado con éxito.</p>
            </div>
            <button className="w-full py-2 bg-blue-600 rounded-md hover:bg-blue-700">Ir a las colecciones</button>
          </div>
        )}

      </div>

    </div>
  )
}
export default SaveCollectionModal
