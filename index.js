const express = require('express'),
  morgan = require('morgan');
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(morgan('common'));

app.use(bodyParser.json());

let users = [
  {
    id: '1',
    name: 'Alicia Millis',
    password: 'angel',
    email: 'alicia.millis@gmail.com',
    dob: '11/13/1983'
  },
  {
    id: '2',
    name: 'Ivy Millis',
    password: 'Teeboo',
    email: 'ivy.marie.millis@gmail.com',
    dob: '04/26/2009'
  }
];

let topMovies = [
  {
    title: 'Kill Bill Vol 1 & Vol 2',
    genre: 'action',
    description: 'A pregnant assassin, code-named The Bride, goes into a coma for four years after her ex-boss Bill brutally attacks her. When she wakes up, she sets out to seek revenge on him and his associates.',
    featured: 'No',
    director: 'Quentin Tarantino'
  },
  {
    title: 'Silence of the Lambs',
    genre: 'horror',
    description: 'Clarice Starling, an FBI agent, seeks help from Hannibal Lecter, a psychopathic serial killer and former psychiatrist, in order to apprehend another serial killer who has been claiming female victims.',
    featured: 'No',
    director: 'Jonathan Demme'
  },
  {
    title: 'Inception',
    genre: 'science fiction',
    description: 'Cobb steals information from his targets by entering their dreams. Saito offers to wipe clean Cobbs criminal history as payment for performing an inception on his sick competitors son.',
    featured: 'No',
    director: 'Christopher Nolan'
  },
  {
    title: 'The Village',
    genre: 'thriller',
    description: 'An isolated town lives in fear of an unknown monster from the surrounding woods. But when one from the community is badly injured, a blind girl sets out into the woods to find help from beyond.',
    featured: 'No',
    director: 'M.Night Shyamalan'
  },
  {
    title: 'Interstellar',
    genre: 'science fiction',
    description: 'In the future, where Earth is becoming uninhabitable, farmer and ex-NASA pilot Cooper is asked to pilot a spacecraft along with a team of researchers to find a new planet for humans.',
    featured: 'No',
    director: 'Christopher Nolan'
  },
  {
    title: '12 Monkeys',
    genre: 'science fiction',
    description: 'James Cole, a convict, decides to volunteer for a mission, wherein he has to travel back in time to learn about the main reason behind the outbreak of a virulent holocaust.',
    featured: 'No',
    director: 'Terry Gilliam'
  },
  {
    title: 'Knives Out',
    genre: 'mystery',
    description: 'The circumstances surrounding the death of crime novelist Harlan Thrombey are mysterious, but theres one thing that renowned Detective Benoit Blanc knows for sure -- everyone in the wildly dysfunctional Thrombey family is a suspect. Now, Blanc must sift through a web of lies and red herrings to uncover the truth.',
    featured: 'Yes! Now availble on Netflix!',
    director: 'Rian Johnson'
  },
  {
    title: 'Final Cut',
    genre: 'science fiction',
    description: 'Editor Alan finds footage of a man who he believes shares a connection with his past. On the other hand, former editor Fletcher wants the same footage and plans to steal it.',
    featured: 'No',
    director: 'Omar Naim'
  },
  {
    title: 'The Virgin Suicides',
    genre: 'drama',
    description: 'In an ordinary suburban house, on a lovely tree-lined street, in the middle of 1970s America, lived the five beautiful, dreamy Lisbon sisters, whose doomed fates indelibly marked the neighborhood boys who to this day continue to obsess over them. A story of love and repression, fantasy and terror, sex and death, memory and longing. It is at its core a mystery story: a heart-rending investigation into the impenetrable, life-altering secrets of American adolescence.',
    featured: 'No',
    director: 'Sofia Coppola'
  },
  {
    title: 'Monster',
    genre: 'crime',
    description: 'Shortly after moving to Florida, longtime prostitute Aileen Wuornos (Charlize Theron) meets young and reserved Selby Wall (Christina Ricci) and a romance blossoms. When a john (Lee Tergesen) attempts to brutalize Aileen, she kills him and resolves to give up prostitution. But supporting herself and her new girlfriend through legitimate means proves extremely difficult, and she soon falls back on old ways. More johns die, and Selby cant help but think her new friend iresponsible.',
    featured: 'No',
    director: 'Patty Jenkins'
  }
];


// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my fav movies!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root:__dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

//get single movie by title

app.get('/movies/title/:title', (req, res) => {
  res.json(topMovies.find((movie) =>
{ return movie.title === req.params.title }));
});

//get movies by genre

app.get('/movies/genres/:genre', (req, res) => {
  res.json(topMovies.find((movie) =>
{ return movie.genre === req.params.genre }));
});

//get director info from name

app.get('/movies/directors/:director', (req, res) => {
  res.json(topMovies.find((movie) =>
{ return movie.director === req.params.director }));
});

//add new user

app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    console.log('new user:', newUser)
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

// get new user and add fav movie

app.get('/users', (req, res) => {
  res.status(200).send(users);
});

app.put('/users/:id/addFavorite/:movie', (req, res) => {
  let user = users.find((user) => user.id === req.params.id);

  if (user) {
    if (!user.favorites) {
      user.favorites = [];
    }

    user.favorites.push(req.params.movie);
    res.status(201).send(user);
  } else {
    res.status(404).send('User ' + req.params.id + ' was not found.');
    console.log('action failed');
  }
});

// user can remove favorite movie from list

app.put('/users/:id/removeFavorite/:movie', (req, res) => {
  let user = users.find((user) => user.id === req.params.id);

  if (user && user.favorites) {
    user.favorites = user.favorites.filter((movie) => { return movie !== req.params.movie});

    res.status(201).send(user);
  } else {
    res.status(404).send('User ' + req.params.id + ' was not found.');
    console.log('action failed');
  }
});

//allow users to delete profile with id

app.delete('/users/:id', (req, res) => {
    console.log(req.params);
  let user = users.find((user) => user.id === req.params.id);
    console.log('user found', user, req.params.id)
  if (user) {
    console.log(users);
    users = users.filter((obj) => { return obj.id !== req.params.id });
    console.log(users);
    res.status(201).send('User ' + req.params.id + ' was deleted.');
  } else {
    res.status(404).send('User' + req.params.id + ' was not found.');
  }
});

app.put('/users/:id', (req, res) => {
  let user = users.find((user) => user.id === req.params.id);

  if (user) {
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    user.dob = req.body.dob;

    res.status(201).send(user);
  } else {
    res.stauts(404).send('User ' + req.params.id + ' was not found');
    console.log('action failed');
  }
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
