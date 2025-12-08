import { useState } from 'react'
import EmailHeroValidate from './EmailHeroValidate'
import './App.css'
import TestImageChat from './TestImageChat'
import Versions from "./Versions/Version1"
import Version2 from "./Versions/Version2"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
   {/* <EmailHeroValidate/> */}
   {/* <TestImageChat/> */}
   <Versions/>
 {/* <Version2/> */}




    </>
  )
}

export default App
