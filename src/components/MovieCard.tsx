"use client";

import { Card } from "./ui/card";
import { CardContent } from "./ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import type { MoviecardProps } from "@/app/page";
import Link from "next/link";

const MovieCard = ({ movie }: { movie: MoviecardProps }) => {
  if (!movie.poster_path) return null;
  return (
    <Link href={`/movie/${movie.id}`}>
      <Card className="w-[230px] overflow-hidden">
        <CardContent className="p-0">
          <div className="relative w-full h-[340px]">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="230px"
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex flex-col py-2 px-3 bg-[#F4F4F5] dark:bg-zinc-600">
            <p className="flex gap-1 h-[23px] items-center">
              <Star fill="yellow" stroke="yellow" size={16} />
              <span className="text-black dark:text-white text-sm flex items-center gap-0.5">
                {movie.vote_average}
                <span className="text-gray-400 text-xs">/10</span>
              </span>
            </p>

            <span className="flex text-lg items-start w-full h-[56px] text-black dark:text-white">
              {movie.title}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
