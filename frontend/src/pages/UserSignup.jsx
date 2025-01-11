import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/userContext';

const UserSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); 
  const { user, setUser } = useContext(UserDataContext); 

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      name: {  // Wrap firstname and lastname inside name object
        firstname: firstName,    
        lastname: lastName
      },
      email, 
      password,
    };
    
    console.log('Sending Payload:', newUser); // Log the payload being sent
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      console.log('Server Response:', response); // Log the full server response
    
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        navigate('/home');
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        console.log("Error Response Data:", error.response.data); // Log full error data
        if (error.response.data.errors) {
          error.response.data.errors.forEach((err, index) => {
            console.log(`Error ${index + 1}:`, err); // Log each error in the array
          });
        }
        setErrorMessage(error.response.data.message || 'An error occurred during registration.');
      } else if (error.request) {
        setErrorMessage('No response from server. Please try again later.');
      } else {
        setErrorMessage('Error: ' + error.message);
      }
    }
    
    setFirstName('');
    setLastName('');
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
          <h3 className='text-base font-medium mb-2'>What's Your Name</h3>
          <div className='flex gap-7 mb-5'>
            <input
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base'
              type="text"
              placeholder='First name'
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base'
              type="text"
              placeholder='Last name'
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className='text-base font-medium mb-2'>What's Your Email</h3>
          <input
            className='mb-5 bg-[#eeeeee] rounded px-4 py-2 border w-full text-base'
            type="email"
            placeholder='email@example.com'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <input
            className='mb-5 bg-[#eeeeee] rounded px-4 py-2 border w-full text-base'
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
            Sign Up
          </button>

          {errorMessage && (
            <p className='text-red-500 text-center'>{errorMessage}</p>
          )}

          <p className='text-center'>
            Already have an account? <Link to="/login" className='text-blue-600'>Login here</Link>
          </p>
        </form>
      </div>

      <div>
        <p className='text-[10px] leading-tight'>
          By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
