import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SignupImg from '../../assets/login.png';
import background from '../../assets/animal-background-vector-with-cute-pets-illustration_53876-127698.png'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from "../../App.jsx"


function Login() {
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
    e.preventDefault()
    axios.post('http://localhost:5000/login', { email, password }) // sending json body to server for validation
      .then((result) => {
        console.log(result.data)  // result.data=[fullName, userObject]
        //setResult(result)
        if (result.data[0] !== "The password is incorrect") {
          setU([email, result.data[0], "", ""])  // [email, fullName]
          console.log("u :", u)
          console.log("logged in")
          //console.log(result.data[1])
          if(result.data[1].role == 'normal'){
            navigate("/home") // go to home page after login            
          } else if (result.data[1].role == 'admin'){
            navigate("/adminHome") // go to admin home
          }

        }

      })
      .catch(err => console.log(err))
  }

  return (
    <div className=" min-h-screen flex items-center justify-center " style={{ backgroundImage: `url(${background})` }}>
      <div className=" h-500 flex shadow-md font-sans rounded-xl ">
        <div className="rounded-l-xl flex-4 flex flex-col items-center  justify-center bg-white rounded-l-10">
          <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold m-10 mb-8">Log In to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              // onChange={handleChange}
              // value={data.email}
              required
              className="border border-gray-500 rounded py-3 px-4 mb-4 w-72"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative mb-4">
              <input
                type="password"
                placeholder="Password"
                name="password"
                // onChange={handleChange}
                // value={data.password}
                required
                className="border border-gray-500 rounded py-3 px-4 w-72"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-96 h-500 flex rounded-10 shadow-md font-sans"></div>
            <button
              type="submit"
              className="bg-slate-200 hover:bg-blue-200 text-black font-semibold py-2 px-4 mb-10 rounded focus:outline-none focus:shadow-outline w-72 transition duration-300 ease-in-out"
            >
              Log In
            </button>
          </form>
        </div>
                <div className="flex-4 flex flex-col bg-white rounded-r-xl shadow-none">
          <div className='h-full  rounded-r-xl flex flex-column items-center justify-center mr-10'>
            <h1 className="cont-right bg-white  text-2xl font-bold top-0 text-black">New to PetConnect?</h1>
            <img src={SignupImg} alt="Signup" className="w-60  my-3 rounded-xl" />
            <div className="flex items-center justify-center">
              <Link to="/signup">
                <button 
                  type="button"
                  className="mr-2 bg-slate-200 hover:bg-blue-200 text-#57534e-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                >
                  Sign Up
                </button>
              </Link>
              <Link to="/vetlogin">
                <button 
                  type="button"
                  className="bg-slate-200 hover:bg-blue-200 text-#57534e-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                >
                  Vet Login
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
