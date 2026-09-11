"use client";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Contentimage from "./Content";
import { useEffect, useState } from "react";
import axios from "axios";
import { CarouselProps } from "@/app/page";
import ReactPlayer from "react-player";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
const CarouselData = () => {
  const [carousel, setCarousel] = useState<CarouselProps[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      )
      .then((response) => {
        setCarousel(response.data.results);
      });
  }, []);

  const handlePlayTrailer = (movieId: number) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      )
      .then((response) => {
        const videos = response.data.results;

        const trailerVideo = videos.find(
          (video: any) => video.site === "YouTube" && video.type === "Trailer",
        );

        const anyYoutubeVideo = videos.find(
          (video: any) => video.site === "YouTube",
        );

        const videoKey = trailerVideo?.key || anyYoutubeVideo?.key || "";

        if (videoKey) {
          setSelectedTrailer(videoKey);
          setDialogOpen(true);
        } else {
          alert("Trailer not found");
        }
      });
  };

  return (
    <>
      <Carousel className="relative h-150 group">
        <CarouselContent>
          {carousel
            .filter((movie) => movie.backdrop_path)
            .map((movie) => (
              <CarouselItem key={movie.id}>
                <div className="p-1">
                  <Card className="relative flex bg-cover overflow-hidden">
                    <div onClick={() => handlePlayTrailer(movie.id)}>
                      <Contentimage
                        contentimage={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                        playing="Now Playing"
                        contentname={movie.title}
                        rating={movie.vote_average}
                        contenttext={movie.overview}
                      />
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>

        <CarouselPrevious className="absolute cursor-pointer left-12 w-4 py-5 px-5 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition dark:bg-white dark:text-black" />
        <CarouselNext className="absolute cursor-pointer right-11 w-4 py-5 px-5 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition dark:bg-white dark:text-black" />
      </Carousel>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-[900px] p-0 overflow-hidden bg-black">
          <DialogTitle className="sr-only">Movie trailer</DialogTitle>

          <DialogDescription className="sr-only">
            Watch the selected movie trailer.
          </DialogDescription>

          {selectedTrailer && (
            <div className="w-full aspect-video">
              <ReactPlayer
                src={`https://www.youtube.com/watch?v=${selectedTrailer}`}
                width="100%"
                height="100%"
                controls
                playing
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CarouselData;
