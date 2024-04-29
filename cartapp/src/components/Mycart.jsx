import React, {useState, useEffect} from 'react'
import { useCart  } from '../context/CartContextProvider'

const Mycart = () => {
    const {cart,setCart} = useCart()

    const [total,settotal] = useState()

    useEffect(() => {
      settotal(cart.reduce((acc,curr)=> acc + Number(curr.price), 0))
    }, [cart])
    
  return (
    <>
    <div>
      <h1>Mycart</h1>
      <p>Total: $ {total}</p>
    </div>
    <h1 className="text-center text-2xl font-bold my-4">Add Cart List</h1>
            <div className="flex flex-wrap justify-center">
                {cart.map(product => (
                    <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
                        <img src={product.image} className="mx-auto mb-2" alt={product.title} width={200} />
                        <div className="text-center">
                            <h3 className="text-lg font-semibold">{product.title}</h3>
                            <p className="text-sm">Price: ${product.price}</p>
                        </div>
                        {
                            cart.includes(product)  ?  (
                                <button  onClick={()=>{
                                    setCart(cart.filter(c => c.id !== product.id))
                                }} className='px-4 py-1 bg-zinc-300'>Remove from Cart</button>
                            ) : (
                                <button  onClick={()=>{
                                    setCart([...cart,product])
                                }} className='px-4 py-1 bg-zinc-300'>Add to Cart</button>
                            )
                        }
                    </div>
                    
                    
                ))}
            </div>
    </>
  )
}

export default Mycart
