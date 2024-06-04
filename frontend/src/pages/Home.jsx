import { PiList } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import api from "../config/axios";
import { Link } from "react-router-dom";
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  useEffect(() => {
    const fetchMovies = async (page, search, sort) => {
      try {
        const params = new URLSearchParams(search);
        if (sort) {
          params.set("sort", sort);
        }
        // const response = await api.get(
        //   `/films?search=${params.toString().split("=")[0]}&sort=${
        //     params.toString().split("=")[1]
        //   }&page=${page}&limit=${pageSize}`
        // );
        const response = await api.get(
          `/films?${params.toString()}&page=${page}&limit=${pageSize}`
        );
        setMovies(response.data.data);
        setTotalPages(Math.ceil(response.data.total / pageSize));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies(currentPage, search, sortBy);
  }, [currentPage, search, pageSize, sortBy]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

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
              value={search}
              onChange={handleSearchChange}
              className="border border-slate-100 p-2 rounded-lg focus:outline-none"
            />
            <IoMdSearch className="absolute right-2 top-2 text-2xl" />
          </div>
        </nav>
        <div className="p-2">
          <div className="absolute top-[15%] right-[4%]">
            <select value={sortBy} onChange={handleSortChange}>
              <option value="">-- Sort by --</option>
              <option value="year_asc">Year (Low to High)</option>
              <option value="year_desc">Year (High to Low)</option>
              <option value="time_asc">Time (Low to High)</option>
              <option value="time_desc">Time (High to Low)</option>
            </select>
          </div>
          <p className="text-xl text-center font-semibold mt-2">
            Most Popular Movies
          </p>
          <div className="listMovie grid grid-cols-4 p-2">
            {movies.map((movie) => (
              <div
                key={movie.ID}
                className="movie p-2 flex flex-col justify-start items-center gap-2"
              >
                <Link to={`/films/${movie._id}`}>
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="w-full h-60 object-contain rounded-sm"
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
        <div className="absolute bottom-5 left-[50%] translate-x-[-50%]">
          <div className="pagination flex gap-3 justify-center ">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="font-semibold"
            >
              Prev
            </button>
            <span className="rounded-full px-2 bg-neutral-300">
              {currentPage}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="font-semibold"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
