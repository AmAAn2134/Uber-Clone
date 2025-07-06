import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/captainContext";
import axios from "axios";

// This component is used to handle the captain signup process
// It uses the CaptainDataContext to set the captain's details and vehicle details
const Captainsignup = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [captionData, setCaptionData] = React.useState({});
  const {caption ,setCaption}=React.useContext(CaptainDataContext);
     // Vehicle details
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('car'); // Default value 'car'

    const SubmitHandle = async (e) => {
     e.preventDefault();

  const captainData = {
    fullname: {
      firstname: firstName,
      lastname: lastName
    },
    email,
    password,
    vehicle: {
      color: vehicleColor,
      plate: vehiclePlate,
      capacity: vehicleCapacity,
      vehicleType: vehicleType
    }
  };

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    );

    if (response?.data?.token && response?.data?.captain) {
      setCaption(response.data.captain);
      localStorage.setItem("token", response.data.token);
      navigate("/captain-home");
    }
  } catch (error) {
    alert(error?.response?.data?.error || "Failed to register. Please try again.");
    console.error(error);
  }
};

    
  return (
    <div className="bg-white h-screen flex flex-col justify-between p-5">
      <div className="bg-white">
        <h1 className="font-bold text-3xl mb-5"> Uber</h1>
        <form
          action=""
          className=""
          onSubmit={(e) => {
            SubmitHandle();
          }}
        >

          <h3 className="mb-2 text-lg font-medium">What's our Captain's name</h3>
          <div className="flex gap-4 ">
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base "
              placeholder="FirstName"
              value={firstName}
            />

            <input
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base "
              placeholder="LastName"
              value={lastName}
            />
          </div>
          <h3 className="mt-5 mb-3 font-medium text-lg">what's our Captain's Email</h3>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            placeholder="email@example.com"
            value={email}
          />
          <h3 className="mt-5 mb-2 font-medium text-lg"> Enter Password</h3>
          <input
            className="bg-[#eeeeee] w-full rounded px-4 py-2 border "
            type="password"
            required
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Vehicle Color
                </label>
                <input
                    type="text"
                    name="vehicleColor"
                    value={vehicleColor}
                    onChange={(e)=>{ setVehicleColor(e.target.value)}}
                    placeholder="Enter vehicle color"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div className="form-group">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    License Plate
                </label>
                <input
                    type="text"
                    name="vehiclePlate"
                    value={vehiclePlate}
                    onChange={(e)=>{ setVehiclePlate(e.target.value)}}
                    placeholder="Enter license plate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div className="form-group">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Vehicle Capacity
                </label>
                <input
                    type="number"
                    name="vehicleCapacity"
                    value={vehicleCapacity}
                    onChange={(e)=>{ setVehicleCapacity(e.target.value)}}
                    placeholder="Enter passenger capacity"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div className="form-group">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Vehicle Type
                </label>
                <select
                    name="vehicleType"
                    value={vehicleType}
                    onChange={(e)=> setVehicleType(e.target.value)  }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select vehicle type</option>
                    <option value="car">Car</option>
                    <option value="auto">Auto</option>
                    <option value="moto">Motorcycle</option>
                </select>
            </div>
        </div>
          <button className="w-full mt-7 justify-center items-center text-white bg-black p-3 rounded-lg font-semibold" onClick={()=>{
            navigate('/captain-home');
          }}>
            Create  Captain Account
          </button>

          <div className="bg-white flex items-center text-medium justify-center mt-2">
            <span className="text-Black-500 font-semibold text-center">
              Already have an account?
              <a href='/caption-login' className="text-blue-500 font-semibold"> 
              {" "}
              Login here
              </a>
            </span>
          </div>
          
        </form>
      </div>
      <div>
        <p className="text-xs leading-tight mt-6">
          Uber is a ride-hailing app that connects drivers with passengers in a carpool. As a captain, you can create a carpool, manage your carpool, and earn revenue. To start your carpool, create a new carpool and invite your friends to join.
        </p>
      </div>
    </div>
  );
};

export default Captainsignup;
