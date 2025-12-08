import { useState } from 'react'
import EmailHeroValidate from './EmailHeroValidate'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Versions from "./Versions/Version1"
import Dashboard from './DashBoard';
import AdminDashboard from './Admindashboard/AdminDashboard';
import SingleVerify from './SingleVerify';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Versions />} />
       <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dash" element={<AdminDashboard />} />
     <Route path="/single-verify" element={<SingleVerify />} />
       {/*      <Route path="/payment-failure" element={<Failure />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </Router>
   




    </>
  )
}

export default App
