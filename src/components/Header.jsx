import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between mb-1 font-bold border-b-2 border-orange-400 main-color">
      <Link to={"/"}>
        <h1 className="p-3 text-xl font-bold text-orange-400 cursor-pointer sm:text-2xl lg:text-3xl xl:text-4xl">
          Movie<span className="text-slate-200">Forum</span>
        </h1>
      </Link>
      <Link to={"/addmovie"}>
        <button className="p-1 mr-3 text-orange-400 transition-all duration-300 rounded hover:bg-orange-500 text-md sm:text-lg lg:text-xl hover:text-slate-200 hover:scale-105">
          Add New <span className="font-normal">+</span>
        </button>
      </Link>
    </header>
  );
}

export default Header;
