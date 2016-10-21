(function () {
    "use strict";

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

    class PI_Diagram {
        constructor(options) {
            this._el = options.el;
            this._data = options.data;

            this._mainSVG = SVG('drawing').size(830, 530);
            this._widgets = {};

            this.render();
        }

        render() {

            this._mainSVG.clear();

            // Создаем список стрелок направления потока
            this._widgets.arrowList = [];
            PI_DiagramVieConfig.arrowDataList.forEach(val =>
                this._widgets.arrowList.push(new ArrowWidget({el:this._mainSVG, data: val})));


            // Создаем список труб
            this._definePipeStates();

            // Создаем список клапанов
            this._widgets.valveList = [];
            PI_DiagramVieConfig.valveDataList.forEach(val => {

                let _data = Object.assign({}, val);

                switch(_data.name) {
                    case "BK1":
                        _data.state = this._data.units[1];
                        break;
                    case "BK2":
                        _data.state = this._data.units[2];
                        break;
                    case "BK3":
                        _data.state = this._data.units[3];
                        break;
                    case "BK4":
                        _data.state = this._data.units[4];
                        break;
                    case "BK5":
                        _data.state = this._data.units[5];
                        break;
                }

                this._widgets.valveList.push(new ValveWidget({el: this._mainSVG, data: _data}));
            });

            // Создаем список клапанов
            this._widgets.valve4wayList = [];
            PI_DiagramVieConfig.valve4wayDataList.forEach(val => {

                let _data = Object.assign({}, val);
                _data.state = this._data.units[0];
                this._widgets.valve4wayList.push(new FourWayValveWidget({el: this._mainSVG, data: _data}));
            });

            // Создаем список колонн
            this._widgets.tankList = [];
            PI_DiagramVieConfig.tankDataList.forEach(val => {
                let _data = Object.assign({}, val);
                if (_data.name === "КОЛОННА 1") {
                    _data.state = this._data.stateTank1;
                    _data.timer = new Date(this._data.timerTank1).toLocaleTimeString('ru', {timeZone: 'UTC'});
                } else if (_data.name === "КОЛОННА 2") {
                    _data.state = this._data.stateTank2;
                    _data.timer = new Date(this._data.timerTank2).toLocaleTimeString('ru', {timeZone: 'UTC'});
                }

                this._widgets.tankList.push(new TankWidget({el: this._mainSVG, data: _data}))});

            // Создаем список нагнетателей

            this._widgets.fanList = [];
            PI_DiagramVieConfig.fanDataList.forEach(val => {
                let _data = Object.assign({}, val);
                _data.state = this._data.units[6];
                this._widgets.fanList.push(new FanWidget({el: this._mainSVG, data: _data}));
            });

            // Создаем список нагревателей
            this._widgets.heaterList = [];
            PI_DiagramVieConfig.heaterDataList.forEach(val => {
                let _data = Object.assign({}, val);
                _data.state = this._data.units[7];
                this._widgets.heaterList.push(new HeaterWidget({el: this._mainSVG, data: _data}));
            });

            // Создаем список дискретных датчиков
            this._widgets.relayList = [];
            PI_DiagramVieConfig.relayDataList.forEach(val => {
                let _data = Object.assign({}, val);
                _data.state = this._data.units[8];
                this._widgets.relayList.push(new RelayWidget({el: this._mainSVG, data: _data}));
            });

            // Создаем список анаговых датчиков
            this._widgets.sensorList = [];
            PI_DiagramVieConfig.sensorDataList.forEach(val => {

                let _data = Object.assign({}, val);
                switch (_data.name)
                {
                    case "Роса":
                        _data.value = this._data.dewPoint;
                        break;
                    case "P сброс":
                        _data.value = this._data.pOut;
                        break;
                    case "t сброс":
                        _data.value = this._data.tOut;
                        break;
                    case "t возд.":
                        _data.value = this._data.tAfter;
                        break;
                    case "t нагр.":
                        _data.value = this._data.tHeater;
                        break;
                }

                this._widgets.sensorList.push(new SensorBarWidget({el: this._mainSVG, data: _data}))});

        }

        // Задает трубам состояние
        _definePipeStates(){
            this._widgets.pipeList = [];

            for(let entry of PI_DiagramVieConfig.pipeDataList) {

                let _data = Object.assign({},entry[1]);
                switch(entry[0])
                {
                    case "in-4way1":
                    case "4way2-out":
                        _data.state = 1;
                        break;

                    case "4way1-tank1":
                    case "tank1-4way2":
                        if (this._data.units[0]) {
                            _data.state = 1
                        } else {
                            switch(this._data.stateTank1) {
                                case STATE.STOPPED:
                                case STATE.SWITCH:
                                    _data.state = 0;
                                    break;
                                case STATE.HEAT1:
                                case STATE.HEAT2:
                                    _data.state = 2;
                                    break;
                                default:
                                    _data.state = 3;
                                    break;
                            }
                        }
                        break;

                    case "4way1-tank2":
                    case "tank2-4way2":
                        if (!this._data.units[0]) {
                            _data.state = 1
                        } else {
                            switch(this._data.stateTank2) {
                                case STATE.STOPPED:
                                case STATE.SWITCH:
                                    _data.state = 0;
                                    break;
                                case STATE.HEAT1:
                                case STATE.HEAT2:
                                    _data.state = 2;
                                    break;
                                default:
                                    _data.state = 3;
                                    break;
                            }
                        }
                        break;

                    case "4way1-BK2":
                    case "BK2-out":
                        _data.state = (this._data.state === STATE.PDOWN) ? 3 : 0;
                        break;

                    case "4way1-BK1":
                    case "BK1-out":
                        switch(this._data.state) {
                            case STATE.STOPPED:
                            case STATE.SWITCH:
                            case STATE.PUP:
                                _data.state = 0;
                                break;
                            case STATE.HEAT1:
                            case STATE.HEAT2:
                                _data.state = 2;
                                break;
                            default:
                                _data.state = 3;
                                break;
                        }
                        break;

                    case "4way2-heater":
                    case "pRelay":
                        switch(this._data.state) {
                            case STATE.STOPPED:
                            case STATE.SWITCH:
                            case STATE.PDOWN:
                            case STATE.STANDBY:
                                _data.state = 0;
                                break;
                            case STATE.HEAT1:
                            case STATE.HEAT2:
                                _data.state = 2;
                                break;
                            default:
                                _data.state = 3;
                                break;
                        }

                        break;

                    case "heater-BK5":
                    case "BK5-in":
                        switch(this._data.state) {
                            case STATE.HEAT1:
                            case STATE.HEAT2:
                                _data.state = 2;
                                break;
                            case STATE.COOLFAN:
                                _data.state = 3;
                                break;
                            default:
                                _data.state = 0;
                                break;
                        }
                        break;

                    case "out-BK3":
                    case "BK3-heater":
                        _data.state = (this._data.state === STATE.COOLAIR) ? 3 : 0;
                        break;

                    case "out-BK4":
                    case "BK4-heater":
                        _data.state = (this._data.state === STATE.PUP) ? 3 : 0;
                        break;

                }
                this._widgets.pipeList.push(new PipeWidget({el: this._mainSVG, data: _data}))
            }
        }


    }

// export

    window.PI_Diagram = PI_Diagram;

})();



