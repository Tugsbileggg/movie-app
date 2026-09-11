"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import Navigation from "@/components/Navigation";
import axios from "axios";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type GenreType = {
  id: number;
  name: string;
};

const GenrePage = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const genreName = searchParams.get("name");

  const [movies, setMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list?language=en-US", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      })
      .then((response) => {
        setGenres(response.data.genres);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${params.id}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      )
      .then((response) => {
        setMovies(response.data.results);
        setTotalResults(response.data.total_results);
        setTotalPages(response.data.total_pages);
      });
  }, [params.id, page]);

  const changeGenre = (genre: GenreType) => {
    setPage(1);
    router.push(`/genre/${genre.id}?name=${genre.name}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="w-full flex justify-center">
        <div className="w-[1280px] px-[72px]">
          <h1 className="text-[28px] font-bold mb-8">Search filter</h1>

          <div className="flex gap-12">
            <div className="w-[330px]">
              <h2 className="text-[22px] font-bold mb-1">Genres</h2>
              <p className="text-sm text-gray-600 mb-5">
                See lists of movies by genre
              </p>

              <div className="flex flex-wrap gap-3">
                {genres.map((genre) => {
                  const active = String(genre.id) === String(params.id);

                  return (
                    <button
                      key={genre.id}
                      onClick={() => changeGenre(genre)}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
                        active
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-300"
                      }`}
                    >
                      {genre.name}
                      <span>{active ? "×" : "›"}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <section className="flex-1 border-l border-gray-200 pl-10">
              <h2 className="text-lg font-bold mb-8">
                {totalResults} titles in “{genreName}”
              </h2>

              <div className="flex flex-wrap gap-4">
                {movies.slice(0, 12).map((movie) => (
                  <Link
                    href={`/movie/${movie.id}`}
                    key={movie.id}
                    className="w-[165px] bg-[#F4F4F5] rounded-md overflow-hidden"
                  >
                    <div className="relative w-[165px] h-[244px]">
                      <Image
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "/placeholder.png"
                        }
                        alt={movie.title}
                        fill
                        sizes="165px"
                        loading="eager"
                        className="object-cover"
                      />
                    </div>

                    <div className="p-2">
                      <div className="flex items-center gap-1 text-xs">
                        <Star
                          size={14}
                          fill="#FDE047"
                          className="text-yellow-400"
                        />

                        <span>{movie.vote_average.toFixed(1)}</span>

                        <span className="text-gray-500">/10</span>
                      </div>

                      <p className="text-sm line-clamp-2 mt-1">{movie.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Pagination className="h-20">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
            />
          </PaginationItem>

          {page > 2 && (
            <>
              <PaginationItem>
                <PaginationLink href="#" onClick={() => setPage(1)}>
                  1
                </PaginationLink>
              </PaginationItem>

              <PaginationEllipsis />
            </>
          )}

          {page > 1 && (
            <PaginationItem>
              <PaginationLink href="#" onClick={() => setPage(page - 1)}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink href="#" isActive>
              {page}
            </PaginationLink>
          </PaginationItem>

          {page < totalPages && (
            <PaginationItem>
              <PaginationLink href="#" onClick={() => setPage(page + 1)}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {page < totalPages - 1 && (
            <>
              <PaginationEllipsis />

              <PaginationItem>
                <PaginationLink href="#" onClick={() => setPage(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                setPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Footer />
    </div>
  );
};

export default GenrePage;
