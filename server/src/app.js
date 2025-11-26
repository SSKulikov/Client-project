const express = require('express');
const morgan = require('morgan');
const authRouth = require('./routes/auth.route');
const app = express();
const cookieParser = require('cookie-parser')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouth);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Что-то пошло не так!');
});

module.exports = app;
