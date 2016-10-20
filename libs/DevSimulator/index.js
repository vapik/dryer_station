"use strict";

/**
 * Простой симулятор осушителя, для отладки и демонстрации верхнего уровня ПО
 * в нем не реализована продвинутая логика, как в реальном агрегате
 */

// Enum состояний
const STATE = {
    STOPPED: 0,
    SWITCH: 1,
    ADS: 2,
    PDOWN: 3,
    HEAT1: 4,
    HEAT2: 5,
    COOLFAN: 6,
    COOLAIR: 7,
    STANDBY: 8,
    PUP: 9
};

class DevSimulator {
    constructor(option) {

        this._defaultParams = {
            timers: {
                SWITCH: 10,
                ADS: 90,
                PDOWN: 10,
                HEAT1: 15,
                HEAT2: 15,
                COOLFAN: 15,
                COOLAIR: 15,
                PUP: 15
            },

            setpoints: {
                T_DP: 4, // C
                P_DOWN: 10, // kPa
                T_HEAT: 70, // C
                T_HEATER: 120, // C
                T_COOL: 30, // C
                P_UP: 900 // kPa
            }
        };

        this._parameters = option || this._defaultParams;

        // Общее
        this._err = 0; // Маска ошибок
        this._warning = 0; // Маска предупреждений
        this._nextStep = false; // Флаг для перехода к следующей стадии в пошаговом режиме

        // Колонны
        this._state = 0; // Текущее состояние осушителя
        this._timerReg = 0; // Таймер стадии регенерации
        this._timerAds = 0; // Таймер стадии адсорбции
        // Режим работы:
        // 0 - Остановлен, 1 - По точке росы, 2 - По времени, 3 - Пошаговый режим
        this._mode = 0;

        // Изменяемяа метка времени для отслеживания периода длительности таймера
        this._tsStartReg = Date.now();
        this._tsStartAds = Date.now(); //

        // Клапана
        this._tank1ads = 1;
        this._BK1 = 0;
        this._BK2 = 0;
        this._BK3 = 0;
        this._BK4 = 0;
        this._BK5 = 0;

        this._fan = 0;
        this._heater = 0;
        this._pRelay = 0;

        // Аналоговые датчики
        this._dewPoint = -20;
        this._tOut = 20;
        this._tAfter = 20;
        this._tHeater = 20;
        this._pOut = 900;

    }


    /**
     * Задать режим работы
     * @param val
     */
    setMode(val) {
        if (!Number.isInteger(val) || val < 0 || val > 4) return;
        this._mode = val;
    }

    /**
     * Останавливает осушитель
     */
    stop() {
        this._mode = 0;
    }

    /**
     * Квитирует ошибку
     */
    ack() {
        this._err = 0;
    }


    /**
     * Переходит на следующую стадию при пошаговом режиме
     */
    next() {
        if (this._mode !== 3) return;

        this._nextStep = true;
    }


    _startRegTimer() {
        this._tsStartReg = Date.now();

    }

    _startAdsTimer() {
        this._tsStartAds = Date.now();
    }

    _noise(min, max) {
        return Math.random() * (max - min) + min;
    }

