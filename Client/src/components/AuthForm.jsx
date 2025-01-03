import React, { useState } from 'react';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log(isLogin ? "Login Data" : "Signup Data", formData);
    // Add login or signup logic here
  };

  return (

    <div className='text-center'>Login</div>
    //                ############### suraj code ... 
    // <div className="flex justify-center items-center h-screen bg-gray-200">
    //   <div className="bg-neutral-300 p-8 rounded-lg shadow-lg w-full max-w-md">
    //     <div className="flex justify-around mb-8">
    //       <button
    //         onClick={() => setIsLogin(true)}
    //         className={`w-1/2 h-15 py-2 font-semibold ${isLogin ? 'bg-red-400 text-white' : 'bg-white text-red-400'} rounded-l-lg`}
    //       >
    //         LOGIN
    //       </button>
    //       <button
    //         onClick={() => setIsLogin(false)}
    //         className={`w-1/2 h-15 py-2 font-semibold ${!isLogin ? 'bg-red-400 text-white' : 'bg-white text-red-400'} rounded-r-lg`}
    //       >
    //         REGISTER
    //       </button>
    //     </div>

    //     <form onSubmit={handleSubmit}>
    //       <div className="mb-4">
    //         <input
    //           type="email"
    //           name="email"
    //           placeholder="Enter email ID"
    //           value={formData.email}
    //           onChange={handleChange}
    //           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 "
    //           required
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <input
    //           type="password"
    //           name="password"
    //           placeholder="Enter password"
    //           value={formData.password}
    //           onChange={handleChange}
    //           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
    //           required
    //         />
    //       </div>
    //       {!isLogin && (
    //         <div className="mb-4">
    //           <input
    //             type="password"
    //             name="confirmPassword"
    //             placeholder="Confirm password"
    //             value={formData.confirmPassword}
    //             onChange={handleChange}
    //             className="w-full px-4 py-2 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-gray-400"
    //             required
    //           />
    //         </div>
    //       )}
    //       {isLogin && (
    //         <div className="text-right mb-4">
    //           <a href="#" className="text-blue-600 hover:underline font-semibold">Forgot password?</a>
    //         </div>
    //       )}
    //       <button
    //         type="submit"
    //         className="w-full bg-red-800 text-white py-2 rounded-xl font-semibold hover:bg-red-800 transition"
    //       >
    //         {isLogin ? 'LOGIN' : 'REGISTER'}
    //       </button>
    //     </form>

    //     <div className="flex items-center my-6">
    //       <hr className="w-full border-gray-800" />
    //       <span className="px-2 text-gray-900">Or</span>
    //       <hr className="w-full border-gray-800" />
    //     </div>

    //     <div className="flex flex-col space-y-4">
    //       <button className="flex items-center justify-center w-full py-2 border rounded-xl border-gray-300 bg-gray-100 transition">
    //         <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Google_logo_%282013-2015%29.svg" alt="Google" className="w-15 h-5 mr-2" />

    //       </button>
    //       <button className="flex items-center justify-center w-full py-2 border rounded-xl border-gray-300 bg-gray-100 transition text-blue-500 font-semibold font-serif">
    //         <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-5 h-5 mr-2" />
    //         Facebook
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default AuthForm;
