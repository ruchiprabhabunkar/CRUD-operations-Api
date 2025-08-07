const express = require("express");
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = 3000
app.listen(PORT, () => {
  console.log(`servwer is running on http://localhost:${PORT}`);
});


const Books = [
  {
    id: 1,
    name: "JungleBook",
    author: "abc",
  },
  {
    id: 2,
    name: "RichDad",
    author: "xyz",
  },
];

// create Books
const CreateBook = (req, res) => {
  const { id, name, author } = req.body;
  const existBook = Books.find((book) => book.id === id);
  if (existBook) {
    return res
      .status(400)
      .send({ msg: "This book is already exist please add a another one" });
  }

  const book = {
    id,
    name,
    author,
  };

  Books.push(book);
  console.log(book, "createdbook");

  res.status(201).send({ msg: "book created Successfully", data: book });
};

//Update Books
const UpdateBook = (req, res) => {
  try {
    const BookId = parseInt(req.params.id);
    console.log(BookId);

    const { name, author } = req.body;
    const book = Books.find((book) => book.id === BookId);
    console.log(book, "finded book");
    if (!book) {
      return res.status(404).send("book not found with this is");
    }
    if (name) {
      book.name = name;
    }
    if (author) {
      book.author = author;
    }
    console.log("updated book", book);

    res.status(200).send({ msg: "book update successfully", book });
  } catch (err) {
    res.status(500).send("internal server error");
  }
};

//Get All Books
const GetAllBooks = async (req, res) => {
  res.status(200).send({ AllBooks: Books });
};

//Delete Book
const DeleteBook = (req,res)=>{
    const bookId = parseInt(req.params.id)

    const book = Books.find((book)=> book.id=== bookId)

    if(!book){
        return res.status(404).send("book not found with this id")
    }
    const deletedbook = Books.filter((book)=> book.id !== bookId);
    res.send({msg:"book deleted successfully remaining books are",deletedbook})
}

//Routes

const router = express.Router();
router.post("/create", CreateBook);
router.put("/update/:id", UpdateBook);
router.get("/getAll", GetAllBooks);
router.delete("/delete/:id",DeleteBook)

app.use("/books", router);
