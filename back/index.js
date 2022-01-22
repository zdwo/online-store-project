const express = require('express');
const app = express();
const products = require('./routes/products');
const user = require('./routes/user')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const session = require('express-session')


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.json());
app.use('/products', products);
app.use(bodyParser.json())
app.use(session({
    secret: 's3cr3t',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: new Date(new Date().getTime() + 60*60*1000)}
}))
app.use('/user', user)


require('dotenv').config();
const dbConnData = {
  host: process.env.MONGO_HOST || '127.0.0.1',
  port: process.env.MONGO_PORT || 27017,
  database: process.env.MONGO_DATABASE || 'products_database',
};

mongoose
  .connect(
    `mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then((response) => {
    console.log(
      `Connected to DB. Database name: "${response.connections[0].name}"`
    );
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch((error) => console.error('Error connecting to MongoDB', error));