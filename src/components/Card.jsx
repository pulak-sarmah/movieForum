import { PropTypes } from "prop-types";
import Rating from "@mui/material/Rating";

export function Card({ movie }) {
  return (
    <div className="p-2 mt-6 font-bold transition-all duration-500 rounded-lg shadow-md cursor-pointer shadow-slate-950 bg-slate-800 hover:-translate-y-3">
      <img
        className="w-auto h-auto rounded-lg md:w-56 md:h-64 sm:w-64 sm:h-80 xl:w-72 xl:h-96"
        src={movie.img}
        alt="movie poster"
      />
      <p>
        <span className="text-gray-400">Name:</span> {movie.name}
      </p>
      <p className="flex items-center gap-2">
        <span className="text-gray-400">Rating:</span>

        <Rating value={+movie.rating} name="read-only" readOnly />
      </p>
      <p>
        <span className="text-gray-400">Year:</span> {movie.year}
      </p>
    </div>
  );
}
Card.propTypes = {
  movie: PropTypes.object,
};
