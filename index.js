const express = require('express'),
  morgan = require('morgan');
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(morgan('common'));

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: 'Alicia Millis',
    password: 'angel',
    fav_movies: {
      one: 'Kill Bill',
      two: 'The Village'
    }
  },
  {
    id: 2,
    name: 'Ivy Millis',
    password: 'Teeboo',
    fav_movies: {
      one: 'Little Feet'
    }
  }
];

let topMovies = [
  {
    title: 'Kill Bill Vol 1 & Vol 2',
    genre: 'action',
    description: 'A pregnant assassin, code-named The Bride, goes into a coma for four years after her ex-boss Bill brutally attacks her. When she wakes up, she sets out to seek revenge on him and his associates.',
    featured: 'No',
    director: {
      name: 'Quentin Tarantino',
      birthday: 'March 27, 1963',
      bio: 'Quentin Jerome Tarantino is an American film director, screenwriter, producer, and actor. His films are characterized by nonlinear storylines, aestheticization of violence, extended scenes of dialogue, ensemble casts, references to popular culture and a wide variety of other films, soundtracks primarily containing songs and score pieces from the 1960s to the 1980s, alternate history, and features of neo-noir film.',
      death: 'n/a'
    }
  },
  {
    title: 'Silence of the Lambs',
    genre: 'horror',
    description: 'Clarice Starling, an FBI agent, seeks help from Hannibal Lecter, a psychopathic serial killer and former psychiatrist, in order to apprehend another serial killer who has been claiming female victims.',
    featured: 'No',
    director: {
      name: 'Jonathan Demme',
      birthday: 'February 22, 1944',
      bio: 'Robert Jonathan Demme was an American film director, producer and screenwriter of film and television who earned widespread acclaim.',
      death: 'April 26, 2017'
    }
  },
  {
    title: 'Inception',
    genre: 'science fiction',
    description: 'Cobb steals information from his targets by entering their dreams. Saito offers to wipe clean Cobbs criminal history as payment for performing an inception on his sick competitors son.',
    featured: 'No',
    director: {
      name: 'Christopher Nolan',
      birthday: 'July 30, 1970',
      bio: 'Christopher Edward Nolan CBE is a British-American film director, producer and screenwriter known for making personal, distinctive films within the Hollywood mainstream. His directorial efforts have grossed more than US$5 billion worldwide, garnered 34 Oscar nominations and ten wins.',
      death:'n/a'
    }
  },
  {
    title: 'The Village',
    genre: 'thriller',
    description: 'An isolated town lives in fear of an unknown monster from the surrounding woods. But when one from the community is badly injured, a blind girl sets out into the woods to find help from beyond.',
    featured: 'No',
    director: {
      name: 'M.Night Shyamalan',
      birthday: 'August 6, 1970',
      bio: 'Manoj Nelliyattu "M. Night" Shyamalan is an American filmmaker, philanthropist and actor. He is known for making films with contemporary supernatural plots and twist endings. He was born in Mahé, Pondicherry, India, and raised in Penn Valley, Pennsylvania. The cumulative gross of his films exceeds $3 billion globally.',
      death: 'n/a'
    }
  },
  {
    title: 'Interstellar',
    genre: 'science fiction',
    description: 'In the future, where Earth is becoming uninhabitable, farmer and ex-NASA pilot Cooper is asked to pilot a spacecraft along with a team of researchers to find a new planet for humans.',
    featured: 'No',
    director: {
      name: 'Christopher Nolan',
      birthday: 'July 30, 1970',
      bio: 'Christopher Edward Nolan CBE is a British-American film director, producer and screenwriter known for making personal, distinctive films within the Hollywood mainstream. His directorial efforts have grossed more than US$5 billion worldwide, garnered 34 Oscar nominations and ten wins.',
      death:'n/a'
    }
  },
  {
    title: '12 Monkeys',
    genre: 'science fiction',
    description: 'James Cole, a convict, decides to volunteer for a mission, wherein he has to travel back in time to learn about the main reason behind the outbreak of a virulent holocaust.',
    featured: 'No',
    director: {
      name: 'Terry Gilliam',
      birthday: 'November 22, 1940',
      bio: 'Terrence Vance Gilliam is an American-born British film director, screenwriter, animator, actor, comedian and former member of the Monty Python comedy troupe.',
      death: 'n/a'
    }
  },
  {
    title: 'Knives Out',
    genre: 'mystery',
    description: 'The circumstances surrounding the death of crime novelist Harlan Thrombey are mysterious, but theres one thing that renowned Detective Benoit Blanc knows for sure -- everyone in the wildly dysfunctional Thrombey family is a suspect. Now, Blanc must sift through a web of lies and red herrings to uncover the truth.',
    featured: 'Yes! Now availble on Netflix!',
    director: {
      name: 'Rian Johnson',
      birthday: 'December 17, 1973',
      bio: 'Rian Craig Johnson is an American film director, producer, and screenwriter. He is known for writing and directing the neo-noir film Brick (2005), the comedy-drama The Brothers Bloom (2008), the science-fiction thriller Looper (2012), the space opera Star Wars: The Last Jedi (2017), and the murder-mystery Knives Out (2019), the last of which was nominated for the Golden Globe Award for Best Motion Picture – Musical or Comedy and earned Johnson a nomination for the Academy Award for Best Original Screenplay.',
      death: 'n/a'
    }
  },
  {
    title: 'Final Cut',
    genre: 'science fiction',
    description: 'Editor Alan finds footage of a man who he believes shares a connection with his past. On the other hand, former editor Fletcher wants the same footage and plans to steal it.',
    featured: 'No',
    director: {
      name: 'Omar Naim',
      birthday: 'September 27, 1977',
      bio: 'Omar Naim is a Lebanese film director and screenwriter best known for writing and directing the 2004 film The Final Cut.',
      death: 'n/a'
    }
  },
  {
    title: 'The Virgin Suicides',
    genre: 'drama',
    description: 'In an ordinary suburban house, on a lovely tree-lined street, in the middle of 1970s America, lived the five beautiful, dreamy Lisbon sisters, whose doomed fates indelibly marked the neighborhood boys who to this day continue to obsess over them. A story of love and repression, fantasy and terror, sex and death, memory and longing. It is at its core a mystery story: a heart-rending investigation into the impenetrable, life-altering secrets of American adolescence.',
    featured: 'No',
    director: {
      name: 'Sofia Coppola',
      birthday: ' May 14, 1971',
      bio: 'Sofia Carmina Coppola is an American screenwriter, director, producer, and actress. The daughter of filmmakers Eleanor and Francis Ford Coppola, she made her film debut as an infant in her fathers acclaimed crime drama film, The Godfather.',
      death: 'n/a'
    }
  },
  {
    title: 'Monster',
    genre: 'crime',
    description: 'Shortly after moving to Florida, longtime prostitute Aileen Wuornos (Charlize Theron) meets young and reserved Selby Wall (Christina Ricci) and a romance blossoms. When a john (Lee Tergesen) attempts to brutalize Aileen, she kills him and resolves to give up prostitution. But supporting herself and her new girlfriend through legitimate means proves extremely difficult, and she soon falls back on old ways. More johns die, and Selby cant help but think her new friend iresponsible.',
    featured: 'No',
    director: {
      name: 'Patty Jenkins',
      birthday: 'July 24, 1971',
      bio: 'Patricia Lea Jenkins is an American director and screenwriter. She directed and wrote the films Monster, Wonder Woman, and the upcoming Wonder Woman 1984.',
      death: 'n/a',
    }
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

app.get('/movies/:title', (req, res) => {
  res.json(topMovies.find((movie) =>
{ return movie.title === req.params.title }));
});

//get movies by genre

app.get('/movies/:genre', (req, res) => {
  res.json(topMovies.find((genre) =>
{ return movie.genre === req.params.genre }));
});

//get director info from name

app.get('/movies/:director', (req, res) => {
  res.json(topMovies.find((director) =>
{ return movie.director === req.params.director }));
});

//add new user

app.post('/movies/:users', (req, res) => {
  let newUsers = req.body;

  if (!newUser.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

//update user info

app.put('/movies/:users/:name/:password', (req, res) => {
  let user = users.find((user) => { return user.name === req.params.name });

  if (user) {
    user.password[req.params.password] = parseInt(req.params.password);
    res.status(201).send('User ' + req.params.name + 'password is now ' + req.params.password);
  } else {
    res.status(404).send('User with name ' + req.params.name + ' was not found.');
  }
});
// let user update fav movie

app.put('/movies/:users/:name/:fav_movies', (req, res) => {
  let user = users.find((user) => { return user.name === req.params.name });

  if (user) {
    user.fav_movies[req.params.fav_movies] = parseInt(req.params.fav_movies);
    res.status(201).send('User ' + req.params.name + ' favourite movie is now ' + req.params.fav_movies);
  } else {
    res.status(404).send('User with name' + req.params.name + ' has no favourite movie listed.');
  }
});

//user can delete fav_movies

app.delete('/movies/:users/:fav_movies', (req, res) => {
  let user = users.find((user) => { return user.fav_movies === req.params.fav_movies });

  if (user) {
    users = users.filter((obj) => { return obj.fav_movies !== req.params.fav_movies});
    res.status(201).send('User ' + req.params.name + req.params.fav_movies + 'was deleted.');
  }
});

//allow users to delete profile

app.delete('/movies/:users', (req, res) => {
  let user = users.find((user) => { return user.name === req.params.name });

  if (user) {
    users = users.filter((obj) => { return obj.name !== req.params.name });
    res.status(201).send('User ' + req.params.name + ' was deleted.');
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
