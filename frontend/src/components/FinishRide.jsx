import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const FinishRide = (props) => {
    return (
        <div>
            <h5
                className="p-1 text-center absolute top-0 w-[93%] cursor-pointer"
                onClick={() => props.setFinishRidePanel(false)}
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Finsh this ride</h3>
            <div className='flex items-center justify-between mt-4 p-4 rounded-lg border-2 border-yellow-400'>
                <div className="flex items-center justify-between gap-3">
                    <img className='h-12 w-12 rounded-full object-cover' src="https://img.freepik.com/free-photo/handsome-young-man-with-arms-crossed-white-background_23-2148222620.jpg" />
                    <h2 className='text-lg font-medium'>Harsh Patel</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2Km</h5>
            </div>

            <div className='flex gap-2 flex-col justify-between items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm text-gray-600 -mt-1'>Chennai, Tamil Nadu, India</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm text-gray-600 -mt-1'>Chennai, Tamil Nadu, India</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹193.20</h3>
                            <p className='text-sm text-gray-600 -mt-1'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <div className='mt-10 w-full'>
                    <Link to='/captain-home' className='w-full mt-5 flex text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>
                        Finsh Ride
                    </Link>
                    <p className='text-red-500 mt-10 text-xs'>Click on finsih ride button if you have completed the payment.</p>
                </div>
            </div>
        </div>
    )
}

export default FinishRide
