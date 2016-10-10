(function () {

    "use strict";

    class AddDeviceForm {
        constructor(option) {

            this._el = option.el;
            this._data = option.data;

            this.render();

            this._initEvents();


        }

        render() {

            /*TODO: НАДО ПЕРЕПИСАТЬ ЧЕРЕЗ ШАБЛОНИЗАТОР*/

            this._el.innerHTML = `
            <form class="add-device-form w3-right w3-border w3-light-grey">
                <input class="add-device-form__input"
                   type="text"
                   required="required"
                   placeholder="Name"
                   name="name"/>
                <input class="add-device-form__input"
                   type="text"
                   required="required"
                   placeholder="IP"
                   name="ip"/>
                <input class="add-device-form__input"
                   type="number"
                   required="required"
                   placeholder="ID"
                   size="3"
                   name="idDev"/>
                <button class="add-device-form__button-add w3-btn w3-green"
                    type="submit">Добавить
                </button>
            </form> `;

        }

        _initEvents() {
            this._el.addEventListener('submit', this._onSubmit.bind(this));
        }


        _onSubmit()
        {
            event.preventDefault();

            let form = this._el.querySelector('.add-device-form');
            if(event.target == form)
            {
                // TODO: Вставить маркировку невалидных полей
                if (!this.validate()) return;

                let addDeviceEvent = new CustomEvent("addDevice", {
                    bubbles: true,
                    detail: this.getData()
                });

                this._el.dispatchEvent(addDeviceEvent);
            }

        }

        getData() {

            let form = this._el.querySelector('.add-device-form');

            let ip = form.elements.ip.value;
            let name = form.elements.name.value;
            let idDev = ~~form.elements.idDev.value;

            return {
                id: 0,
                ip: ip,
                name: name,
                idDev: idDev,
                state: false
            };
        }


        // Валидация
        // TODO: Сделать валидацию через регулярки!!!
        // Попробовать для IP:
        //^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$
        validate() {
            let data = this.getData();


            if (data.ip == "") return false;

            if (data.name == "") return false;

            if (data.idDev < 0) return false;

            return true;

        }

    }
    // exports
    window.AddDeviceForm = AddDeviceForm;
})();
