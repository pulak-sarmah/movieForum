import { Link } from "react-router-dom";
import Search from "../components/Search";
import { PropTypes } from "prop-types";
import { useContext } from "react";
import { AppState } from "../App";
function Header({ showSearchBar, setSearchMovie, movieName, setMovieName }) {
  const useAppstate = useContext(AppState);
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between mb-1 font-bold border-b-2 border-orange-400 main-color">
      <Link to={"/"}>
        <h1
          onClick={() => setSearchMovie(false)}
          className="p-3 text-xl font-bold text-orange-400 cursor-pointer sm:text-2xl lg:text-3xl xl:text-4xl"
        >
          Movie<span className="text-slate-200">Forum</span>
        </h1>
      </Link>
      {showSearchBar && (
        <Search
          setSearchMovie={setSearchMovie}
          movieName={movieName}
          setMovieName={setMovieName}
        />
      )}
      {useAppstate.login ? (
        <Link to={"/addmovie"}>
          <button className="p-1 mr-3 text-orange-400 transition-all duration-300 rounded hover:bg-orange-500 text-md sm:text-lg lg:text-xl hover:text-slate-200 hover:scale-105">
            Add New <span className="font-normal">+</span>
          </button>
        </Link>
      ) : (
        <Link to={"/login"}>
          <button className="p-1 pl-3 pr-3 mr-3 font-medium transition-all duration-300 bg-orange-500 rounded text-white-400 hover:bg-orange-400 text-md sm:text-lg lg:text-xl hover:text-slate-200 hover:scale-105">
            Login
          </button>
        </Link>
      )}
    </header>
  );
}
Header.propTypes = {
  showSearchBar: PropTypes.bool,
  setSearchMovie: PropTypes.func,
  movieName: PropTypes.string,
  setMovieName: PropTypes.func,
};

export default Header;
