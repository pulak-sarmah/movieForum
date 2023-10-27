import { PropTypes } from "prop-types";
import { Card } from "./Card";

function ActionCards({ data }) {
  return (
    <section className="mb-20">
      <span className="ml-12 text-3xl font-bold text-gray-200 ">Action</span>
      <div className="flex items-center justify-center gap-4 p-3 mt-2 overflow-x-scroll border-t-2 border-gray-200 md:flex-wrap no-scrollbar">
        {data
          .filter((movie) => movie.genre.toLowerCase() === "action")
          .map((movie, i) => (
            <Card key={i} movie={movie} />
          ))}
      </div>
    </section>
  );
}

ActionCards.propTypes = {
  data: PropTypes.array,
};

export default ActionCards;
