const BookInstance = require("../models/bookInstance");
const asyncHandler = require("express-async-handler");

// Display list of all BookInstances.
exports.bookInstanceList = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance list");
});

// Display detail page for a specific BookInstance.
exports.bookInstanceDetail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
});

// Display BookInstance create form on GET.
exports.bookInstanceCreateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
});

// Handle BookInstance create on POST.
exports.bookInstanceCreatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
});

// Display BookInstance delete form on GET.
exports.bookInstanceDeleteGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
});

// Handle BookInstance delete on POST.
exports.bookInstanceDeletePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
});

// Display BookInstance update form on GET.
exports.bookInstanceUpdateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
});

// Handle bookinstance update on POST.
exports.bookInstanceUpdatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
});
