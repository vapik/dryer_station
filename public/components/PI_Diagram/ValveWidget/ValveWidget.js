(function () {

    "use strict";


    /**
     * Отображает состояние клапана, компонент над svg.js
     */
    class ValveWidget {
        constructor(options) {

            // SVG box
            this._el = options.el;

            // На поле стрелок создаем подэлемент
            this._subSVG = this._el.nested();

            // параметры
            this._data = options.data;

            this.render();
        }

        render() {

            // Перед рендером очищаем подэлемент
            this._subSVG.clear();

            // Горизонтальная ориентация
            if (this._data.type === 0) {
                // Name
                let valveName = this._subSVG.text(this._data.name)
                    .move(16 + this._data.x, this._data.y)
                    .addClass('valve__name');

                //
                let valveIconBody = this._subSVG.polygon('0,0 0,16 32,0 32,16')
                    .move(0 + this._data.x, 44 + this._data.y)
                    .addClass('valve__icon')
                    .addClass(`${this._data.state ? "valve_opened" : "valve_closed"}`);

                let valveIconLine = this._subSVG.line(16 + this._data.x, 36 + this._data.y,
                    16 + this._data.x, 52 + this._data.y)
                    .addClass('valve__icon');


                let valveIconRect = this._subSVG.rect(10, 20)
                    .move(11 + this._data.x, 20 + this._data.y)
                    .addClass('valve__icon')
                    .addClass(`${this._data.state ? "valve_opened" : "valve_closed"}`);

            }

            // Вертикальная ориентация
            if(this._data.type === 1) {
                // Name
                let valveName = this._subSVG.text(this._data.name)
                    .move(55 + this._data.x,7+ this._data.y)
                    .addClass('valve__name');

                //
                let valveIconBody = this._subSVG.polygon('0,0 16,0 0,32 16,32')
                    .move(this._data.x, this._data.y)
                    .addClass('valve__icon')
                    .addClass(`${this._data.state ? "valve_opened" : "valve_closed"}`);

                let valveIconLine = this._subSVG.line(8 + this._data.x, 16 + this._data.y,
                    24 + this._data.x, 16 + this._data.y)
                    .addClass('valve__icon');


                let valveIconRect = this._subSVG.rect(20, 10)
                    .move(20 + this._data.x, 11 + this._data.y)
                    .addClass('valve__icon')
                    .addClass(`${this._data.state ? "valve_opened" : "valve_closed"}`);

            }

        }
    }

    // export
    window.ValveWidget = ValveWidget;

})();