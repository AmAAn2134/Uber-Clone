import React from "react";
import { Link } from "react-router-dom";

const CaptainHome = () => {
  return (
    <div className="h-screen bg-white flex flex-col justify-around">
      {/* Header */}
      <div className="fixed p-3 flex items-center justify-between w-screen bg-white z-10">
        <h1 className="text-3xl font-semibold">Uber</h1>
        <Link
          to="/home"
          className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Image Section */}
      <div className="h-1/2 mt-16">
        <img
          className="h-full w-full object-cover"
          src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg"
          alt="Uber Captain"
        />
      </div>

      {/* Captain Info Section */}
      <div className="h-1/2 px-5 flex flex-col justify-center items-center">
        <div className="text-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Captain Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold">Harsh Patel</h4>
          <h5 className="text-gray-600">Captain Status: Active</h5>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
