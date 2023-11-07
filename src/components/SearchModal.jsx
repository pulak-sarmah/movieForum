import { PropTypes } from "prop-types";
import { Card } from "./Card";
import { ThreeDots } from "react-loader-spinner";
function SearchModal({ data, movieName, setMovieName, setSearchMovie }) {
  console.log(setMovieName, movieName);

  const searchMovie = data.filter((movie) =>
    movie.title.toLowerCase().includes(movieName.toLowerCase())
  );

  console.log(searchMovie);

  return (
    <div className="w-3/4 p-8 mx-auto h-4/5 " onClick={() => setMovieName("")}>
      <button
        onClick={() => setSearchMovie(false)}
        className="absolute text-4xl right-4"
      >
        X
      </button>
      {movieName.length >= 3 ? (
        searchMovie.map((movie) => (
          <div key={movie.id} className="flex items-center">
            <Card movie={movie} />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center pt-56">
          <ThreeDots height={40} color="white" />
        </div>
      )}
    </div>
  );
}

SearchModal.propTypes = {
  data: PropTypes.array,
  movieName: PropTypes.string,
  setMovieName: PropTypes.func,
  setSearchMovie: PropTypes.func,
};
export default SearchModal;
