import { PropTypes } from "prop-types";

function Search({ setSearchMovie, movieName, setMovieName }) {
  return (
    <div className="flex gap-3">
      <input
        type="text"
        placeholder="Search Movie..."
        onFocus={() => setSearchMovie(true)}
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        className="w-full px-3 py-1 text-base leading-8 text-gray-900 transition-colors duration-200 ease-in-out bg-opacity-50 border border-gray-300 rounded outline-none md:w-96 bg-grey-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200"
      />
    </div>
  );
}
Search.propTypes = {
  setSearchMovie: PropTypes.func,
  movieName: PropTypes.string,
  setMovieName: PropTypes.func,
};
export default Search;
