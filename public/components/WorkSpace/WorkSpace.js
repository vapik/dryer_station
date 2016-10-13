(function () {
    "use strict";

    /**
     * Класс содержит методы для рендера главного экрана или экрана настроек,
     * в дальнейшем будет расшираться
     */
    class WorkSpace {
        constructor(options) {
            this._el = options.el;
            this._deviceRepository = options.deviceRepository;
            this._deviceDataRepository = options.deviceDataRepository;
            this._timerPointer = null;
        }


        /**
         * Генерирует главный экран
         */
        renderMainWindow() {

            this._el.innerHTML = "";

            // Для отображения по умолчанию
            let deviceDataDefault = {
                id: 0,
                ts: Date.now(),
                err: true,
                message: "Нет данных",
                mode: 0,
                inError: false,
                errMask: 0,
                stateTank1: 0,
                timerTank1: 0,
                stateTank2: 0,
                timerTank2: 0,
                dewPoint: 0,
                tOut: 0,
                tAfter: 0,
                pOut: 0,
                heater: false,
                fan: false
            };

            // Массив объектов для отображения, сюда попадут те, у которых state = true
            let devicesForMonitoring = this._deviceRepository.getDeviceList()
                .filter((item) => item.state);

            let deviceWidgetList = [];

            // Создаем виджеты агрегатов
            for (let i = 0; i < devicesForMonitoring.length; i++) {

                let deviceContainer = document.createElement('div');
                deviceContainer.className = "dryer";
                this._el.appendChild(deviceContainer);

                let dryerWidget = new DryerWidget(
                    {
                        el: deviceContainer,
                        data: deviceDataDefault
                    }
                );
                deviceWidgetList.push(dryerWidget);
                
            }

            let self = this;

            let a = function(period = 2000){
                let timer = setInterval(func.bind(self), period);

                function func() {
                    let dataList = this._deviceDataRepository.getDataList();

                    for (let i = 0; i < devicesForMonitoring.length; i++) {

                        // Если данные по агрегату не пришли с сервера,
                        // то устанавливаем ему дефолтное значение
                        let data = this._deviceDataRepository.getData(devicesForMonitoring[i].id);
                        if (data == null) {
                            deviceWidgetList[i].data = deviceDataDefault;
                        }
                        else {
                            data.name = devicesForMonitoring[i].name;
                            deviceWidgetList[i].data = data;
                        }

                        deviceWidgetList[i].render();
                    }
                }

            }();

        }

        /**
         * Генерирует экран настроек
         */
        renderSettingsWindow() {


            if (this._timerPointer !== null) clearInterval(this._timerPointer);

            let defaultOptions = {
                id: 0,
                name: "Станция 1",
                ip: "127.0.0.1",
                idDev: 1
            };

            this._el.innerHTML = `
        <div class="setting-devices"></div>
        <div class="add-device"></div>`;

            // Контейнер формы отображения настроек устройств
            let settingsDeviceContainer = document.body.querySelector('.setting-devices');

            // Контейнейр формы добавления устройств
            let addDeviceContainer = document.body.querySelector('.add-device');

            // Обработка таблицы настроек устройств
            let settingsDevices = new DeviceSettings({
                el: settingsDeviceContainer,
                data: this._deviceRepository
            });
            settingsDevices.render();

            // Обработка формы добавления устройства
            let addDeviceForm = new AddDeviceForm({
                el: addDeviceContainer,
                data: defaultOptions
            });
            addDeviceForm.render();

            // Подписываемя на событие для добавления устройства в список мониторинга
            addDeviceContainer.addEventListener('addDevice', (event)=> {
                this._deviceRepository.create(event.detail);
                settingsDevices.render();
            });
        }


        /**
         * Обновляет данные агрегатов с периодичностью в period
         * @param {Number} period
         */
        _refreshDeviceData(period = 2000) {

            let timer = setInterval(func.bind(this), period);

            function func() {
                let dataList = this._deviceDataRepository.getDataList();

                for (let i = 0; i < devicesForMonitoring.length; i++) {

                    // Если данные по агрегату не пришли с сервера,
                    // то устанавливаем ему дефолтное значение
                    let data = this._deviceDataRepository.getData(devicesForMonitoring[i].id);
                    if (data == null) {
                        deviceWidgetList[i].data = deviceDataDefault;
                    }
                    else {
                        data.name = devicesForMonitoring[i].name;
                        deviceWidgetList[i].data = data;
                    }

                    deviceWidgetList[i].render();
                }
            }

            return timer;

        }


    }

    window.WorkSpace = WorkSpace;
})();