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
            PI_DiagramVieConfig.valveDataList.forEach(val =>
                this._widgets.valveList.push(new ValveWidget({el: this._mainSVG, data: val})));

            // Создаем список клапанов
            this._widgets.valve4wayList = [];
            PI_DiagramVieConfig.valve4wayDataList.forEach(val =>
                this._widgets.valve4wayList.push(new FourWayValveWidget({el: this._mainSVG, data: val})));

            // Создаем список колонн
            this._widgets.tankList = [];
            PI_DiagramVieConfig.tankDataList.forEach(val => {
                let _data = Object.assign({}, val);
                if (_data.name === "КОЛОННА 1") {
                    _data.state = this._data.stateTank1;
                    _data.timer = new Date(this._data.timerTank1).toLocaleTimeString('ru');
                } else if (_data.name === "КОЛОННА 2") {
                    _data.state = this._data.stateTank2;
                    _data.timer = new Date(this._data.timerTank2).toLocaleTimeString('ru');
                }

                this._widgets.tankList.push(new TankWidget({el: this._mainSVG, data: _data}))});

            // Создаем список нагнетателей
            this._widgets.fanList = [];
            PI_DiagramVieConfig.fanDataList.forEach(val =>
                this._widgets.fanList.push(new FanWidget({el: this._mainSVG, data: val})));

            // Создаем список нагревателей
            this._widgets.heaterList = [];
            PI_DiagramVieConfig.heaterDataList.forEach(val =>
                this._widgets.heaterList.push(new HeaterWidget({el: this._mainSVG, data: val})));

            // Создаем список дискретных датчиков
            this._widgets.relayList = [];
            PI_DiagramVieConfig.relayDataList.forEach(val =>
                this._widgets.relayList.push(new RelayWidget({el: this._mainSVG, data: val})));

            // Создаем список анаговых датчиков
            this._widgets.sensorList = [];
            PI_DiagramVieConfig.sensorDataList.forEach(val =>
                this._widgets.sensorList.push(new SensorBarWidget({el: this._mainSVG, data: {
                    name: val.name,
                    x: val.x,
                    y: val.y,
                    maxValue: val.maxValue,
                    minValue: val.minValue,
                    value: Math.round(val.maxValue * Math.random()),
                    eu: val.eu
                }
                })));

        }

    }

// export

    window.PI_Diagram = PI_Diagram;

})();



