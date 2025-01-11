import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { captain, setCaptain } = React.useContext(CaptainDataContext);  // Assuming you have setCaptainData in context
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = { email, password };

    try {
      const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/captains/login`, 
          captain
      );

      if (response.status === 200) {
          const data = response.data;
          setCaptain(data.captain);  // Update captain data in context
          localStorage.setItem('token', data.token);
          navigate('/captain-home');
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
          className='w-20 mb-2'
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber Logo"
        />
        <form onSubmit={submitHandler} className='p-7'>
          <h3 className='text-lg font-medium mb-2'>Captain Email</h3>
          <input
            className='mb-7 bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='captain@example.com'
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
            Login as Captain
          </button>

          <p className='text-center'>
            Join a fleet? <Link to="/captain-signup" className='text-blue-600'>Register as a Captain</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CaptainLogin;
