import  { useState } from 'react';
import { signUp } from '../services/signup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate()
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
    const result = await signUp("/signup", formData) //return unique id
    if(!result){return console.log("no result found")}  
        navigate("/")
  };
 
   
  

  return (
    <div className='relative'>
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
};

export default Signup;
