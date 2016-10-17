(function () {
    "use strict";

    class PI_Diagram {
        constructor(options) {
            this._el = options.el;
            this._data = options.data;

            this._svgList = {};
            this._widgets = {};

            this._init();

            //this.render();
        }

        _init() {
            // Создаем главный холст
            this._svgList.mainSVG = SVG('drawing').size(830, 530);

            // Создаем вложенный слой стрелок
            this._svgList.arrowSVG = this._svgList.mainSVG.nested();

            // Создаем список стрелок направления потока
            this._widgets.arrowList = [];
            PI_DiagramVieConfig.arrowDataList.forEach(val =>
                this._widgets.arrowList.push(new ArrowWidget({el: this._svgList.arrowSVG, data: val})));

            // Создаем вложенный слой труб
            this._svgList.pipeSVG = this._svgList.mainSVG.nested();

            // Создаем список труб
            this._widgets.pipeList = [];
            PI_DiagramVieConfig.pipeDataList.forEach(val =>
                this._widgets.pipeList.push(new PipeWidget({el: this._svgList.pipeSVG, data: val})));


            // Создаем вложенный слой клапанов
            this._svgList.valveSVG = this._svgList.mainSVG.nested();

            // Создаем список клапанов
            this._widgets.valveList = [];
            PI_DiagramVieConfig.valveDataList.forEach(val =>
                this._widgets.valveList.push(new ValveWidget({el: this._svgList.valveSVG, data: val})));

            // Создаем вложенный слой 4х ходовых клапанов
            this._svgList.valve4waySVG = this._svgList.mainSVG.nested();

            // Создаем список клапанов
            this._widgets.valve4wayList = [];
            PI_DiagramVieConfig.valve4wayDataList.forEach(val =>
                this._widgets.valve4wayList.push(new FourWayValveWidget({el: this._svgList.valve4waySVG, data: val})));

            // Создаем вложенный слой колонн
            this._svgList.tankSVG = this._svgList.mainSVG.nested();

            // Создаем список колонн
            this._widgets.tankList = [];
            PI_DiagramVieConfig.tankDataList.forEach(val =>
                this._widgets.tankList.push(new TankWidget({el: this._svgList.tankSVG, data: val})));

            // Создаем вложенный слой нагнетателей
            this._svgList.fanSVG = this._svgList.mainSVG.nested();

            // Создаем список нагнетателей
            this._widgets.fanList = [];
            PI_DiagramVieConfig.fanDataList.forEach(val =>
                this._widgets.fanList.push(new FanWidget({el: this._svgList.fanSVG, data: val})));

            // Создаем вложенный слой нагревателей
            this._svgList.heaterSVG = this._svgList.mainSVG.nested();

            // Создаем список нагревателей
            this._widgets.heaterList = [];
            PI_DiagramVieConfig.heaterDataList.forEach(val =>
                this._widgets.heaterList.push(new HeaterWidget({el: this._svgList.heaterSVG, data: val})));

            // Создаем вложенный слой дискретных датчиков
            this._svgList.relaySVG = this._svgList.mainSVG.nested();

            // Создаем список дискретных датчиков
            this._widgets.relayList = [];
            PI_DiagramVieConfig.relayDataList.forEach(val =>
                this._widgets.relayList.push(new RelayWidget({el: this._svgList.relaySVG, data: val})));

            // Создаем вложенный слой аналоговых датчиков
            this._svgList.sensorSVG = this._svgList.mainSVG.nested();

            // Создаем список анаговых датчиков
            this._widgets.sensorList = [];
            PI_DiagramVieConfig.sensorDataList.forEach(val =>
                this._widgets.sensorList.push(new SensorBarWidget({el: this._svgList.sensorSVG, data: val})));
        }

        render() {



            this._widgets.arrowList.forEach((item) => item.render());
            this._widgets.pipeList.forEach((item) => item.render());
            this._widgets.valveList.forEach((item) => item.render());
            this._widgets.valve4wayList.forEach((item) => item.render());
            this._widgets.tankList.forEach((item) => item.render());
            this._widgets.fanList.forEach((item) => item.render());
            this._widgets.heaterList.forEach((item) => item.render());
            this._widgets.relayList.forEach((item) => item.render());
            this._widgets.sensorList.forEach((item) => item.render());
        }
    }

// export

    window.PI_Diagram = PI_Diagram;

})();



