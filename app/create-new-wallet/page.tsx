"use client";

import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { useEffect, useState } from "react";
import bs58 from "bs58";
import { useRouter } from "next/navigation";
import { validateUser } from "../actions/user";
import { createWallet } from "../actions/wallet";

const mnemonic = generateMnemonic();
console.log("The mnemonic is: ", mnemonic);

export default function CreateNewWallet() {
  const router = useRouter();

  const [isCopiedCheck, setIsCopiedChecked] = useState(false);
  const [copiedCheckedErr, setCopiedCheckedErr] = useState("");

  const validate = async() => {
    const result = await validateUser();

    console.log("validation result: ", result);

    const resultObj = JSON.parse(result);

    if(resultObj.success){
        console.log(resultObj.message);
    }else{
        router.push('/signup');
    }
  }

  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const createNewWallet = async() => {
    try {
      if (!isCopiedCheck) {
        setCopiedCheckedErr("click on the checkbox to continue");
        return;
      }

      const seed = mnemonicToSeedSync(mnemonic);
      const path = `m/44'/501'/1'/0'`; // This is the derivation path
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const privateKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const publicKey = Keypair.fromSecretKey(privateKey).publicKey.toBase58();
      console.log("private key: ", bs58.encode(privateKey));
      console.log("public key: ", publicKey);

      const result = await createWallet(bs58.encode(privateKey), publicKey);
      const resultObj = JSON.parse(result);

      if(resultObj.success){
        console.log(resultObj.message);
        router.push("/wallets"); 
      }
    } catch (err) {
      console.error("Failed to create new wallet: ", err);
    }
  };

  useEffect(()=>{
    validate();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[100svh]">
        <div className="flex justify-center items-center flex-col">
          <h2 className="font-semibold text-2xl">Secret Recovery Phrase</h2>
          <p className="text-gray-400 font-semibold my-4">
            Save these words in a safe place
          </p>
        </div>

        <div className="w-[40%] flex flex-wrap justify-between items-start bg-gray-700 rounded-2xl p-5 my-4">
          {mnemonic.split(" ").map((word, i) => {
            return (
              <span
                key={i}
                className="bg-gray-800 px-3 py-2 rounded-xl min-w-[22%] flex justify-start items-center m-2"
              >
                <span className="text-gray-400 mr-4 font-semibold">
                  {i + 1}
                </span>
                <span className="flex justify-center items-center">{word}</span>
              </span>
            );
          })}
        </div>

        <button
          className="rounded-lg bg-gray-700 px-4 py-2 cursor-pointer"
          onClick={copyToClipBoard}
        >
          Click here to copy
        </button>

        <div className="flex flex-col justify-center items-center my-10">
          <div>
            <input
              type="checkbox"
              id="savedmnemonics"
              className="mx-2"
              checked={isCopiedCheck}
              onChange={(e) => {
                setIsCopiedChecked(e.target.checked);
                setCopiedCheckedErr("");
              }}
            />
            <label htmlFor="savedmnemonics">
              I saved my secret recovery phrase
            </label>
          </div>

          <p className="text-sm text-red-500 mb-2">{copiedCheckedErr}</p>

          <button
            className="bg-blue-600 rounded-2xl w-[90%] my-3 py-1"
            onClick={createNewWallet}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
