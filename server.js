"use strict";

let express = require('express');

let path = require('path');
let config = require('config');

let app = express();
var http = require('https').Server(app);

// Создаем socket IO над http
let io = require('socket.io')(http);
io.listen(http);


let PORT = config.get('port') || 34000;


// Логгирование
let logger = require('morgan');

// Парсеры
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

// Основной роутер
let routes = require('./routes/index');

// Шаблонизатором будет jade, который берет шаблоны из views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Статичные файлы лежат в папке use
app.use('/static', express.static(path.join(__dirname, 'public')));

// Роутинг на корень
//app.use('/', routes);

http.listen(PORT, () => console.log(`Server running on ${PORT}`));

// Обмен данных по socket.io
require("./middleware/socketIO")(io);