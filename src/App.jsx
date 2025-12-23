import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './Components/Todo'
import { ToastContainer } from 'react-toastify'
function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
     <section>

       <Todo/>
       <ToastContainer autoClose={1000} position='top-center' />
       
     </section>
    </>
  )
}

export default App
