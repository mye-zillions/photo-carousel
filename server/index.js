/* eslint linebreak-style: ["error", "windows"] */
const morgan = require('morgan');
const express = require('express');

const app = express();
const port = 3333;

app.use(express.static('public'));
app.use(morgan('dev'));

app.listen(port);
