const fs = require("fs");
const path = require("path");

const booksDbPath = path.join(__dirname, "../db", "books.json");

//READ FUNCTION
function getAllBooks(req, res) {
  fs.readFile(booksDbPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(404);
      res.end("An error occurred");
    }
    res.end(data);
  });
}
function addBook(req, res) {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  req.on("end", () => {
    const parsedBook = Buffer.concat(body).toString();
    const newBook = JSON.parse(parsedBook);

    //add the new book to the end of the existing books array
    fs.readFile(booksDbPath, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(404);
        res.end("An error occurred");
      }

      const oldBooks = JSON.parse(data);
      const allBooks = [...oldBooks, newBook];

      //saving to db
      fs.writeFile(booksDbPath, JSON.stringify(allBooks), (err) => {
        if (err) {
          console.log(err);
          res.writeHead(500);
          res.end(
            JSON.stringify({
              message:
                "Internal Server Error. Could not save book to database.",
            })
          );
        }

        res.end(JSON.stringify("Book added successfully"));
      });
    });
  });
}
function updateBook(req, res) {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const parsedBook = Buffer.concat(body).toString();
    const detailsToUpdate = JSON.parse(parsedBook);
    const bookId = detailsToUpdate.id;

    fs.readFile(booksDbPath, "utf8", (err, books) => {
      if (err) {
        console.log(err);
        res.writeHead(404);
        res.end("An error occurred");
      }

      const booksObj = JSON.parse(books);
      const bookIndex = booksObj.findIndex((book) => book.id === bookId);

      // console.log(booksObj[bookIndex]);
      console.log(bookIndex);
      if (bookIndex === -1) {
        res.writeHead(404);
        res.end("Book with the specified id not found!");
        return;
      }

      const updatedBooks = { ...booksObj[bookIndex], ...detailsToUpdate };
      booksObj[bookIndex] = updatedBooks;
      fs.writeFile(booksDbPath, JSON.stringify(booksObj), (err) => {
        if (err) {
          console.log(err);
          res.writeHead(500);
          res.end(
            JSON.stringify({
              message:
                "Internal Server Error. Could not save book to database.",
            })
          );
        }
        res.writeHead(200);
        res.end(JSON.stringify("Update Successful!"));
      });
    });
  });
}

function deleteBook(req, res) {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const parsedBook = Buffer.concat(body).toString();
    const detailsToUpdate = JSON.parse(parsedBook);
    const bookId = detailsToUpdate.id;

    fs.readFile(booksDbPath, "utf8", (err, books) => {
      if (err) {
        console.log(err);
        res.writeHead(404);
        res.end("An error occurred");
      }

      const booksObj = JSON.parse(books);
      const bookIndex = booksObj.findIndex((book) => book.id === bookId);

      console.log(bookIndex);
      if (bookIndex === -1) {
        res.writeHead(404);
        res.end("Book with the specified id not found!");
        return;
      }
      //DELETE FUNCTION
      booksObj.splice(bookIndex, 1);

      fs.writeFile(booksDbPath, JSON.stringify(booksObj), (err) => {
        if (err) {
          console.log(err);
          res.writeHead(500);
          res.end(
            JSON.stringify({
              message:
                "Internal Server Error. Could not save book to database.",
            })
          );
        }
        res.writeHead(200);
        res.end(JSON.stringify("Deletion Successful!"));
      });
    });
  });
}

module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
};
