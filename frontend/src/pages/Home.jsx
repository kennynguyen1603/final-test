import { PiList } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import api from "../config/axios";
import { Link } from "react-router-dom";
const Home = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get("/films");
        setMovies(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  return (
    <div className="home w-full h-screen">
      <div className="container mx-auto w-1/2 h-[55vh] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-2xl flex flex-col">
        <nav className="flex items-center justify-center p-4 border-b relative">
          <div className="absolute top-[50%] left-3 translate-y-[-50%]">
            <button className="text-2xl">
              <PiList />
            </button>
          </div>
          <h1 className="text-2xl font-semibol uppercase">
            Movie
            <span className="text-xl uppercase rounded-full bg-[#f37335] text-white px-2 py-1 text-center">
              ui
            </span>
          </h1>
          <div className="absolute top-[50%] right-3 translate-y-[-50%] flex">
            <input
              type="text"
              placeholder="Search"
              className="border border-slate-100 p-2 rounded-lg focus:outline-none"
            />
            <IoMdSearch className="absolute right-2 top-2 text-2xl" />
          </div>
          {/* <a href="/movie/1" className="text-blue-500">
            Movie 1
          </a> */}
        </nav>
        <div className="p-4">
          <p className="text-xl text-center font-semibold ">
            Most Popular Movies
          </p>
          <div className="listMovie grid grid-cols-4 p-4">
            {movies.map((movie) => (
              <div
                key={movie.ID}
                className="movie p-2 flex flex-col justify-start items-center gap-2"
              >
                <Link to={`/films/${movie._id}`}>
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="w-full h-[260px] object-contain rounded-sm"
                  />
                </Link>
                <p className="text-normal font-semibold">{movie.name}</p>
                <p className="text-sm text-gray-500">
                  {movie.time} min {movie.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
