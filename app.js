require('dotenv').config({ path: './config/config.env' });

const { connectDB } = require('./config/db');
const { engine } = require('express-handlebars');
const { usePassport } = require('./config/passport-auth');
const hbsHelpers = require('./helpers/hbs');
const methodOverride = require('method-override');
const path = require('path');
const errorHandler = require('./middlewares/error');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const storiesRoutes = require('./routes/stories');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

// Body parser
app.use(express.urlencoded({ extended: false }));

// Accepts JSON Data
app.use(express.json());

// Method Override | Override POST with query param ?_method=PUT
app.use(methodOverride('_method'));

// Sessions config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Create a session collection on database
    }),
  })
);

// Passport config
usePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Set up global var to access logged user in any view
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Connect to Database
connectDB();

// Logger for development
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up template engine
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: { ...hbsHelpers },
  })
);
app.set('view engine', '.hbs');
app.set('views', './views');

// Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/stories', storiesRoutes);

// Custom error handler
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server running in ${NODE_ENV} mode on port: ${PORT}`)
);
