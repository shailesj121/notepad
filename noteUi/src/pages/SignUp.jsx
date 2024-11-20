import  { useRef, useState } from 'react';
import { signUp } from '../services/signup';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

const Signup = () => {
const canvas = useRef(null)

  const navigate = useNavigate()
  const [formvalidation, setFormValidation] = useState("")
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormValidation("")
    const result = await signUp("/signup", formData) //return unique id
    if(!result){return console.log("no result found")}
    if(result.data.message === "user Email already exist") {
      return setFormValidation(result.data.message)
    } 
        navigate("/")
  };
 
   
  

  return (
    <div className='relative'>
    <canvas ref={canvas}></canvas>
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
    <div>{formvalidation? formvalidation: null}</div>
    </div>
  );
};

export default Signup;
