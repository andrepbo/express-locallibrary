const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");

// Display list of all Genre.
exports.genreList = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre list");
});

// Display detail page for a specific Genre.
exports.genreDetail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
});

// Display Genre create form on GET.
exports.genreCreateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create GET");
});

// Handle Genre create on POST.
exports.genreCreatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create POST");
});

// Display Genre delete form on GET.
exports.genreDeleteGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

// Handle Genre delete on POST.
exports.genreDeletePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

// Display Genre update form on GET.
exports.genreUpdateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

// Handle Genre update on POST.
exports.genreUpdatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});
