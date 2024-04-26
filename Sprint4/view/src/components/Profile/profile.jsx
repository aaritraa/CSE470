import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useContext } from 'react';
import { UserContext } from "../../App.jsx"
import { Link } from 'react-router-dom'

export const profile = () => {
    const { u, setU } = useContext(UserContext);
    console.log("u=", u)

    const [userInfo, setUserInfo] = useState(null)
    useEffect(() => {
        const userEmail = u[0]
        //console.log(userEmail)
        axios.post('http://localhost:5000/getUserInfo', { userEmail })
            .then((res) => {
                //console.log("res.data=", res.data);
                setUserInfo(res.data)
                //console.log("userInfo.email=", userInfo.email)
            })
            .catch((err) => console.log(err));
    }, [userInfo]) //userInfo

    const [showEdit, setShowEdit] = useState(-1)
    const handleEdit = (e) => {
        const se = -1 * showEdit
        setShowEdit(se)
    }

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [address, setAddress] = useState()
    const [bio, setBio] = useState()
    const handleUpdate = (e) => {
        const userEmail = u[0]
        axios.post('http://localhost:5000/updateProfile', { userEmail, firstName, lastName, address, bio })
            .then((res) => {
                console.log("res.data=", res.data);
                setUserInfo(res.data)
                console.log("userInfo.email=", userInfo.email)
            })
            .catch((err) => console.log(err));

        const se = -1 * showEdit
        setShowEdit(se)
    }

    const [payments, setPayments] = useState([])
    useEffect(() => {
        const userEmail = u[0]
        console.log("userEmail=", userEmail)
        axios.post('http://localhost:5000/getProductPayments', { userEmail })
            .then((res) => {
                console.log("res.data payments=", res.data);
                setPayments(res.data)
                console.log("payments=", payments)
            })
            .catch((err) => console.log(err));
    }, [payments]) //payments

    const [servicePayments, setServicePayments] = useState([])
    useEffect(() => {
        const userEmail = u[0]
        console.log("userEmail=", userEmail)
        axios.post('http://localhost:5000/getServicePayments', { userEmail })
            .then((res) => {
                console.log("res.data service payments=", res.data);
                setServicePayments(res.data)
                console.log("servicePayments=", servicePayments)
            })
            .catch((err) => console.log(err));
    }, [servicePayments])

    return (
        <>

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
                            <div className='nav-right  w-full flex flex-row justify-end ml-3'>
                                <Link to="/home" className="text-white bg-sky-500 text-lg font-bold uppercase hover:bg-gray-400 rounded py-2 px-4 mb-2 ">Home</Link>
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
                        <Link to="/services" className="border-r-2 border-gray-400 hover:bg-gray-300  py-2 px-3 mb-2 ">Services</Link>
                        <Link to="/petShop" className="min-w-32 border-r-2 border-gray-400 hover:bg-gray-300  py-2 pl-3 mb-2">Pet Shop</Link>
                        <Link to="/resources" className="border-r-2 border-gray-400 hover:bg-gray-300  py-2 px-3 mb-2 ">Resources</Link>
                        <div className='nav-right  w-full flex flex-row justify-end ml-3'>
                            <Link to="/home" className="text-white bg-sky-500 text-lg font-bold uppercase hover:bg-gray-400 rounded py-2 px-4 mb-2 ">Home</Link>
                            <Link to="/login" className="text-white bg-sky-500 text-lg font-bold uppercase hover:bg-gray-400 rounded py-2 px-4 mb-2 mx-3">Logout</Link>
                        </div>

                    </div>
                </div>
            </nav>

            <div className='home-cont z-10 relative flex flex-col items-center'>


                <div className="w-9/12 flex justify-center mt-16 rounded-lg">
                    <div className='relative w-9/12 bg-white overflow-hidden rounded-lg'>
                        <div className='bg-emerald-200 py-4 text-center text-black rounded-t-lg font-bold'>
                            <h1 className='text-2xl px-6 text-black'>User Profile</h1>
                        </div>
                        <div className='flex flex-col p-4 bg-gray-100 '>
                            <div className='flex flex-col items-center rounded-lg'>
                                {/* user er picture er ta dibo */}
                                <div className='w-full rounded-lg border-2 border-emerald-700 bg-white mt-4'>
                                    <div className='p-3 mx-auto '>
                                        <div>
                                            <div className='text-xl font-bold text-emerald-700 mb-2'>
                                                {/* userinfo er jinish pati */} Profile Information:
                                            </div>
                                        </div>
                                        <div className='flex flex-row items-center mb-1'>
                                            <div className='text-l font-medium text-slate-800'>
                                                Email: {userInfo ? (userInfo.email) : ("not found")}
                                            </div>
                                            <div className='text-l  ml-1'>
                                                { }
                                            </div>
                                        </div>
                                        <div className='flex flex-row items-center mb-1'>
                                            <div className='text-l font-medium text-slate-800'>
                                                First Name: {userInfo ? (userInfo.firstName) : ("not found")}
                                            </div>
                                            <div className='text-sm  ml-1'>
                                                {/*user er address*/}
                                            </div>
                                        </div>
                                        <div className='flex flex-row items-center mb-1'>
                                            <div className='text-l font-medium text-slate-800'>
                                                Last Name: {userInfo ? (userInfo.lastName) : ("not found")}
                                            </div>
                                            <div className='text-l  ml-1'>
                                                {/*user er address*/}
                                            </div>
                                        </div>
                                        <div className='flex flex-row items-center mb-1'>
                                            <div className='text-l font-medium text-slate-800'>
                                                Address: {userInfo ? (userInfo.address) : ("not found")}
                                            </div>
                                            <div className='text-l  ml-1'>
                                                {/*user er address*/}
                                            </div>
                                        </div>
                                        <div className='flex flex-row items-center mb-1'>
                                            <div className='text-l font-medium text-slate-800'>
                                                Bio: {userInfo ? (userInfo.bio) : ("not found")}
                                            </div>
                                            <div className='text-l  ml-1'>

                                            </div>
                                        </div>
                                        <div><button type='button' onClick={handleEdit} className='py-2 px-4 text-sm font-medium text-center text-white rounded-full bg-emerald-700 hover-bg-primary-700 focus-ring-4 focus-outline-none focus-ring-primary-300 mt-3'>Edit Profile</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                {showEdit != -1 ? (
                    <div className='w-full flex justify-center'>


                        <div className="w-9/12 flex justify-center mt-3 rounded-lg">
                            <div className='relative w-9/12 bg-white overflow-hidden rounded-lg'>
                                <div className='bg-emerald-200 py-4 text-center text-black rounded-t-lg font-bold'>
                                    <h1 className='text-2xl px-6 text-black'>Edit Profile</h1>
                                </div>
                                <div className='flex flex-col p-4 bg-gray-100 '>
                                    <div className='flex flex-col items-center rounded-lg'>
                                        {/* user er picture er ta dibo */}
                                        <div className='w-full rounded-lg border-2 border-emerald-700 bg-white mt-4'>
                                            <div className='p-3 mx-auto '>
                                                <div>
                                                    <div className='text-xl font-bold text-emerald-700 mb-2'>
                                                        {/* userinfo er jinish pati */} Edit Profile Information:
                                                    </div>
                                                </div>
                                                <div className='flex flex-row items-center mb-1'>
                                                    <div className='text-l font-medium text-slate-800'>
                                                        First Name:
                                                    </div>
                                                    <input type="text" name="firstName" onChange={e => setFirstName(e.target.value)} className='border-3 rounded ml-5' />
                                                </div>
                                                <div className='flex flex-row items-center mb-1'>
                                                    <div className='text-l font-medium text-slate-800 '>
                                                        Last Name:
                                                    </div>
                                                    <input type="text" name="lastName" onChange={e => setLastName(e.target.value)} className='border-3 rounded ml-5' />
                                                </div>
                                                <div className='flex flex-row items-center mb-1'>
                                                    <div className='text-l font-medium text-slate-800'>
                                                        Address:
                                                    </div>
                                                    <input type="text" name="address" onChange={e => setAddress(e.target.value)} className='border-3 rounded ml-10' />
                                                </div>
                                                <div className='flex flex-row items-center mb-1'>
                                                    <div className='text-l font-medium text-slate-800'>
                                                        Bio:
                                                    </div>
                                                    <input type="text" name="bio" onChange={e => setBio(e.target.value)} className='border-3 rounded ml-16' />
                                                </div>
                                                <div><button type='button' onClick={handleUpdate} className='py-2 px-4 text-sm font-medium text-center text-white rounded-full bg-emerald-700 hover-bg-primary-700 focus-ring-4 focus-outline-none focus-ring-primary-300 mt-3'>Update Profile</button></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                ) : (
                    <></>
                )
                }


                <div className='product-payments w-full'>

                    <div className="bg-white rounded-md shadow-md p-6 w-8/12 mx-auto my-5">
                        <h2 className="text-lg font-semibold mb-2">Product Payment History</h2>
                        <div className='flex flex-col '>


                            {/*<div className='flex justify-around bg-gray-200 p-3 my-2'>
                                <div className="mb-2 ">
                                    <p className="text-gray-600">Title:</p>
                                    <p className="font-semibold">Product Title</p>
                                </div>
                                <div className="mb-2">
                                    <p className="text-gray-600">Price:</p>
                                    <p className="font-semibold">$100</p>
                                </div>
                                <div className="mb-2">
                                    <p className="text-gray-600">Phone:</p>
                                    <p className="font-semibold">123-456-7890</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Address:</p>
                                    <p className="font-semibold">123 Street, City, Country</p>
                                </div>
                            </div>*/}

                            {payments && payments.length > 0 ? (
                                <>
                                    {payments.map((payment, index) => (

                                        <div key={index} className='flex justify-around bg-gray-200 p-3 my-2 '>

                                            <div className="mb-2">
                                                <p className="text-gray-600">Title:</p>
                                                <p className="font-semibold">{payment.title}</p>
                                            </div>
                                            <div className="mb-2">
                                                <p className="text-gray-600">Price:</p>
                                                <p className="font-semibold">TK{payment.price}</p>
                                            </div>
                                            <div className="mb-2">
                                                <p className="text-gray-600">Phone:</p>
                                                <p className="font-semibold">{payment.phone}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Address:</p>
                                                <p className="font-semibold">{payment.address}</p>
                                            </div>

                                        </div>

                                    ))}
                                </>

                            ) : (
                                <div> No payments Available</div>
                            )}


                        </div>
                    </div>
                </div>


                <div className='service-payments w-full'>

                    <div className="bg-white rounded-md shadow-md p-6 w-8/12 mx-auto my-5">
                        <h2 className="text-lg font-semibold mb-2">Service Payment History</h2>
                        <div className='flex flex-col '>

                            {servicePayments && servicePayments.length > 0 ? (
                                <>
                                    {servicePayments.map((servicePayment, index) => (

                                        <div key={index} className='flex justify-around bg-gray-200 p-3 my-2 '>

                                            <div className="mb-2">
                                                <p className="text-gray-600">Title:</p>
                                                <p className="font-semibold">{servicePayment.title}</p>
                                            </div>
                                            <div className="mb-2">
                                                <p className="text-gray-600">Price:</p>
                                                <p className="font-semibold">TK{servicePayment.price}</p>
                                            </div>
                                            <div className="mb-2">
                                                <p className="text-gray-600">Phone:</p>
                                                <p className="font-semibold">{servicePayment.phone}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Address:</p>
                                                <p className="font-semibold">{servicePayment.address}</p>
                                            </div>

                                        </div>

                                    ))}
                                </>

                            ) : (
                                <div> No payments Available</div>
                            )}


                        </div>
                    </div>
                </div>


            </div>



        </>



    )
}

export default profile;
