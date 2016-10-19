(function () {

    "use strict";

    let _template = window.fest['DryerWidget/DryerWidget.tmpl'];

    class DryerWidget {
        constructor(option) {

            this._el = option.el;
            this._data = option.data;

            this.render();

            this._initEvents();


        }

        render() {

            // Состояние колонны
            const STATE_TANK =
                [
                    'Остановлен',
                    'Переключение',
                    'Адсорбция',
                    'Сброс давления',
                    'Нагрев 1',
                    'Нагрев 2',
                    'Охлаждение нагнетателем',
                    'Охлаждение воздухом',
                    'Ожидание',
                    'Набор давления'
                ];


            // Цветовая палитка состояния колонны
            const STATE_TANK_STYLE =
                [
                    'off',
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


            let tankPrefix = 'dryer-content-tank_';

            function getStyleStateTank(prefix, state) {

                return prefix + STATE_TANK_STYLE[state];
            }

            // Режим управления колонны
            const MODE =
                [
                    "Остановлен",
                    "Управление по точке росы",
                    "Управление по времени",
                    "Пошаговый режим",
                    "Ручое управление"
                ];

            // Цветовая палитка режима управления
            const MODE_STYLE =
                [
                    "stopped",
                    "dew-point-mode",
                    "time-mode",
                    "step-mode",
                    "hand-mode"
                ];


            let modePrefixHeader = 'dryer-header_';
            let modePrefixFooter = 'dryer-footer_';

            function getStyleMode(prefix, mode) {
                return prefix + MODE_STYLE[mode];
            }

            let item = {};

            item.id = this._data.id;
            item.name = this._data.name || 'Осушитель';
            item.ts = (new Date(this._data.ts)).toLocaleString('ru');
            item.mode = MODE[this._data.mode];

            // State tank1
            item.stateTank1 = STATE_TANK[this._data.stateTank1];

            // Elapsed time Tank1
            item.timerTank1 = getFormattedTime(this._data.timerTank1);

            // State tank2
            item.stateTank2 = STATE_TANK[this._data.stateTank2];

            // Elapsed time Tank2
            item.timerTank2 = getFormattedTime(this._data.timerTank2);


            function getFormattedTime(seconds) {
                let date = new Date(seconds * 1000);
                return date.toLocaleString('ru',
                    {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    });
            }

            item.dewPoint = this._data.dewPoint.toFixed(1);
            item.tOut = this._data.tOut;
            item.tAfter = this._data.tAfter;
            item.pOut = this._data.pOut;
            item.heater = this._data.units[7] ? "ВКЛ" : "ОТКЛ";
            item.fan = this._data.units[6] ? "ВКЛ" : "ОТКЛ";

            let style =
            {
                headerStyleMode: getStyleMode(modePrefixHeader, this._data.mode),
                styleStateTank1: getStyleStateTank(tankPrefix, this._data.stateTank1),
                styleStateTank2: getStyleStateTank(tankPrefix, this._data.stateTank2),
                footerStyleMode: getStyleMode(modePrefixFooter, this._data.mode)
            };

            this._el.innerHTML = _template({item, style});

        }

        _initEvents() {
            this._el.addEventListener('click', this._onClick.bind(this));
        }

        _onClick(event) {
            event.preventDefault();

            let openDevicePIDiagram = new CustomEvent("openDeviceDiagram",
                {
                    bubbles: true,
                    detail: this._data.id
                });

            this._el.dispatchEvent(openDevicePIDiagram);

        }

        /**
         * Проверяет объект данных на валидность
         * @param dataObj
         * @returns {boolean}
         */
        duckCheckingData(dataObj) {
            if (dataObj.id == null) return false;
            if (dataObj.ts == null) return false;
            // TODO: Добавить обработку всех полей

            return true;
        }

        /**
         * Задаем данные в объект
         * @param {Object} dataObj
         */
        set data(dataObj) {
            if (!this.duckCheckingData(dataObj)) return;
            this._data = dataObj;
        }

    }
    // exports
    window.DryerWidget = DryerWidget;
})();