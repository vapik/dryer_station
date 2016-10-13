"use strict";


let path = require('path');
let fs = require('fs');

// Файлы конфигурации
let config = require('config');

// EXPRESS
let express = require('express');
let app = express();

// import websocket server
let WebSocketServer = require('ws').Server;


/* --------- HTTP/HTTPS ---------- */

// Импорт серверов
let http = require('http');
let https = require('https');

// Сертификаты на https
// TODO: ПОЛУЧИТЬ СЕРТИФИКАТ
const credentials = {
    pfx: fs.readFileSync('sslcert/server.pfx'),
    passphrase: 'learnJavaScriptRu'

};

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

// Создаем socket IO над http
//let io = require('socket.io')(http);
//io.listen(httpServer);


// Ports
let PORT_HTTP = config.get('port_http') || 34000;
let PORT_HTTPS = config.get('port_https') || 34001;


// Логгирование
let logger = require('morgan');

// Парсеры
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

// Основной роутер
// TODO: Сделать основной роут
let routes = require('./routes/index');

// Шаблонизатором будет jade, который берет шаблоны из views
// TODO: Реализовать шаблонизаторы
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// Парсеры
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Статичные файлы лежат в папке /public
app.use('/public', express.static(path.join(__dirname, 'public')));

// Роутинг на корень пока не нужен
//app.use('/', routes);


// Запускаем сервера
httpServer.listen(PORT_HTTP, () => console.log(`HTTP server running on ${PORT_HTTP}`));

// (на HTTPS пока нет сертификата)
httpsServer.listen(PORT_HTTPS, () => console.log(`HTTPs server running on ${PORT_HTTPS}`));

// Обмен данных по socket.io
//require("./middleware/socketIO")(io);

// Обмен данных по websocket
let wss = new WebSocketServer({server: httpServer});

let TestRepository = require('./models/TestRepository').TestRepository;
require("./middleware/websocket")(wss, TestRepository);
