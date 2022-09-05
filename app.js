require('dotenv').config({ path: './config/config.env' });

const { connectDB } = require('./config/db');
const express = require('express');
const app = express();
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

connectDB();

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

// Logger for development
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.listen(PORT, () =>
  console.log(`Server running in ${NODE_ENV} mode on port: ${PORT}`)
);
