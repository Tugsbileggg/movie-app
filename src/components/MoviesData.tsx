"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MovieCard from "./MovieCard";
import Skeleton from "./Skeleton";
import { ArrowRight } from "lucide-react";

const MoviesData = ({ title }: { title: string }) => {
  const router = useRouter();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const pushSeeMore = (category: string) => {
    router.push(`/SeeMore/${category}`);
  };

  useEffect(() => {
    if (!title) return;

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${title}?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      )
      .then((response) => {
        setMovies(response.data.results);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [title]);

  return (
    <div>
      <div className="flex justify-between px-20 py-10">
        <p className="text-2xl font-bold">
          {title.replace("_", " ").toUpperCase()}
        </p>

        <button
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => pushSeeMore(title)}
        >
          See more
          <ArrowRight size={10} />
        </button>
      </div>

      <div className="flex gap-8 flex-wrap justify-center">
        {loading ? (
          <Skeleton />
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
};

export default MoviesData;
