"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import Link from "next/link";

type GenreType = {
  id: number;
  name: string;
};

const Navigation = () => {
  const [searchValue, setSearchValue] = useState("");
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [openGenre, setOpenGenre] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    router.push(`/search?query=${searchValue}`);
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en-US", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []));
  }, []);

  const pushGenre = (genre: GenreType) => {
    setOpenGenre(false);
    router.push(`/genre/${genre.id}?name=${genre.name}`);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex justify-between w-[1280px] p-10">
        <div className="flex items-center gap-2">
          <img className="w-4 h-4" src="/film.png" alt="film" />
          <Link href="/" className="text-[#4338CA] italic font-bold">
            Movie Z
          </Link>
        </div>

        <div className="flex items-center gap-3 relative">
          <button
            onClick={() => setOpenGenre(!openGenre)}
            className="flex cursor-pointer items-center w-[97px] gap-2 px-3 py-2 rounded-md border bg-white shadow-sm"
          >
            <img className="h-4 w-4" src="/downarrow.png" alt="down" />
            <p className="dark:text-black">Genre</p>
          </button>

          {openGenre && (
            <div className="absolute top-12 left-0 bg-white border rounded-md shadow-lg p-4 w-[300px] z-50 grid grid-cols-2 gap-2">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => pushGenre(genre)}
                  className="text-left px-3 py-2 rounded-md hover:bg-gray-100 text-sm"
                >
                  {genre.name}
                </button>
              ))}
            </div>
          )}

          <div
            onSubmit={handleSearch}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md border bg-white shadow-sm"
          >
            <img className="h-4 w-4" src="/search.png" alt="search" />
            <SearchInput />
          </div>
        </div>

        <AnimatedThemeToggler
          className="p-2 rounded-md transition-colors duration-300"
          variant="star"
        />
      </div>
    </div>
  );
};

export default Navigation;

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const Navigation = () => {
//   const [searchValue, setSearchValue] = useState("");
//   const router = useRouter();

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!searchValue.trim()) return;

//     router.push(`/search?query=${searchValue}`);
//   };

//   return (
//     <div className="flex w-full justify-center">
//       <div className="flex justify-between w-[1280px] p-10">
//         <div className="flex items-center w-23 gap-2">
//           <img className="w-4 h-4" src="/film.png" alt="film" />
//           <p className="text-[#4338CA] font-inter text-base italic font-bold">
//             Movie Z
//           </p>
//         </div>

//         <div className="flex w-122 items-center gap-3">
//           <button className="flex cursor-pointer items-center w-[97px] gap-2 px-3 py-2 rounded-md border border-[#E4E4E7] bg-white shadow-sm">
//             <img className="flex h-4 w-4" src="/downarrow.png" alt="down" />
//             <p>Genre</p>
//           </button>

//           <form
//             onSubmit={handleSearch}
//             className="flex items-center gap-2.5 px-3 py-2 rounded-md border border-[#E4E4E7] bg-white shadow-sm"
//           >
//             <img className="h-4 w-4" src="/search.png" alt="search" />
//             <input
//               value={searchValue}
//               onChange={(e) => setSearchValue(e.target.value)}
//               type="search"
//               placeholder="Search..."
//               className="outline-none"
//             />
//           </form>
//         </div>

//         <button className="cursor-pointer">
//           <img src="/Modes.png" alt="mode" width={40} height={40} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navigation;

// const Navigation = () => {
//   return (
//     <div className="flex w-full justify-center">
//       <div className="flex justify-between w-[1280px] p-10 ">
//         <div className="flex items-center w-23 gap-2 ">
//           <img
//             className="w-4 h-4 stroke-[#4338CA] stroke-[1px]"
//             src="/film.png"
//             alt="film"
//           />
//           <p className="text-[#4338CA] font-inter text-base italic font-bold leading-5 tracking-[0.32px]">
//             Movie Z
//           </p>
//         </div>
//         <div className="flex w-122 items-center gap-3 ">
//           <button className="flex cursor-pointer items-center w-[97px] gap-2 px-3 py-2 rounded-md border border-[#E4E4E7] bg-white shadow-sm">
//             <img className="flex h-4 w-4" src="/downarrow.png" alt="down" />
//             <p>Genre</p>
//           </button>
//           <span className="flex items-center gap-2.5 px-3 py-2 rounded-md border border-[#E4E4E7] bg-white shadow-sm">
//             <img className="h-4 w-4" src="/search.png" alt="search" />
//             <input className="" type="search" placeholder="Search.."></input>
//           </span>
//         </div>
//         <button className="cursor-pointer">
//           <img src="/Modes.png" alt="mode" />
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Navigation;
