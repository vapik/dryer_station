"use strict";

class TestRepository {


    /**
     * Выдает тестовый массив данных из 4х элементов
     * @returns {Object}
     */
    static getDeviceDataList() {


// Создаем 4 тестовых агрегата

// Режим по точке росы, Нагрев 2 стадии
        let deviceData1 = {
            id: 1,
            err: false,
            message: "OK",
            mode: 2,
            inError: false,
            errMask: 0,
            stateTank1: 2,
            stateTank2: 5


        };


// Режим по времени, Ожидание
        let deviceData2 = {
            id: 2,
            err: false,
            message: "OK",
            mode: 1,
            inError: false,
            errMask: 0,
            stateTank1: 8,
            stateTank2: 2

        };


// Режим пошаговый, Охлаждение нагнетателем
        let deviceData3 = {
            id: 3,
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


// Связь с устройством отсутствует
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

// Пул устройств
        let deviceDataList = [deviceData1, deviceData2, deviceData3, deviceData4];


        // Генерируем данные
        this.generateDeviceData(deviceData1);
        this.generateDeviceData(deviceData2);
        this.generateDeviceData(deviceData3);

        return deviceDataList;
    }

    /**
     * Подмешивает значения датчиков в объект deviceData для тестов
     * @param {Object} deviceData
     */
    static generateDeviceData(deviceData) {
        let date = new Date();

        deviceData.ts = Date.now();
        deviceData.timerTank1 = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
        deviceData.timerTank2 = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
        deviceData.dewPoint = (-5 + Math.random());
        deviceData.tOut = ~~(10 + 10 * Math.random());
        deviceData.tAfter = ~~(80 + 10 * Math.random());
        deviceData.pOut = ~~(16 + 100 * Math.random());

        if (deviceData.stateTank1 == 5 || deviceData.stateTank2 == 5) {
            deviceData.heater = true;
        } else {
            deviceData.heater = false;
        }


        if (deviceData.stateTank1 == 6 ||
            deviceData.stateTank1 == 7 ||
            deviceData.stateTank2 == 6 ||
            deviceData.stateTank2 == 7) {
            deviceData.fan = true;
        } else {
            deviceData.fan = false;
        }


    };

}

// export
exports.TestRepository = TestRepository;

