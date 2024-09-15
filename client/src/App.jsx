import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import Index from './pages/Index'

function App() {

  return (
    <Routes>
      <Route index element={ <Index />} />
      <Route path='/login' element={ <LoginPage />} />
    </Routes>

  )
}

export default App
