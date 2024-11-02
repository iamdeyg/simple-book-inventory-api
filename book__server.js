const fs = require("fs");
const http = require("http");
const path = require("path");

const { bookRouter } = require("./router");
const booksDbPath = path.join(__dirname, "db", "books.json");
const {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
} = require("./controller/book_controller");

const PORT = 4000;
const HOST_NAME = "localhost";

// READ
function requestHandler(req, res) {
  if (req.url === "/books") {
    bookRouter(req, res);
  }
}

// Create server
const server = http.createServer(requestHandler);

server.listen(PORT, HOST_NAME, () => {
  booksDB = JSON.parse(fs.readFileSync(booksDbPath, "utf8"));
  console.log(`Server is listening on ${HOST_NAME}:${PORT}`);
});
