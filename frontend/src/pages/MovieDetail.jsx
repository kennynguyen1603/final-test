import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../config/axios";
import { IoMdClose } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
const MovieDetail = () => {
  const [movie, setMovie] = useState({});
  const { films } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
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

  const handleSetEditImage = () => {
    setIsEdit(true);
  };

  const handleSaveImage = async () => {
    try {
      await api.put(`/films/${films}`, { image: selectedImage });
      setMovie({ ...movie, image: selectedImage });
      setIsEdit(false);
    } catch (error) {
      console.error(error);
    }
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
            <button
              className="absolute right-[-10px] top-[-15px] text-xl hover:bg-orange-50 p-2 rounded-full"
              onClick={handleSetEditImage}
            >
              <MdOutlineModeEdit />
            </button>
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
          {isEdit && (
            <div className="editImage absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div className="editImage__content bg-white p-4 rounded-xl relative">
                <button
                  className="text-xl absolute top-0 right-0"
                  onClick={() => setIsEdit(false)}
                >
                  <IoMdClose />
                </button>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={selectedImage}
                  onChange={(e) => setSelectedImage(e.target.value)}
                  className="border border-slate-100 p-2 rounded-lg focus:outline-none w-full"
                />
                <img
                  src={selectedImage}
                  alt="edit"
                  className="w-64 h-96 object-cover rounded-lg mt-2"
                />
                <button
                  className="btn__editImage uppercase text-white bg-[#ed8f03] p-2 rounded-lg mt-2"
                  onClick={() => handleSaveImage()}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
