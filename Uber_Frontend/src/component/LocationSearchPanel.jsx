import { useGSAP } from "@gsap/react";
import React from "react";
import gsap from "gsap";

const LocationSearchPanel = ({ vehiclePanel, setVehiclePanel }) => {
  const locations = [
    "24B, Near Kapoor's cafe, Sheryians Coding School,Bhopal",
    "22C, Near Kapoor's cafe, Sheryians Coding School,Bhopal",
    "20B, Near Kapoor's cafe, Sheryians Coding School,Bhopal",
    "18B, Near Kapoor's cafe, Sheryians Coding School,Bhopal",
  ];
 
  return (
    <div>
      <div>
        {locations.map((location, index) => (
          <div
            key={index}
            className="flex border-2 p-3 rounded-xl border-white active:border-black gap-4 items-center my-4 justify-start"
            onClick={() => setVehiclePanel(!vehiclePanel)}
          >
            <h2 className="bg-[#eee] h-8 w-14 rounded-full flex items-center justify-center">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium "> {location}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
