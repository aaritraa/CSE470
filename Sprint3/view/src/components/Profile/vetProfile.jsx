import React, { useState, useEffect } from 'react';
import axios from 'axios';
import vetDP from '../../assets/vetprofile.png';
import { Link, useNavigate } from 'react-router-dom'; 
import { useContext } from 'react';
import { UserContext } from "../../App.jsx"

const VetProfile = () => {
  //const navigate = useNavigate(); 
  const [vet, setVet] = useState(null);
  const [services, setServices] = useState([]);

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

  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    if (!userEmail && !vetEmail) {
      if (first === "" && second === "") {
        setVetEmail(third);
        setVetName(fourth);
        setEmail(third);
        setUser(fourth);
      } else {
        setUserEmail(first);
        setUserName(second);
        setEmail(first);
        setUser(second);
      }
    }
  }, [first, second, third, fourth, userEmail, vetEmail]);


  const [error, setError] = useState('');
  const [newService, setNewService] = useState({
    title: '',
    type: '',
    rate: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewService(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    axios.post('http://localhost:5000/addService', {
      ...newService,
      providerEmail: vetEmail,
      providerName: vetName
    })
    .then(response => {
      console.log("1", response.data)
      setServices(prevState => [...prevState, response.data.service]);
      console.log("2", services)
      setNewService({
        title: '',
        type: '',
        rate: '',
        description: ''
      });
      console.log("3", newService)
      setError('');
      alert('Service added successfully!');
      //navigate("/vetProfile");
    })
    .catch(error => {
      console.error('Error adding service:', error);
      setError('Error adding service');
    });
  };
  

  useEffect(() => {
    axios.get(`http://localhost:5000/getVetProfile/${vetEmail}`)
      .then(response => {
        setVet(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching vet profile:', error);
      });

    axios.get(`http://localhost:5000/getServicesByVetEmail/${vetEmail}`)
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching services provided by vet:', error);
      });
  }, [vetEmail]);

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-white text-2xl font-bold">Pet Connect</span>
          <div className="flex items-center">
            <button 
              onClick={() => navigate("/messages")} 
              className="text-white font-semibold hover:text-gray-300 transition duration-300 ease-in-out bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 text-sm"
              style={{
                borderRadius: '0.375rem',
                backgroundColor: '#007bff',
                padding: '0.5rem 1rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.3s ease, color 0.3s ease',
              }}
            >
              Messages
            </button>
            <div style={{ width: '20px' }}></div> {/* Adding space */}
            <button 
              onClick={() => navigate("/login")} 
              className="text-white font-semibold hover:text-gray-300 transition duration-300 ease-in-out bg-red-500 hover:bg-red-600 rounded-md px-3 py-2 text-sm"
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-8">
        {vet ? (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="text-center mb-4">
              <img src={vetDP} alt="Vet Profile Image" className="rounded-full h-32 w-32 mx-auto mb-4" />
              <p className="text-xl font-bold">{vet.name}</p>
            </div>
            <div className="flex justify-between items-center mb-4"> 
              <h2 className="text-2xl font-bold">Profile</h2>
              {(userEmail === null || userEmail === "") && (
                <Link to="/editprofilevet" className="text-blue-500 hover:text-blue-700 font-semibold">Edit Profile</Link>
              )}
            </div>
            <p><span className="font-bold">Email: </span> {vet.email}</p>
            <p><span className="font-bold">Qualification: </span> {vet.qualification}</p>
            <p><span className="font-bold">Work: </span> {vet.workplace}</p>
            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">Services Provided</h2>
              {services.length > 0 ? (
                services.map(service => (
                  <div key={service._id} className="bg-gray-100 p-4 rounded-md mb-4">
                    <p><span className="font-bold">Title:</span> {service.title}</p>
                    <p><span className="font-bold">Type:</span> {service.type}</p>
                    <p><span className="font-bold">Description:</span> {service.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-700 font-bold">No services provided by vet.</p>
              )}
            </div>
            <Link to="/services" className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">View All</Link>
            <div>
  <h2 className="text-2xl font-bold mt-8 mb-4">Add a Service</h2>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Service Title: </label>
      <input
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="title"
        value={newService.title}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Service Type: </label>
      <input
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="type"
        value={newService.type}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Choose a Service Rate: (in BDT) </label>
      <input
        type="number"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="rate"
        value={newService.rate}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 font-bold mb-2">Service Description: </label>
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="description"
        value={newService.description}
        onChange={handleChange}
        required
      ></textarea>
    </div>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
      Submit for Review
    </button>
  </form>
  {error && <p className="text-red-500 text-xs italic">{error}</p>}
</div>

          </div>

        
          

          
        ) : (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p className="text-gray-700 font-bold">Loading vet profile...</p>
          </div>
        )}
      </div>


      
    </div>
  );
};

export default VetProfile;
