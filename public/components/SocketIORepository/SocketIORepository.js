(function () {

    "use strict";

    class SocketIORepository {
        constructor(options) {
            this._urlString = options.urlString;

            this._deviceRepository = options.deviceRepository;
            this._deviceDataList = [];
            this._socket = null;

            this._init(this);

        }

        /**
         * Инициализация
         * @private
         */
        _init() {
            // Создаем сокет
            this._socket = io.connect(this._urlString,{transports: ['websocket', 'flashsocket', 'xhr-polling']});

            if (this._socket == null) throw new Error("Can't create socket");

            // Отправляем первый запрос
            this._sendRequestToServer(this._socket, this._deviceRepository, 1000);

            // Подписываемся на событие 'data', которое присылает данные с сервера
            let context = this;
            this._socket.on('data', function (data) {

                context._deviceDataList = [];
                for (let i = 0; i < data.length; i++) {
                    context._deviceDataList.push(data[i]);
                }

                // Отправляем запрос на сервер
                context._sendRequestToServer(context._socket, context._deviceRepository, 1000);

            })

        }

        /**
         * Отправить запрос на сервер
         * @param {Object} socket - Экземпляр socket.io
         * @param {SessionStorageRepository} repository - репозиторий
         */
        _sendRequestToServer(socket, repository, period = 1000) {
            setTimeout(function () {
                let devList = repository.getDeviceList();
                console.log('Send request to server');
                // В запрос попадут только те агрегаты, которые включены в опрос
                socket.emit('requestDeviceData', devList.filter((item) => item.state));
            }, period);
        }

        /**
         * Возвращает данные полученные от сервера
         * @returns {Object}
         */
        getDataList() {
            return this._deviceDataList;
        }



        /**
         * Получить данные агрегата по ID
         * @param {Number} id
         * @returns {Object}
         */
        getData(id) {

            let object = null;
            this._deviceDataList.forEach((item) => {
                if (item.id == id) object = item;
            });

            return object;
        }

    }

    // export
    window.SocketIORepository = SocketIORepository;

})();
