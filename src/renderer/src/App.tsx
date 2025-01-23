import { FC, useEffect, useState } from 'react';
import { FiUpload } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";


export type ResponseReadFile = {
  route: string;
  success: boolean;
  data?: Credential[];
  message?: string;
}
interface PropsHeader {
  setDataFileSuccess: (data: ResponseReadFile) => void
}


const HeaderPrincipal: FC<PropsHeader> = ({ setDataFileSuccess }) => {
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
    <header className='max-w-2xl pb-6 mx-auto '>
      <div className='text-2xl font-bold text-center' >Credentials Manager</div>
      <div className='mt-2 space-y-1'>
        <button className='flex items-center justify-center w-full gap-2 py-2 text-sm transition-colors bg-blue-600 rounded-md outline-none hover:bg-blue-700' onClick={handleSelectFile}>
          <FiUpload />
          Seleccionar archivo de datos</button>
      </div>
    </header>
  )
}

interface Credential {
  username: string;
  password: string;
  id: string | number;
  title: string;
}
function App(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [error, setError] = useState<string>("")

  const setDataFileSuccess = (data: ResponseReadFile): void => {
    if (!data.success) {
      setCredentials([])
      setError(data.message || "Error desconoicdo");
      return;
    }
    setError("");
    setCredentials(data.data || []);

  }
  return (
    <main className='w-full h-screen grid grid-rows-[auto_1fr] bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6'>
      <HeaderPrincipal setDataFileSuccess={setDataFileSuccess} />
      <div className='flex flex-col w-full px-2 pb-8 overflow-y-scroll gap-y-2 '>
        {error && <div className='text-red-500'>{error}</div>}
        {credentials.map((credential => (
          <CredentialItem credential={credential} key={credential.id} />
        )))}
      </div>
    </main>
  )
}

const CredentialItem: FC<{ credential: Credential }> = ({ credential }) => {
  const [showCredential, setShowCredential] = useState<boolean>(false);
  const copy = async (text: string): Promise<void> => {
    // const textArea = document.createElement('textarea');
    // textArea.value = text;
    // document.body.appendChild(textArea);
    // textArea.select();
    // document.execCommand('copy');
    // document.body.removeChild(textArea);
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

export default App
