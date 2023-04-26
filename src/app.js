require('dotenv').config();
const express = require('express');
const cors = require('cors')
const corsOptions = require('./configs/corsOptions')
const verifyJWT = require('./middlewares/verifyJWT')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const connectDB = require('./configs/dbConn');
const credentials = require('./middlewares/credentials')

const app = express();

// Connect to MongoDB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser())

// ROTAS
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

app.use(verifyJWT)
//Protected Routes

// Start
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});