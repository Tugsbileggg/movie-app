"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Star, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MoviecardProps } from "@/app/page";

const Popular = ({ title }: { title: string }) => {
  const router = useRouter();
  const [movies, setMovies] = useState<MoviecardProps[]>([]);

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      });
  }, []);

  return (
    <div>
      <div className="flex max-w-[1440px] w-full justify-between items-center py-8">
        <p className="flex justify-start w-[120px] h-[36px] items-center text-2xl font-bold">
          {title}
        </p>

        <button
          onClick={() => router.push("/SeeMore/popular")}
          className="flex justify-center cursor-pointer w-[120px] h-[36px] gap-2 items-center"
        >
          See more
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {movies.map((movie) => (
          <Card key={movie.id} className="w-[230px] object-hidden">
            <CardContent className="p-0">
              <div className="relative w-full h-[340px]">
                {movie.poster_path && (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || "movie"}
                    fill
                    className="object-cover"
                    sizes="230px"
                  />
                )}
              </div>

              <div className="flex flex-col text-sm py-2 px-3 bg-[#F4F4F5]">
                <p className="flex gap-1 h-[23px] items-center">
                  <Star fill="yellow" stroke="yellow" size={16} />
                  <span className="text-black flex items-center gap-0.5">
                    {movie.vote_average}
                    <span className="text-gray-300 text-xs">/10</span>
                  </span>
                </p>
                <span className="flex text-lg items-start w-full h-[56px]">
                  {movie.title}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Popular;
