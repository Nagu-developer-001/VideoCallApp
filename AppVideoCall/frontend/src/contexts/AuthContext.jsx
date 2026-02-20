import { createContext } from "react";
import React, { useContext } from "react";
import httpStatus from "http-status";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({});

export const AuthProvider = ({children})=>{

    const authContext = useContext(AuthContext);

    const [userData,setUserData] = React.useState(authContext);
    //const router = useNavigate();
    const client = axios.create({
        baseURL:"http://localhost:3000/api/v1/users"
    });
    const handleRegister = async(name,username,password)=>{
        try{
            let request = await client.post("/register",{
                name:name,
                username:username,
                password:password,
            });
            if(request.status === 201){
                return request.data.message;
            }
        }catch(err){
            throw err;
        }
    }
    const handleLogin = async(username,password)=>{
        try{
            let request = await client.post("/login",{
            username:username,
            password:password
        });
        if(request.status === httpStatus.OK){
            localStorage.setItem("token",request.data.token);
            
        }
        }catch(err){
            throw err;
        }
}
        
    const router = useNavigate();

    const data = {
        userData,setUserData,handleRegister,handleLogin
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );


};