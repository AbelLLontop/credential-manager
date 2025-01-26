import { FC, useState } from "react"
import CredentialItem from "./CredentialTemporal/Credential"
import HeaderPrincipal from "./CredentialTemporal/Header"
import { Credential, ResponseReadFile } from "@renderer/interfaces"

const CredentialsPage:FC = () => {
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
    <>
      <HeaderPrincipal setDataFileSuccess={setDataFileSuccess} />
      <div className='flex flex-col w-full px-2 pb-8 overflow-y-scroll gap-y-2 '>
        {error && <div className='text-red-500'>{error}</div>}
        {credentials.map((credential => (
          <CredentialItem credential={credential} key={credential.id} />
        )))}
      </div>
    </>
  )
}
export default CredentialsPage
