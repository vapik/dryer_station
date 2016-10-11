(function () {

    "use strict";

    // import
    let _template = window.fest['DeviceSettings/DeviceSettings.tmpl'];
    let _templateEdit = window.fest['DeviceSettings/DeviceSettingsEdit.tmpl'];

    class DeviceSettings {
        constructor(option) {

            this._el = option.el;
            this._repository = option.data;

            this.render();

            this._initEvents();

        }

        render() {


            // let devList = this._repository.getDeviceList()
            //     .map((item) => {
            //         if (item.state)
            //         {
            //             item.state = "Да";
            //         } else {
            //             item.state = "Нет";
            //         }
            //
            //     });

            let devList = this._repository.getDeviceList();

            this._el.innerHTML = _template(devList);
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

            // Кнопка "Подключить/Отключить"
            if (target.matches('.setting-devices-table-buttons__connect')) {

                // Получаем параметры устройства из БД
                let id = ~~target.parentNode.parentNode.dataset.id;
                let item = this._repository.getDevice(id);

                // TODO: Выбросить изсключение
                if (!item) return;

                // Обновляем запись в БД
                item.state = !item.state;
                this._repository.update(item);

                // Обновляем таблицу
                this.render();

            }

            // Кнопка "Удалить"
            if (target.matches('.setting-devices-table-buttons__delete')) {
                // Получаем параметры устройства из БД
                let id = target.parentNode.parentNode.dataset.id;
                let item = this._repository.getDevice(id);

                // TODO: Выбросить изсключение
                if (!item) return;

                // Удаляем запись из БД
                this._repository.delete(item);

                // Обновляем таблицу
                this.render();
            }

            // Кнопка Изменить
            if (target.matches('.setting-devices-table-buttons__edit')) {
                // Получаем параметры устройства из БД
                let id = target.parentNode.parentNode.dataset.id;
                let item = this._repository.getDevice(id);

                // TODO: Выбросить изсключение
                if (!item) return;

                // Изменяем содержимое строки
                target.parentNode.parentNode.innerHTML = _templateEdit(item);

            }

            // Нажата кнопка "Применить" при редактировании
            if (target.matches('.setting-devices-table-form__button-apply')) {
                let form = target.parentNode;

                let item = {};

                item.id = ~~form.elements.id.value;
                item.ip = form.elements.ip.value;
                item.name = form.elements.name.value;
                item.idDev = ~~form.elements.idDev.value;
                item.state = false;

                this._repository.update(item);

                // Обновляем таблицу
                this.render();
            }

            // Нажата кнопка "Отменить" при редактировании
            if (target.matches('.setting-devices-table-form__button-cancel')) {
                this.render();
            }


        }

    }

//export
    window.DeviceSettings = DeviceSettings;
})();