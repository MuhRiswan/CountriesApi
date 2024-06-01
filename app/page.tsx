import React from "react";
import { SearchBar } from "./_components/searchBar";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen -mt-20 bg-white">
      <div className="flex flex-col gap-5 w-full px-5 lg:w-2/5">
        <h2 className="text-center font-semibold text-4xl ">Country</h2>
        <SearchBar />
      </div>
    </div>
  );
}
