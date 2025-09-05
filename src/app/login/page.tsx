"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast"; // ✅ import toast

export default function LoginPage() {
  const router = useRouter();
  const [user, setuser] = React.useState({
    email: "",
    password: "",
  });

  const [buttondisabled, setbuttondisabled] = React.useState(true);
  const [loading, setloading] = React.useState(false);

  const onLogin = async () => {
    try {
      setloading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login success", response.data);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setbuttondisabled(false);
    } else {
      setbuttondisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white">
        {loading ? "Processing..." : "Login"}
      </h1>
      <hr />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setuser({ ...user, email: e.target.value })}
        placeholder="Enter your email"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setuser({ ...user, password: e.target.value })}
        placeholder="Enter your password"
      />

      <button
        onClick={onLogin}
        disabled={buttondisabled || loading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {buttondisabled ? "Fill all fields" : "Login"}
      </button>

      <p className="mt-4">
        Don’t have an account? <Link href="/signup">Signup here</Link>
      </p>
    </div>
  );
}
