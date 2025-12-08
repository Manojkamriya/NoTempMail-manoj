import { useState } from 'react'
import EmailHeroValidate from './EmailHeroValidate'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Versions from "./Versions/Version1"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Versions />} />
        {/* <Route path="/generateImage" element={<GenerateImage />} />
        <Route path="/pricing" element={<SubscriptionCards />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<Failure />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </Router>
   




    </>
  )
}

export default App
