const Author = require("../models/author");
const asyncHandler = require("express-async-handler");

// Display list of all Authors.
exports.authorList = asyncHandler(async (req, res, next) => {
  const allAuthors = await Author.find().sort({ family_name: 1 }).exec();
  res.render("authorList", {
    title: "Author List",
    authorList: allAuthors,
  });
});

// Display detail page for a specific Author.
exports.authorDetail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
});

// Display Author create form on GET.
exports.authorCreateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author create GET");
});

// Handle Author create on POST.
exports.authorCreatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author create POST");
});

// Display Author delete form on GET.
exports.authorDeleteGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
});

// Handle Author delete on POST.
exports.authorDeletePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
});

// Display Author update form on GET.
exports.authorUpdateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update GET");
});

// Handle Author update on POST.
exports.authorUpdatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update POST");
});
