import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesRef } from "../firebase/firebase";
import Swal from "sweetalert2";

function AddMovie() {
  const [form, setForm] = useState({
    title: "",
    year: "",
    description: "",
    genre: "",
    image: "",
    featured: false,
  });

  const [loading, setLoading] = useState(false);

  const handleFeaturedChange = (e) => {
    const value = e.target.value === "true";
    setForm({ ...form, featured: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || form.year.length < 4 || !form.description || !form.image)
      return;
    setLoading(true);
    try {
      await addDoc(moviesRef, form);
      Swal.fire({
        title: "Movie Added successfully",
        icon: "success",
        timer: 3000,
      });
    } catch (err) {
      console.log(err.Message);
      Swal.fire({
        title: "something went wrong",
        icon: "error",

        timer: 3000,
      });
    }
    setForm({ title: "", year: "", description: "", genre: "", image: "" });

    setLoading(false);
  };

  const genres = ["Action", "Comedy", "Horror", "Adventure"];

  return (
    <div>
      <section className="relative text-gray-300 body-font">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col w-full mb-4 text-center">
            <h1 className="mb-4 text-xl font-medium text-gray-300 sm:text-3xl title-font">
              Add Movie
            </h1>
          </div>
          <div className="mx-auto lg:w-1/2 md:w-2/3">
            <form onSubmit={handleSubmit} className="flex flex-wrap -m-2">
              <div className="w-1/2 p-2">
                <div className="relative">
                  <label
                    htmlFor="title"
                    className="text-sm leading-7 text-gray-300"
                  >
                    Movie Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-opacity-50 border border-gray-300 rounded outline-none bg-grey-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200"
                  />
                </div>
              </div>
              <div className="w-1/2 p-2">
                <div className="relative">
                  <label
                    htmlFor="image"
                    className="text-sm leading-7 text-gray-300"
                  >
                    Image Url
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-opacity-50 border border-gray-300 rounded outline-none bg-grey-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200"
                  />
                </div>
              </div>
              <div className="w-1/2 p-2">
                <div className="relative">
                  <label
                    htmlFor="genre"
                    className="text-sm leading-7 text-gray-300"
                  >
                    Genre
                  </label>

                  <select
                    value={form.genre}
                    onChange={(e) =>
                      setForm({ ...form, genre: e.target.value })
                    }
                    name="genre"
                    id="genre"
                    className="w-full px-3 py-1 pb-4 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-opacity-50 border border-gray-300 rounded outline-none bg-grey-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200"
                  >
                    <option>select</option>
                    {genres.map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="w-1/2 p-2">
                <div className="relative">
                  <label
                    htmlFor="number"
                    className="text-sm leading-7 text-gray-300"
                  >
                    Movie Year
                  </label>
                  <input
                    type="number"
                    placeholder="YYYY"
                    id="number"
                    name="number"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-opacity-50 border border-gray-300 rounded outline-none bg-grey-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200"
                  />
                </div>
              </div>

              <div className="pl-2">
                <label>Featured:</label>
                <div>
                  <input
                    type="radio"
                    name="featured"
                    id="featured-yes"
                    value="true"
                    checked={form.featured === true}
                    onChange={handleFeaturedChange}
                  />
                  <label htmlFor="featured-yes">Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="featured"
                    id="featured-no"
                    value="false"
                    checked={form.featured === false}
                    onChange={handleFeaturedChange}
                  />
                  <label htmlFor="featured-no">No</label>
                </div>
              </div>

              <div className="w-full p-2">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="text-sm leading-7 text-gray-300"
                  >
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full h-32 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-opacity-50 border border-gray-300 rounded outline-none resize-none bg-grey-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200"
                  ></textarea>
                </div>
              </div>
              <div className="w-full p-2">
                <button
                  disabled={loading}
                  className="flex px-8 py-2 mx-auto text-lg text-white bg-orange-500 border-0 rounded focus:outline-none hover:bg-orange-400"
                >
                  {loading ? (
                    <TailSpin height={25} width={50} color="white" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddMovie;
