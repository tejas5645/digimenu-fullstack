import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './componenets/App.jsx'
import { Footer } from './componenets/Footer.jsx'
import Home from './componenets/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Home/> */}
    <Footer />

    
  </StrictMode>,
)
