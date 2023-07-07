const Book = require("../models/book");
const BookInstance = require("../models/bookInstance");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all BookInstances.
exports.bookInstanceList = asyncHandler(async (req, res, next) => {
  const allBookInstances = await BookInstance.find().populate("book").exec();

  res.render("bookInstanceList", {
    title: "Book Instance List",
    bookInstanceList: allBookInstances,
  });
});

// Display detail page for a specific BookInstance.
exports.bookInstanceDetail = asyncHandler(async (req, res, next) => {
  const bookinstance = await BookInstance.findById(req.params.id)
    .populate("book")
    .exec();

  if (bookinstance === null) {
    // No results.
    const err = new Error("Book copy not found");
    err.status = 404;
    return next(err);
  }

  res.render("bookInstanceDetail", {
    title: "Book:",
    bookinstance: bookinstance,
  });
});

// Display BookInstance create form on GET.
exports.bookInstanceCreateGet = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, "title").exec();

  res.render("bookInstanceForm", {
    title: "Create BookInstance",
    book_list: allBooks,
  });
});

// Handle BookInstance create on POST.
exports.bookInstanceCreatePost = [
  // Validate and sanitize fields.
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    const bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with sanitized values and error messages.
      const allBooks = await Book.find({}, "title").exec();

      res.render("bookInstanceForm", {
        title: "Create BookInstance",
        book_list: allBooks,
        selected_book: bookinstance.book._id,
        errors: errors.array(),
        bookinstance: bookinstance,
      });
      return;
    } else {
      // Data from form is valid
      await bookinstance.save();
      res.redirect(bookinstance.url);
    }
  }),
];

// Display BookInstance delete form on GET.
exports.bookInstanceDeleteGet = asyncHandler(async (req, res, next) => {
  const bookinstance = await BookInstance.findById(req.params.id)
    .populate("book")
    .exec();

  if (bookinstance === null) {
    // No results.
    res.redirect("/catalog/bookinstances");
  }

  res.render("bookInstanceDelete", {
    title: "Delete BookInstance",
    bookinstance: bookinstance,
  });
});

// Handle BookInstance delete on POST.
exports.bookInstanceDeletePost = asyncHandler(async (req, res, next) => {
  // Assume valid BookInstance id in field.
  await BookInstance.findByIdAndRemove(req.body.id);
  res.redirect("/catalog/bookinstances");
});

// Display BookInstance update form on GET.
exports.bookInstanceUpdateGet = asyncHandler(async (req, res, next) => {
  // Get book, all books for form (in parallel)
  const [bookInstance, allBooks] = await Promise.all([
    BookInstance.findById(req.params.id).populate("book").exec(),
    Book.find(),
  ]);

  if (bookInstance === null) {
    // No results.
    const err = new Error("Book copy not found");
    err.status = 404;
    return next(err);
  }

  res.render("bookInstanceForm", {
    title: "Update BookInstance",
    book_list: allBooks,
    selected_book: bookInstance.book._id,
    bookinstance: bookInstance,
  });
});

// Handle BookInstance update on POST.
exports.bookInstanceUpdatePost = [
  // Validate and sanitize fields.
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped/trimmed data and current id.
    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      // Render the form again, passing sanitized values and errors.

      const allBooks = await Book.find({}, "title").exec();

      res.render("bookInstanceForm", {
        title: "Update BookInstance",
        book_list: allBooks,
        selected_book: bookInstance.book._id,
        errors: errors.array(),
        bookinstance: bookInstance,
      });
      return;
    } else {
      // Data from form is valid.
      await BookInstance.findByIdAndUpdate(req.params.id, bookInstance, {});
      // Redirect to detail page.
      res.redirect(bookInstance.url);
    }
  }),
];
