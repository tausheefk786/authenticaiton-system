"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const[buttonDisabled,setButtonDisabled] = React.useState(false);
  useState(false);
  const [loading,setloading] = React.useState(false);

  const onSignup= async()=>{
    try {
      setloading(true);
      const response= await axios.post("/api/users/signup",user)
      console.log("signup success",response.data);
      router.push("/login");
    } catch (error:any) {
      console.log("signup failed",error.message);
      toast.error(error.message)
    }finally{
      setloading(false);
    }

  }
  useEffect(()=>{
    if(user.email.length>0 && user.password.length >0 && user.username.length>0 ){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }

  },[user]);



  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900">
      <h1 className="text-3xl font-bold text-white">{loading? "processing": "signup"}</h1>
      <hr className="w-1/2 my-4" />

      <label htmlFor="username" className="text-white">Username</label>
      <input
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
        className="mb-2 px-3 py-2 rounded text-white"
      />

      <label htmlFor="email" className="text-white">Email</label>
      <input
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="mb-2 px-3 py-2 rounded text-white"
      />

      <label htmlFor="password" className="text-white">Password</label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        className="mb-4 px-3 py-2 rounded text-white"
      />

      <button
        onClick={onSignup}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
       {buttonDisabled? "No signup":"Signup"}
      </button>

      <Link href="/login" className="text-blue-400 hover:underline">
        Visit login page
      </Link>
    </div>
  );
}
