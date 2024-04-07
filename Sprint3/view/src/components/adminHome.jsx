import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../App.jsx"
import { Link } from 'react-router-dom'
import axios from 'axios';

function AdminHome() {
    const { u, setU } = useContext(UserContext);
    //console.log("u:", u)

    const [file, setFile] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()

    const handleUpload = (e) => {
        console.log(file);
        //console.log(caption);

        const formdata = new FormData()
        formdata.append('file', file)
        axios.post('http://localhost:5000/uploadProductImage', formdata) // uploading image
            .then((res) => {
                console.log("in")
                console.log(res)
                console.log("id:", res.data._id)  
                const post_id = res.data._id  //post id
                //const userName = u[1]
                //setUserName(u[1])
                console.log(post_id)
                axios.post('http://localhost:5000/uploadProduct', { post_id, title, description, price })  // uploading product data
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    //const handleUpload = (e) => {
    //    console.log(file);
    //    //console.log(caption);

    //    const formdata = new FormData()
    //    formdata.append('file', file)
    //    axios.post('http://localhost:5000/uploadProductImage', formdata) // uploading image
    //        .then((res) => {
    //            console.log("in")
    //            console.log(res)
    //            console.log("id:", res.data._id)  
    //            //const post_id = res.data._id  //post id
    //            //const userName = u[1]
    //            //setUserName(u[1])
    //        })
    //        .catch(err => console.log(err))
        
    //    axios.post('http://localhost:5000/uploadProduct', { title, description, price })  // uploading product data
    //        .then(res => console.log(res))
    //        .catch(err => console.log(err))        
    //}
    

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

                <nav className="  w-full py-2 border-t border-b bg-gray-100" x-data="{ open: false } ">
                    <div className={`w-full ${open ? 'block' : 'hidden'}  text-orange-400 `}>
                        <div className=" w-full  flex flex-row items-center justify-left text-xl font-bold uppercase pt-2 ">
                            <Link to="/petShop" className="min-w-32 border-r-2 border-gray-400 hover:bg-gray-300  py-2 pl-3 mb-2 ml-5">Pet Shop</Link>
                            <Link to="/resources" className="border-r-2 border-gray-400 hover:bg-gray-300  py-2 px-3 mb-2 ">Resources</Link>
                            <div className='nav-right  w-full flex flex-row justify-end ml-3'>
                                <Link to="/login" className="text-white bg-sky-500 text-lg font-bold uppercase hover:bg-gray-400 rounded py-2 px-4 mb-2 mx-3">Logout</Link>
                            </div>

                        </div>
                    </div>
                </nav>
            </div>

            <nav className="fixed z-20 top-0 w-full py-2 border-t border-b bg-gray-100" x-data="{ open: false }">
                <div className={`w-full ${open ? 'block' : 'hidden'}  text-orange-400 `}>
                    <div className=" w-full  flex flex-row items-center justify-left text-xl font-bold uppercase pt-2 ">
                        <Link to="/petShop" className="min-w-32 border-r-2 border-gray-400 hover:bg-gray-300  py-2 pl-3 mb-2 ml-5">Pet Shop</Link>
                        <Link to="/resources" className="border-r-2 border-gray-400 hover:bg-gray-300  py-2 px-3 mb-2 ">Resources</Link>
                        <div className='nav-right  w-full flex flex-row justify-end ml-3'>
                            <Link to="/login" className="text-white bg-sky-500 text-lg font-bold uppercase hover:bg-gray-400 rounded py-2 px-4 mb-2 mx-3">Logout</Link>
                        </div>

                    </div>
                </div>
            </nav>

            <div className='home-cont z-10 relative flex flex-col items-center'>


                <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg  mt-10"> 
                    <div className="p-4">
                        <div className='font-bold text-center'>Upload Product:</div> 
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image</label>
                            <input type="file" id="image" onChange={e => setFile(e.target.files[0])} className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                            <input type="text" id="title" name="title" onChange={e => setTitle(e.target.value)} className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                            <textarea id="description" name="description" onChange={e => setDescription(e.target.value)} className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
                            <input type="number" id="price" name="price" onChange={e => setPrice(e.target.value)} className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500" />
                        </div>
                        <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Submit
                        </button>
                    </div>
                </div>


            </div>

        </div>

    );
}

export default AdminHome;
