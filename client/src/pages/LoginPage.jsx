import React, {useContext, useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const {user, setUser} = useContext(UserContext);

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      if(email && password) {
        const response = await axios.post('/login', {email,password}, {withCredentials: true});
        setUser(response.data);
        alert("Succesfully logged in!!");
        setRedirect(true);
      } else {
        alert("Please fill in all input fields!");
      }
    } catch(e) {
      console.log(e);
      alert("An error ocurred, please try again!!")
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="py-14 grow">
      <div className="mt-4 mb-4 pb-5 border border-gray-300 max-w-lg rounded-md mx-auto">
        <div className="text-center border-b py-3">
          <h1 className="text-2xl">Log in</h1>
        </div>
        <h1 className="py-5 px-4 text-3xl">Welcome to Airbnb</h1>
        <form className="mx-3" onSubmit={loginUser}>
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
          <button type="submit" className="p-3 bg-primary rounded-md w-full text-white">
            Log in
          </button>
        </form>
        <div className="mt-3 text-sm text-center text-gray-500">
          <span>Don't have an account yet? </span>
          <Link className="text-sm underline text-black" to="/register">Register here!</Link>  
        </div>
      </div>
    </div>
  );
};

export default LoginPage;