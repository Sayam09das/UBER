import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    const captainData = {
      name: {
        firstName: firstName,
        lastName: lastName,
      },
      email,
      password,
    };

    console.log('Captain Data:', captainData);

    // Clear form after submission
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img
          className='w-20 mb-2'
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber Logo"
        />
        <form onSubmit={submitHandler} className='p-7'>
          <h3 className='text-base font-medium mb-2'>What's Our Captain's Name</h3>
          <div className='flex gap-7 mb-5'>
            <input
              className='bg-[#eeeeee] w-full rounded px-4 py-2 border text-base placeholder:text'
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
        </form>
      </div>

      <div>
        <p className='text-[10px] leading-tight'>
          This site is protected by reCAPTCHA and the{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className='text-blue-600 underline'>
            Google Privacy Policy
          </a>{' '}
          and{' '}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className='text-blue-600 underline'>
            Terms of Service
          </a>{' '}
          apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
