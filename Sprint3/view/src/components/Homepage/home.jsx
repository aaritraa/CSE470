import React from 'react';
import { useContext } from 'react';
import { UserContext } from "../../App.jsx"
import { Link } from 'react-router-dom'

function Home() {
    const { u, setU } = useContext(UserContext);
    console.log(u)

    return (

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

                <nav className="  w-full py-2 border-t border-b bg-gray-100" x-data="{ open: false }">
                    <div className={`w-full ${open ? 'block' : 'hidden'} flex-grow sm:flex sm:items-center sm:w-auto text-white`}>
                        <div className=" w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-lg font-bold uppercase pt-2">
                            <Link to="/events" className="bg-orange-400 hover:bg-gray-400 rounded py-2 px-4 mb-2 mx-3">Events</Link>
                            <Link to="#" className="bg-orange-400 hover:bg-gray-400 rounded py-2 px-4 mb-2 mx-3">Services</Link>
                            <Link to="/petShop" className="bg-orange-400 hover:bg-gray-400 rounded py-2 px-4 mb-2 mx-3">Pet Shop</Link>
                            <Link to="#" className="bg-orange-400 hover:bg-gray-400 rounded py-2 px-4 mb-2 mx-3">Veteranian</Link>
                            <Link to="#" className="bg-orange-400 hover:bg-gray-400 rounded py-2 px-4 mb-2 mx-3">Adopt</Link>
                            <Link to="/resources" className="bg-orange-400 hover:bg-gray-400 rounded py-2 px-4 mb-2 mx-3">Resources</Link>
                        </div>
                    </div>
                </nav>
            </div>

            <nav className="fixed z-20 top-0 w-full py-2 border-t border-b bg-gray-100" x-data="{ open: false }">
                <div className={`w-full ${open ? 'block' : 'hidden'} flex-grow sm:flex sm:items-center sm:w-auto text-white`}>
                    <div className=" w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-lg font-bold uppercase pt-2">
                        <Link to="/events" className="bg-orange-400 hover:bg-gray-400 rounded py-2 px-4 mb-2 mx-3">Events</Link>
                        <Link to="#" className="bg-orange-400 hover:bg-gray-400 rounded py-2 px-4 mb-2 mx-3">Services</Link>
                        <Link to="/petShop" className="bg-orange-400 hover:bg-gray-400 rounded py-2 px-4 mb-2 mx-3">Pet Shop</Link>
                        <Link to="#" className="bg-orange-400 hover:bg-gray-400 rounded py-2 px-4 mb-2 mx-3">Veteranian</Link>
                        <Link to="#" className="bg-orange-400 hover:bg-gray-400 rounded py-2 px-4 mb-2 mx-3">Adopt</Link>
                        <Link to="/resources" className="bg-orange-400 hover:bg-gray-400 rounded py-2 px-4 mb-2 mx-3">Resources</Link>
                    </div>
                </div>
            </nav>

            <div className='home-cont z-10 relative'>

                <div className="container mx-auto flex flex-wrap py-6">
                    {/* Input Bar */}
                    <div className="w-full bg-gray-200 py-4">
                        <div className="container mx-auto flex items-center justify-center">
                            <input type="file" id="imageUpload" accept="image/*" className="hidden" />
                            <label htmlFor="imageUpload" className="cursor-pointer mr-4">
                                <i className="fas fa-image"></i> Upload Image
                            </label>
                            <input type="text" placeholder="Write Something..." className="w-full md:w-2/3 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ml-2">
                                Post
                            </button>
                        </div>
                    </div>

                </div>


            </div>
        </div>

    );
}

export default Home;
