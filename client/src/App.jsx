import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import Index from './pages/Index'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={ <Layout />} >
        <Route index element={ <Index />} />
        <Route path='/login' element={ <LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>

  )
}

export default App