    _calcSensorsValue() {

        // DewPoint
        let MIN_DP = -20;
        let DP = this._parameters.setpoints.T_DP;
        this._dewPoint = Math.round((MIN_DP + (DP - MIN_DP) * this._timerAds / (1000 * this._parameters.timers.ADS)));

        // tOut and tHeater and tAfter
        if (this._state === STATE.HEAT2) {

            let T_MAX = this._parameters.setpoints.T_HEAT;
            let T_MIN = this._parameters.setpoints.T_COOL;
            this._tOut = Math.round((T_MIN + (T_MAX - T_MIN) * this._timerReg / (1000* this._parameters.timers.HEAT2)));

            this._tAfter = Math.round((this._parameters.setpoints.T_HEATER + this._noise(0, 5)));

            this._tHeater = 250;


        } else if (this._state === STATE.COOLAIR) {

            let T_MAX = this._parameters.setpoints.T_HEAT;
            let T_MIN = this._parameters.setpoints.T_COOL;
            this._tOut = Math.round((T_MAX + (T_MIN - T_MAX) * this._timerReg / (1000 * this._parameters.timers.COOLAIR)));

            this._tAfter = this._tOut - 3;
            this._tHeater = this._tAfter;

        } else {
            this._tOut = Math.round(this._tOut + this._noise(-1, 1));

            this._tAfter = this._tOut;

        }

        // pOut

        if (this._state === STATE.PDOWN) {
            let P_MIN = this._parameters.setpoints.P_DOWN;
            let P_MAX = this._parameters.setpoints.P_UP;


            // pOut = P_MAX ... P_MIN
            this._pOut = Math.round(P_MAX + (P_MIN - P_MAX) * this._timerReg / (1000 * this._parameters.timers.PDOWN));
            this._pOut = (this._pOut < 0) ? 0 : this._pOut;
        } else if (this._state === STATE.PUP) {

            let P_MIN = this._parameters.setpoints.P_DOWN;
            let P_MAX = this._parameters.setpoints.P_UP;

            // pOut  = P_MIN ... P_MAX
            this._pOut = Math.round(P_MIN + (P_MAX - P_MIN) * this._timerReg / (1000 * this._parameters.timers.PUP));
            this._pOut = (this._pOut < 0) ? 0 : this._pOut;

        }

    }

    _calcValves(){

        switch(this._state) {
            case STATE.STOPPED:

                this._BK1 = 0;
                this._BK2 = 0;
                this._BK3 = 0;
                this._BK4 = 0;
                this._BK5 = 0;

                this._heater = 0;
                this._fan = 0;
                this._pRelay = 0;

                break;

            case STATE.SWITCH:

                this._BK1 = 0;
                this._BK2 = 0;
                this._BK3 = 0;
                this._BK4 = 0;
                this._BK5 = 0;

                this._heater = 0;
                this._fan = 0;
                this._pRelay = 0;

                break;

            case STATE.PDOWN:

                this._BK1 = 0;
                this._BK2 = 1;
                this._BK3 = 0;
                this._BK4 = 0;
                this._BK5 = 0;

                this._heater = 0;
                this._fan = 0;
                this._pRelay = 0;

                break;

            case STATE.HEAT1:

                this._BK1 = 1;
                this._BK2 = 0;
                this._BK3 = 0;
                this._BK4 = 0;
                this._BK5 = 1;

                this._heater = 0;
                this._fan = 1;
                this._pRelay = 1;

                break;

            case STATE.HEAT2:

                this._BK1 = 1;
                this._BK2 = 0;
                this._BK3 = 0;
                this._BK4 = 0;
                this._BK5 = 1;

                this._heater = 1;
                this._fan = 1;
                this._pRelay = 1;

                break;

            case STATE.COOLFAN:

                this._BK1 = 1;
                this._BK2 = 0;
                this._BK3 = 0;
                this._BK4 = 0;
                this._BK5 = 1;

                this._heater = 0;
                this._fan = 1;
                this._pRelay = 1;

                break;

            case STATE.COOLAIR:

                this._BK1 = 1;
                this._BK2 = 0;
                this._BK3 = 1;
                this._BK4 = 0;
                this._BK5 = 0;

                this._heater = 0;
                this._fan = 0;
                this._pRelay = 1;

                break;

            case STATE.STANDBY:

                this._BK1 = 1;
                this._BK2 = 0;
                this._BK3 = 0;
                this._BK4 = 0;
                this._BK5 = 0;

                this._heater = 0;
                this._fan = 0;
                this._pRelay = 0;

                break;

            case STATE.PUP:

                this._BK1 = 0;
                this._BK2 = 0;
                this._BK3 = 0;
                this._BK4 = 1;
                this._BK5 = 0;

                this._heater = 0;
                this._fan = 0;
                this._pRelay = 1;

                break;
        }

    }

