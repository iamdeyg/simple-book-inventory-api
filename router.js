const {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
} = require("./controller/book_controller");
function bookRouter(req, res) {
  switch (req.method) {
    case "GET":
      getAllBooks(req, res);
      break;
    case "POST":
      addBook(req, res);
      break;
    case "PUT":
      updateBook(req, res);
      break;
    case "DELETE":
      deleteBook(req, res);
      break;
    default:
      res.writeHead(400);
      res.write("invalid request");
      res.end();
  }
}

module.exports = {
  bookRouter,
};
