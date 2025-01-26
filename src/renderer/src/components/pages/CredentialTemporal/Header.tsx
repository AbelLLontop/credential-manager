import { ResponseReadFile } from "@renderer/interfaces";
import { FC, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router";

interface PropsHeader {
  setDataFileSuccess: (data: ResponseReadFile) => void
}


const HeaderPrincipal: FC<PropsHeader> = ({ setDataFileSuccess }) => {
  const navigate = useNavigate();
  useEffect(() => {
    window.api.initialFile().then((data: ResponseReadFile | undefined) => {
      if (!data) return;
      setDataFileSuccess(data);
    })
  }, [])

  const handleSelectFile = async (): Promise<void> => {
    const fileResponse: ResponseReadFile | undefined = await window.api.openFile();
    if (!fileResponse) return;
    setDataFileSuccess(fileResponse);
  }
  return (
    <header className='max-w-2xl px-8 pb-2'>
      <div className='flex text-xl font-bold text-center' >
        <div className="flex items-center justify-center w-10 mr-0 text-base transition-all rounded-full cursor-pointer hover:mr-2 hover:bg-slate-800" onClick={() => navigate("/")}><MdOutlineArrowBackIos /></div>
        Archivo temporal</div>
      <p className="pt-2 text-xs text-slate-400">Los archivos temporales solo pueden ser csv, con los campos id,username,password y title, en ese orden.</p>
      <div className='mt-2 space-y-1'>
        <button className='flex items-center justify-center w-full gap-2 px-4 py-2 text-sm transition-colors bg-blue-600 rounded-md outline-none hover:bg-blue-700' onClick={handleSelectFile}>
          <FiUpload />
          Subir archivo</button>
      </div>
    </header>
  )
}
export default HeaderPrincipal;
