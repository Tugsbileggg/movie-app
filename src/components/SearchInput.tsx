"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const SearchInput = () => {
  const router = useRouter();

  const [foundMovies, setFoundMovies] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const searchMovie = async (value: string) => {
    if (!value.trim()) {
      setFoundMovies([]);
      setOpen(false);
      return;
    }

    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        value,
      )}&language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      },
    );

    setFoundMovies(response.data.results);
    setOpen(true);
  };

  const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    searchMovie(value);
  };

  const goSearchPage = () => {
    if (!inputValue.trim()) return;
    router.push(`/search?query=${encodeURIComponent(inputValue)}`);
    setOpen(false);
  };

  return (
    <div className="relative w-[300px]">
      <Input
        value={inputValue}
        placeholder="Search..."
        onChange={handleType}
        onKeyDown={(event) => {
          if (event.key === "Enter") goSearchPage();
        }}
      />

      {open && foundMovies.length > 0 && (
        <div className="absolute top-12 left-0 z-50 w-full rounded-md border bg-background shadow-md">
          {foundMovies.slice(0, 5).map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
                router.push(`/movie/${movie.id}`);
                setOpen(false);
              }}
              className="cursor-pointer px-3 py-2 hover:bg-muted"
            >
              {movie.title}
            </div>
          ))}

          <div
            onClick={goSearchPage}
            className="cursor-pointer px-3 py-2 font-medium hover:bg-muted"
          >
            See more
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
