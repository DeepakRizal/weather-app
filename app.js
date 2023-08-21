const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
dotenv.config({ path: "./.env" });

app.use(express.static("public"));

app.post("/weather", async (req, res) => {
  const cityName = req.body.city;

  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${cityName}&aqi=no`
    );
    const data = response.data;
    res.render("weather", { data: data });
  } catch (err) {
    if (err) {
      const error = {
        status: "fail",
        message: "Cannot find the city or internal server error ",
        statusCode: 404,
      };
      res.render("errorRender", { data: { error } });
    }
  }
});

app.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (err) {
    res.status(400).json("Something went wrong Please Try Again!");
  }
});

app.listen(3000, () => {
  console.log("listening at port 3000");
});
