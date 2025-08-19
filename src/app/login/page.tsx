"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";



export default function LoginPage(){
    const router =useRouter();
    const [user,setuser] = React.useState({
        email: "",
        password: "",
        usename: "",

    })

    const [buttondisabled,setbuttondisabled]= React.useState(false);
    const [loading,setloading]= React.useState(false);



    const onLogin = async ()=>{
        try {
            setloading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("login success",response.data)
            toast.success("login success");
            router.push("/profile");
        } catch (error) {
            console.log("login failed",error.message);
            toast.error(error.message);
        }finally{
            setloading(false);
        }
         
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setbuttondisabled(false);
        }else{
            setbuttondisabled(true);

        }

    },[user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-center text-white">Login</h1>
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
            {/* <Link href="/login">visit login page</Link> */}
            
        </div>
    );
}