"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

import { MovieDescriptionType } from "../../page";
import Navigation from "@/components/Navigation";
import DetailsHero from "@/components/DetailsHero";
import DetailsContent from "@/components/Detailscontent";
import DetailsMoreLike from "@/components/DetailsMoreLike";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "@/components/Footer";

export interface genreType {
  id: number;
  name: string;
}
interface production_companiesType {
  id: number;
  logo_path: string;
}
interface production_countriesType {
  iso_3166_1: string;
  name: string;
}
interface spoken_languagesType {
  english_name: string;
  iso_639_1: string;
  name: string;
}
export interface MovieDetailsType {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: genreType[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: production_companiesType;
  production_countries: production_countriesType;
  release_date: string;
  revenue: number;
  runtime: number;
  softcore: false;
  spoken_languages: spoken_languagesType;
  status: string;
  tagline: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}

interface TrailerProps {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

const Demo = () => {
  const params = useParams();
  const [similar, setSimilar] = useState<any[]>([]);
  const [credits, setCredits] = useState<MovieDescriptionType | null>(null);
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [morelike, setMorelike] = useState<any[]>([]);
  const [trailer, setTrailer] = useState("");
  const [trailerShow, setTrailerShow] = useState(false);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      })
      .then((response) => {
        setMovie(response.data);
      });
  }, [params.id]);
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/credits`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      })
      .then((response) => setCredits(response.data));
  }, [params.id]);
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/similar`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      })
      .then((response) => {
        const filtered = response.data.results.filter(
          (movie: any) => movie.poster_path,
        );

        setMorelike(filtered);
      });
  }, [params.id]);
  useEffect(() => {
    if (!params.id) return;

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      )
      .then((response) => {
        const videos = response.data.results;

        const trailerVideo = videos.find(
          (video: any) => video.site === "YouTube",
        );

        if (trailerVideo) {
          setTrailer(trailerVideo.key);
        } else {
          setTrailer("");
        }
      })
      .catch((error) => {
        setTrailer("");
      });
  }, [params.id]);

  const handleOnclick = () => setTrailerShow(!trailerShow);
  if (!movie) {
    return (
      <div className="flex w-full justify-center flex-col">
        <Navigation />

        <div className="flex justify-center w-full">
          <div className="max-w-[1080px] flex flex-col gap-5">
            <div className="flex relative gap-[30px] animate-pulse">
              <div className="relative w-[290px] h-[428px] bg-gray-300 rounded-md" />

              <div className="w-[760px] h-[428px] bg-gray-300 rounded-md" />
            </div>

            <div className="animate-pulse flex flex-col gap-3">
              <div className="w-[400px] h-8 bg-gray-300 rounded" />
              <div className="w-[250px] h-5 bg-gray-300 rounded" />
            </div>

            <div className="animate-pulse flex flex-col gap-3">
              <div className="w-full h-4 bg-gray-300 rounded" />
              <div className="w-[80%] h-4 bg-gray-300 rounded" />
              <div className="w-[60%] h-4 bg-gray-300 rounded" />
            </div>

            <Skeleton />
          </div>
        </div>
      </div>
    );
  }

  const director = credits?.crew?.find((person) => person.job === "Director");

  const writers = credits?.crew?.filter(
    (person) => person.job === "Writer" || person.job === "Screenplay",
  );

  const stars = credits?.cast?.slice(0, 5);
  console.log(movie);
  return (
    <div className="flex w-full justify-center flex-col">
      <Navigation />
      <div className="flex justify-center w-full">
        <div className="max-w-270 flex flex-col gap-5 ">
          <DetailsHero
            trailer={trailer}
            trailerShow={trailerShow}
            handleOnclick={handleOnclick}
            movie={movie}
          />
          <DetailsContent
            movie={movie}
            director={director}
            writers={writers}
            stars={stars}
          />
          <DetailsMoreLike movies={morelike} movieId={Number(params.id)} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Demo;
