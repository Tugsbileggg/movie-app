import { Badge } from "@/components/ui/badge";

interface Props {
  movie: any;
  director?: any;
  writers?: any[];
  stars?: any[];
}

const DetailsContent = ({ movie, director, writers, stars }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      {/* Genres */}
      <p className="flex gap-2">
        {movie?.genres?.map((genre: any) => (
          <Badge key={genre.id} variant="outline">
            {genre.name}
          </Badge>
        ))}
      </p>

      <p>{movie?.overview}</p>

      <span className="flex gap-[53px]">
        <p className="font-bold">Director</p>
        <p>{director?.name}</p>
      </span>

      <span className="flex gap-[53px]">
        <p className="font-bold">Writers</p>
        <p>{writers?.map((w) => w.name).join(" · ")}</p>
      </span>

      <span className="flex gap-[53px]">
        <p className="font-bold">Stars</p>
        <p>{stars?.map((s) => s.name).join(" · ")}</p>
      </span>
    </div>
  );
};

export default DetailsContent;
