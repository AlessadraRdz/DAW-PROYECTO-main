const express = require('express');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars');
const conexion = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const userRoutes = require('./routes/userRoutes');
const Handlebars = require('handlebars');

const app = express();
app.set('port', 4000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.use(conexion(mysql, {
  host: 'db', 
  user: 'root',
  password: '12345',
  port: 3307,
  database: 'editorial'
}, 'single'));


app.listen(app.get('port'), () => {
  console.log('Escuchando en puerto -> ', app.get('port'));
});

app.use('/', userRoutes);

app.get('/', (req, res) => { res.render('home'); });
