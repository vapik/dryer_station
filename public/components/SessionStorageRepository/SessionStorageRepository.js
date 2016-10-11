(function () {
    "use strict";

    /**
     * Создает на время сессии в локальном хранилище фейковую базу данных
     */
    class SessionStorageRepository {

        constructor() {
            this._repository = window.sessionStorage;
            this._dbPrefix = 'deviceSettings_id_';

            this._MAX_ID = 20;

            this._lastID = 0;

            this._makeFakeDB();


        }

        /**
         * Создает тестовую базу данных
         * @private
         */
        _makeFakeDB() {
            let dev1 =
            {
                id: 1,
                name: "Осушитель 1",
                ip: '192.168.0.50',
                idDev: 1,
                state: true
            };

            let dev2 =
            {
                id: 2,
                name: "Осушитель 2",
                ip: '192.168.0.51',
                idDev: 1,
                state: true
            };

            let dev3 =
            {
                id: 3,
                name: "Осушитель 3",
                ip: '192.168.0.52',
                idDev: 2,
                state: true
            };

            let dev4 =
            {
                id: 4,
                name: "Осушитель 4",
                ip: '192.168.0.53',
                idDev: 1,
                state: false
            };

            this.create(dev1);
            this.create(dev2);
            this.create(dev3);
            this.create(dev4);


        }


        /**
         * Возвращает список устройств из репозитория
         * @returns {Object}
         */
        getDeviceList() {
            let devList = [];

            try {
                for (let i = 0; i <= this._MAX_ID; i++) {
                    let itemJSON = this._repository.getItem(this._dbPrefix + i);
                    if (itemJSON) {
                        devList.push(JSON.parse(itemJSON));
                    }
                }
            } catch (err)
            {
                throw new Error("Can't getDeviceList")
            }


            return devList;
        }


        /**
         * Получает элемент по ID из репозитория
         * @param {Number} id
         * @returns {Object}
         */
        getDevice(id) {

            let item = null;

            try {
                let itemJSON = this._repository.getItem(this._dbPrefix + id);
                if (itemJSON) {
                    item = JSON.parse(itemJSON);
                }

            } catch (err) {
                throw new Error("Can't get Element");
            }

            return item;
        }


        /**
         * Добавляет в репозиторий объект
         * @param {Object} item
         */
        create(item) {
            // TODO: Надо бросить исключение
            if (!this._duckChecking(item)) return;

            
            // id = 0 - когда запрос пришел из формы, для него выбираем последний индекс
            if (item.id == 0) item.id = this._lastID + 1;

            // Пытаемся записать в репозиторий
            try {
                this._repository.setItem((this._dbPrefix + (this._lastID + 1)),
                    JSON.stringify(item));
            } catch (err)
            {
                throw new Error("Can't create element")
            }

            // Увеличиваем указатель при удачной записи
            this._lastID += 1;

        }

        /**
         * Обновляет в репозитории объект
         * @param {Object} item
         */
        update(item) {
            // TODO: Надо бросить исключение
            if (!this._duckChecking(item)) return;

            try {
                this._repository.setItem(this._dbPrefix + item.id,
                JSON.stringify(item))
            } catch (err) {
                throw new Error("Can't update element");
            }

        }

        /**
         * Удаляет элемент из репозитория
         * @param {Object} item
         */
        delete(item) {
            
            // TODO:Надо бросить исключение
            if (!this._duckChecking(item)) return;

            try {
                this._repository.removeItem(this._dbPrefix + item.id)
            } catch (err)
            {
                throw new Error("Can't remove element");
            }
        }


        /**
         * Проверяем реализацию интерфейса/модели с помощью утиной типизации
         * @param {Object} item
         * @returns {boolean}
         * @private
         */
        _duckChecking(item) {
            if (item.id == null) return false;
            if (item.ip == null) return false;
            if (item.name == null) return false;
            if (item.idDev == null) return false;
            if (item.state == null) return false;

            return true;
        }


    }

    // export
    window.SessionStorageRepository = SessionStorageRepository;

})();


