"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import { LoginUser } from '../actions/user';
import { useRouter } from 'next/navigation';

function Login() {
    const router = useRouter();

    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: ""
    });

    const loginFormdataOnchange = (e) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    }

    const handleLogin = async(e) => {
        e.preventDefault();

        const result = await LoginUser(loginFormData);

        const resultObj = JSON.parse(result);

        if(resultObj.success){
            console.log(resultObj.message);
            router.push("/wallets");
        }else{
            console.log("Can not fetch wallets: ", resultObj.error);
        }
    }

  return (
    <>
        <div className='flex flex-col justify-center items-center h-[100svh]'>
            <div className="flex justify-center items-center flex-col">
                <h2 className="font-semibold text-2xl">Login</h2>
                <p className="text-gray-400 font-semibold my-4">
                    Already have an account? <Link className='underline cursor-pointer' href={'/login'}>login</Link>
                </p>
            </div>

            <form onSubmit={handleLogin} className='flex flex-col items-center justify-center my-4 w-[40%] bg-gray-700 rounded-2xl p-6'>
                <div className='w-full flex-col flex justify-center items-start my-2'>
                    <label className='my-1' htmlFor="email">Email</label>
                    <input className='bg-transparent border-2 border-gray-500 w-full px-2 py-1 rounded-lg' type="email" id='email' name='email' value={loginFormData.email} onChange={loginFormdataOnchange} />
                </div>

                <div className='w-full flex flex-col justify-center items-start my-2'>
                    <label className='my-1' htmlFor="password">Password</label>
                    <input className='bg-transparent border-2 border-gray-500 w-full px-2 py-1 rounded-lg' type="password" id='password' name='password' value={loginFormData.password} onChange={loginFormdataOnchange} />
                </div>

                <div className='w-full flex justify-center items-center my-2'>
                    <button className="bg-blue-600 rounded-2xl w-full my-3 py-1">Login</button>
                </div>
            </form> 
        </div>
    </>
  )
}

export default Login;