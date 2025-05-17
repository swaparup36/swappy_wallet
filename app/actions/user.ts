'use server'

import db from "../middleware/databaseProvider"
import jwt from 'jsonwebtoken';
import 'dotenv';
import { cookies } from "next/headers";

interface RegisterUserInterface {
    email: string,
    firstname: string,
    lastname: string,
    password: string
}

interface LoginUserInterface {
    email: string,
    password: string
}


// Register New User
export const RegisterUser = async(formData: RegisterUserInterface) => {
    try {
        const newUser = await db.user.create({
            data: {
                email: formData.email,
                firstname: formData.firstname,
                lastname: formData.lastname,
                password: formData.password
            }
        });

        const jwtPayload = {
            id: newUser.id,
        };

        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

        cookies().set("swappy_wallet_secret", token, { expires: Date.now() + 1000 * 24 * 60 * 60 * 1000 });

        return JSON.stringify({ success: true, newUser: newUser });
    } catch (err) {
        console.log("Can not register new user: ", err);
        return JSON.stringify({ success: false, error: err });
    }
}

// Login user
export const LoginUser = async(formData: LoginUserInterface) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email: formData.email
            }
        });

        if(!user) return JSON.stringify({ success: false, error: "No user found with this email" })

        if(user?.password !== formData.password){
            return JSON.stringify({ success: false, message: "Password not matched" });
        }

        const jwtPayload = {
            id: user.id,
        };

        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

        cookies().set("swappy_wallet_secret", token, { expires: Date.now() + 1000 * 24 * 60 * 60 * 1000 });

        return JSON.stringify({ success: true, user: user, message: "user loggedin successfully" });
    } catch (err) {
        console.log("Can not register new user: ", err);
        return JSON.stringify({ success: false, error: err });
    }
}

// Validate user
export const validateUser = async() => {
    try {
        const token = cookies().get("swappy_wallet_secret")?.value;
        const userId = await jwt.verify(token, process.env.JWT_SECRET).id;

        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        });

        console.log(user);

        if(!user){
            return JSON.stringify({ success: false, error: "User not found" });
        }

        return JSON.stringify({ success: true, message: "User Validated Successfully" });
        
    } catch (err) {
        console.log("Can not validate user: ", err);
        return JSON.stringify({ success: false, error: err });
    }
}