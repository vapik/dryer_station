module.exports = function(io) {

    "use strict";

    // TODO: Убрать после отладки
    // Тестовый ответ для проверки клиент-сервера

    /* Формат ответа
     *[
     *   { id: Number - ID Запрашиваемого устройства,
     ts: Date - Временная метка формирования пакета от сервера
     err: Boolean - флаг ошибки чтения устройства сервером
     message: String = Сообщение об ошибке (не пустое, если есть ошибка)
     mode: Number 0..4 - Режим работы
     inError: Boolean - Если осушитель в ошибке
     errMask: Number - Биты ошибок агрегата
     stateTank1: Number 0..9 - Состояние колонны 1
     timerTank1: Number - Прошедшее время стадии
     stateTank2: Number 0..9 - Состояние колонны 1
     timerTank2: Number - Прошедшее время стадии
     dewPoint: Number - температура точки росы
     tOut: Number - температура на сбросе
     tAfter: Number - температура после нагревателя
     pOut: Number - давление на сбросе
     heater: Boolean - состояние нагревателя
     fan: Boolean - состояние нагнетателя воздуха
     }
     ...
     ]
     */


    /**
     * Генерирует фейковые значения датчиков для устройств на время отладки
     * @param {Object} deviceData - объект
     */
    function generateDeviceData(deviceData) {
        let date = new Date();

        deviceData.ts = Date.now();
        deviceData.timerTank1 = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
        deviceData.timerTank2 = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
        deviceData.dewPoint = (-5 + Math.random());
        deviceData.tOut = ~~(10 + 10 * Math.random());
        deviceData.tAfter = ~~(80 + 10 * Math.random());
        deviceData.pOut = ~~(16 + 100 * Math.random());
        deviceData.heater = true;
        deviceData.fan = false;

    }

    let deviceData1 = {
        id: 1,
        //ts: Date.now(),
        err: false,
        message: "OK",
        mode: 2,
        inError: false,
        errMask: 0,
        stateTank1: 2,
        stateTank2: 4


    };

    let deviceData2 = {
        id: 2,
        // ts: Date.now(),
        err: false,
        message: "OK",
        mode: 1,
        inError: false,
        errMask: 0,
        stateTank1: 8,
        stateTank2: 2

    };

    let deviceData3 = {
        id: 3,
        // ts: Date.now(),
        err: false,
        message: "OK",
        mode: 3,
        inError: false,
        errMask: 0,
        stateTank1: 2,
        timerTank1: 0,
        stateTank2: 6,
        timerTank2: 0

    };

    let deviceData4 = {
        id: 4,
        ts: Date.now(),
        err: true,
        message: "No connection",
        mode: 0,
        inError: false,
        errMask: 0,
        stateTank1: 0,
        timerTank1: 0,
        stateTank2: 0,
        timerTank2: 0,
        dewPoint: 0,
        tOut: 0,
        tAfter: 0,
        pOut: 0,
        heater: false,
        fan: false
    };

    let deviceDataList = [deviceData1, deviceData2, deviceData3, deviceData4];

    io.on('connection', function (socket) {

        console.log('Received connection');

        socket.on('requestDeviceData', function (data) {

            console.log('requestDeviceData');
            console.log(data.length + ' Objects');


            /* Формат валидного сообщения:
             * [
             *  {id: Number, ip: String, name: String, idDev: Number, state: String},
             *  ...
             * ]
             */

            if (!checkResponse(data)) {
                io.emit('error', {name: 'Wrong request'});
            }

            // ПРОВЕРКА ОБМЕНА ДАННЫХ
            // TODO: Переписать после отладки
            // Генерируем данные датчиков на агрегаты
            generateDeviceData(deviceData1);
            generateDeviceData(deviceData2);
            generateDeviceData(deviceData3);

            // Отсылаем пакет
            socket.emit('data', deviceDataList);
        })

    });


    /**
     * Проверяет на валидность принятый пакет
     * @param {Object} data
     * @returns {boolean}
     */
    function checkResponse(data) {

        // TODO : Реализовать проверку
        return true;

    }
};