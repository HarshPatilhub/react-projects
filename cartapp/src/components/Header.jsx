import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContextProvider'

const Header = () => {
    const {cart} = useCart()
  return (
    <div className='bg-zinc-700'>
      <ul className='flex justify-evenly items-center py-4 text-white'>
        <li>
            <Link to={"/home"}  >Home</Link>
        </li>
        <li>
            <Link to={"/mycart"} >Cart ({cart.length}) </Link>
        </li>
      </ul>
    </div>
  )
}

export default Header
