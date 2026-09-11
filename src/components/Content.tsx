import { Star } from "lucide-react";
import { CardContent } from "./ui/card";

import Image from "next/image";

interface ContentImageProps {
  playing: string;
  contentname: string;
  contentimage: string;
  rating: number;
  contenttext: string;
}

const Contentimage = ({
  playing,
  contentname,
  contentimage,
  rating,
  contenttext,
}: ContentImageProps) => {
  return (
    <CardContent className="flex w-full h-150 relative p-0 overflow-hidden">
      <Image
        src={contentimage}
        alt={contentname}
        priority
        fill
        unoptimized
        sizes="100vw"
        className="object-cover"
        style={{ objectFit: "cover" }}
      />
      <div className="absolute flex flex-col gap-4 h-[264px] w-[404px]  left-[140px] bottom-[158px]">
        <h3 className="text-base font-bold text-white">{playing}</h3>
        <h1 className="text-4xl font-bold text-white">{contentname}</h1>
        <span className="flex items-center gap-2">
          <Star fill="yellow" stroke="yellow" size={30} />
          <span className="text-white">{rating}/10</span>
        </span>
        <p className="text-[#FAFAFA] text-xs font-normal w-[302px]   ">
          {contenttext}
        </p>
        <button className="flex bg-white p-3 w-[145px] items-center cursor-pointer rounded-md gap-2">
          <div className="w-4 h-4 relative">
            <Image src={"/play.png"} alt="trailer" width={16} height={16} />
          </div>
          <p className="text-sm dark:text-black">Watch Trailer</p>
        </button>
      </div>
    </CardContent>
  );
};
export default Contentimage;
