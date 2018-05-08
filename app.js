let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");

let app = express();
let PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Start server
// ==================================================================
app.listen(PORT, function() {
    console.log(`Listening on PORT ${PORT}`);
})

// Reservation Data
// ==================================================================
let reservations = [
    {
        name: "Bill Nye",
        number: 123456789,
        email: "bill@nye.com",
        id: 1234
    },
    {
        name: "Jimmy John",
        number: 5551112222,
        email: "jimmy@john.com",
        id: 4567
    },
    {
        name: "Steve Buschemi",
        number: 3334445555,
        email: "steve@buschemi.com",
        id: 9876
    },
    {
        name: "William Gates",
        number: 4448882222,
        email: "god@windows.com",
        id: 4321
    },
    {
        name: "Jeff Bezos",
        number: 6669991111,
        email: "lord@amazon.com",
        id: 2468
    }
];

// Routes
// ==================================================================
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
})

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));;
})

app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
})

//Display Reservations
// ==================================================================
app.get("/api/reservations/", function(req, res) {
    let chosen = req.params.name;

    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
        if (chosen < reservations.length) {
            return res.json(reservations[i]);
        }
    }

    return res.json(false);
})


// Create new reservations
// ==================================================================
app.post("/api/reservations", function(req, res) {
    
    let newRes = req.body;

    newRes.name = newRes.name.replace(/\s+/g, "").toLowerCase();

    console.log(newRes);

    reservations.push(newRes);

    res.json(newRes);

})