import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../App.jsx"
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductPayment() {
    const { u, setU } = useContext(UserContext);
    console.log("u:", u)

    const{ title, price} = useParams()

    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [cardNum, setCardNum] = useState()
    const [cvc, setCvc] = useState()

    const [paymentResult, setPaymentResult] = useState("") 
    const handleSubmit = (e) => {
        e.preventDefault()
        const email = u[0]
        axios.post('http://localhost:5000/payProduct', { title, email, name, address, phone, cardNum, cvc, price }) // sending json body to server for validation
        .then((result) => {
          console.log(result.data)  
          setPaymentResult(result.data)
        })
        .catch(err => console.log(err))

    }

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
                                <Link to="/" className="border-r-2 border-gray-400 hover:bg-gray-300  py-2 px-3 mb-2 ">Veteranian</Link>
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
                            <Link to="#" className="border-r-2 border-gray-400 hover:bg-gray-300  py-2 px-3 mb-2 ">Services</Link>
                            <Link to="/petShop" className="min-w-32 border-r-2 border-gray-400 hover:bg-gray-300  py-2 pl-3 mb-2">Pet Shop</Link>
                            <Link to="/" className="border-r-2 border-gray-400 hover:bg-gray-300  py-2 px-3 mb-2 ">Veteranian</Link>
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


                    {/* Payment Portal */}
                    <div className="container mx-auto px-4 py-8">
                        <h2 className="text-2xl font-bold mb-4">Make Payment</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-semibold mb-1">Name</label>
                                <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="billingAddress" className="block text-sm font-semibold mb-1">Billing Address</label>
                                <input type="text" id="billingAddress" name="address" onChange={(e) => setAddress(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phoneNumber" className="block text-sm font-semibold mb-1">Phone Number</label>
                                <input type="tel" id="phoneNumber" name="phone" onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="cardNumber" className="block text-sm font-semibold mb-1">Card Number</label>
                                <input type="text" id="cardNumber" name="cardNum" onChange={(e) => setCardNum(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="cvc" className="block text-sm font-semibold mb-1">CVC</label>
                                <input type="text" id="cvc" name="cvc" onChange={(e) => setCvc(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                            </div>

                            <div className='font-bold text-lg'> Payment Ammount: TK{price} </div> <br/>

                            {
                            (paymentResult!="")? (
                                <div className='font-bold mb-3 text-lg'>
                                    <div >
                                        {paymentResult}
                                    </div>   
                                </div>
                            ) : (
                                <></>
                            )
                            }

                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Pay Now</button>
  
                        </form>
                    </div>


                </div>


            </div>
        </>
    );
}

export default ProductPayment;