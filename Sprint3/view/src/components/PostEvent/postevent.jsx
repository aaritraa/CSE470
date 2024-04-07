import React from 'react';
import {useState} from 'react';

const postevent = () => {
  return (
    <div className='flex pt-20 items-center justify-center rounded-lg '>
        <div class='w-5/6 px-40 mt-10'>
            <div className='w-full flex flex-row justify-center rounded-lg shadow-lg bg-white'>
                <div className='rounded-lg w-full'>
                    <div className='bg-gray-700 px-3 py-3 rounded-t-lg w-full'>
                        <h1 className='font-bold font-sans text-white text-center text-xl'>Create a New Event for Your peers</h1>
                    </div>

                    <div className='p-5'>
                        <div className='grid grid=cols-2 gap-4 mb-4'>
                            <div className='relative z-0 mb-6 group'>
                                <label htmlFor='eventName' className='block mb-2 text-sm font-medium text-gray-900'>Event Name</label>
                                <input type='text' name='title' className='block px-2.5 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md appearance-none focus:outline-none focus:border-amber-600 peer' placeholder='Enter Event Name' required/>
                            </div>

                            <div className="relative z-0 mb-6 group">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Event Category</label>
                        <select
                          required name="Event_type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-amber-500 block w-full p-2.5">
                          <option value="">Select</option>
                          <option value="Online">Online</option>
                          <option value="Physical">Pet Show</option>
                          <option value="Hybrid">Exhibition</option>
                        </select>
                      </div>
                    </div>

                    <div className='grid grid-cols-3 gap-4'>
                        <div className='relative z-0 mb-6 group'>
                            <label htmlFor='location' className='block mb-2 text-sm font-medium text-gray-900'>Event Location</label>
                        </div>

                        <div className='relative z-0 mb-6 group'>
                            <label htmlFor='date' className='block mb-2 text-sm font-medium text-gray-900'>Event Date</label>
                            <input type='date' name='date' className='block px-2.5 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md appearance-none focus:outline-none focus:border-amber-600 peer' required/>
                        </div>

                        <div className='relative z-0 mb-6 group'>
                            <label htmlFor='time' className='block mb-2 text-sm font-medium'>Event Time</label>
                            <input type='time' name='time' className='block px-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md appearance-none focus:outline-none focus:border-amber-600 peer' required/>
                        </div>
                    </div>

                    <div className='relative z-0 w-full mb-6 group'>
                        <label htmlFor='description' className='block mb-2 text-sm font-medium text-gray-900'>Event Description</label>
                        <textarea name='description' className='block px-2.5 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md appearance-none focus:outline-none focus:border-amber-600 peer' placeholder='Enter Event deescription' required></textarea>
                    </div>

                    <div className='relatuve z-0 w-full mb-6 group'>
                        <label htmlFor='image' className='block mb-2 text-sm font-medium text-gray-900'>Event Image</label>
                        <input type='file' name='image' accept='image/*' className='block px-2.5 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md appearance-none focus:outline-none focus:border-amber-600 peer'/>
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="bg-gray-700 hover:bg-teal-400 text-white rounded-full w-96 p-3 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out hover:text-black mt-6"
                      >
                        Post Event
                      </button>
                    </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default postevent