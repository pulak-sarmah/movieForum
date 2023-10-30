import Rating from "@mui/material/Rating";
import { useContext, useEffect, useState } from "react";
import { reviewRef, db } from "../firebase/firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";
import { PropTypes } from "prop-types";
import { AppState } from "../App";
import { useNavigate } from "react-router-dom";

function Reviews({ id, prevRating, userRated }) {
  const useAppState = useContext(AppState);
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const [newAdded, setNewAdded] = useState(0);

  async function getMovieReview() {
    const ref = doc(db, "movies", id);
    await updateDoc(ref, {
      rating: Number(prevRating) + Number(rating),
      rated: userRated + 1,
    });
  }

  const sendReview = async () => {
    if (form.length === 0) return;
    setLoading(true);
    try {
      if (useAppState.login) {
        await addDoc(reviewRef, {
          movieid: id,
          name: useAppState.userName,
          rating: rating,
          thought: form,
          timestamp: new Date().getTime(),
        });

        getMovieReview();

        setRating(0);
        setForm("");
        setNewAdded(newAdded + 1);

        Swal.fire({
          title: "Review sent",
          icon: "success",
          timer: 3000,
        });
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err.Message);
      Swal.fire({
        title: "something went wrong",
        icon: "error",

        timer: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getData() {
      setReviewsLoading(true);
      setData([]);
      let quer = query(reviewRef, where("movieid", "==", id));
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });
      setReviewsLoading(false);
    }
    getData();
  }, [id, newAdded]);

  return (
    <div className="w-full mt-4 border-t-2 border-gray-700">
      <div className="flex w-48 p-2 mt-2 mb-2 text-center bg-slate-800 hover:scale-110">
        <label>Rating:</label>
        <Rating
          value={+rating}
          name="simple-controlled"
          precision={0.5}
          size="medium"
          onChange={(e) => setRating(+e.target.value)}
        />
      </div>
      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder="Share your Review....."
        className="w-full p-2 outline-none header bg-slate-800"
      />
      <button
        onClick={sendReview}
        disabled={loading}
        className="w-full p-2 bg-orange-400 hover:bg-orange-300"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <TailSpin height={15} width={25} color="white" />{" "}
          </div>
        ) : (
          "Share"
        )}
      </button>
      {reviewsLoading ? (
        <div className="flex justify-center mt-6">
          <ThreeDots height={10} color="white" />
        </div>
      ) : (
        <div className="mt-4 ">
          {data.map((e, i) => {
            return (
              <div className="w-full p-2 mt-2 bg-gray-800 " key={i}>
                <div className="flex items-center">
                  <p className="text-blue-400">{e.name}</p>
                  <p className="ml-3 text-sm">
                    ({new Date(e.timestamp).toLocaleString("en-IN")})
                  </p>
                </div>
                <Rating
                  value={e.rating}
                  name="simple-controlled"
                  readOnly
                  size="small"
                />
                <p>{e.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
Reviews.propTypes = {
  id: PropTypes.string,
  prevRating: PropTypes.number,
  userRated: PropTypes.number,
};
export default Reviews;
