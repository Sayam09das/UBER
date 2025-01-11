import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Define errorMessage state

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const normalizedVehicleType = vehicleType.toLowerCase();
    const captainData = {
      name: {
        firstname: firstName,
        lastname: lastName
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: normalizedVehicleType,
      },
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
      console.log('Server Response:', response);

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token)
        navigate('/captain-home');
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

    // Clear form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
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
          <h3 className='text-base font-medium mb-2'>Captain's Information</h3>
          <div className='flex gap-5 mb-3'>
            <input
              className='bg-[#eeeeee] w-full rounded px-4 py-2 border text-base'
              type="text"
              placeholder='First Name'
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className='bg-[#eeeeee] w-full rounded px-4 py-2 border text-base'
              type="text"
              placeholder='Last Name'
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input
            className='mb-3 bg-[#eeeeee] rounded px-4 py-2 border w-full text-base'
            type="email"
            placeholder='Email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='mb-3 bg-[#eeeeee] rounded px-4 py-2 border w-full text-base'
            type="password"
            placeholder='Password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h3 className='text-base font-medium mb-2'>Vehicle Details</h3>
          <input
            className='mb-3 bg-[#eeeeee] rounded px-4 py-2 border w-full text-base'
            type="text"
            placeholder='Vehicle Color'
            required
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
          />
          <input
            className='mb-3 bg-[#eeeeee] rounded px-4 py-2 border w-full text-base'
            type="text"
            placeholder='Vehicle Plate Number'
            required
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
          />
          <input
            className='mb-3 bg-[#eeeeee] rounded px-4 py-2 border w-full text-base'
            type="number"
            placeholder='Vehicle Capacity'
            required
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
          />
          <select
            className='mb-5 bg-[#eeeeee] rounded px-4 py-2 border w-full text-base'
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
          >
            <option value="" disabled>Vehicle Type</option>
            <option value="Bike">Bike</option>
            <option value="Van">Van</option>
            <option value="Car">Car</option>
          </select>

          <button
            type="submit"
            className='mb-3 bg-[#111] text-white rounded font-semibold px-4 py-2 w-full text-lg'
          >
            Create Captain Account
          </button>

          <p className='text-sm '>
            Already have an account?{' '}
            <Link to="/login" className='text-blue-600 underline'>
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CaptainSignup;