    /**
     * Возвращает текущие данные осушителя
     * @returns {object}
     */
    get rtData() {

        this.monitor();

        return {
            mode: this._mode,
            errors: this._err,
            warnings: this._warning,
            state: this._state,
            stateTank1: this._tank1ads ? STATE.ADS : this._state,
            stateTank2: this._tank1ads ? this._state : STATE.ADS,
            timerTank1: this._tank1ads ? this._timerAds : this._timerReg,
            timerTank2: this._tank1ads ? this._timerReg : this._timerAds,
            timerAds: this._timerAds,
            timerReg: this._timerReg,
            dewPoint: this._dewPoint,
            tOut: this._tOut,
            tAfter: this._tAfter,
            tHeater: this._tHeater,
            pOut: this._pOut,
            units: [this._tank1ads, this._BK1, this._BK2, this._BK3, this._BK4, this._BK5, this._fan, this._heater, this._pRelay]
        }
    }

    /**
     * Возвращает уставки
     * @returns {object}
     */
    get settingsData() {

        return Object.assign({}, this._parameters);
    }


    /**
     * Главная программа обработки, должна вызываться с определенным интервалом
     */
    monitor() {

        this._timerAds = Date.now() - this._tsStartAds;
        this._timerReg = Date.now() - this._tsStartReg;

        this._calcSensorsValue();
        this._calcValves();

        switch (this._state) {
            case STATE.STOPPED:

                // valves


                if ((this._mode !== 0) && (this._err === 0)) {

                    // Запускаем таймер следующей стадии
                    this._startRegTimer();

                    /* Переход */
                    this._state = STATE.SWITCH;
                }
                break;
            case STATE.SWITCH:

                this._timerAds = 0;

                if (this._timerReg > this._parameters.timers.SWITCH * 1000) {
                    // Переключаем колонну
                    this._tank1ads = !this._tank1ads;

                    // Запускаем таймер следующей стадии
                    this._startRegTimer();
                    // Запускаем таймер адсорбции
                    this._startAdsTimer();

                    /* Переход */
                    this._state = STATE.PDOWN;
                }


                break;
            case STATE.PDOWN:

                if (this._timerReg > this._parameters.timers.PDOWN * 1000) {

                    // Запускаем таймер следующей стадии
                    this._startRegTimer();

                    /* Переход */
                    this._state = STATE.HEAT1;
                }

                break;
            case STATE.HEAT1:

                if (this._timerReg > this._parameters.timers.HEAT1 * 1000) {

                    // Запускаем таймер следующей стадии
                    this._startRegTimer();

                    /* Переход */
                    this._state = STATE.HEAT2;
                }


                break;
            case STATE.HEAT2:

                if (this._timerReg > this._parameters.timers.HEAT2 * 1000) {

                    // Запускаем таймер следующей стадии
                    this._startRegTimer();

                    /* Переход */
                    this._state = STATE.COOLFAN;
                }

                break;
            case STATE.COOLFAN:

                if (this._timerReg > this._parameters.timers.COOLFAN * 1000) {

                    // Запускаем таймер следующей стадии
                    this._startRegTimer();

                    /* Переход */
                    this._state = STATE.COOLAIR;
                }

                break;
            case STATE.COOLAIR:

                if (this._timerReg > this._parameters.timers.COOLAIR * 1000) {

                    // Запускаем таймер следующей стадии
                    this._startRegTimer();

                    /* Переход */
                    this._state = STATE.STANDBY;
                }

                break;
            case STATE.STANDBY:

                if (this._timerAds > this._parameters.timers.ADS * 1000) {

                    // Запускаем таймер следующей стадии
                    this._startRegTimer();

                    /* Переход */
                    this._state = STATE.PUP;
                }

                break;
            case STATE.PUP:

                if (this._timerReg > this._parameters.timers.PUP * 1000) {

                    // Запускаем таймер следующей стадии
                    this._startRegTimer();

                    /* Переход */
                    this._state = STATE.SWITCH;
                }
                break;
        }

    }

}

// Export
module.exports = DevSimulator;