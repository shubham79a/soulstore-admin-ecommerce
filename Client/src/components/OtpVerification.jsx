import React from 'react';

const OtpVerification = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md p-6 rounded-lg bg-gray-300 shadow-md">
        <p className="h-8 mx-10  bg-gray-400"><h3 className="text-center font-semibold text-gray-700 mb-4 mx-10 py-1">VERIFY OTP</h3></p>
        
        <p className="text-center text-gray-600 mb-6">Please enter the 6 digit OTP sent to your email ID</p>
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="w-12 h-12 text-center text-xl rounded bg-gray-100"
            />
          ))}
        </div>
        <div className="text-center text-sm text-gray-600 mb-4">
          Didn’t receive the OTP? <a href="#" className="text-blue-500">Resend OTP</a>
        </div>
        <button className="w-full py-3 bg-red-800 text-white rounded-xl">PROCEED</button>
      </div>
    </div>
  );
};

export default OtpVerification;
