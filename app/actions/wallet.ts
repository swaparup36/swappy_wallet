'use server'

import db from "../middleware/databaseProvider"
import jwt from 'jsonwebtoken';
import 'dotenv';
import { cookies } from "next/headers";
import axios from "axios";

interface walletBalanceFormdataInterface {
    publicAddress: string,
    net: string
}

// Create new wallet
export const createWallet = async(privateKey: string, publicKey: string) => {
    try {
        const token = cookies().get("swappy_wallet_secret")?.value;
        const userId = await jwt.verify(token, process.env.JWT_SECRET).id;

        const wallet = await db.wallet.create({
            data: {
                privateKey: privateKey,
                publicKey: publicKey,
                authorId: userId 
            }
        });

        console.log("wallet: ", wallet);

        return JSON.stringify({ success: true, message: "Wallet Created Successfully" });
    } catch (err) {
        console.log("Can not create new wallet: ", err);
        return JSON.stringify({ success: false, error: err });
    }
}


// Fetch all wallets that a particular user has
export const fetchAllWallets = async() => {
    try {
        const token = cookies().get("swappy_wallet_secret")?.value;
        const userId = await jwt.verify(token, process.env.JWT_SECRET).id;

        const wallets = await db.wallet.findMany({
            where: {
                authorId: userId
            }
        });

        return JSON.stringify({ success: true, wallets: wallets });
    } catch (err) {
        console.log("Can not fetch wallets: ", err);
        return JSON.stringify({ success: false, error: err });
    }
}

// Fetch balance of SOL using wallet's public address
export const getSOLBalance = async(formData: walletBalanceFormdataInterface) => {
    try {
        const token = cookies().get("swappy_wallet_secret")?.value;
        const userId = await jwt.verify(token, process.env.JWT_SECRET).id;

        const wallets = await db.wallet.findMany({
            where: {
                authorId: userId
            }
        });

        if(!wallets) return JSON.stringify({ success: false, error: "User does not have any wallet" });

        if(formData.net === 'devnet'){
            const response = await axios.post('https://solana-devnet.g.alchemy.com/v2/AlZpXuvewHz3Ty-rYFKn1Oc1kuMtDk8e', {
                jsonrpc: "2.0",
                id: 1,
                method: "getBalance",
                params: [formData.publicAddress]
            });

            return JSON.stringify({ success: true, balance: response.data.result.value });
        }else{
            const response = await axios.post('https://solana-mainnet.g.alchemy.com/v2/AlZpXuvewHz3Ty-rYFKn1Oc1kuMtDk8e', {
                jsonrpc: "2.0",
                id: 1,
                method: "getBalance",
                params: [formData.publicAddress]
            });

            return JSON.stringify({ success: true, balance: response.data.result.value });
        }
    } catch (err) {
        console.log("Can not fetch wallets: ", err);
        return JSON.stringify({ success: false, error: err });
    }
}