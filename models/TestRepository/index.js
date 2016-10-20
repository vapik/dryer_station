// Симулятор осушителя
let DevSimulator = require("../../libs/DevSimulator");

"use strict";

class TestRepository {
    
    constructor() {

        this._dev1 = null;
        this._dev2 = null;
        this._dev3 = null;
        this._init();
    }
    
    _init() {
        this._dev1 = new DevSimulator();
        this._dev1.setMode(1);

        this._dev2 = new DevSimulator();

        let self = this;
        setTimeout(()=> self._dev2.setMode(2), 10000);

        this._dev3 = new DevSimulator();
        setTimeout(()=> self._dev3.setMode(3), 20000);
    }
    

    /**
     * Выдает тестовый массив данных из 4х элементов
     * @returns {Object}
     */
    getDeviceDataList() {


// Создаем 4 тестовых агрегата, где 3 из них из симулятора
        
        let dev1RTData = this._dev1.rtData;

        let dev2RTData = this._dev2.rtData;

        let dev3RTData = this._dev3.rtData;


// Режим по точке росы, Нагрев 2 стадии
        let deviceData1 = {
            id: 1,
            ts: Date.now(),
            err: false,
            message: "OK",
            mode: dev1RTData.mode,
        };

        Object.assign(deviceData1, dev1RTData);


// Режим по времени, Ожидание
        let deviceData2 = {
            id: 2,
            ts: Date.now(),
            err: false,
            message: "OK",
        };

        Object.assign(deviceData2, dev2RTData);


// Режим пошаговый, Охлаждение нагнетателем
        let deviceData3 = {
            id: 3,
            ts: Date.now(),
            err: false,
            message: "OK"
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
            units: [0,0,0,0,0,0,0,0,0]
        };

        // Пул устройств
        let deviceDataList = [deviceData1, deviceData2, deviceData3, deviceData4];

        return deviceDataList;
    }


}

// export
exports.TestRepository = TestRepository;

