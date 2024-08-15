"use client";

import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { TypeWriter } from "./TypeWriter";
import FlipWordsComp from "./FlipWordsComp";
import PulsatingButton from "./ui/pulsating-button";
import { Link } from "react-router-dom";


export default function Hero() {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="h-full flex flex-col justify-center  items-center px-4">
      <div className="h-[20rem] w-screen dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        <TypeWriter />
        <FlipWordsComp />
        
        <div className="flex justify-center items-center mb-6">

        <Link to="/login"><PulsatingButton className="h-10 text-sm">GET STARTED</PulsatingButton></Link>
        </div>


        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        </p>
         
      </div>

      {/* <div className="relative flex h-[50rem] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background ">
        <TypeWriter />
        <FlipWordsComp />
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        <RetroGrid />
      </div> */}
    </div>
  );
}
