import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Toppage from './pages/Toppage'
import MainHeader from './components/Header/MainHeader'
import Footer from './components/Footer/Footer'
import Transaction from './pages/Transaction'

function App() {
  return (
    <div className="App">
      <Router>
        <MainHeader />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Toppage />} />
            <Route path="*" element={<div>Not Found</div>} />
            <Route path="/transaction" element={<Transaction />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
