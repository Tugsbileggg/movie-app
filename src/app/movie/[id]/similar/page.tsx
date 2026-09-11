"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Navigation from "@/components/Navigation";
import MovieCard from "@/components/MovieCard";
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

const SimilarPage = () => {
  const params = useParams();
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}/similar?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      )
      .then((res) => {
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
      });
  }, [params.id, page]);
  return (
    <div className="flex flex-col items-center">
      <Navigation />

      <div className="max-w-[1280px] flex justify-center flex-col ">
        <h1 className="text-3xl font-bold mb-8">More like this</h1>

        <div className="flex flex-wrap gap-4">
          {movies
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
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

export default SimilarPage;
