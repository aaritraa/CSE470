import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { useContext } from 'react';
import { UserContext } from "../../App.jsx"
//import { useHistory } from 'react-router-dom';

const Services = () => {

  const { u, setU } = useContext(UserContext);
  const navigate = useNavigate(); 
  //const history = useHistory();

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

  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [filterType, setFilterType] = useState('');


  useEffect(() => {
    axios.get('http://localhost:5000/showServices')
      .then(response => {
        setServices(response.data);
        setFilteredServices(response.data); 
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  }, []); 


  useEffect(() => {
    if (filterType === '') {
      setFilteredServices(services); 
    } else {
      const filtered = services.filter(service => service.type === filterType);
      setFilteredServices(filtered);
    }
  }, [filterType, services]);

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const addToCart = async (service) => {
    try {
      const { title, providerName, rate } = service;
      const data = {
        userEmail,
        product: title,
        providerEmail: providerName,
        amount: rate
      };

      await axios.post('http://localhost:5000/add-to-cart', data);
      alert('Item added to cart successfully!');
      //navigate("/productPayment");
      //navigate({`/productPayment/${product.title}/${product.price}`}); 
      //history.push(`/servicePayment/${title}/${rate}`);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }


    
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-white text-2xl font-bold">Pet Connect</span>
          <div>
            <button onClick={() => navigate("/home")} className="mr-5 text-white font-semibold hover:text-gray-300 transition duration-300 ease-in-out bg-red-500 hover:bg-red-600 rounded-md px-3 py-2 text-sm">Home</button>
            <button onClick={() => navigate("/login")} className="text-white font-semibold hover:text-gray-300 transition duration-300 ease-in-out bg-red-500 hover:bg-red-600 rounded-md px-3 py-2 text-sm">Log Out</button> 
          </div>
          
         </div>
      </nav>

    
      <div className="container mx-auto mt-4 flex justify-center">
        <label htmlFor="filter" className="mr-2">Filter by Service Type:</label>
        <select id="filter" onChange={handleFilterChange} className="px-2 py-1 border rounded" style={{ backgroundColor: '#f3f4f6', color: '#374151' }}>
          <option value="">All</option>
          <option value="Messaging">Messaging</option>
          <option value="Voice Call">Voice Call</option>
          <option value="Video Call">Video Call</option>
        </select>
      </div>

     
      <div className="container mx-auto mt-4 flex justify-center">
        <div className="grid grid-cols-1 justify-center gap-4">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <div key={service._id} className="bg-gray-200 p-4 rounded-lg">
                <h2 className="font-bold text-xl mb-2">{service.title}</h2>
                <p className="font-semibold">Provider: {service.providerName}</p>
                <p className="font-semibold">Type: {service.type}</p>
                <p className="font-semibold">Charge: {service.rate} BDT</p>
                <p className="text-gray-700">{service.description}</p>
                {(vetEmail === "" || vetEmail === null) && ( 
                  <Link to={`/servicePayment/${service.title}/${service.rate}`}>
                    <button onClick={() => addToCart(service)} className="mt-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                      Book Now
                    </button>                  
                  </Link>

                )}
              </div>
            ))
          ) : (
            <div className='bg-white rounded-lg border-2 border-red-500 shadow p-6 mb-4 mt-10 flex items-center justify-center'>
              <p className='text-gray-700 font-bold'>No services available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
