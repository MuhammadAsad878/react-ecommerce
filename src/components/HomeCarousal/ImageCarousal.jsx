import img1 from "../../assets/HomeCarousal/image-1.png";
import img3 from "../../assets/HomeCarousal/image.png";
import img2 from "../../assets/HeroImages/left.png";

import { useState,   } from "react";
import { ArrowLeftIcon, ArrowRightIcon, Radio } from "lucide-react";

function ImageCarousal(){
    const images = [img1,img2, img3];
    const [currentImage, setCurrentImage] = useState(images.length - 1);    
    
    const shiftNextImg = ()=>{
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }
      const shiftPrevImg = ()=>{
        setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
    }    
   

    return (
    <div className="w-full flex justify-center items-center h-full ms-10 gap-4 ">
        <div className="w-20">
            <button onClick={shiftPrevImg} className="text-gray-500 hover:bg-gray-700 hover:cursor-pointer hover:text-white  p-2 rounded-full shadow-lg shadow-gray-400"><ArrowLeftIcon className="w-4 h-4" /></button>
            <button onClick={shiftNextImg} className="text-gray-500 hover:bg-gray-700 hover:cursor-pointer hover:text-white   p-2 rounded-full shadow-lg shadow-gray-400"><ArrowRightIcon className="w-4 h-4" /></button>
        </div>
        <div className="w-full h-full flex  items-center gap-2 overflow-hidden">
            <div className="  ">
            <img src={images[currentImage]}  className="object-contain  w-150" />
            </div>
            <img src={images[(currentImage + 1) % images.length]}  className="object-contain w-60" />
        </div>
    </div>
    )
}
export default ImageCarousal;