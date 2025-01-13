import React from 'react';

const LocationSearchPanel = (props) => {
  const locations = [
    "G8VV+X46, Victoria Terrace, Maidan, Elgin, Kolkata",
    "JBS Haldane Ave, Mirania Gardens, East Topsia, Topsia, Kolkata",
    "2, Alipore Rd, Alipur Zoological Garden, Alipore, Kolkata",
    "27, Jawaharlal Nehru Rd, Fire Brigade Head Quarter, New Market Area, Dharmatala, Taltala, Kolkata",
  ];

  return (
    <div>
      {locations.map((location, index) => (
        <div
          key={index}
          onClick={() =>{
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
          }}
          className="flex items-center justify-start gap-4 my-2 border-2 border-gray-600 active:border-black rounded-xl p-3 cursor-pointer"
        >
          <h2 className="bg-[#eee] h-8 w-8 flex items-center justify-center rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
