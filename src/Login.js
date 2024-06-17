import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  let currentState = "";
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8001/login", values)
      .then((res) => console.log((currentState = res.data.Status)))
      .then((res) => {
        if (currentState == "success") {
          navigate("/");
        }
      })
      .then((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center h-screen select-none">
      <div className="p-4 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form className="py-3 gap-y-3" onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="email"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700"
              required
              placeholder="Enter Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <input
              type="password"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700"
              required
              placeholder="Enter Password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none"
              type="submit"
            >
              Login
            </button>
          </div>

          <div className="mb-4">
            <button
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg focus:outline-none"
              type="submit"
            >
              <a href id="LoginWithAmazon">
                <img
                  border="0"
                  alt="Login with Amazon"
                  src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
                  width="156"
                  height="32"
                />
              </a>
            </button>
          </div>

          <div className="flex flex-row p-2">
            <div>
              <span className="line pr-5 text-blue-600">
                Don't have an account?
              </span>
            </div>
            <div className="text-gray-600 font-semibold text-lg cursor-pointer hover:text-blue-500">
              <Link to="/Register">Register</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
