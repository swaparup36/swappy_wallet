'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import { RegisterUser } from '../actions/user';
import { useRouter } from 'next/navigation';

function Signup() {
    const router = useRouter();

    const [signupFormdata, setSignupFormdata] = useState({
        email: "",
        firstname: "",
        lastname: "",
        password: ""
    });

    const signupFormOnChange = (e) => {
        setSignupFormdata({ ...signupFormdata, [e.target.name]: e.target.value });
    }

    const handleSignup = async(e) => {
        e.preventDefault();

        const result = await RegisterUser(signupFormdata);
        const resultObj = JSON.parse(result);

        if(resultObj.success){
            console.log("User registered successfully");
            router.push('/create-new-wallet');
        }
    }

  return (
    <>
        <div className='flex flex-col justify-center items-center h-[100svh]'>
            <div className="flex justify-center items-center flex-col">
                <h2 className="font-semibold text-2xl">Signup</h2>
                <p className="text-gray-400 font-semibold my-4">
                    Already have an account? <Link className='underline cursor-pointer' href={'/login'}>login</Link>
                </p>
            </div>

            <form onSubmit={handleSignup} className='flex flex-col items-center justify-center my-4 w-[50%] bg-gray-700 rounded-2xl p-6'>
                <div className='flex justify-between items-center w-full my-2'>
                    <div className='flex flex-col justify-center items-start w-[49%] mr-1'>
                        <label className='my-1' htmlFor="firstname">First Name</label>
                        <input className='bg-transparent border-2 border-gray-500 w-full px-2 py-1 rounded-lg' type="text" id='firstname' name='firstname' value={signupFormdata.firstname} onChange={signupFormOnChange} />
                    </div>
                    <div className='flex flex-col justify-center items-start w-[49%] ml-1'>
                        <label className='my-1' htmlFor="lastname">Last Name</label>
                        <input className='bg-transparent border-2 border-gray-500 w-full px-2 py-1 rounded-lg' type="text" id='lastname' name='lastname' value={signupFormdata.lastname} onChange={signupFormOnChange} />
                    </div>
                </div>

                <div className='w-full flex-col flex justify-center items-start my-2'>
                    <label className='my-1' htmlFor="email">Email</label>
                    <input className='bg-transparent border-2 border-gray-500 w-full px-2 py-1 rounded-lg' type="email" id='email' name='email' value={signupFormdata.email} onChange={signupFormOnChange} />
                </div>

                <div className='w-full flex flex-col justify-center items-start my-2'>
                    <label className='my-1' htmlFor="password">Password</label>
                    <input className='bg-transparent border-2 border-gray-500 w-full px-2 py-1 rounded-lg' type="password" id='password' name='password' value={signupFormdata.password} onChange={signupFormOnChange} />
                </div>

                <div className='w-full flex justify-center items-center my-2'>
                    <button className="bg-blue-600 rounded-2xl w-full my-3 py-1">Signup</button>
                </div>
            </form> 
        </div>
    </>
  )
}

export default Signup;