(function () {
    "use strict";

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
            this._widgets.pipeList = [];
            PI_DiagramVieConfig.pipeDataList.forEach(val =>
                this._widgets.pipeList.push(new PipeWidget({el: this._mainSVG, data: val})));

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

    }

// export

    window.PI_Diagram = PI_Diagram;

})();



