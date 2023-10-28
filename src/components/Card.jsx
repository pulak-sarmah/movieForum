import { PropTypes } from "prop-types";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

export function Card({ movie }) {
  return (
    <Link to={`/detail/${movie.id}`}>
      <div className="p-2 mt-6 font-bold transition-all duration-500 rounded-lg shadow-md cursor-pointer shadow-slate-950 bg-slate-800 hover:-translate-y-3">
        <img
          className="w-auto h-auto rounded-lg md:w-56 md:h-64 sm:w-64 sm:h-80 xl:w-72 xl:h-96"
          src={movie.image}
          alt="movie poster"
        />
        <p>
          <span className="text-gray-400">Name:</span> {movie.title}
        </p>
        <p>
          <span className="text-gray-400">Genre:</span> {movie.genre}
        </p>
        <p className="flex items-center gap-2">
          <span className="text-gray-400">Rating:</span>

          <Rating value={3} name="read-only" readOnly />
        </p>
        <p>
          <span className="text-gray-400">Year:</span> {movie.year}
        </p>
      </div>
    </Link>
  );
}
Card.propTypes = {
  movie: PropTypes.object,
};
