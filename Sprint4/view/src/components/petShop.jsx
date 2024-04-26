import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../App.jsx"
import { Link } from 'react-router-dom'
import axios from 'axios';

function PetShop() {
    const { u, setU } = useContext(UserContext);
    console.log("u:", u)

    const [allProducts, setAllProducts] = useState(null) // List of all products
    useEffect(() => {
        const userName = u[1]
        console.log(userName)
        axios.get('http://localhost:5000/getAllProducts')
            .then((res) => {
                console.log("res.data=", res.data);
                setAllProducts(res.data)
            })
            .catch((err) => console.log(err));
    }, [allProducts]) //allPosts

    return (
        <>
            <div className="body bg-white font-family-karla">

                <div className='topSection z-30 relative'>
                    <header className=" bg-sky-400  font-bold font-sans italic tracking-widest text-white">
                        <div className="flex flex-col items-center py-2">
                            <div className=" uppercase text-5xl " >
                                PET CONNECT
                            </div>
                            <p className="text-lg ">
                                Welcome to the Community of Pets!
                            </p>
                        </div>
                    </header>

                    <nav className="  w-full py-2 border-t border-b bg-gray-100" x-data="{ open: false } ">
                        <div className={`w-full ${open ? 'block' : 'hidden'}  text-orange-400 `}>
                            <div className=" w-full  flex flex-row items-center justify-left text-xl font-bold uppercase pt-2 ">
                                <Link to="/events" className=" border-r-2 border-gray-400 hover:bg-gray-300  py-2 px-3 mb-2 ml-5">Events</Link>
                                <Link to="/services" className="border-r-2 border-gray-400 hover:bg-gray-300  py-2 px-3 mb-2 ">Services</Link>
                                <Link to="/petShop" className="min-w-32 border-r-2 border-gray-400 hover:bg-gray-300  py-2 pl-3 mb-2">Pet Shop</Link>
                                <Link to="/resources" className="border-r-2 border-gray-400 hover:bg-gray-300  py-2 px-3 mb-2 ">Resources</Link>
                                <Link to="/home" className="border-r-2 border-gray-400 hover:bg-gray-300  py-2 px-3 mb-2 ">Home</Link>
                                <div className='nav-right  w-full flex flex-row justify-end ml-3'>
                                    <Link to="/profile" className="text-white bg-sky-500 text-lg font-bold uppercase hover:bg-gray-400 rounded py-2 px-4 mb-2 ">Profile</Link>
                                    <Link to="/login" className="text-white bg-sky-500 text-lg font-bold uppercase hover:bg-gray-400 rounded py-2 px-4 mb-2 mx-3">Logout</Link>
                                </div>

                            </div>
                        </div>
                    </nav>
                </div>

                <nav className="fixed z-20 top-0 w-full py-2 border-t border-b bg-gray-100" x-data="{ open: false }">
                    <div className={`w-full ${open ? 'block' : 'hidden'}  text-orange-400 `}>
                        <div className=" w-full  flex flex-row items-center justify-left text-xl font-bold uppercase pt-2 ">
                            <Link to="/events" className=" border-r-2 border-gray-400 hover:bg-gray-300  py-2 px-3 mb-2 ml-5">Events</Link>
                            <Link to="services" className="border-r-2 border-gray-400 hover:bg-gray-300  py-2 px-3 mb-2 ">Services</Link>
                            <Link to="/petShop" className="min-w-32 border-r-2 border-gray-400 hover:bg-gray-300  py-2 pl-3 mb-2">Pet Shop</Link>
                            <Link to="/resources" className="border-r-2 border-gray-400 hover:bg-gray-300  py-2 px-3 mb-2 ">Resources</Link>
                            <Link to="/home" className="border-r-2 border-gray-400 hover:bg-gray-300  py-2 px-3 mb-2 ">Home</Link>
                            <div className='nav-right  w-full flex flex-row justify-end ml-3'>
                                <Link to="/Profile" className="text-white bg-sky-500 text-lg font-bold uppercase hover:bg-gray-400 rounded py-2 px-4 mb-2 ">Profile</Link>
                                <Link to="/login" className="text-white bg-sky-500 text-lg font-bold uppercase hover:bg-gray-400 rounded py-2 px-4 mb-2 mx-3">Logout</Link>
                            </div>

                        </div>
                    </div>
                </nav>

                <div className='home-cont z-10 relative flex flex-wrap justify-center '>

                    {/*<div className="w-96 bg-white rounded-xl overflow-hidden shadow-md md:max-w-2xl mx-5 my-4">
                        <img className="h-48 w-full object-cover" src={`http://localhost:5000/Images/file_1712298066348.jpg`} alt="Product Image" />
                        <div className="p-4">
                            <h2 className="font-bold text-xl mb-2">Product Name</h2>
                            <p className="text-gray-600 mb-4">Product Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non eros eget lorem interdum vulputate. Integer ac ex ac lectus suscipit commodo.</p>
                            <h3 className='font-bold'>Price: TK150</h3>
                            <br />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Buy Now
                            </button>
                        </div>
                    </div>*/}

                    {allProducts && allProducts.length > 0 ? (
                        <div className=' flex flex-wrap justify-center'>
                            {allProducts.map((product, index) => (

                                <div key={index} >

                                    <div className="w-96 bg-white rounded-xl overflow-hidden shadow-md md:max-w-2xl  mx-5 my-4">
                                        <img className="h-48 w-full object-cover" src={`http://localhost:5000/Images/${product.image}`} alt="Product Image" />
                                        <div className="p-4">
                                            <h2 className="font-bold text-xl mb-2">{product.title}</h2>
                                            <p className="text-gray-600 mb-4">{product.description}</p>
                                            <h3 className='font-bold'>Price: TK{product.price}</h3>
                                            <br />
                                            <Link to={`/productPayment/${product.title}/${product.price}`}>  
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                                    Buy Now
                                                </button>                                                
                                            </Link>
                                        </div>
                                    </div>

                                </div>

                            ))}
                        </div>
                    ) : (
                        <p className="text-center">No products available.</p>
                    )}


                </div>
                

            </div>
        </>
    );
}

export default PetShop;