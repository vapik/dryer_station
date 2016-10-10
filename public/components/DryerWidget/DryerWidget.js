(function () {

    "use strict";

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
            item.heater = this._data.heater ? "ВКЛ" : "ОТКЛ";
            item.fan = this._data.fan ? "ВКЛ" : "ОТКЛ";


            /*TODO: НАДО ПЕРЕПИСАТЬ ЧЕРЕЗ ШАБЛОНИЗАТОР*/
            <!-- Device -->
            this._el.innerHTML = `
           

            <!-- Name device -->
    <header class="dryer-header w3-container ${getStyleMode(modePrefixHeader, this._data.mode)}">
        <h4 class="dryer-header__name">${item.name || 'Осушитель'}</h4>
        <p class="w3-small w3-text-black">Данные за:
            <span class="dryer-header__timestamp">${item.ts}</span></p>
    </header>

    <!-- Content -->
    <div class="dryer-content w3-row w3-margin">

        <!-- Tank1 -->
        <div class="dryer-content-tank1 w3-col m4 ${getStyleStateTank(tankPrefix, this._data.stateTank1)} w3-round-large">
            <ul class="dryer-content-tank1-board w3-ul">
                <li class="dryer-content-tank1-board__name">Колонна 1</li>
                <li class="dryer-content-tank1-board__state">${item.stateTank1}</li>
                <li class="dryer-content-tank1-board__timer">${item.timerTank1}</li>
            </ul>
        </div>

        <!-- Sensors -->
        <div class="dryer-content-sensors w3-col m4 w3-margin-left w3-margin-right w3-border w3-light-grey">
            <ul class="dryer-content-sensors-board w3-ul w3-small">
                <li>Точка росы: <span
                        class="dryer-content-sensors-board__dew-point w3-text-blue">${item.dewPoint} C</span>
                </li>
                <li>t сброс: <span
                        class="dryer-content-sensors-board__t-out w3-text-blue">${item.tOut} С</span>
                </li>
                <li>t нагрев.: <span
                        class="dryer-content-sensors-board-dew-point__t-after  w3-text-blue">${item.tAfter} С</span>
                </li>
                <li>P сброс: <span
                        class="dryer-content-sensors-board__p-out w3-text-blue">${item.pOut} кПа</span>
                </li>
                <li>Нагреватель: <span
                        class="dryer-content-sensors-board__heater w3-text-black">${item.heater}</span>
                </li>
                <li>Нагнетатель: <span
                        class="dryer-content-sensors-board__fan w3-text-black">${item.fan}</span>
                </li>
            </ul>
        </div>

        <!-- Tank2 -->
        <div class="dryer-content-tank2 w3-col m4 ${getStyleStateTank(tankPrefix, this._data.stateTank2)} w3-round-large">
            <ul class="dryer-content-tank2-board w3-ul">
                <li class="dryer-content-tank2-board__name">Колонна 2</li>
                <li class="dryer-content-tank2-board__state">${item.stateTank2}</li>
                <li class="dryer-content-tank2-board__timer">${item.timerTank2}</li>
            </ul>
        </div>
    </div>

    <!-- Device mode -->
    <footer class="dryer-footer w3-container ${getStyleMode(modePrefixFooter, this._data.mode)}">
        <h5 class="dryer-footer__mode">${item.mode}</h5>
    </footer> 
    
    `;

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

        setData(dataObj) {
            if (!this.duckCheckingData(dataObj)) return;
            this._data = dataObj;
        }


    }
    // exports
    window.DryerWidget = DryerWidget;
})();