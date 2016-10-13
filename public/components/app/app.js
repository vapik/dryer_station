(function () {

    "use strict";

// Создаем репозиторий хранения настроек в SessionStorage
    let repository = new SessionStorageRepository();

    /* SOCKET IO для обмена данных с сервером */
    //const URL = "http://109.111.177.150:34000";
    const URL = "http://127.0.0.1:34000";
    //const URL ="https://109.111.177.150:34000";

    let socketIORepository = new SocketIORepository(
        {urlString: URL, deviceRepository: repository,});


    // test websocket
    const WS_URL = "ws://127.0.0.1:34000";
    var ws = new WebSocket(WS_URL);
    ws.onopen = function()
    {
        ws.send('Hi')
    };

    ws.onerror = function(err)
    {
        console.log(err);
    };
    ws.onmessage = function (message) {
        console.log(message.data);
    };


    let mainMenuContainer = document.body.querySelector('.main-nav');
    let mainMenu = new MainMenu({el: mainMenuContainer});

// Контейнер div в котором будет лежать рабочая область
    let workspaceContainer = document.body.querySelector('.main-board');

    openSettingsWindow();

// Подписываемся на событие открытия главного окна
    mainMenuContainer.addEventListener('OpenMainWindow', (event) => {
        openMainWindow();
    });

// Подписываеся на событие октрытия окна настроек
    mainMenuContainer.addEventListener('OpenSettingsWindow', (event) => {
        openSettingsWindow();
    });


    function openSettingsWindow() {

        let defaultOptions = {
            id: 0,
            name: "Станция 1",
            ip: "127.0.0.1",
            idDev: 1
        };

        workspaceContainer.innerHTML = `
        <div class="setting-devices"></div>
        <div class="add-device"></div> `;

        // Контейнер формы отображения настроек устройств
        let settingsDeviceContainer = document.body.querySelector('.setting-devices');

        // Контейнейр формы добавления устройств
        let addDeviceContainer = document.body.querySelector('.add-device');

        // Обработка таблицы настроек устройств
        let settingsDevices = new DeviceSettings({
            el: settingsDeviceContainer,
            data: repository
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
            repository.create(event.detail);
            settingsDevices.render();
        });
    }

    function openMainWindow() {

        workspaceContainer.innerHTML = "";

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
        let devicesForMonitoring = repository.getDeviceList()
            .filter((item) => item.state);

        let deviceWidgetList = [];

        // Создаем виджеты агрегатов
        for (let i = 0; i < devicesForMonitoring.length; i++) {

            let deviceContainer = document.createElement('div');
            deviceContainer.className =
                "dryer";
            workspaceContainer.appendChild(deviceContainer);
            let dryerWidget = new DryerWidget(
                {
                    el: deviceContainer,
                    data: deviceDataDefault
                }
            );
            deviceWidgetList.push(dryerWidget);
        }

        /**
         * Обновляет данные агрегатов с периодичностью в period
         * @param {Number} period
         */
        function refreshDeviceData(period = 2000) {
            let timer = setInterval(func, period);

            function func() {
                let dataList = socketIORepository.getDataList();

                for (let i = 0; i < devicesForMonitoring.length; i++) {

                    // Если данные по агрегату не пришли с сервера, 
                    // то устанавливаем ему дефолтное значение
                    let data = socketIORepository.getData(devicesForMonitoring[i].id);
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

        }

        refreshDeviceData();
    }

})();