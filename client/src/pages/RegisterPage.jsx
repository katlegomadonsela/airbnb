import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (event) => {
    event.preventDefault();
    
    try {
      if(name && email && password) {
        await axios.post('/register', {
          name: name,
          email: email, 
          password: password 
        });
        alert("Registration successful!")
      } else {
        alert("Please fill in all fields!")
      }
    } catch(error) {
      alert(error.response.data);
    }
  }

  return (
    <div className="py-14 grow">
      <div className="mt-4 mb-4 pb-5 border border-gray-300 max-w-lg rounded-md mx-auto">
        <div className="text-center border-b py-3">
          <h1 className="text-2xl">Register</h1>
        </div>
        <h1 className="py-5 px-4 text-3xl">Welcome to Airbnb</h1>
        <form className="mx-3" onSubmit={registerUser}>
          <input 
            type='text' 
            placeholder='name' 
            value={name} 
            onChange={(event) => setName(event.target.value)}
          />
          <input 
            type='email' 
            placeholder='your@email.com' 
            value={email} 
            onChange={(event) => setEmail(event.target.value)}
          />
          <input 
            type='password' 
            placeholder='password' 
            value={password} 
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit" className="p-3 bg-primary rounded-md w-full text-white">Register</button>
        </form>
        <div className="mt-3 text-sm text-center text-gray-500">
          <span>Already have an account? </span>
          <Link className="text-sm text-black underline" to="/login">Login here!</Link>  
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;