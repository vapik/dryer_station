// wss - Экземпляр WebSocketServer
module.exports = function (wss, repository) {
    "use strict";

    wss.on('connection', function (ws) {
        console.log(`${new Date()}: Received websocket connection`);

        //
        ws.on('message', function (msg) {
            console.log(`${new Date().toLocaleDateString('ru')}: Got message`);
            console.log(msg);

            // Парсим сообщение

            /* Формат валидного сообщения:
             {
             name: "requestData",
             data: [
             {id: Number, ip: String, name: String, idDev: Number, state: String},
             ...
             ]
             }
             */

            let parsedData;
            try {
                parsedData = JSON.parse(msg);
            } catch (err) {
                console.log("Can't parse data");
                throw err;
            }

            // Проверяем на валидность
            if (!checkResponse(parsedData)) {
                let mes = {
                    name: "Error",
                    message: "Wrong request"
                };

                try {
                    ws.send(JSON.stringify(mes));
                } catch (err) {
                    console.log("Can't send package");
                }
            }


            if (parsedData) {
                let mes = {
                    name: "data",
                    data: repository.getDeviceDataList()
                };

                try {
                    ws.send(JSON.stringify(mes));
                    console.log('Send message');
                    console.log(mes);
                } catch (err) {
                    console.log("Can't send data package");
                }

            }

        })

    })

};


/**
 * Проверяет на валидность принятый пакет
 * @param {Object} data
 * @returns {boolean}
 */
function checkResponse(data) {

    // TODO : Реализовать проверку
    return true;

}



