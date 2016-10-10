(function () {

    "use strict";

    class DeviceSettings {
        constructor(option) {

            this._el = option.el;
            this._repository = option.data;

            this.render();

            this._initEvents();

        }

        render() {

            let title = `<tr>
                <th>ID</th>
                <th>Нименование</th>
                <th>IP</th>
                <th>ID в сети</th>
                <th>Опрашивать</th>
                <th></th>
            </tr>`;

            this._el.innerHTML = `<table class="setting-devices-table w3-table-all">
                ${title}
                ${this._generateItems(this._repository)}
            </table>`;


        }

        _generateItems(repository) {
            let devList = repository.getDeviceList();

            let arr = devList.map((item, i) => {
                return `
            <tr data-id="${item.id}">
                <td class="setting-devices-table__id">${item.id}</td>
                <td class="setting-devices-table__name">${item.name}</td>
                <td class="setting-devices-table__ip">${item.ip}</td>
                <td class="setting-devices-table__id-dev">${item.idDev}</td>
                <td class="setting-devices-table__state">${item.state ? "Да" : "Нет"}</td>
                <td class="setting-devices-table__buttons w3-center">
                    <button class="setting-devices-table-buttons__connect w3-btn w3-green">Подключить</button>
                    <button class="setting-devices-table-buttons__edit w3-btn w3-orange">Изменить</button>
                    <button class="setting-devices-table-buttons__delete w3-btn w3-red">Удалить</button>
                </td>
            </tr>`
            });

            return arr.join(' ');

        }

        _generateItemForEdit(item) {
            let html = `
            <td class="setting-devices-table__id">${item.id}</td>
            <td colspan="5">
                <form class="setting-devices-table-form">
                    <input class="settings-devices-table-form__input"
                        type="hidden"
                        name="id"
                        value="${item.id}"/>

                    <input class="setting-devices-table-form__input"
                           type="text"
                           required="required"
                           placeholder="Name"
                           name="name"
                           value="${item.name}"/>

                    <input class="setting-devices-table-form__input"
                           type="text"
                           required="required"
                           placeholder="IP"
                           name="ip"
                           value="${item.ip}"/>

                    <input class="setting-devices-table-form__input"
                           type="number"
                           required="required"
                           placeholder="ID"
                           size="3"
                           name="idDev"
                           value="${item.idDev}"/>
                    <button class="setting-devices-table-form__button-apply w3-btn w3-green"
                            type="button">Изменить
                    </button>

                    <button class="setting-devices-table-form__button-cancel w3-btn w3-orange"
                            type="button">Отменить
                    </button>


                </form>


            </td>
            `;

            return html;
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
                target.parentNode.parentNode.innerHTML = this._generateItemForEdit(item);

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