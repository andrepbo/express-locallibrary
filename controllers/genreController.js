const { body, validationResult } = require("express-validator");
const Book = require("../models/book");
const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");

// Display list of all Genre.
exports.genreList = asyncHandler(async (req, res, next) => {
  const allGenre = await Genre.find().sort({ name: 1 }).exec();
  res.render("genreList", {
    title: "Genre List",
    genreList: allGenre,
  });
});

// Display detail page for a specific Genre.
exports.genreDetail = asyncHandler(async (req, res, next) => {
  // Get details of genre and all associated books (in parallel)
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ]);
  if (genre === null) {
    // No results.
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }

  res.render("genreDetail", {
    title: "Genre Detail",
    genre: genre,
    genreBooks: booksInGenre,
  });
});

// Display Genre create form on GET.
exports.genreCreateGet = (req, res, next) => {
  res.render("genreForm", { title: "Create Genre" });
};

// Handle Genre create on POST.
exports.genreCreatePost = [
  // Validate and sanitize the name field.
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("genreForm", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      const genreExists = await Genre.findOne({ name: req.body.name }).exec();
      if (genreExists) {
        // Genre exists, redirect to its detail page.
        res.redirect(genreExists.url);
      } else {
        await genre.save();
        // New genre saved. Redirect to genre detail page.
        res.redirect(genre.url);
      }
    }
  }),
];

// Display Genre delete form on GET.
exports.genreDeleteGet = asyncHandler(async (req, res, next) => {
  // Get details of genre and all associated books (in parallel)
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ]);
  if (genre === null) {
    // No results.
    res.redirect("/catalog/genres");
  }

  res.render("genreDelete", {
    title: "Delete Genre",
    genre: genre,
    genrebooks: booksInGenre,
  });
});

// Handle Genre delete on POST.
exports.genreDeletePost = asyncHandler(async (req, res, next) => {
  // Get details of genre and all associated books (in parallel)
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ]);

  if (booksInGenre.length > 0) {
    // Genre has books. Render in same way as for GET route.
    res.render("genreDelete", {
      title: "Delete Genre",
      genre: genre,
      genrebooks: booksInGenre,
    });
    return;
  } else {
    // Genre has no books. Delete object and redirect to the list of genres.
    await Genre.findByIdAndRemove(req.body.id);
    res.redirect("/catalog/genres");
  }
});

// Display Genre update form on GET.
exports.genreUpdateGet = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id).exec();

  if (genre === null) {
    // No results.
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }

  res.render("genreForm", { title: "Update Genre", genre: genre });
});

// Handle Genre update on POST.
exports.genreUpdatePost = [
  // Validate and sanitize the name field.
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request .
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data (and the old id!)
    const genre = new Genre({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values and error messages.
      res.render("genreForm", {
        title: "Update Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      await Genre.findByIdAndUpdate(req.params.id, genre);
      res.redirect(genre.url);
    }
  }),
];
