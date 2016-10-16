(function () {

    "use strict";


    /**
     * Draw on svg valve, component for svg.js
     */
    class ValveWidget {
        constructor(options) {

            // SVG box
            this._el = options.el;

            // 0 - горизонтальный, 1 - вертикальный
            this._type = options.type;

            // параметры
            this._data = options.data;

            this.render();
        }

        render() {

            // Horizontal orientation
            if (this._type === 0) {
                // Name
                let valveName = this._el.text(this._data.name)
                    .move(16 + this._data.x, this._data.y)
                    .addClass('valve__name');

                //
                let valveIconBody = this._el.polygon('0,0 0,16 32,0 32,16')
                    .move(0 + this._data.x, 44 + this._data.y)
                    .addClass('valve__icon')
                    .addClass(`${this._data.state ? "valve_opened" : "valve_closed"}`);

                let valveIconLine = this._el.line(16 + this._data.x, 36 + this._data.y,
                    16 + this._data.x, 52 + this._data.y)
                    .addClass('valve__icon');


                let valveIconRect = this._el.rect(10, 20)
                    .move(11 + this._data.x, 20 + this._data.y)
                    .addClass('valve__icon')
                    .addClass(`${this._data.state ? "valve_opened" : "valve_closed"}`);

            }

            // Vertical orientation
            if(this._type === 1) {
                // Name
                let valveName = this._el.text(this._data.name)
                    .move(55 + this._data.x,7+ this._data.y)
                    .addClass('valve__name');

                //
                let valveIconBody = this._el.polygon('0,0 16,0 0,32 16,32')
                    .move(this._data.x, this._data.y)
                    .addClass('valve__icon')
                    .addClass(`${this._data.state ? "valve_opened" : "valve_closed"}`);

                let valveIconLine = this._el.line(8 + this._data.x, 16 + this._data.y,
                    24 + this._data.x, 16 + this._data.y)
                    .addClass('valve__icon');


                let valveIconRect = this._el.rect(20, 10)
                    .move(20 + this._data.x, 11 + this._data.y)
                    .addClass('valve__icon')
                    .addClass(`${this._data.state ? "valve_opened" : "valve_closed"}`);

            }

        }
    }

    // export
    window.ValveWidget = ValveWidget;

})();