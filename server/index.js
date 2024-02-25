import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./bookRoute/bookRoute.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("<h1>welcome to Rutik's Books Store</h1>");
});

app.use("/books", booksRoute);

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
