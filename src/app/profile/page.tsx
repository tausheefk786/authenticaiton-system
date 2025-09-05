"use client";
import axios from "axios";
import Link from "next/link";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";





export default function ProfilePage(){
  const router = useRouter()
  const [data,setData] = useState("nothing")
  const logout = async ()=>{
        try {
          await axios.get('/api/users/logout')
          toast.success('Logout successful')
          router.push('/login')
          
        } catch (error: any) {
            console.log(error.message);

            toast.error(error.message)
        }
  }
  const getuserdetails = async ()=>{
    const res =  await axios.get('/api/users/me')
    console.log(res.data);
    setData(res.data.data)

  }
    

    return (
      <div className="flex flex-col items-center
      justify-center min-h-screen py-2">
        <h1>profile</h1>
        <hr/>
        <p>profile page</p>
        <h2> {data=='nothing' ? "nothing":<Link>
        href={'/profile/${data}'}</Link>}</h2>
        <hr />
        <button
        onClick={logout}
          className=" mt-4 hover: bg-blue-700
          text-white font-bold py-2 px-4 rounded ">
            logout
          </button>
          <button
        onClick={getuserdetails}
          className=" mt-4 hover: bg-blue-700
          text-white font-bold py-2 px-4 rounded ">
            GEt user details
          </button>
      </div>
    );
}