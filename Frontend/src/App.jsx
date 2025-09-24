import React from 'react'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'
import HowItWork from './components/HowItWork.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <HowItWork />
      <Footer />
    </div>
  )
}

export default App
