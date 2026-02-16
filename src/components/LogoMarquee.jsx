import React from 'react';
import logo1 from "../assets/MarqueeLogoImages/logo-1.png";
import logo2 from "../assets/MarqueeLogoImages/logo-2.png";
import logo3 from "../assets/MarqueeLogoImages/logo-3.png";
import logo4 from "../assets/MarqueeLogoImages/logo-4.png";
import logo5 from "../assets/MarqueeLogoImages/logo.png";

function LogoMarquee() {
  const imgArray = [
    {id: 1, src: logo1},
    {id: 2, src: logo2},
    {id: 3, src: logo3},
    {id: 4, src: logo4},
    {id: 5, src: logo5}
  ];

  return (
    /* 1. We add the mask-image style to this outer container */
    <div 
      className="w-full mx-auto overflow-hidden mt-5"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 70%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 70%, transparent)'
      }}
    >
      
      {/* 2. The inner track stays exactly the same */}
      <div 
        className="flex w-max" 
        style={{ animation: "scroll 25s linear infinite" }}
      >
        
        {/* SET 1: Original */}
        <ul className="flex gap-12 pr-12 items-center">
          {imgArray.map((el) => {
            return (
              <li key={el.id}>
                <img src={el.src} height={100} width={100} alt={`Logo ${el.id}`} />
              </li>
            );
          })}
        </ul>

        {/* SET 2: Duplicated */}
        <ul className="flex gap-12 pr-12 items-center">
          {imgArray.map((el) => {
            return (
              <li key={`${el.id}-dup`}>
                <img src={el.src} height={100} width={100} alt={`Logo ${el.id}`} />
              </li>
            );
          })}
        </ul>

        
        
      </div>
    </div>
  )
}

export default LogoMarquee;