(function () {

    "use strict";

    /*
     * 1 - Зеленый (Информационное)
     * 2 - Желтый (Предупреждение)
     * 3 - Красный (Авария)
     * */


    const ALERT_TYPE =
    {
        INFO: 1,
        WARN: 2,
        ALARM: 3
    };

    class Alert {

        constructor(options) {
            this._el = options.el;
            this._data = options.data;

            this._initEvents();

            this.render();

        }


        /**
         * Подписываемся на событие
         * @private
         */
        _initEvents() {
            this._el.addEventListener('click', this._onClick.bind(this));
        }

        /**
         * Обработка кликов
         * @param {Event} event
         * @private
         */
        _onClick(event) {
            event.preventDefault();

            let target = event.target;

            if (target.matches('.alert__close-btn')) {
                this._el.style.display = 'none';
            }

        }

        render() {

            // Выбираем подстветку сообщения
            switch (this._data.type) {
                case ALERT_TYPE.INFO:
                    this._el.classList.add('alert_info');
                    break;

                case ALERT_TYPE.WARN:
                    this._el.classList.add('alert_warning');
                    break;

                case ALERT_TYPE.ALARM:
                    this._el.classList.add('alert_alarm');
                    break;
            }

            // Генерируем внутренность
            this._el.innerHTML = `
                <span class="alert__close-btn">&times;</span>
                <h3 class="alert__header">${this._data.header}</h3>
                <p class="alert__ts">${this._data.ts}</p>
                <p class="alert__message">${this._data.message}</p>
        `;
        }
    }

    window.Alert = Alert;
})();

