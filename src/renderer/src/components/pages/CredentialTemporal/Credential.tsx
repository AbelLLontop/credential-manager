import { Credential } from "@renderer/interfaces";
import { FC, useState } from "react";
import { FiLock } from "react-icons/fi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdOutlineContentCopy } from "react-icons/md";

const CredentialItem: FC<{ credential: Credential }> = ({ credential }) => {
  const [showCredential, setShowCredential] = useState<boolean>(false);
  const copy = async (text: string): Promise<void> => {
    await navigator.clipboard.writeText(text);
  }

  return (
    <article className='w-full p-4 transition-colors rounded-lg cursor-pointer bg-gray-700/50 hover:bg-gray-700 group' key={credential.id}>
      <div>
        <header className='flex items-center justify-between gap-3 '>
          <div className='flex items-center max-w-full gap-3 overflow-hidden'>
            <FiLock />
            <div className='flex-1 overflow-hidden break-words'>
              {credential.title}
            </div>
          </div>
          <div onClick={() => setShowCredential(!showCredential)} className='flex items-center justify-center w-6 h-6 rounded-md hover:bg-slate-500'>
            {showCredential ? <IoMdEye /> : <IoMdEyeOff />}
          </div>
        </header>
        <div className="w-full mt-2 space-y-2 text-xs text-gray-300">
          <div className="flex items-center justify-between">
            <span className='inline-block mr-2'>Usuario:</span>
            <span onClick={() => copy(credential.username)} className="flex items-center justify-between gap-2 px-2 py-1 pt-2 overflow-hidden font-mono transition-all bg-gray-700 rounded hover:bg-gray-600 hover:scale-105 active:scale-100">
              <MdOutlineContentCopy className='flex-shrink-0 text-base' />
              <div className='flex-1 overflow-hidden break-words'>
                {showCredential ? credential.username : '*'.repeat(8)}
              </div>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className='inline-block mr-2'>Contraseña:</span>
            <span onClick={() => copy(credential.password)} className="flex items-center gap-2 px-2 py-1 pt-2 font-mono transition-all bg-gray-700 rounded hover:bg-gray-600 hover:scale-105 active:scale-100">
              <MdOutlineContentCopy className='text-base' />
              {showCredential ? credential.password : '*'.repeat(8)}
            </span>
          </div>
        </div>

      </div>
    </article>
  )
}
export default CredentialItem
