import FilmModel from "../models/filmModel.js";

const buildSearchQuery = (search) => {
  const searchQuery = {
    $and: [],
  };
  if (search) {
    searchQuery.$and.push({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { introduce: { $regex: search, $options: "i" } },
      ],
    });
  }
  return searchQuery.$and.length > 0 ? searchQuery : {};
};

const buildSortQuery = (sortBy) => {
  const sortQuery = {};
  if (sortBy) {
    if (sortBy === "year_asc") {
      sortQuery.year = 1;
    } else if (sortBy === "year_desc") {
      sortQuery.year = -1;
    } else if (sortBy === "time_asc") {
      sortQuery.time = 1;
    } else if (sortBy === "time_desc") {
      sortQuery.time = -1;
    }
  }
  return sortQuery;
};

const filmController = {
  getAllFilms: async (req, res) => {
    try {
      const { search, sort } = req.query;
      const searchQuery = buildSearchQuery(search);
      const sortQuery = buildSortQuery(sort);
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const totalCount = await FilmModel.countDocuments();
      const films = await FilmModel.find(searchQuery)
        .skip(skip)
        .limit(limit)
        .sort(sortQuery);
      res.status(200).send({
        message: "Get all films successfully",
        data: films,
        limit: limit,
        total: totalCount,
        success: true,
      });
    } catch (error) {
      return res.status(error.status || 500).send({
        data: null,
        message: error.message || "Internal server error",
        success: false,
      });
    }
  },

  createFilm: async (req, res) => {
    try {
      const { ID, name, time, year, imageThumbnail, introduce } = req.body;
      // không được trùng ID
      const film = await FilmModel.findOne({ ID });
      if (film) {
        return res.status(400).send({
          message: "ID is already taken",
          success: false,
        });
      }

      const newFilm = new FilmModel({
        ID,
        name,
        time,
        year,
        image: imageThumbnail,
        introduce,
      });
      await newFilm.save();
      res.status(201).send({
        message: "Create film successfully",
        data: newFilm,
        success: true,
      });
    } catch (error) {
      return res.status(error.status || 500).send({
        data: null,
        message: error.message || "Internal server error",
        success: false,
      });
    }
  },

  // sửa hình ảnh của phim
  updateFilm: async (req, res) => {
    try {
      const { ID, name, time, year, image, introduce } = req.body;

      // ID không được trùng
      const film = await FilmModel.findOne({ ID });
      if (film) {
        return res.status(400).send({
          message: "ID is already taken",
          success: false,
        });
      }

      await FilmModel.findByIdAndUpdate(req.params.id, {
        ID,
        name,
        time,
        year,
        image,
        introduce,
      });
      res.status(200).send({
        message: "Update film successfully",
        success: true,
      });
    } catch (error) {
      return res.status(error.status || 500).send({
        data: null,
        message: error.message || "Internal server error",
        success: false,
      });
    }
  },
  deleteFilm: async (req, res) => {
    try {
      await FilmModel.findByIdAndDelete(req.params.id);
      res.status(200).send({
        message: "Delete film successfully",
        success: true,
      });
    } catch (error) {
      return res.status(error.status || 500).send({
        data: null,
        message: error.message || "Internal server error",
        success: false,
      });
    }
  },
  getFilmById: async (req, res) => {
    try {
      const film = await FilmModel.findById(req.params.id);
      res.status(200).send({
        message: "Get film by id successfully",
        data: film,
        success: true,
      });
    } catch (error) {
      return res.status(error.status || 500).send({
        data: null,
        message: error.message || "Internal server error",
        success: false,
      });
    }
  },
  // sắp xếp phim
};

export default filmController;
