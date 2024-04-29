import React, { useState, useEffect,useContext } from 'react';
import CartContext from '../context/CartContext';
import { useCart } from '../context/CartContextProvider';


const Home = () => {
    const [data, setData] = useState([]);

    const {cart,setCart} = useCart()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://fakestoreapi.com/products/");
                const getdata = await res.json();
                setData(getdata);
            } catch (error) {
                console.log("Error while fetching the data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='bg-zinc-200'>
            <h1 className="text-center text-2xl font-bold my-4">Product List</h1>
            <div className="flex flex-wrap justify-center items-center text-center">
                {data.map(product => (
                    <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
                        <img src={product.image} className=" mx-auto mb-2" alt={product.title} width={200} />
                        <div className="text-center">
                            <h3 className="text-lg font-semibold">{product.title.substring(0,20)}</h3>
                            <p className="text-sm">Price: ${product.price}</p>
                        </div>
                        {
                            cart.includes(product)  ?  (
                                <button  onClick={()=>{
                                    setCart(cart.filter(c => c.id !== product.id))
                                }} className='px-4 py-1 bg-zinc-800 text-white rounded'>Remove from Cart</button>
                            ) : (
                                <button  onClick={()=>{
                                    setCart([...cart,product])
                                }} className='px-4 py-1 bg-zinc-800 text-white rounded'>Add to Cart</button>
                            )
                        }
                        
                        
                    </div>
                    
                ))}
            </div>
        </div>
    );
}

export default Home;
