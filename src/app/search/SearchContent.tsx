"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import MovieCard from "@/components/MovieCard";
import { Footer } from "@/components/Footer";

const SearchContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    if (!query) return;

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      )
      .then((response) => {
        setMovies(response.data.results);
      });
  }, [query]);

  return (
    <div>
      <Navigation />

      <div className="flex justify-center">
        <div className="w-[1280px] px-10">
          <h1 className="mb-5 text-2xl font-semibold">
            Search results for: {query}
          </h1>

          <div className="flex flex-wrap gap-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchContent;
