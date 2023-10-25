import { useState } from "react";
import Header from "./components/Header";
import ActionCards from "./components/ActionCards";
import Main from "./components/Content";
import { Route, Routes } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import FeaturedCard from "./components/FeaturedCard";
import AdventureCards from "./components/AdventureCards";
import HorrorCards from "./components/HorrorCards";
import ComedyCards from "./components/ComedyCards";
import { tempData } from "./tempData";

function App() {
  const [data, setData] = useState(tempData);
  setData;
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
