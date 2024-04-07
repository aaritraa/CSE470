
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from "../../App.jsx"


function PetShop() {
  const { u, setU } = useContext(UserContext);
  console.log(u)

  return (
    <h1>aldfasdf</h1>
  );
}

export default PetShop;