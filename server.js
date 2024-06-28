const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/numbersDB');

const numberSchema = new mongoose.Schema({
  number: String
});

const Number = mongoose.model('Number', numberSchema);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Маршрут для отображения формы ввода
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Маршрут для обработки данных формы
app.post('/submit', async (req, res) => {
  const newNumber = new Number({
    number: req.body.number
  });

  try {
    await newNumber.save();
    res.send('Номер сохранен в базе данных.');
  } catch (err) {
    res.send(err);
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
