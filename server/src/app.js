const express = require('express');
const morgan = require('morgan');
const authRouth = require('./routes/auth.route');
const app = express();
const cookieParser = require('cookie-parser');
const propertyRouth = require('./routes/property.route');
const cardRouter = require("./routes/card.route")

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouth);
app.use('/api/property', propertyRouth)
app.use('/api/card',cardRouter)

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Что-то пошло не так!');
});

module.exports = app;
