let {
  getBooks,
  getBookById,
  getReviews,
  getReviewById,
  getUserById,
} = require('./book');
const express = require('express');
const { resolve } = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('static'));
app.use(express.json());

// app.use(express.static('static'));
// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, 'pages/index.html'));
// });

// Get All books
app.get('/api/books', async (req, res) => {
  try {
    const books = await getBooks();
    if (books.length === 0) {
      return res.status(404).json({ error: 'No books found.' });
    }
    return res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a books by ID
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await getBookById(parseInt(req.params.id));
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await getReviews();
    if (reviews.length === 0) {
      return res.status(404).json({ error: 'No reviews found.' });
    }
    return res.json(reviews);
  } catch (error) {}
});

// get reviews by id
app.get('/api/reviews/:id', async (req, res) => {
  try {
    const review = await getReviewById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    return res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get user by id
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = {
  app,
  PORT,
};
