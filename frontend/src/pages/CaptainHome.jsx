import { gsap } from 'gsap';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'; // Ensure this component is correctly imported
import { useGSAP } from '@gsap/react';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [ConfirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const ConfirmRidePopupPanelRef = useRef(null);

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, { y: 0, duration: 0.5, ease: 'power2.out' });
    } else {
      gsap.to(ridePopupPanelRef.current, { y: '100%', duration: 0.5, ease: 'power2.in' });
    }
  }, [ridePopupPanel]);

  const toggleRidePopup = () => {
    setRidePopupPanel((prev) => !prev);
  };

  useGSAP(() => {
    if (ConfirmRidePopupPanel) {
      gsap.to(ConfirmRidePopupPanelRef.current, { y: 0, duration: 0.5, ease: 'power2.out' });
    } else {
      gsap.to(ConfirmRidePopupPanelRef.current, { y: '100%', duration: 0.5, ease: 'power2.in' });
    }
  }, [ConfirmRidePopupPanel]);

  return (
    <div className="h-screen">
      {/* Navbar */}
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link
          to="/home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line cursor-pointer"></i>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Captain Driving"
        />
      </div>

      {/* Captain Info */}
      <div className="h-2/5 p-6">
        <div>
          <div className="w-full flex items-center justify-between mt-4 p-3 rounded-lg  bg-green-400">
            <div className="flex items-center justify-start gap-3">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src="https://img.freepik.com/free-photo/man-white_1368-3544.jpg"
                alt="Captain Profile"
              />
              <h4 className="text-lg font-medium">Harsh Patel</h4>
            </div>
            <div>
              <h4 className="text-xl font-semibold">₹295.20</h4>
              <p className="text-sm text-gray-600">Earned</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex p-3 mt-4 mb-4 bg-gray-300 rounded-full justify-center gap-5 items-start">
            <div className="text-center">
              <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
              <h5 className="text-lg font-medium">10.2</h5>
              <p className="text-sm text-gray-600">Hours Online</p>
            </div>
            <div className="text-center">
              <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
              <h5 className="text-lg font-medium">50</h5>
              <p className="text-sm text-gray-600">Completed Rides</p>
            </div>
            <div className="text-center">
              <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
              <h5 className="text-lg font-medium">4.8</h5>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
          </div>

          {/* Button to toggle RidePopUp */}
          <button
            onClick={toggleRidePopup}
            className="w-full py-3 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300"
          >
            {ridePopupPanel ? 'Close Ride Details' : 'Show Ride Details'}
          </button>
        </div>
      </div>

      {/* Ride PopUp */}
      <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-14 shadow-lg rounded-t-3xl">
        <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
      </div>

      {/* Confirm Ride PopUp */}
      <div ref={ConfirmRidePopupPanelRef} className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-14 shadow-lg rounded-t-3xl">
        <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
      </div>

    </div>
  );
};

export default CaptainHome;
