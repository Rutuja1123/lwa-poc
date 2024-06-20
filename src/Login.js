import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import cors from 'cors';
// import express, { response } from 'express';

// const app = express();
// app.use(cors());


function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });


  window.amazon.Login.setClientId('amzn1.application-oa2-client.b9bfa72ebbce4766807145912506899d');

  const amazonLoginUrl = "http://localhost:5173/auth/amazon"

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

  window.addEventListener('message', function(event) {
    if (event.origin === 'https://na.account.amazon.com/') {
      console.log('Received message:', event.data);
      // Perform any necessary actions with the received message
    }
  });

  const handleAmazonLogin = function() {
    let options = {};
    options.scope = 'profile';
    options.pkce = true;
    window.amazon.Login.authorize(options, "http://localhost:5173/"
    //   function(response) {
    //   try {
    //     if (response.error) {
    //       alert('Auth response error: ' + response.error);
    //     } else {
    //       // The user successfully logged in, get the access token
    //       var accessToken = response.access_token;
    //       // Use the access token to get the user's profile information
    //       window.amazon.Login.retrieveProfile(function(userProfile) {
    //         try {
    //           // Handle the user's profile information
    //           console.log(userProfile.name);
    //           console.log(userProfile.email);
    //         } catch (error) {
    //           alert('Error retrieving profile: ' + error);
    //         }
    //       });
    //     }
    //   } catch (error) {
    //     alert('Error authorizing: ' + error);
    //   }
    // }
  );
  return false;
  };

//   const handleAmazonLogin = function() {
//     setTimeout(window.doLogin, 30);
//     return false;
//  };
//  window.doLogin = function() {
//      let options = {};
//      options.scope = 'profile';
//      options.pkce = true;
//      window.amazon.Login.authorize(options, function(response) {
//          if ( response.error ) {
//              alert('oauth error ' + response.error);
//          return;
//          }
//          window.amazon.Login.retrieveToken(response.code, function(response) {
//              if ( response.error ) {
//                  alert('oauth error ' + response.error);
//              return;
//              }
//              window.amazon.Login.retrieveProfile(response.access_token, function(response) {
//                  alert('Hello, ' + response.profile.Name);
//                  alert('Your e-mail address is ' + response.profile.PrimaryEmail);
//                  alert('Your unique ID is ' + response.profile.CustomerId);
//                  if ( window.console && window.console.log )
//                     window.console.log(response);
//              });
//          });
//      });
// };

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
            {/* <button
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg focus:outline-none"
              type="submit"
            > */}
              <a href="" id="LoginWithAmazon" onClick={handleAmazonLogin}>
                <img
                  border="0"
                  alt="Login with Amazon"
                  src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
                  width="156"
                  height="32"
                />
              </a>
            {/* </button> */}
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
