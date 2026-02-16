import React from 'react';
import topImage from "../../assets/HeroImages/top.png";
import bottomImage from "../../assets/HeroImages/bottom.png";
import rightImage from "../../assets/HeroImages/right.png";
import leftImage from "../../assets/HeroImages/left.png";

function HeroMain() {
  return (
    // Hero Section
    <div >

    <div className="w-3/4 mx-auto mt-4 flex justify-between h-[70vh]">
        {/* Left Image */}
        <div className="bg-[#E0E0E0] flex-1 flex items-end rounded-md">
            <img src={leftImage} alt="Left Hero Image" className="w-[200px] h-[300px] object-contain rounded-sm" />
        </div>
        {/* Middle Images */}
        <div className="flex-1 mx-4 rounded-md flex flex-col justify-between">
            <img src={topImage} alt="Top Hero Image" className="bg-[#E0E0E0] px-2 pt-2 rounded-lg object-contain w-full"/>

            <div className=" flex flex-col items-center gap-1">
                <span className="text-5xl text-gray-500 font-semibold">ULTIMATE</span>
                <p className='text-8xl text-transparent font-bold' 
                   style={{ WebkitTextStroke: '0.75px #000000' }}>SALE</p>
                <p className='m-1 text-md font-light '>NEW COLLECTION</p>
                <button className="bg-black text-[0.75rem] rounded-md uppercase text-white px-6 py-2 shadow shadow-black shadow-2xl">Shop Now</button>
            </div>

          <img src={bottomImage} alt="Top Hero Image" className="rounded-lg object-contain" />
        </div>
        {/* Right Image */}
        <div className="bg-[#E0E0E0] flex-1 items-end justify-center flex rounded-md">
        <img src={rightImage} alt="Right Hero Image" className="object-contain w-[200px] h-[300px]"/>

        </div>
    </div>
    </div>

  )
}

export default HeroMain;