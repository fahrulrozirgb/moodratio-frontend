"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Akun berhasil dibuat! Silakan Login. ✨");
        router.push("/login");
      } else {
        toast.error("Pendaftaran gagal, email mungkin sudah ada.");
      }
    } catch (err) {
      toast.error("Gagal terhubung ke server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FD] w-full">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white p-10 rounded-[40px] shadow-xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-[#2D31FA] text-center mb-4">
          Daftar MoodRatioPlanner
        </h1>
        <input
          type="text"
          placeholder="Nama Lengkap"
          required
          className="w-full p-4 bg-gray-50 rounded-2xl text-black border focus:ring-2 focus:ring-[#2D31FA] outline-none"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-4 bg-gray-50 rounded-2xl text-black border focus:ring-2 focus:ring-[#2D31FA] outline-none"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-4 bg-gray-50 rounded-2xl text-black border focus:ring-2 focus:ring-[#2D31FA] outline-none"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button className="w-full py-4 bg-[#2D31FA] text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          Buat Akun
        </button>
        <p className="text-center text-gray-500">
          Sudah punya akun?{" "}
          <a href="/login" className="text-[#2D31FA] font-bold">
            Masuk di sini
          </a>
        </p>
      </form>
    </div>
  );
}
