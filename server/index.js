import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./model/bookModel.js";

const app = express();

app.use(express.json());

app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message:
          "Send all the required fields : Title, Author and Publish Year",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);
    return response.status(500).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.send(400).send({ message: error.message });
  }
});

app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json({
      book,
    });
  } catch (error) {
    console.log(error.message);
    response.send(400).send({ message: error.message });
  }
});

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("<h1>welcome to Rutik's Books Store</h1>");
});

app.put("/books/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(500).send({ message: "Send All Required fields" });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book Not Found" });
    }

    return response.status(200).send({ message: "Book Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(400).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is Connected with the Book Store Database");
    app.listen(PORT, () => {
      console.log(`App is working on PORT NO : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
