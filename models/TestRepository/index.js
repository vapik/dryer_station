// Симулятор осушителя
let DevSimulator = require("../../libs/DevSimulator");

"use strict";

class TestRepository {


    /**
     * Выдает тестовый массив данных из 4х элементов
     * @returns {Object}
     */
    static getDeviceDataList() {


// Создаем 4 тестовых агрегата, где 3 из них из симулятора
        let dev1 = new DevSimulator();
        dev1.setMode(1);
        let dev1RTData = dev1.rtData;

        let dev2 = new DevSimulator();
        dev2.setMode(2);
        let dev2RTData = dev2.rtData;

        let dev3 = new DevSimulator();
        dev3.setMode(3);
        let dev3RTData = dev3.rtData;


// Режим по точке росы, Нагрев 2 стадии
        let deviceData1 = {
            id: 1,
            err: false,
            message: "OK",
            mode: dev1RTData.mode,
        };

        Object.assign(deviceData1, dev1RTData);


// Режим по времени, Ожидание
        let deviceData2 = {
            id: 2,
            err: false,
            message: "OK",
        };

        Object.assign(deviceData2, dev2RTData);


// Режим пошаговый, Охлаждение нагнетателем
        let deviceData3 = {
            id: 3,
            err: false,
            message: "OK",
        };

        Object.assign(deviceData3, dev3RTData);


// Связь с устройством отсутствует
        let deviceData4 = {
            id: 4,
            ts: Date.now(),
            err: true,
            message: "No connection",
            mode: 0,
            errors: 0,
            warnings: 0,
            stateTank1: 0,
            timerTank1: 0,
            stateTank2: 0,
            timerTank2: 0,
            dewPoint: 0,
            tOut: 0,
            tAfter: 0,
            tHeater: 0,
            pOut: 0,
            units: [false, false, false, false, false, false, false, false]
        };

        // Пул устройств
        let deviceDataList = [deviceData1, deviceData2, deviceData3, deviceData4];

        return deviceDataList;
    }


}

// export
exports.TestRepository = TestRepository;

