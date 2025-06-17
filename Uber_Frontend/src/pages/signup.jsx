import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/userContext";
const Signup = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const navigate = useNavigate();

  const { user, setUser} = React.useContext(UserDataContext);

  const SubmitHandle = async (e) => {
    const newUser={
      fullname: { 
        firstname: firstName,
        lastname: lastName 
      },
      email:email,
      password:password
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
    console.log(response);
    if(response.status === 201) {
      const data = response.data;
      setUser(data);
      navigate("/home");
    } else {
      alert("Failed to register. Please try again.");
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
            e.preventDefault();
            SubmitHandle();
          }}
        >
          <h3 className="mb-2 text-lg font-medium">What's your name</h3>
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
          <h3 className="mt-5 mb-3 font-medium text-lg">Enter Email</h3>
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
          <button className="w-full mt-7 justify-center items-center text-white bg-black p-3 rounded-lg font-semibold">
            Create Account{" "}
          </button>

          <div className="bg-white flex items-center text-medium justify-center mt-2">
            <span className="text-Black-500 font-semibold text-center">
              Already have an account?
              <a href="/login" className="text-blue-500 font-semibold">
                {" "}
                Login here
              </a>
            </span>
          </div>
        </form>
        
      </div>
        <div>
        <p className="text-xs leading-tight">
          <span className="text-gray-500">
            By clicking Sign Up, you agree to our Terms of Service and Privacy Policy.
          </span>{" "}
          <a href="#" className="text-blue-500">
            Learn more
          </a>{" "}
          about our User Agreement and Cookie Policy.
        </p>
        </div>
    </div>
  );
};

export default Signup;
