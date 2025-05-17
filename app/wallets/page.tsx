'use client'

import React, { useEffect, useState } from 'react';
import { fetchAllWallets, getSOLBalance } from '../actions/wallet';
import Image from 'next/image';
import { ArrowBigUp, ArrowDown, ArrowLeftRight, ArrowUp, ChevronUp } from 'lucide-react';

interface walletBalanceFormdataInterface {
  publicAddress: string,
  net: string
}


function Wallets() {
  const [allWallets, setAllWallets] = useState([]);
  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);
  const [selectedNet, setSelectedNet] = useState('mainnet');
  const [walletBalance, setWalletBalance] = useState(0);

  const getAllWallets = async() => {
    const result = await fetchAllWallets();
    const resultObj = JSON.parse(result);

    if(resultObj.success){
      console.log("All wallets fetched successfully");
      setAllWallets(resultObj.wallets);

      getBalance({ 
        publicAddress: resultObj.wallets[0].publicKey,
        net: 'mainnet'
      });
    }else{
      console.log("Can not fetch wallets: ", resultObj.error);
    }
  }

  const selectedWalletOnChange = (index) => {
    setSelectedWalletIndex(index);
  }

  const selectedNetOnchange = (e) => {
    getBalance({
      publicAddress: allWallets[selectedWalletIndex].publicKey,
      net: e.target.value
    });
    setSelectedNet(e.target.value);
  }

  const getBalance = async(getBalanceFormData: walletBalanceFormdataInterface) => {
    const result = await getSOLBalance(getBalanceFormData);

    const resultObj = JSON.parse(result);

    if(resultObj.success){
      console.log("The balance is: ", resultObj.balance);
      setWalletBalance(resultObj.balance);
    }else{
      console.log("Can't get balance: ", resultObj.error);
    }
  }

  useEffect(()=>{
    getAllWallets();
  }, []);

  return (
    <>
      <div className='flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center w-[80%] h-[100svh]'>
          <div className='w-[50%] flex justify-between items-center'>
            <select name="net" id="net_dropdown" className='w-fit mb-10 px-4 py-2 rounded-3xl bg-transparent border-2 border-gray-500' value={selectedNet} onChange={selectedNetOnchange}>
              <option value="mainnet" className='bg-blue-950 border-2 border-gray-500'>Mainnet</option>
              <option value="devnet" className='bg-blue-950 border-2 border-gray-500'>Devnet</option>
            </select>

            <select name="wallet" id="wallet_dropdown" className='w-[25%] mb-10 px-4 py-2 rounded-3xl bg-transparent border-2 border-gray-500' onChange={() => selectedWalletOnChange(i)}>
              {
                allWallets.map((wallet, i)=>{
                  return <option key={i} value={`wallet ${i+1}`} className='bg-blue-950 border-2 border-gray-500'>{`Wallet ${i+1}`}</option>
                })
              }
            </select>


          </div>
          <div className='bg-gray-800 flex flex-col rounded-lg justify-center w-[50%] items-center p-4'>
            <h3 className='text-2xl font-semibold'>SOL</h3>
            <div className='flex justify-center items-center'>
              <Image src='/images/solana_logo.png' alt='solana_logo' className='my-4' height={80} width={80}/>
            </div>
            <h3 className='text-3xl'>{(walletBalance/1000000000).toFixed(2)}</h3>
            <div className='flex justify-between items-center w-[20%] my-2'>
              <p>$0.00</p>
              <span className='text-green-500 flex justify-between items-center'>
                +15.22%
              </span>
            </div>
            <div className='flex justify-between items-center w-[30%] my-4'>
              <ArrowUp className='bg-blue-950 text-blue-700 rounded-full p-2 font-semibold cursor-pointer' size={40} />
              <ArrowDown className='bg-blue-950 text-blue-700 rounded-full p-2 font-semibold cursor-pointer' size={40} />
              <ArrowLeftRight className='bg-blue-950 text-blue-700 rounded-full p-2 font-semibold cursor-pointer' size={40} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Wallets;