import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SignupImg from '../../assets/login.png';
import background from '../../assets/animal-background-vector-with-cute-pets-illustration_53876-127698.png'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from "../../App.jsx"

function VetLogin() {
    const { u, setU } = useContext(UserContext);
    //console.log(u)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [result, setResult] = useState()
    const navigate = useNavigate()
  
    //const [vetEmail, setVetEmail] = useState("");
    //const [vetName, setVetName] = useState("");
    //const [userEmail, setUserEmail] = useState("");
    //const [userName, setUserName] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/vetLogin', { email, password })// sending json body to server for validation
      .then((result) => {
        console.log(result.data)  // result.data=[fullName, userObject]
        //setResult(result)
        if (result.data[0] !== "The password is incorrect") {
          setU(["", "", email, result.data[0]])  // [email, fullName]
          console.log("u :", u)
          console.log("logged in")
          navigate("/vetProfile");
          //console.log(result.data[1])
        }

      })
      .catch(err => console.log(err))
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="h-700 flex shadow-md font-sans rounded-xl">
        <div className="rounded-l-xl flex-4 flex flex-col items-center justify-center bg-white rounded-l-10">
          <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold m-10 mb-8">Vet Login</h1>
            <input
              type="email"
              placeholder="Email"
              required
              className="border border-gray-500 rounded py-4 px-6 mb-6 w-96"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="border border-gray-500 rounded py-4 px-6 mb-6 w-96"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-slate-200 hover:bg-blue-200 text-black font-semibold py-3 px-6 mb-10 rounded focus:outline-none focus:shadow-outline w-96 transition duration-300 ease-in-out"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  
  
  
}

export default VetLogin;
