"use client";
import { api } from "@/app/api/api";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function Page() {
  const { name } = useParams();

  const [loaoding, setLoading] = useState(false);

  const [country, setCountry] = useState<any>([]);

  const [currencyCountry, setCurrencyCountry] = useState<any>([]);

  useEffect(() => {
    if (name) {
      getCountry(name);
      // getCurrencyCountry(name);
    }
  }, [name]);

  const getCountry = async (params: any) => {
    setLoading(true);
    let country = await api.getCountry(params);
    setCountry(country);
    setLoading(false);
  };

  const getCurrencyCountry = async (params: any) => {
    setLoading(true);
    let country = await api.getCurrencyCountry(params);
    setCurrencyCountry(country);
    setLoading(false);
  };

  return (
    <div className="py-10 px-5">
      <Link
        href="/"
        className="flex gap-2 items-center py-2 px-4 bg-violet-600 hover:bg-violet-700 rounded-lg w-fit text-white"
      >
        <FaArrowLeft />
        <div>Back to Homepage</div>
      </Link>

      {loaoding ? (
        <div className="flex justify-center items-center h-screen">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        country.map((country: any) => (
          <div key={country.name.common} className="py-10 px-10">
            <div className="top mb-5">
              <div className="flex gap-3 items-center">
                <h2 className="text-center font-semibold text-4xl">
                  {country.name.common}
                </h2>
                <Image
                  src={country.flags.svg}
                  width={80}
                  height={80}
                  alt={country.name.common}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-2 items-center">
                {country.altSpellings.map((altSpellings: any, index: any) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-lg bg-emerald-400 font-medium text-white"
                  >
                    <p>{altSpellings}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="shadow-lg px-5 py-12 w-full">
                <h4 className="font-semibold">LatLong</h4>
                <p className="text-violet-600 font-semibold text-4xl mt-3">
                  {country.latlng}
                </p>
              </div>
              <div className="shadow-lg px-5 py-12 w-full">
                <p>
                  Capital :{" "}
                  <span className="font-semibold">{country.capital}</span>{" "}
                </p>
                <p>
                  Region :{" "}
                  <span className="font-semibold">{country.region}</span>
                </p>
                <p>
                  Sub Region :{" "}
                  <span className="font-semibold">{country.subregion}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className=" px-5 py-12">
                <h5 className="font-semibold">Currency</h5>
                {Object.values(country.currencies).map(
                  (currency: any, index) => (
                    <p
                      key={index}
                      className="text-violet-600 font-semibold text-4xl mt-3"
                    >
                      {currency.name}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
