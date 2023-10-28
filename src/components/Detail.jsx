import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { ThreeDots } from "react-loader-spinner";
import { db } from "../firebase/firebase";
import { getDoc } from "firebase/firestore";
import Reviews from "./Reviews";

export const Detail = () => {
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    genre: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    async function getData() {
      try {
        const _doc = doc(db, "movies", id);
        const _data = await getDoc(_doc);

        setData(_data.data());
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    }
    getData();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-96">
        <ThreeDots height={40} color="white" />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center p-4 md:flex-row md:items-start">
      <img
        className="w-56 md:sticky h-72 md:h-96 md:w-72 md:top-24 "
        src={data.image}
        alt="movie image"
      />
      <div className="mt-4 ml-4 md:w-1/2">
        <h1 className="text-2xl font-bold text-gray-400 md:text-3xl">
          {data.title} <span className="text-md md:text-xl">({data.year})</span>
        </h1>
        <Rating value={3.5} name="read-only" readOnly />
        <p className="mt-3 ">{data.description}</p>

        <Reviews />
      </div>
    </div>
  );
};
