import React from 'react';

const WaitingForDriver = ({ setVehiclePanel }) => {
    return (
        <div>
            <h5
                className="p-1 text-center absolute top-0 w-[93%] cursor-pointer"
                onClick={() => setVehiclePanel(false)}
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            <div className='flex items-center justify-between'>
                <img
                    className='h-12'
                    src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                    alt="car/bike/van img"
                />
                <div className='text-right'>
                    <h1 className='text-lg font-medium'>Jhon Doe</h1>
                    <h4 className='text-sl font-semibold -mt-1 -mb-1'>WB 02 M 2025</h4>
                    <p className='text-sm text-gray-600'>BMW</p>
                </div>
            </div>

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
        </div>
    );
};

export default WaitingForDriver;
