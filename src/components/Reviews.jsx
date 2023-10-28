import Rating from "@mui/material/Rating";
import { useState } from "react";

function Reviews() {
  const [rating, setRating] = useState(0);
  return (
    <div className="w-full mt-4 border-t-2 border-gray-700">
      <div className="flex w-48 p-2 mt-2 mb-2 text-center bg-slate-800 hover:scale-110">
        <label htmlFor="simple-controlled">Rating:</label>
        <Rating
          value={+rating}
          name="simple-controlled"
          precision={0.5}
          size="medium"
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      <input
        placeholder="Share your Review....."
        className="w-full p-2 outline-none header bg-slate-800"
      />
      <button className="w-full p-2 bg-orange-400 hover:bg-orange-300">
        Share
      </button>
    </div>
  );
}

export default Reviews;
