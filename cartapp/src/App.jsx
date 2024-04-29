import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import CartContextProvider from './context/CartContextProvider'

const App = () => {
  return (
   <CartContextProvider>
     <div>
      <Header/>
      <Outlet/>
    </div>
   </CartContextProvider>
  )
}

export default App
