import { useEffect, useState } from "react";
import Header from "./components/Header";
import ActionCards from "./components/ActionCards";
import Main from "./components/Content";
import { Route, Routes } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import FeaturedCard from "./components/FeaturedCard";
import AdventureCards from "./components/AdventureCards";
import HorrorCards from "./components/HorrorCards";
import ComedyCards from "./components/ComedyCards";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "./firebase/firebase";
import { ThreeDots } from "react-loader-spinner";
function App() {
  const [data, setData] = useState([]);
  setData;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const _data = await getDocs(moviesRef);

        _data.forEach((doc) => {
          setData((prev) => [...prev, doc.data()]);
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
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Main>
              <FeaturedCard data={data} />
              <ActionCards data={data} />
              <AdventureCards data={data} />
              <ComedyCards data={data} />
              <HorrorCards data={data} />
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
      </Routes>
    </>
  );
}

export default App;
