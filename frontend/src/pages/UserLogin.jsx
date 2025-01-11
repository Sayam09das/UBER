import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';
import axios from 'axios';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});


  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate()



  const submitHandler = async (e) => { 
    e.preventDefault();

    const userData = {
        email,
        password,
    };

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/users/login`, 
            userData
        );

        if (response.status === 200) {
            const data = response.data;
            setUser(data.user);
            localStorage.setItem('token', data.token);
            navigate('/home');
        }
    } catch (error) {
        console.error("Error during login:", error);
    }

    setEmail('');
    setPassword('');

};

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img
          className='w-16 ml-8'
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <form onSubmit={submitHandler} className='p-7'>
          <h3 className='text-lg font-medium mb-2'>What's Your Email</h3>
          <input
            className='mb-7 bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className='mb-7 bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className='mb-3 bg-[#111] text-white rounded font-semibold px-4 py-2 w-full text-lg'
          >
            Login
          </button>
          <p className='text-center'>
            New here? <Link to="/signup" className='text-blue-600'>Create new account</Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to="/captain-login"
          className='mb-5 bg-[#10b461] flex items-center justify-center text-white rounded font-semibold px-4 py-2 w-full text-lg'
        >
          Sign in as a Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
