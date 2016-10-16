(function () {

    "use strict";


    /**
     * Отображает колонну, надстройка над svg.js
     */
    class TankWidget {
        constructor(options) {

            // SVG box
            this._el = options.el;

            // options
            this._data = options.data;

            this.render();
        }

        render() {


            // Rectangle
            let tankIconRect = this._el.rect(90, 135)
                .radius(20)
                .move(this._data.x, this._data.y)
                .addClass('tank__rect');

            // Name
            let tankName = this._el.text(this._data.name)
                .move(45 + this._data.x, 22 + this._data.y)
                .addClass('tank__name');

            // State line 1
            let stateStr1 = this._el.text(this._getTextOfState(this._data.state)[0] || "")
                .move(45 + this._data.x, 47 + this._data.y)
                .addClass('tank__state-line1');

            // State line 2
            let stateStr2 = this._el.text(this._getTextOfState(this._data.state)[1] || "")
                .move(45 + this._data.x, 67 + this._data.y)
                .addClass('tank__state-line2');

            // Timer
            let timer = this._el.text(this._data.timer)
                .move(45 + this._data.x, 97 + this._data.y)
                .addClass('tank__timer');


            // Set state style
            let tankPrefix = 'tank_';
            tankIconRect = tankIconRect.addClass(this._getStateStyle(tankPrefix,
                this._data.state));


        }

        /**
         * Return text of tank's state
         * @param {Number} state
         * @returns {Array}
         * @private
         */
        _getTextOfState(state) {

            // TODO: Исправить для 1_стадия, 2_стадия
            // State of tank
            const STATE_TANK =
                [
                    'Остановлен',
                    'Переключение',
                    'Адсорбция',
                    'Сброс давления',
                    'Нагрев 1-стадия',
                    'Нагрев 2-стадия',
                    'Охлаждение нагнетателем',
                    'Охлаждение воздухом',
                    'Ожидание',
                    'Набор давления'
                ];

            return STATE_TANK[state].split(' ');

        }


        /**
         * Return string of tank's style
         * @param {String} prefix
         * @param {Number} state
         * @returns {string}
         * @private
         */
        _getStateStyle(prefix, state) {

            // Style postfixes
            const STATE_TANK_STYLE =
                [
                    'stopped',
                    'switch',
                    'adsorption',
                    'pdown',
                    'heat1',
                    'heat2',
                    'cool-fan',
                    'cool-air',
                    'standby',
                    'pup'
                ];

            return prefix + STATE_TANK_STYLE[state];
        }


    }

    // export
    window.TankWidget = TankWidget;

})();