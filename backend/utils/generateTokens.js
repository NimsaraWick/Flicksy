import jwt from "jsonwebtoken";
import {ENV_VARS} from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId,res)=>{
    const token = jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:"15d"});

    res.cookie("jwt-flicksy",token,{
        maxAge:15*24*60*60*1000, // 15 days in milliseconds
        httpOnly:true, //prevent XSS attacks cross-site scripting attacks
        sameSite:"none",//Required for cross-site cookies
        secure: true, //Required for sameSite: "none"
    });
    return token;
};

