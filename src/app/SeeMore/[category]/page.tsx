"use client";

import { useEffect, useState } from "react";
import type { MoviecardProps } from "../../page";
import axios from "axios";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useParams } from "next/navigation";
import { Footer } from "@/components/Footer";

const SeeMore = () => {
  const params = useParams();
  const category = params.category as string;
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<any>(null);
  const router = useRouter();
  const pushDetails = (id: number) => {
    router.push(`/movie/${id}`);
  };
  const nextPage = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      )
      .then((response) => {
        setMovies(response.data);
      });
  }, [page, category]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-[1220px] flex justify-start py-8">
        <p className="text-2xl font-bold">
          {category?.replace("_ ", " ").toUpperCase()}
        </p>
      </div>
      <div className="flex flex-wrap  max-w-[1440px] w-full  justify-center gap-8">
        {movies?.results?.map((movie: MoviecardProps) => {
          return (
            <Card
              onClick={() => pushDetails(movie.id)}
              key={movie.id}
              className="w-[230px]  overflow-hidden "
            >
              <CardContent className="p-0">
                <div className="relative w-full h-[340px]">
                  <Image
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 230px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col text-sm py-2 px-3 bg-[#F4F4F5] ">
                  <p className="flex gap-1 h-[23px] items-center">
                    <Star fill="yellow" stroke="yellow" size={16} />
                    <span
                      id="upcomingbutton"
                      className="text-black flex items-center gap-0.5 "
                    >
                      {movie.vote_average}
                      <span className="text-gray-300 text-xs">/10</span>
                    </span>
                  </p>
                  <span className="flex text-lg  items-start w-full h-[56px]">
                    {movie.title}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Pagination className="h-20">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => setPage(page - 1)} />
          </PaginationItem>
          <PaginationLink onClick={() => setPage(page - page + 1)} href="#">
            1
          </PaginationLink>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationLink onClick={() => setPage(page - 1)} href="#">
            {page - 1}
          </PaginationLink>
          <PaginationLink onClick={() => setPage(page)} href="#" isActive>
            {page}
          </PaginationLink>
          <PaginationLink onClick={() => setPage(page + 1)} href="#">
            {page + 1}
          </PaginationLink>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationLink
            onClick={() => setPage(movies?.total_pages || 1)}
            href="#"
          >
            {movies?.total_pages || 1}
          </PaginationLink>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                setPage((prev) =>
                  prev < (movies?.total_pages || 1) ? prev + 1 : prev,
                )
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Footer />
    </div>
  );
};

export default SeeMore;
