import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Menu from './Menu'
import About from './About'
import Contact from './Contact'
import FoodGroups from './FoodGroups'
import Quantities from './Quantities'
import AdminLogin from '../admin/AdminLogin'
import AdminPanel from '../admin/AdminPanel'
import ProtectedRoute from '../admin/ProtectedRoute'
import AddMenu from '../admin/controllers/AddMenu'
import AddFoodGroup from '../admin/controllers/AddFoodGroup'
import AddQuantity from '../admin/controllers/AddQuantity'
import Unauthorized from './Unauthorized'

function App() {


  return (
    <>
      <Router>
        <header id="header" class="header d-flex align-items-center sticky-top">
          <div class="container position-relative d-flex align-items-center justify-content-between">

            <a href="index.html" class="logo d-flex align-items-center me-auto me-xl-0">

              <h1 class="sitename">DigiMenu</h1>
            </a>

            <nav id="navmenu" class="navmenu">
              <ul>
               
                <li><Link as={Link} to="/">Home</Link></li>
                <li><Link as={Link} to="/menu">Menu</Link></li>
                <li><Link as={Link} to="/about">About</Link></li>
                <li><Link as={Link} to="/contact">Contact</Link></li>
                

               
              </ul>
              <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>

            
          </div>
        </header>

        <Routes>

          <Route path="/" element={<Home />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/food-groups" element={<FoodGroups />}></Route>
          <Route path="/quantities" element={<Quantities />}></Route>
          <Route path="/admin-login" element={<AdminLogin />}></Route>
          <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
          <Route path="/add-menu" element={<ProtectedRoute><AddMenu /></ProtectedRoute>} />
          <Route path="/add-foodgroup" element={<ProtectedRoute><AddFoodGroup /></ProtectedRoute>} />
          <Route path="/add-quantity" element={<ProtectedRoute><AddQuantity /></ProtectedRoute>} />
          <Route path="/unauthorized" element={<Unauthorized />}></Route>
         
        </Routes>




      </Router>
    </>
  )
}

export default App
