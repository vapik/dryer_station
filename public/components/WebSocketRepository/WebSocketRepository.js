(function () {

    "use strict";

    class WebSocketRepository {
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
            // Создаем webSocket

            this._socket = new WebSocket(this._urlString);

            if (this._socket == null) throw new Error("Can't create socket");

            let self = this;
            this._socket.onopen = function () {
                console.log('WebSocket connection is opened');

                // Отправляем первый запрос
                self._sendRequestToServer(self._socket, self._deviceRepository, 1000);

            };

            this._socket.onmessage = function (msg) {

                let message;
                try {
                    message = JSON.parse(msg.data);
                } catch (err) {
                    console.log("Can't parse message");
                    throw err;
                }

                if (message && message.name == 'data') {

                    self._deviceDataList = [];
                    for (let i = 0; i < message.data.length; i++) {
                        self._deviceDataList.push(message.data[i]);
                    }

                    // Отправляем запрос на сервер
                    self._sendRequestToServer(self._socket, self._deviceRepository, 3000);
                }

            };

            this._socket.onclose = () => console.log("WebSocket connection closed");

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
                let pack = {
                name: "request",
                data: (devList.filter((item) => item.state))
            };
                let packJSON = JSON.stringify(pack);
                socket.send(packJSON.toString());
                console.log(packJSON)
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
    window.WebSocketRepository = WebSocketRepository;

})();
