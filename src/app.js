const path = require("path");
const express = require("express");
const hbs = require('hbs')
const geocode = require('./utis/geocode')
const forecast = require('./utis/forecast')
const port = process.env.PORT || 3000;

// To get the path of the current file in the system
// console.log(__dirname)
// console.log(__filename)
//console.log(path.join(__dirname, "../public"))

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebat engine and views location
app.set('views', viewsPath)
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        name: "Sanchit",
        title: "Weather"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please enter the address"
        })
    }

    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })

    // res.send({
    //     title: "Weather App",
    //     name: "Sanchit",
    //     address: req.query.address
    // });
});

app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Sanchit",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "HELP",
        name: "Sanchit",
        message: "This is some helpful text"
    });
});

app.get("/help/*", (req, res) => {
    res.render("help", {
        title: "404",
        name: "Sanchit",
        message: "Help article not found"
    });
})

app.get("*", (req, res) => {
    res.render("help", {
        title: "404",
        name: "Sanchit",
        message: "ERROR 404 not found"
    });
})

app.listen(port, () => {
    console.log("Server is up on" + port);
});