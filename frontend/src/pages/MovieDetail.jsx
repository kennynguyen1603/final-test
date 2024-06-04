import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../config/axios";
import { IoMdClose } from "react-icons/io";
const MovieDetail = () => {
  const [movie, setMovie] = useState({});
  const { films } = useParams();
  console.log("🚀 ~ MovieDetail ~ movieId:", films);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/films/${films}`);
        setMovie(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovie();
  }, [films]);

  useEffect(() => {
    console.log(movie);
  }, [movie]);
  return (
    <div className="movieDetail w-full h-screen">
      <div className="container mx-auto w-1/3 h-[40vh] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-2xl flex flex-col">
        <button className="text-xl absolute top-5 right-5">
          <IoMdClose />
        </button>
        <div className="p-4 flex">
          <div className="movieDetail__poster grow absolute">
            <img
              src={movie.image}
              alt={movie.name}
              className="w-64 h-96 object-cover rounded-lg"
            />
          </div>
          <div className="movieDetail__content flex flex-col">
            <h1 className="text-2xl font-semibold">{movie.name}</h1>
            <p className="text-lg text-gray-500">
              {movie.time} min {movie.year}
            </p>
            <p className="text-lg font-semibold">
              Description: {movie.introduce}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
