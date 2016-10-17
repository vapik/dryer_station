(function () {

    "use strict";


    /**
     * Draw fan widget on svg, component for svg.js
     */
    class FanWidget {
        constructor(options) {

            // SVG box
            this._el = options.el;

            // На поле стрелок создаем подэлемент
            this._subSVG = this._el.nested();

            // options
            this._data = options.data;

            this.render();
        }

        render() {

            // Перед рендером очищаем подэлемент
            this._subSVG.clear();

            // Name
            let famName = this._subSVG.text(this._data.name)
                .move(50 + this._data.x, this._data.y)
                .addClass('fan__name');

            // Circle
            let fanIconCircle = this._subSVG.circle(34)
                .move(17 + this._data.x,17 + this._data.y)
                .addClass('fan__icon');

            // Triangle
            let fanIconTriangle = this._subSVG.polygon('0,10 8,0 8,20')
                .move(16 + this._data.x, 25 + this._data.y);

            // Set state
            switch (this._data.state) {
                case 0:
                    fanIconCircle = fanIconCircle.addClass('fan_off');
                    break;

                case 1:
                    fanIconCircle = fanIconCircle.addClass('fan_on');
                    break;

                case 2:
                    fanIconCircle = fanIconCircle.addClass('fan_alarm');
                    break;

            }

        }
    }

    // export
    window.FanWidget = FanWidget;

})();