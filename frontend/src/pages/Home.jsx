import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import { use } from 'react';
const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
   if(panelOpen){
    gsap.to(panelRef.current, {
      height: '70%',
      duration: 0.5,
      ease: 'power2.inOut',
      opacity: 1
    });
    gsap.to(panelCloseRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.inOut',
    });
   }else{
    gsap.to(panelRef.current, {
      height: '0%',
      duration: 0.5,
      ease: 'power2.inOut',
      opacity: 0
    });

    gsap.to(panelCloseRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    });
   }
  }, [panelOpen]);

  return (
    <div className="h-screen relative">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />
      <div className="h-screen w-screen">
        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="background"
        />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5 ref={panelCloseRef} onClick={() =>{
            setPanelOpen(false)
          }} className='absolute opacity-0 cursor-pointer right-6 top-6 text-xl'>
            <i class="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[35%] left-10 bg-gray-700 rounded-full"></div>

            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Enter pickup location"
            />

            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Enter destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-red-500 h-0 opacity-0"></div>
      </div>
    </div>
  );
};

export default Home;
