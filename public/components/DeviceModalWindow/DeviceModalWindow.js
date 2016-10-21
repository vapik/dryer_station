(function () {
    "use strict";

    class DeviceModalWindow {

        constructor(options) {

            this._el = options.el;

            this._id = options.id;

            this._deviceRepository = options.deviceRepository;
            this._deviceDataRepository = options.deviceDataRepository;

            this._timerPointer = null;

            this.render();
            this._initEvents();

        }

        render() {

            // Удаляем из DOM старые элементы, чтобы сборбщик мусора их удалил
            for (let i = 0; i < this._el.childNodes.length; i++) {
                this._el.childNodes[i].remove();
            }

            let _data = this._deviceDataRepository.getData(this._id);

            if (_data !== null) {

                let _name = this._deviceRepository.getDevice(this._id).name;

                this._el.innerHTML = `
                <div class="modal-content">
                    <div class="modal-content-header">
                        <span class="modal-content-header__close-btn">&#x274C;</span>
                        <h3>${_name}</h3>
                    </div>
                    <div id="drawing"></div>
                </div>`;

                let piDiagram = new PI_Diagram({
                    el: this._el.querySelector('#drawing'),
                    data: _data
                });



                let func = function() {

                    let drawBoard = this._el.querySelector('#drawing');
                    // Удаляем из DOM старые элементы, чтобы сборбщик мусора их удалил
                    for (let i = 0; i < drawBoard.childNodes.length; i++) {
                        drawBoard.childNodes[i].remove();
                    }

                    let piDiagram = new PI_Diagram({
                        el: drawBoard,
                        data: this._deviceDataRepository.getData(this._id)
                    });

                }

                this._timerPointer = setInterval(func.bind(this), 500);

            }
            else {
                this._el.innerHTML = `
                <div class="modal-content">
                    <div class="modal-content-header">
                        <span class="modal-content-header__close-btn">&#x274C;</span>
                        <h3>НЕТ ДАННЫХ</h3>
                        <h4>Проверьте настройки агрегата</h4>
                    </div>
                    <div id="drawing"></div>
                </div>`;
            }

        }

        _initEvents() {
            this._el.addEventListener('click', this._onClick.bind(this));
        }

        _onClick(event) {
            event.preventDefault();

            if (event.target.matches('.modal-content-header__close-btn')) {

                let closeModalWindow = new CustomEvent('CloseModalWindow', {
                    bubbles: true,
                    detail: this._timerPointer
                });

                this._el.dispatchEvent(closeModalWindow);
            }
        }

    }

// export

    window.DeviceModalWindow = DeviceModalWindow;

})();