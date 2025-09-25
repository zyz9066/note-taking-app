require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { auth, requiresAuth } = require('express-openid-connect');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const auth0Config = require('./config/auth0');
const connectDB = require('./config/db');
const swaggerOptions = require('./config/swagger');

const noteRoutes = require('./routes/note.route');
const profileRoutes = require('./routes/profile.route');

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(auth(auth0Config));

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', requiresAuth(), noteRoutes);
app.use('/profile', requiresAuth(), profileRoutes);

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', requiresAuth(), swaggerUi.serve, swaggerUi.setup(specs));

connectDB();

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.BASE_URL}`)
);
