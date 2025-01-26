import { Credential, ResponseReadFile } from "@renderer/interfaces"
import { FC, useState } from "react"
import HeaderPrincipal from "./Header"
import CredentialItem from "./Credential"
import { TbShieldLockFilled } from "react-icons/tb";

const CredencialTemporalPage: FC = () => {
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
    <main className='w-full h-screen grid grid-rows-[auto_1fr_3rem] bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 pt-6 pb-0'>
      <HeaderPrincipal setDataFileSuccess={setDataFileSuccess} />
      <div className="flex flex-col px-6 pt-4 overflow-y-hidden">
        <div className='flex flex-col w-full px-2 pt-0 pb-8 overflow-y-scroll gap-y-2 '>
          {error && <div className='text-red-500'>{error}</div>}
          {credentials.map((credential => (
            <CredentialItem credential={credential} key={credential.id} />
          )))}
        </div>
      </div>
      <div className="relative grid items-end grid-cols-2 gap-2 px-2 py-2 border-t-4 bg-slate-900 border-sky-600">
        <div className="absolute rounded-full -top-6 w-14 h-14  left-[calc(50%-1.75rem)] flex justify-center items-center text-3xl  cursor-pointer bg-sky-600 text-white hover:bg-sky-700 active:scale-95 hover:scale-105 transition-all">
          <TbShieldLockFilled />
        </div>
      </div>
    </main>
  )
}
export default CredencialTemporalPage
