"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast"; // Tambahkan import ini

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Fungsi Login Google
  const handleGoogleSuccess = async (response) => {
    try {
      const res = await fetch(
        "https://moodratio-backend-production.up.railway.app/api/auth/google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: response.credential }),
        }
      );
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("userId", data.user.id);
        toast.success(`Selamat datang, ${data.user.name}! 👋`); // Ganti alert ke toast
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error("Koneksi ke server gagal!"); // Ganti alert ke toast
    }
  };

  // Fungsi Login Manual
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://moodratio-backend-production.up.railway.app/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("userId", data.user.id);
        toast.success(`Selamat datang kembali, ${data.user.name}! 👋`); // Ganti alert ke toast
        router.push("/dashboard");
      } else {
        toast.error("Email atau Password salah!"); // Ganti alert ke toast
      }
    } catch (err) {
      toast.error("Server tidak merespon!"); // Ganti alert ke toast
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white w-full">
      <div className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-[#2D31FA] mb-8 text-center">
          Login Mood Ratio Planner
        </h1>

        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Login Google Gagal")}
          />
        </div>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm font-bold uppercase tracking-widest">
            ATAU
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 bg-gray-50 rounded-2xl text-black border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 bg-gray-50 rounded-2xl text-black border focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full py-4 bg-[#2D31FA] text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
            Masuk
          </button>

          <p className="text-center mt-6 text-gray-500 font-medium">
            Belum punya akun?{" "}
            <a
              href="/register"
              className="text-[#2D31FA] font-bold hover:underline"
            >
              Daftar Sekarang
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
