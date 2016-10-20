(function () {
    "use strict";

    /**
     * Класс содержит методы для рендера главного экрана, экрана настроек, мнемосхем осушителей
     * в дальнейшем будет расшираться
     */
    class WorkSpace {
        constructor(options) {
            this._el = options.el;
            this._deviceRepository = options.deviceRepository;
            this._deviceDataRepository = options.deviceDataRepository;
            
            this._timerPointer2 = null;

            this._piDiagram = null;
        }

        /**
         * Генерирует главный экран
         */
        renderMainWindow() {

            // Удаляем из DOM старые элементы, чтобы сборбщик мусора их удалил
            for (let i = 0; i < this._el.childNodes.length; i++) {
                this._el.childNodes[i].remove();
            }
            
            this._el.innerHTML = "";


            // Для отображения по умолчанию
            let deviceDataDefault = {
                id: 0,
                ts: Date.now(),
                err: true,
                message: "Нет данных",
                mode: 0,
                errors: 0,
                warnings: 0,
                stateTank1: 0,
                timerTank1: 0,
                stateTank2: 0,
                timerTank2: 0,
                dewPoint: 0,
                tOut: 0,
                tAfter: 0,
                tHeater: 0,
                pOut: 0,
                units: [false, false, false, false, false, false, false, false, false]
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

        /**
         * Генерирует экран настроек
         */
        renderSettingsWindow() {

            // Удаляем из DOM старые элементы, чтобы сборбщик мусора их удалил
            for (let i = 0; i < this._el.childNodes.length; i++) {
                this._el.childNodes[i].remove();
            }

            if (this._timerPointer2 !== null) clearInterval(this._timerPointer2);

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
         * Генерирует мнемосхему осушителя по заданному id
         * @param {number} id
         */
        renderPI_Diagram(id = 1) {

            // TODO: Выделить модальное окно в отдельный компонент


            // // Удаляем из DOM старые элементы, чтобы сборбщик мусора их удалил
            // for (let i = 0; i < this._el.childNodes.length; i++) {
            //     this._el.childNodes[i].remove();
            // }
            
            //this._el.innerHTML = "";


            // Подложка под модальным окном
            let modalContainer = document.body.querySelector('.modal-board');
            if (modalContainer !== null) {
                for (let i = 0; i < modalContainer.childNodes.length; i++) {
                    modalContainer.childNodes[i].remove();
                }
                modalContainer.innerHTML = "";
            } else {
                modalContainer = document.createElement('div');
                modalContainer.classList.add('modal-board');
                document.body.appendChild(modalContainer);
            }

            // Модальное окно
            let modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');
            modalContainer.appendChild(modalContent);

            // Header
            let header = document.createElement('div');
            header.classList.add('modal-content-header');
            header.innerHTML = "Осушитель";
            modalContent.appendChild(header);

            // Close Btn
            let closeBtn = document.createElement('span');
            closeBtn.classList.add('modal-content-header__close-btn');
            closeBtn.innerHTML = "&#x274C;";
            closeBtn.addEventListener("click", (event) =>{
                modalContainer.parentNode.removeChild(modalContainer);
            });
            header.appendChild(closeBtn);

            let drawingContainer = document.createElement('div');
            drawingContainer.id = "drawing";
            modalContent.appendChild(drawingContainer);



            this._piDiagram = new PI_Diagram({el: drawingContainer, data:  this._deviceDataRepository.getData(id)});

        }


    }

    window.WorkSpace = WorkSpace;
})();