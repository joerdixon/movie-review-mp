// Required Package.
const express = require("express");
const mysql = require("mysql2");

// Start express server.
const app = express();

// Declare port.
const PORT = 3000;

// Middleware for data interchange.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
// Create database connection.
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'movies_db'
    },    
    console.log("connected to database.")
)    

// Route for all movies.
app.get("/api/movies", (req, res) => {
    db.query('SELECT * FROM movies;', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.json(results);
        }    
    })    
})    

// Route for all reviews.
app.get("/api/reviews", (req, res) => {
    db.query('SELECT movies.movie_name AS Title, reviews.review AS Review FROM movies JOIN reviews ON movies.id = reviews.movie_id;', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.json(results);
        }    
    })    
})    

// Allows users to add movies.
app.post("/api/add-movie", (req, res) => {
    db.execute(`INSERT INTO movies (movie_name) VALUES ('${req.body.name}');`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Added!")
            res.json(results)
        }    
    })    
})    

// Deletes movie specified by ID.
app.delete("/api/movies/:id", (req, res) => {
    db.execute(`DELETE FROM movies WHERE id=${req.params.id}`, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Movie Deleted!");
            res.json(results)
        }    
    })    
})    

app.put("/api/update-review/:id", (req, res) => {
    db.execute(`UPDATE reviews SET review = '${req.body.review}' WHERE id = ${req.params.id}`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Review ${req.params.id} Updated!`);
            res.json(results)
        }    
    })    
})    

app.post("/api/add-review/:movie", (req, res) => {
    db.execute(`INSERT INTO reviews (movie_id, review) VALUES ('${req.params.movie}', '${req.body.review}')`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Review Added!");
            res.json(results);
        }    
    })    
})    


// Turn on port.
app.listen(PORT, () => 
console.log(`Listening on port ${PORT}`)
)

