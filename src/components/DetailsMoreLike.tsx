import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  movies: any[];
  movieId: number;
}

const DetailsMoreLike = ({ movies, movieId }: Props) => {
  const router = useRouter();
  const pushDetails = (id: number) => {
    router.push(`/movie/${id}`);
  };
  const pushSeeMore = (category: string) => {
    router.push(`/SeeMore/${category}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="flex justify-between">
        <h2 className="text-2xl font-semibold">More like this</h2>
        <button
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push(`/movie/${movieId}/similar`)}
        >
          See more
          <ArrowRight size={10} />
        </button>
      </span>
      <div className="flex flex-wrap gap-4">
        {movies
          ?.filter((movie) => movie.poster_path)
          .slice(0, 10)
          .map((movie) => (
            <div key={movie.id} className="flex flex-col gap-2">
              <div
                onClick={() => pushDetails(movie.id)}
                className="relative w-[190px] h-[372px] overflow-hidden cursor-pointer rounded-md"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="190px"
                />
              </div>

              <div className="flex flex-col w-[190px] text-sm rounded-md py-2 px-3 bg-[#F4F4F5] ">
                <p className="flex gap-1 h-[23px] items-center">
                  <Star fill="yellow" stroke="yellow" size={16} />
                  <span className="text-black flex items-center gap-0.5 ">
                    {movie.vote_average}
                    <span className="text-gray-300 text-xs">/10</span>
                  </span>
                </p>
                <span className="flex text-lg dark:text-black  items-start w-full h-14">
                  {movie.title}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DetailsMoreLike;
