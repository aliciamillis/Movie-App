const express = require('express'),
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

let topMovies = [
  {
    title: 'Kill Bill Vol 1 & Vol 2',
    director: 'Quentin Tarantino'
  },
  {
    title: 'Silence of the Lambs',
    director: 'Jonathan Demme'
  },
  {
    title: 'Inception',
    director: 'Christopher Nolan'
  },
  {
    title: 'The Village',
    director: 'M.Night Shyamalan'
  },
  {
    title: 'Interstellar',
    director: 'Christopher Nolan'
  },
  {
    title: '12 Monkeys',
    director: 'Terry Gilliam'
  },
  {
    title: 'Knives Out',
    director: 'Rian Johnson'
  },
  {
    title: 'Final Cut',
    director: 'Omar Naim'
  },
  {
    title: 'The Virgin Suicides',
    director: 'Sofia Coppola'
  },
  {
    title: 'Monster',
    director: 'Patty Jenkins'
  }
];


// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my fav movies!');
});

app.use('/documentation.html', express.static('public'));

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.');
);
