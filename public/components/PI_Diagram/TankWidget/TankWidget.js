(function () {

    "use strict";


    /**
     * Отображает колонну, надстройка над svg.js
     */
    class TankWidget {
        constructor(options) {

            // SVG box
            this._el = options.el;

            // На поле  создаем подэлемент
            this._subSVG = this._el.nested();

            // options
            this._data = options.data;

            this.render();
        }

        /**
         * Задает новый источник данных, переписывая старые
         * @param {object} obj
         */
        setRTdata(obj) {
            Object.assign(this._data, obj);
        }        
        
        render() {

            // Перед рендером очищаем подэлемент
            this._subSVG.clear();

            // Rectangle
            let tankIconRect = this._subSVG.rect(90, 135)
                .radius(20)
                .move(this._data.x, this._data.y)
                .addClass('tank__rect');

            // Name
            let tankName = this._subSVG.text(this._data.name)
                .move(45 + this._data.x, 22 + this._data.y)
                .addClass('tank__name');

            // State line 1
            let stateStr1 = this._subSVG.text(this._getTextOfState(this._data.state)[0] || "")
                .move(45 + this._data.x, 47 + this._data.y)
                .addClass('tank__state-line1');

            // State line 2
            let stateStr2 = this._subSVG.text(this._getTextOfState(this._data.state)[1] || "")
                .move(45 + this._data.x, 67 + this._data.y)
                .addClass('tank__state-line2');

            // Timer
            let timer = this._subSVG.text(this._data.timer)
                .move(45 + this._data.x, 97 + this._data.y)
                .addClass('tank__timer');


            // Set state style
            let tankPrefix = 'tank_';
            tankIconRect = tankIconRect.addClass(this._getStateStyle(tankPrefix,
                this._data.state));


        }

        /**
         * Возвращает наименование стадии
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
         * Возвращает постфикс для CSS стиля стадии
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