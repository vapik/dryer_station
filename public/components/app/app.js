(function () {

    "use strict";

// Создаем репозиторий хранения настроек в SessionStorage
    let repository = new SessionStorageRepository();

    /* SOCKET IO для обмена данных с сервером */
    //const URL = "http://109.111.177.150:34000";
    //const URL = "http://127.0.0.1:34000";

    /*let socketIORepository = new SocketIORepository(
        {urlString: URL, deviceRepository: repository,});*/


    // WEBSOCKET
    const WS_URL = "ws://127.0.0.1:34000";
    //const WS_URL = "ws://109.111.177.150:34000";

    let webSocketRepository = new WebSocketRepository(
     {urlString: WS_URL, deviceRepository: repository});


    let mainMenuContainer = document.body.querySelector('.main-nav');
    let mainMenu = new MainMenu({el: mainMenuContainer});

// Контейнер div в котором будет лежать рабочая область
    let workspaceContainer = document.body.querySelector('.main-board');

    let workSpace = new WorkSpace(
        {el: workspaceContainer,
        deviceRepository: repository,
            deviceDataRepository: webSocketRepository});



    let tPointerMainWindow;
    let tPointerPIdiagram;

    stopTimers(tPointerMainWindow, tPointerPIdiagram);
    tPointerMainWindow = setInterval(function() {workSpace.renderMainWindow();}, 1000);



// Подписываемся на событие открытия главного окна
    mainMenuContainer.addEventListener('OpenMainWindow', (event) => {

        stopTimers(tPointerMainWindow, tPointerPIdiagram);
        tPointerMainWindow = setInterval(function() {workSpace.renderMainWindow();}, 500);

    });

// Подписываеся на событие октрытия окна настроек
    mainMenuContainer.addEventListener('OpenSettingsWindow', (event) => {
        stopTimers(tPointerMainWindow, tPointerPIdiagram);
        workSpace.renderSettingsWindow();
    });

    // Подписываемся на собите открытия окна мнемосхемы
    workspaceContainer.addEventListener('OpenDeviceDiagram', (event) => {
        stopTimers(tPointerMainWindow, tPointerPIdiagram);
        let _id = event.detail;

        workSpace.renderModalWindow(_id);

        // tPointerPIdiagram = setInterval(() => workSpace.renderPI_Diagram(_id), 500);
    });

    document.body.addEventListener('CloseModalWindow', (event) => {

        event.target.parentNode.removeChild(event.target);
        if (event.detail !== null) clearInterval(event.detail);

        stopTimers(tPointerMainWindow, tPointerPIdiagram);
        tPointerMainWindow = setInterval(function() {workSpace.renderMainWindow();}, 500);

    });



    /**
     * Принимает указатели на таймеры и останавливает их
     */
    function stopTimers(){
        [].forEach.call(arguments, (item) => {
            if (item == null) return;
            clearInterval(item);
        });
    }

/*

    /!* ------------- ALERT -------------------  *!/
    
    let alertContainer = document.body.querySelector('.alert-board');
    
    // Создаем 5 тестовых событий для проверки
    for (let i = 0; i < 5; i++) {
        let div = document.createElement('div');
        
        let alert = new AlertWidget({
            el: div,
            data: {
                type: Math.ceil((3 * Math.random())),
                ts: (new Date).toLocaleString('ru'),
                header: 'Тестовый объект',
                message: 'Тестовое сообщение',
                acknowledged: false
            }
        });

        alertContainer.appendChild(div);
    }
*/

})();

