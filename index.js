const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();

mongoose.connect('mongodb://localhost:27017/Movie_API', {
  useNewUrlParser: true,
  useUnifiedTopology: true});

app.use(morgan('common'));

app.use(bodyParser.json());

// let users = [
//   {
//     id: '1',
//     name: 'Alicia Millis',
//     password: 'angel',
//     email: 'alicia.millis@gmail.com',
//     dob: '11/13/1983'
//   },
//   {
//     id: '2',
//     name: 'Ivy Millis',
//     password: 'Teeboo',
//     email: 'ivy.marie.millis@gmail.com',
//     dob: '04/26/2009'
//   },
//   {
//     id: '3',
//     name: 'Ayla Millis',
//     password: 'Cadeau',
//     email: 'ayla.mei.millis@gmail.com',
//     dob: '02/25/2011'
//   }
// ];
//
// let topMovies = [
//   {
//     title: 'Kill Bill Vol 1',
//     genre: 'action',
//     description: 'A pregnant assassin, code-named The Bride, goes into a coma for four years after her ex-boss Bill brutally attacks her. When she wakes up, she sets out to seek revenge on him and his associates.',
//     featured: 'No',
//     director: 'Quentin Tarantino'
//   },
//   {
//     title: 'Silence of the Lambs',
//     genre: 'thriller',
//     description: 'Clarice Starling, an FBI agent, seeks help from Hannibal Lecter, a psychopathic serial killer and former psychiatrist, in order to apprehend another serial killer who has been claiming female victims.',
//     featured: 'No',
//     director: 'Jonathan Demme'
//   },
//   {
//     title: 'Inception',
//     genre: 'science fiction',
//     description: 'Cobb steals information from his targets by entering their dreams. Saito offers to wipe clean Cobbs criminal history as payment for performing an inception on his sick competitors son.',
//     featured: 'No',
//     director: 'Christopher Nolan'
//   },
//   {
//     title: 'The Village',
//     genre: 'thriller',
//     description: 'An isolated town lives in fear of an unknown monster from the surrounding woods. But when one from the community is badly injured, a blind girl sets out into the woods to find help from beyond.',
//     featured: 'No',
//     director: 'M.Night Shyamalan'
//   },
//   {
//     title: 'Interstellar',
//     genre: 'science fiction',
//     description: 'In the future, where Earth is becoming uninhabitable, farmer and ex-NASA pilot Cooper is asked to pilot a spacecraft along with a team of researchers to find a new planet for humans.',
//     featured: 'No',
//     director: 'Christopher Nolan'
//   },
//   {
//     title: '12 Monkeys',
//     genre: 'science fiction',
//     description: 'James Cole, a convict, decides to volunteer for a mission, wherein he has to travel back in time to learn about the main reason behind the outbreak of a virulent holocaust.',
//     featured: 'No',
//     director: 'Terry Gilliam'
//   },
//   {
//     title: 'Knives Out',
//     genre: 'mystery',
//     description: 'The circumstances surrounding the death of crime novelist Harlan Thrombey are mysterious, but theres one thing that renowned Detective Benoit Blanc knows for sure -- everyone in the wildly dysfunctional Thrombey family is a suspect. Now, Blanc must sift through a web of lies and red herrings to uncover the truth.',
//     featured: 'Yes! Now availble on Netflix!',
//     director: 'Rian Johnson'
//   },
//   {
//     title: 'Final Cut',
//     genre: 'science fiction',
//     description: 'Editor Alan finds footage of a man who he believes shares a connection with his past. On the other hand, former editor Fletcher wants the same footage and plans to steal it.',
//     featured: 'No',
//     director: 'Omar Naim'
//   },
//   {
//     title: 'The Virgin Suicides',
//     genre: 'drama',
//     description: 'In an ordinary suburban house, on a lovely tree-lined street, in the middle of 1970s America, lived the five beautiful, dreamy Lisbon sisters, whose doomed fates indelibly marked the neighborhood boys who to this day continue to obsess over them. A story of love and repression, fantasy and terror, sex and death, memory and longing. It is at its core a mystery story: a heart-rending investigation into the impenetrable, life-altering secrets of American adolescence.',
//     featured: 'No',
//     director: 'Sofia Coppola'
//   },
//   {
//     title: 'Monster',
//     genre: 'mystery',
//     description: 'Shortly after moving to Florida, longtime prostitute Aileen Wuornos (Charlize Theron) meets young and reserved Selby Wall (Christina Ricci) and a romance blossoms. When a john (Lee Tergesen) attempts to brutalize Aileen, she kills him and resolves to give up prostitution. But supporting herself and her new girlfriend through legitimate means proves extremely difficult, and she soon falls back on old ways. More johns die, and Selby cant help but think her new friend iresponsible.',
//     featured: 'No',
//     director: 'Patty Jenkins'
//   }
// ];


// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my fav movies!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root:__dirname });
});

//return JSON when at /movies
app.get('/movies', (req, res) => {
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

app.get('/movies/title/:Title', (req, res) => {
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

app.get('/movies/genre/:Genre', (req, res) => {
  Movies.findOne({Genre: req.params.Genre})
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//get director info from name

app.get('/movies/director/:director', (req, res) => {
  Movies.findOne({ Director: req.params.Director })
    .then((movie) => {
      res.json(movie);
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
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//update user

app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username}, {
    $set:
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
app.put('/users/:Username/Movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username}, {
    $push: { FavoriteMovies: req.params.MovieID }
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


// user can remove favorite movie from list

app.put('/users/:Username/Movies/:MovieID', (req, res) => {
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

app.delete('/users/:Username', (req, res) => {
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
