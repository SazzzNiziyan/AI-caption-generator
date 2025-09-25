const express = require('express');
const authRoutes = require('./routes/auth.routes')


const app = express();
app.use(express.json())

app.use('/auth',authRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});


module.exports = app;