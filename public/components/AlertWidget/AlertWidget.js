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

    // import
    let _template = window.fest['AlertWidget/AlertWidget.tmpl'];



    class AlertWidget {

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


            // Нажата кнопка закрытия - она же является и подтверждением
            if (target.matches('.alert__close-btn')) {
                this._el.style.display = 'none';
            }

        }

        render() {

            this._el.classList.add("alert");
            
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
            this._el.innerHTML = _template(this._data);
        }
    }

    window.AlertWidget = AlertWidget;
})();

