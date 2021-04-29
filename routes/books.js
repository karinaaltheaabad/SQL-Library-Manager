var express = require('express');
var router = express.Router();
var { Book } = require('../models');


function asyncHandler(callback) {
    return async(req, res, next) => {
      try {
        await callback(req, res, next)
      } catch (error) {
        next(error);
      }
    }
  }

  /**
 * displays all books in database
 */
router.get('/books', asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render('index', { books, title: "Books" })
  }));
  
  /**
   * shows create new book form
   */
  router.get('/books/new', (req, res) => {
    res.render('new-book', { book: {}, title: "New Book"});
  });
  
  /**
   * posts new book in database
   */
  router.post('/books/new', asyncHandler(async (req, res) => {
    try {
      let book;
      book = await Book.create(req.body);
      res.redirect('/');
    } catch (error) {
        if(error.name === "SequelizeValidationError") { // checking the error
          book = await Book.build(req.body);
          res.render("new-book", { book, errors: error.errors, title: "New Book" })
        } else {
          throw error;
        }  
      }
  }));
  
  /**
   * shows book detail form 
   */
  router.get('/books/:id', asyncHandler(async (req, res) => {
    let book;
    book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("display-book", { book, title: book.title });
    } else {
      res.render('page-not-found');
    }
  }));

  /**
   * shows book update form 
   */
  router.get('/books/:id/update', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.render('update-book', { book, title: "Update Book"})
  }));
  
  /**
   * updates book info in the database
   */
  router.post('/books/:id', asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.findByPk(req.params.id);
      if (book) {
        await book.update(req.body);
        res.redirect('/books/' + book.id);
      } else {
        res.render('page-not-found');
      }
    } catch (error) {
      if(error.name === "SequelizeValidationError") { // checking the error
        book = await Book.build(req.body);
        book.id = req.params.id; 
        res.render("update-book", { book, errors: error.errors, title: "Update Book" })
      } else {
        res.render('page-not-found')
      }  
    }
  }));
  
  /**
   * deletes book info from the database
   */
   router.post('/books/:id/delete', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
      await book.destroy();
      res.redirect("/");
    } else {
      res.render('page-not-found');
    }
  }));  
  
  module.exports = router;