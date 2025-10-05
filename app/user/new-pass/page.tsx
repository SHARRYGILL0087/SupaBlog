"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your password update logic here
    if (password === confirmPassword) {
      const res = await axios.post("/api/auth/",)
      console.log(res.data)
    } else {
      toast("Passwords do not match!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Set New Password</h2>
          <p className="mt-1 text-sm text-gray-500">Enter your new password.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-3 pr-10 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                      showPassword
                        ? "M3.988 5.485A8.25 8.25 0 0110.5 2.25c2.479 0 4.752.923 6.556 2.486A8.25 8.25 0 0118.75 10.5c0 2.479-.923 4.752-2.486 6.556A8.25 8.25 0 0110.5 18.75c-2.479 0-4.752-.923-6.556-2.486A8.25 8.25 0 012.25 10.5c0-2.479.923-4.752 2.486-6.556zM12 10.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                        : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.009 9.963 7.823.07.29-.01.597-.249.75-.355.234-.51.487-.51.487-.492.213-.64.444-.64.444l-.26.24a1.012 1.012 0 01-.611-.564c-.456-1.558-.99-3.082-1.638-4.593-1.07-2.52-2.673-4.48-4.592-5.592-.51-.318-1.2-.423-1.848-.328-.564.088-1.05.297-1.442.61a1.012 1.012 0 01-.587-.692c-.104-.543-.21-.86-.21-.86s-.34-.78-.71-.97c-.36-.19-.79-.27-1.25-.23-.46.04-.9.2-1.25.46-.35.26-.6.59-.72.93-.11.34-.14.71-.09 1.09.05.38.15.72.29 1.05.14.33.29.65.45.96.16.31.33.61.5.91-.01.01-.02.02-.03.03"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <div className="relative mt-1">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-3 pr-10 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                      showConfirmPassword
                        ? "M3.988 5.485A8.25 8.25 0 0110.5 2.25c2.479 0 4.752.923 6.556 2.486A8.25 8.25 0 0118.75 10.5c0 2.479-.923 4.752-2.486 6.556A8.25 8.25 0 0110.5 18.75c-2.479 0-4.752-.923-6.556-2.486A8.25 8.25 0 012.25 10.5c0-2.479.923-4.752 2.486-6.556zM12 10.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                        : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.009 9.963 7.823.07.29-.01.597-.249.75-.355.234-.51.487-.51.487-.492.213-.64.444-.64.444l-.26.24a1.012 1.012 0 01-.611-.564c-.456-1.558-.99-3.082-1.638-4.593-1.07-2.52-2.673-4.48-4.592-5.592-.51-.318-1.2-.423-1.848-.328-.564.088-1.05.297-1.442.61a1.012 1.012 0 01-.587-.692c-.104-.543-.21-.86-.21-.86s-.34-.78-.71-.97c-.36-.19-.79-.27-1.25-.23-.46.04-.9.2-1.25.46-.35.26-.6.59-.72.93-.11.34-.14.71-.09 1.09.05.38.15.72.29 1.05.14.33.29.65.45.96.16.31.33.61.5.91-.01.01-.02.02-.03.03"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 p-3 text-center font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
}