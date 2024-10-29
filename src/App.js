import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Toppage from './pages/Toppage'
import MainHeader from './components/Header/MainHeader'

function App() {
  return (
    <div className="App">
      <Router>
        <MainHeader />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Toppage />} />
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App
