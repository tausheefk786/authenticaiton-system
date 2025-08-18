"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";



export default function LoginPage(){
    const [user,setuser] = React.useState({
        email: "",
        password: "",
        usename: "",

    })

    const onLogin = async ()=>{
         
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-center text-white">signUP</h1>
            <hr/>
            
            <label htmlFor="email">email</label>
            <input

            id="email"
            type="text"
            value={user.email}
            onChange={(e)=> setuser({...user,email: e.target.value})}
            placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input

            id="password"
            type="text"
            value={user.password}
            onChange={(e)=> setuser({...user,password: e.target.value})}
            placeholder="password"
            />
            <button
                onClick={onLogin}
                className="">Signup here
            </button>
            <Link href="/login">visit login page</Link>
            
        </div>
    );
}