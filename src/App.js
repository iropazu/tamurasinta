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
import ProductDetail from './pages/ProductDetail'
import { ProductProvider } from './context/ProductContext'
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <div className="App">
      <ProductProvider>
        <UserProvider>
          <Router>
            <MainHeader />
            <main>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Toppage />} />
                <Route path="*" element={<div>Not Found</div>} />
                <Route path="/transaction/:itemId" element={<Transaction />} />
                <Route path="/register-user" element={<RegisterUser />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-listing" element={<CreateListing />} />
                <Route
                  path="/product-detail/:itemId"
                  element={<ProductDetail />}
                />
              </Routes>
            </main>
            <Footer />
          </Router>
        </UserProvider>
      </ProductProvider>
    </div>
  )
}

export default App
