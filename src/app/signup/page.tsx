"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {
    try {
      const response = await axios.post("/api/signup", user);
      console.log("Signup success:", response.data);

      // redirect to login after success
      router.push("/login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900">
      <h1 className="text-3xl font-bold text-white">Sign Up</h1>
      <hr className="w-1/2 my-4" />

      <label htmlFor="username" className="text-white">Username</label>
      <input
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
        className="mb-2 px-3 py-2 rounded text-black"
      />

      <label htmlFor="email" className="text-white">Email</label>
      <input
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="mb-2 px-3 py-2 rounded text-black"
      />

      <label htmlFor="password" className="text-white">Password</label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        className="mb-4 px-3 py-2 rounded text-black"
      />

      <button
        onClick={onSignup}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        Signup here
      </button>

      <Link href="/login" className="text-blue-400 hover:underline">
        Visit login page
      </Link>
    </div>
  );
}
