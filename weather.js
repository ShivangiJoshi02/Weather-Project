const express = require("express");
const https = require("https");

const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/weather.html");
}
);

app.post("/", function (req, res) {
    const query = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=caac079120c604b80d5317baf03b30b1&units=metric";
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const weatherDescrip = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";


            
            res.write("<body style='background-image: url(bg.jpg)'><div style='display:felx; justify-content: center; flex-direction:column;margin-top:10%; margin-left:30%;  background-color: rgb(211, 202, 202);width: 80%; max-width: 500px; height: 200px;border-radius: 20px;padding: 30px; font-family: 'Open Sans', sans-serif;'></body>");
            res.write("<h1 style='color: black;' >Temperature is " + temp + " degree Celsius.</h1>");
            res.write("<h2 style='color:black;' >The weather is " + weatherDescrip + " currently.</h2>");
            res.write("<img src=" + imageurl + ">");
            res.send();
        });
    });
})

app.listen(3000, function () {
    console.log("Server running...at 3000...");
});