require('dotenv').config();
const express = require('express');
const path = require('path');
const { auth } = require('express-openid-connect');

const auth0Config = require('./config/auth0');
const connectDB = require('./config/db');

const noteRoutes = require('./routes/note.route');
const profileRoutes = require('./routes/profile.route');

const app = express();

connectDB();

// Views
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(auth(auth0Config));

app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', noteRoutes);
app.use('/profile', profileRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.AUTH0_BASE_URL}`));