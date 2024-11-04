import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Toppage from './pages/Toppage'
import MainHeader from './components/Header/MainHeader'
import Footer from './components/Footer/Footer'
import Transaction from './pages/Transaction'
import RegisterUser from './pages/RegisterUser'
import Register from './pages/Register'
import CreateListing from './pages/CreateListing'

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
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/register" element={<Register />} />
            <Route path='/create-listing' element={<CreateListing/>}/>
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
