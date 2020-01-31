// MEXER COM O REQ.FLASH QUE ESTA DANDO ERRO

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require('express-session');
const index = require('./app/routes/index');
const flash = require('connect-flash');

// const aluno = require('./app/routes/aluno');
const passport = require('passport');
require('./config/auth')(passport);

const app = express();

app.use(session({
	secret: '****bibliotecadigitalsaraiva***',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash("error")
	res.locals.user = req.user || null;
	next();
});

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, './app/views'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Arquivos estáticos
app.use(express.static('./app/public/'));

app.use('/', index);

// app.use('/alunos', aluno);

const PORT  = process.env.PORT || 4000
app.listen(PORT, function(){
	console.log('Servidor ON');
});

module.exports = app;