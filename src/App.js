import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Login from './pages/Login'
import Toppage from './pages/Toppage'
import MainHeader from './components/Header/MainHeader'
import Footer from './components/Footer/Footer'
import Transaction from './pages/Transaction'
import RegisterUser from './pages/RegisterUser'
import Register from './pages/Register'
import CreateListing from './pages/CreateListing'
import ProductDetail from './pages/ProductDetail'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

function AppContent() {
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const auth = getAuth()

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true)
      } else {
        setIsAuth(false)
        navigate('/login')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  return (
    <div className="App">
      <MainHeader />
      <main>
        <Routes>
          <Route path="/" element={<Toppage />} />
          <Route path="*" element={<div>Not Found</div>} />
          <Route path="/transaction/:itemId" element={<Transaction />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/product-detail/:itemId" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
