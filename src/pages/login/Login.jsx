import React, { useState, useEffect } from "react";

const isEmailValid = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!isEmailValid(value)) {
      setError('Invalid email format.');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      // Submit form
    }
  };
    return (
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center w-full  min-h-screen bg-white px-5 py-5">
          
          <div className="xl:max-w-7xl bg-white drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
            
            <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
              <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#4A07DA]">
                Log In
              </h1>
              <div className="w-full mt-5 sm:mt-8">
                <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                  
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                    onChange={handleEmailChange}
                  />
                  {error && <p>{error}</p>}
                  
                  <input
                    type="Password"
                    placeholder="Enter Your Password"
                    className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                  />
                  
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                    
                    <button type = "submit" className="btn btn-outline btn-primary btn-block max-w-[200px]">
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
        </form>
    );
}