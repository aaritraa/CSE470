import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { useContext } from 'react';
import { UserContext } from "../../App.jsx"

const EditProfileVet = () => {

  const { u, setU } = useContext(UserContext);
  const navigate = useNavigate(); 
  const first = u[0];
  const second = u[1];
  const third = u[2];
  const fourth = u[3];
  const [vetEmail, setVetEmail] = useState("");
  const [vetName, setVetName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  //const [email, setEmail] = useState("");
  //const [user, setUser] = useState("");

  useEffect(() => {
    if (!userEmail && !vetEmail) {
      if (first === "" && second === "") {
        setVetEmail(third);
        setVetName(fourth);
        //setEmail(third);
        //setUser(fourth);
      } else {
        setUserEmail(first);
        setUserName(second);
        //setEmail(first);
        //setUser(second);
      }
    }
  }, [first, second, third, fourth, userEmail, vetEmail]);
  const [vet, setVet] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [qualification, setQualification] = useState('');
  const [workplace, setWorkplace] = useState('');




  useEffect(() => {
    if (!vetEmail) {
      //navigate("/login");
    } else {
      axios.get(`http://localhost:5000/getVetProfile/${vetEmail}`)
        .then(response => {
          setVet(response.data[0]);
          setName(response.data[0].name);
          setEmail(response.data[0].email);
          setQualification(response.data[0].qualification);
          setWorkplace(response.data[0].workplace);
        })
        .catch(error => {
          console.error('Error fetching vet profile:', error);
        });
    }
  }, [vetEmail, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedVet = { name, email, qualification, workplace };
    axios.put(`http://localhost:5000/updateVetProfile/${vet._id}`, updatedVet)
      .then(() => {
        alert('Profile updated successfully!');
        navigate("/vetProfile"); 
      })
      .catch(error => {
        console.error('Error updating vet profile:', error);
        alert('Failed to update profile. Please try again.');
      });
  };

  return (

    <div>
      <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-white text-2xl font-bold">Pet Connect</span>
        <button onClick={() => navigate("/login")} className="text-white font-semibold hover:text-gray-300 transition duration-300 ease-in-out bg-red-500 hover:bg-red-600 rounded-md px-3 py-2 text-sm">Log Out</button>
      </div>
      </nav>

    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 bg-gray-100 rounded-md py-2 px-4 w-full"
          />
        </div>
        <div className="mb-4">
         <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            disabled 
            className="border-b-2 border-blue-500 bg-gray-100 rounded-md py-2 px-4 w-full cursor-not-allowed"
          />
        <p className="text-sm text-gray-500">You can not change your email.</p>
        </div>

        <div className="mb-4">
          <label htmlFor="qualification" className="block text-gray-700 font-bold mb-2">Qualification</label>
          <input
            type="text"
            id="qualification"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 bg-gray-100 rounded-md py-2 px-4 w-full"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="workplace" className="block text-gray-700 font-bold mb-2">Workplace</label>
          <input
            type="text"
            id="workplace"
            value={workplace}
            onChange={(e) => setWorkplace(e.target.value)}
            className="border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 bg-gray-100 rounded-md py-2 px-4 w-full"
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
            Update Profile
          </button>
          <Link to="/vetProfile" className="text-blue-500 hover:text-blue-700 font-bold py-2 px-6">
            Back
          </Link>
        </div>
      </form>
    </div>

    </div>
  );
};

export default EditProfileVet;
