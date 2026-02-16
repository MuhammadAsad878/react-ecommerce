import BuyNow from "./BuyNow";
import Timer from "./Timer";
import ImageCarousal from "./ImageCarousal";


function HomeCarousal(){

    return (
    <div className="w-3/4 mx-auto mt-20 mb-10 h-[80vh] flex items-center gap-10">
        <div className="w-2/5 h-full">
            <BuyNow />
            <Timer />
        </div>
        <div className="w-full h-full">
            <ImageCarousal />
        </div>     
    </div>
    )

}

export default HomeCarousal;