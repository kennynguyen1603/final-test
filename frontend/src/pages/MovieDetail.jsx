import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../config/axios";
import { IoMdClose } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
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

  const backhome = () => {
    window.location.href = "/";
  };
  return (
    <div className="movieDetail w-full h-screen">
      <div className="container mx-auto w-[34%] h-[41vh] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl flex flex-col">
        <button
          className="text-xl absolute top-5 right-5"
          onClick={() => backhome()}
        >
          <IoMdClose />
        </button>
        <div className="p-4 flex flex-col justify-start items-center">
          <div className="movieDetail__poster absolute top-[-30px] left-[-30px]">
            <img
              src={movie.image}
              alt={movie.name}
              className="w-64 h-96 object-cover rounded-lg"
            />
          </div>
          <div className="movieDetail__content flex flex-col ml-60 my-3 gap-1">
            <h1 className="text-3xl">{movie.name}</h1>
            <p className="text-normal text-gray-500 mb-3">
              {movie.time} min {movie.year}
            </p>
            <p className="text-normal text-gray-500">{movie.introduce}</p>
          </div>
          <button className="btn__play uppercase flex items-center gap-2 text-white bg-[#ed8f03] font-medium p-3 text-normal mt-5 rounded-full">
            <FaPlay />
            <span>play movie</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
