(function () {

    "use strict";


    /**
     * Изображает вертикальный индикатор датчика, надстройка над svg.js
     */
    class SensorBarWidget {
        constructor(options) {

            // SVG box
            this._el = options.el;
            this._subSVG = this._el.nested();

            // options
            this._data = options.data;

            this.render();
        }

        render() {

            // Очищаем область перед новым рендером
            this._subSVG.clear();


            // Normalize value
            let normalizedValue =
                (this._data.value)/(this._data.maxValue - this._data.minValue);
            let scalableValue =  Math.round(100 * normalizedValue);

            // Name
            let barName = this._subSVG.text(this._data.name)
                .move(20 + this._data.x, this._data.y)
                .addClass('bar__name');

            // Background bar
            let backBar = this._subSVG.rect(15, 100)
                .move(11 + this._data.x,35 + this._data.y)
                .addClass('bar__back');

            // Dynamic bar
            let frontBar = this._subSVG.rect(15, scalableValue)
                .move(11 + this._data.x,
                    35 + (100 - scalableValue) + this._data.y)
                .addClass('bar__front');

            // Value text
            let valueText = this._subSVG.text(this._data.value + " " + this._data.eu)
                .move(20 + this._data.x,137 + this._data.y)
                .addClass('bar__value');

        }
    }

    // export
    window.SensorBarWidget = SensorBarWidget;

})();