import React from 'react';
import Image from 'next/image';
import { ChevronDown, Wallet } from 'lucide-react';

function Navbar() {
  return (
    <div className='flex justify-center items-center py-3'>
        <div className='w-[80%] flex justify-between items-center'>
            <Image className='cursor-pointer' src="/images/swappy-logo-white.png" alt='swappy-wallet-logo' width={150} height={150} />

            <ul className='flex justify-between items-center text-white'>
                <li className='text-[1rem] cursor-pointer font-semibold px-4 flex items-center justify-between'>Products <ChevronDown /></li>
                <li className='text-[1rem] cursor-pointer font-semibold px-4'>API & Docs</li>
                <li className='text-[1rem] cursor-pointer font-semibold px-4'>FAQ</li>
                <li className='text-[1rem] cursor-pointer font-semibold px-4'>Company</li>
            </ul>

            <div className='flex items-center justify-evenly'>
                <Wallet className='cursor-pointer' />
                <button className='rounded-3xl px-5 py-2 mx-3 bg-blue-600'>
                  Get Started
                </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar;