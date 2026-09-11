"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const MovieDetails = () => {
  const [details, setDetails] = useState();
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/{movie_id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      })
      .then((response) => {
        setDetails(response.data.results);
      });
  }, []);
};
export default MovieDetails;
