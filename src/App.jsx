import { useEffect, useState, createContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { getDocs } from "firebase/firestore";
import { moviesRef } from "./firebase/firebase";
import { ThreeDots } from "react-loader-spinner";
import { Detail } from "./components/Detail";
import Header from "./components/Header";
import ActionCards from "./components/ActionCards";
import Main from "./components/Content";
import AddMovie from "./components/AddMovie";
import FeaturedCard from "./components/FeaturedCard";
import AdventureCards from "./components/AdventureCards";
import HorrorCards from "./components/HorrorCards";
import ComedyCards from "./components/ComedyCards";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SearchModal from "./components/SearchModal";

const AppState = createContext();

function App() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMovie, setSearchMovie] = useState(false);
  const [movieName, setMovieName] = useState("");
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const _data = await getDocs(moviesRef);

        _data.forEach((doc) => {
          setData((prev) => [...prev, { ...doc.data(), id: doc.id }]);
        });
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    getData();
  }, []);

  if (data.length === 0 && loading)
    return (
      <div className="flex items-center justify-center w-full h-96">
        <ThreeDots height={40} color="white" />
      </div>
    );

  return (
    <AppState.Provider value={{ login, userName, setLogin, setUserName }}>
      <>
        <Header
          showSearchBar={location.pathname === "/"}
          setSearchMovie={setSearchMovie}
          movieName={movieName}
          setMovieName={setMovieName}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main>
                {searchMovie ? (
                  <SearchModal
                    data={data}
                    movieName={movieName}
                    setMovieName={setMovieName}
                    setSearchMovie={setSearchMovie}
                  />
                ) : (
                  <>
                    <FeaturedCard data={data} />
                    <ActionCards data={data} />
                    <AdventureCards data={data} />
                    <ComedyCards data={data} />
                    <HorrorCards data={data} />
                  </>
                )}
              </Main>
            }
          />
          <Route
            path="/addmovie"
            element={
              <Main>
                <AddMovie />
              </Main>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <Main>
                <Detail />
              </Main>
            }
          />

          <Route
            path="/login"
            element={
              <Main>
                <Login />
              </Main>
            }
          />
          <Route
            path="/signup"
            element={
              <Main>
                <Signup />
              </Main>
            }
          />
        </Routes>
      </>
    </AppState.Provider>
  );
}

export default App;
export { AppState };
