
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import FleetManagement from './screens/FleetManagement'
import MainLayout from './layouts/MainLayout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Navigate to='/fleet-management' replace />} />
            <Route path='fleet-management' element={<FleetManagement />} />
            <Route path='*' element={<Navigate to='/fleet-management' replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
