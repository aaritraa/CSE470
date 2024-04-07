import { useState, createContext } from 'react'
import "bootstrap/dist/css/bootstrap.css" // updated
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./components/Login/login"
import Signup from "./components/Signup/signup"
import Profile from "./components/Profile/profile"
import Services from "./components/Services/services.jsx"
import Events from "./components/Events/events"
import Home from "./components/home.jsx"
import Resources from "./components/resources.jsx"
import VetProfile from "./components/Profile/vetProfile.jsx"
import EditVetProfile from "./components/EditProfile/editprofilevet.jsx"
import Messages from "./components/Inbox/messages.jsx"
import PetShop from "./components/petShop.jsx"
import AdminHome from "./components/adminHome.jsx"
import ProductPayment from "./components/productPayment.jsx"
import ServicePayment from "./components/servicePayment.jsx"
import VetLogin from "./components/Login/vetLogin"
// import Conversation from "./components/Inbox/conversation.jsx"
// <Route path='/conversation' element={<Conversation/>}></Route>

export const UserContext = createContext("")
//export const UserNameContext = createContext("")

function App() {
  const [u, setU] = useState(["",""])
  //const [uName, setUName] = useState("none")

  return (
    <BrowserRouter>
      {/*<UserContext.Provider value={{uName, setUName}}>*/}
      <UserContext.Provider value={{u, setU}}>
        <Routes>
          <Route path='/login' element={<Login/>} > </Route>
          <Route path='/signup' element={<Signup/>} ></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/services' element={<Services/>}></Route>
          <Route path='/events' element={<Events/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/resources' element={<Resources/>}></Route>
          <Route path='/vetProfile' element={<VetProfile/>}></Route>
          <Route path='/editprofilevet' element={<EditVetProfile/>}></Route>
          <Route path='/messages' element={<Messages/>}></Route>
          <Route path='/petShop' element={<PetShop/>}></Route>
          <Route path='/adminHome' element={<AdminHome/>}></Route>
          <Route path="/productPayment/:title/:price" element={<ProductPayment/>}></Route>
          <Route path="/servicePayment/:title/:price" element={<ServicePayment/>}></Route>
          <Route path="/vetLogin" element={<VetLogin/>}></Route>
          {/*<Route path=":price" element={<ProductPayment/>}></Route>*/}
        
        </Routes>        
      </UserContext.Provider>
      {/*</UserContext.Provider>*/}

    </BrowserRouter> 
  )
}

export default App
