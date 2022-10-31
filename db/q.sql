-- All movies and their reviews.
SELECT movies.movie_name AS Title, reviews.review AS Review FROM movies JOIN reviews ON movies.id = reviews.movie_id;