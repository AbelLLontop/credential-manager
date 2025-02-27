import { HashRouter, Route, Routes } from 'react-router';
import CredentialsPage from './components/pages/CredentialsPage';
import CredencialTemporalPage from './components/pages/CredentialTemporal/CredencialTemporal';
import HomePage from './components/pages/Home/HomePage';



function App(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/temporal' element={<CredencialTemporalPage />} />
        <Route path='/credentials' element={<CredentialsPage />} />
      </Routes>
    </HashRouter>

  )
}

export default App
