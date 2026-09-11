"use client";

import CarouselData from "@/components/Carousel";
import MoviesData from "@/components/MoviesData";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export interface MoviecardProps {
  adult: boolean;
  backdrop_path: string;

  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: number;
  softcore: boolean;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface CarouselProps {
  adult: boolean;
  backdrop_path: string;

  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: number;
  softcore: boolean;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDescriptionType {
  cast: CastType[];
  crew: CrewType[];
}
interface CastType {
  id: number;
  name: string;
}

interface CrewType {
  id: number;
  name: string;
  job: string;
}

export default function Home() {
  return (
    <div className=" mx-auto w-full flex flex-col relative ">
      <Navigation />
      <CarouselData />
      <div className="w-full flex justify-center">
        <div className="flex max-w-[1440px]  justify-center flex-col ">
          <MoviesData title="upcoming" />
          <MoviesData title="top_rated" />
          <MoviesData title="popular" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
