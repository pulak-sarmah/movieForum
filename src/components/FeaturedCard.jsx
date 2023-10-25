import { PropTypes } from "prop-types";
function FeaturedCard({ data }) {
  const [FeaturedData] = data.filter((movie) => movie.genre === "featured");

  return (
    <section className="relative mb-10">
      <div className="relative flex items-center justify-center">
        <img
          src={FeaturedData.img}
          alt="featured"
          className="object-cover object-center w-full h-auto max-h-96 opacity-80"
        />
        <div className="opacity-layer"></div>
        <p className="absolute bottom-0 px-2 py-1 text-4xl font-bold opacity-50 tracking-custom left-50 lg:text-6xl">
          Featured
        </p>
      </div>
    </section>
  );
}
FeaturedCard.propTypes = {
  data: PropTypes.array,
};
export default FeaturedCard;
