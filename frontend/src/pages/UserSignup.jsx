import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      name: {
        firstName: firstName,
        lastName: lastName,
      },
      email,
      password,
    };

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
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text'
              type="text"
              placeholder='First name'
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text'
              type="text"
              placeholder='Last name'
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className='text-base font-medium mb-2'>What's Your Email</h3>
          <input
            className='mb-5 bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-base'
            type="email"
            placeholder='email@example.com'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <input
            className='mb-5 bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text'
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

          <p className='text-center'>
            Already have an account? <Link to="/login" className='text-blue-600'>Login here</Link>
          </p>
        </form>
      </div>

      <div>
        <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided</p>
      </div>
    </div>
  );
};

export default UserSignup;
