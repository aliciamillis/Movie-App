const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;


const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();

const passport = require('passport');
require('./passport');

mongoose.connect('mongodb://localhost:27017/Movie_API', {
  useNewUrlParser: true,
  useUnifiedTopology: true});

app.use(morgan('common'));

app.use(bodyParser.json());

let auth = require('./auth')(app);


// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my favourite movies!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root:__dirname });
});

//return all movies
app.get('/movies', passport.authenticate('jwt', { session: false}), (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//get single movie by title

app.get('/movies/title/:Title', passport.authenticate('jwt', { session: false}), (req, res) => {
  Movies.findOne({Title: req.params.Title })
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//get movies by genre

app.get('/movies/genre/:Genre', passport.authenticate('jwt', { session: false}), (req, res) => {
  Movies.findOne({ Name: req.params.Name})
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//get director info from name

app.get('/directors/:Name', passport.authenticate('jwt', { session: false}), (req, res) => {
  Movies.findOne({ Director: req.params.Name })
    .then((movie) => {
      res.json(movie.Bio);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Add a user
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Err: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//update user CAN"T GET THIS ONE TO WORK

app.put('/users/:Username', passport.authenticate('jwt', { session: false}), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true },
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

//GET user with /user

app.get('/users', function (req, res) {
  Users.find()
    .then(function (users) {
      res.status(201).json(users);
    })
    .catch(function (err) {
       console.error(err);
       res.status(500).send('Error: ' + err);
    });
});

// allow user to add movie to fav list
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false}), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username}, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
  { new: true },
  (err, updatedUser ) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser)
    }
  });
});


// user can remove favorite movie from list  CAB"T GET THIS ONE TO WORK

app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false}), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username}, {
    $pull: { FavoriteMovies: req.params.MovieID }
  },
  { new: true },
  (err, updatedUser ) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//allow users to delete profile with name

app.delete('/users/:Username', passport.authenticate('jwt', { session: false}), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username = ' was deleted');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//broke error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
