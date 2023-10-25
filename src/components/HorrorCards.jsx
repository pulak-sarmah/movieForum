import { Card } from "./Card";
import { PropTypes } from "prop-types";

function HorrorCards({ data }) {
  return (
    <section className="mb-20">
      <span className="ml-12 text-3xl font-bold text-gray-200 ">Horror</span>
      <div className="flex items-center justify-center gap-4 p-3 mt-2 overflow-x-scroll border-t-2 border-gray-200 md:flex-wrap no-scrollbar">
        {data
          .filter((movie) => movie.genre === "horror")
          .map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
      </div>
    </section>
  );
}

HorrorCards.propTypes = {
  data: PropTypes.array,
};
export default HorrorCards;
