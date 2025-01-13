import { useRef } from 'react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null);

    useGSAP(() => {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                 transform: 'translateY(0)'
            });
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
           });
        }
    }, [finishRidePanel]);

    return (
        <div className="h-screen">
            <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
                <img
                    className="w-16"
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt="Uber Logo"
                />
                <Link
                    to="/captain-home"
                    className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
                >
                    <i className="text-lg font-medium ri-logout-box-r-line cursor-pointer"></i>
                </Link>
            </div>
            <div className="h-4/5">
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="Captain Driving"
                />
            </div>
            <div className="h-1/5 p-6 bg-yellow-400 flex items-center justify-between relative pt-10"
                onClick={() =>{
                    setFinishRidePanel(true)
                }}
            >
                <h5
                    className="p-1 text-center top-0 w-[90%] cursor-pointer absolute"

                >
                    <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
                </h5>
                <h4 className='text-2xl font-semibold'>4 km away</h4>
                <button className='bg-green-600 text-white  font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
            </div>

            <div ref={finishRidePanelRef} className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-14 shadow-lg rounded-t-3xl">
                <FinishRide setFinishRidePanel={setFinishRidePanel}/>
            </div>
        </div>

    )
}

export default CaptainRiding
