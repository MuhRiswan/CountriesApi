"use client";
import React, { useState, useCallback, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import { api } from "../api/api";
import Link from "next/link";

export const SearchBar = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [countryName, setCountryName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getCountry = useCallback(async () => {
    // Jika tidak ada nama negara yang diinputkan, reset data negara dan pesan kesalahan
    if (!countryName) {
      setCountries([]);
      setError("");
      setLoading(false);
      return;
    }
    // Set status loading menjadi true
    setLoading(true);
    try {
      const response = await api.getCountries(countryName);
      // Set data negara dan reset pesan kesalahan
      setCountries(response.slice(0, 5));
      setError("");
    } catch {
      // Jika terjadi error, reset data negara dan pesan kesalahan
      setCountries([]);
      setError("Data tidak ditemukan");
    } finally {
      // Set status loading menjadi false
      setLoading(false);
    }
  }, [countryName]);

  // Jalankan getCountry setiap kali nama negara berubah
  useEffect(() => {
    getCountry();
  }, [countryName, getCountry]);
  return (
    <div className="w-full relative">
      <div className="relative">
        <DebounceInput
          minLength={1}
          debounceTimeout={1000}
          className="bg-gray-50 border-2 border-violet-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-violet-600 focus:outline-none"
          placeholder="Cari"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-violet-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {/* Menampilkan data negara yang ditemukan */}
      {countries.length > 0 && !loading && (
        <ul className="flex flex-col w-full rounded-xl shadow-lg mt-2 absolute">
          {countries.map((country, index) => (
            <li key={index} className="">
              <Link
                href={`/country/${country.name.common}`}
                className="w-full block hover:bg-gray-100 py-2 px-4"
              >
                {country.name.common}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {/* Menampilkan pesan kesalahan jika ada */}
      {!loading && error && (
        <p className="mt-2 absolute text-red-500">{error}</p>
      )}
    </div>
  );
};
