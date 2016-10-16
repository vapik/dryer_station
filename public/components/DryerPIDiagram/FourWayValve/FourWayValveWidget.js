(function () {

    "use strict";


    /**
     * Изображает 4-ходовой клапан, надстройка над svg.js
     */
    class FourWayValveWidget {
        constructor(options) {

            // SVG box
            this._el = options.el;

            // 0 - горизонтальный, 1 - вертикальный
            this._type = options.type;

            // параметры
            this._data = options.data;

            this.render();
        }

        render() {

            // Имя
            let valveName = this._el.text(this._data.name)
                .move(50 + this._data.x, this._data.y)
                .addClass('valve4way__name');

            // Верхняя часть
            let valveUp = this._el.polygon('0,10 16,10 8,26')
                .move(8 + this._data.x, 10 + this._data.y)
                .addClass('valve4way__up');

            // Нижняя часть
            let valveDown = this._el.polygon('0,16 16,16 8,0')
                .move(8 + this._data.x, 26 + this._data.y)
                .addClass('valve4way__down');

            // Левая часть
            let valveLeft = this._el.polygon('0,0 0,16 16,8')
                .move(this._data.x, 18 + this._data.y)
                .addClass('valve4way__left');

            // Правая часть
            let valveRight = this._el.polygon('16,8 16,24 0,16')
                .move(16 + this._data.x, 18 + this._data.y)
                .addClass('valve4way__right');


            //   Задаем стиль

            // type: 1 - верхняя часть клапана, 2 - нижняя часть клапана
            // state: true - Колонна 1 в адсорбцию,
            // false = Колонна 2 в адсорбцию
            if (this._data.type === 1) {

                if (this._data.state === true) {
                    valveUp = valveUp.addClass('valve4way_1-pos');
                    valveLeft = valveLeft.addClass('valve4way_1-pos');

                    valveRight = valveRight.addClass('valve4way_2-pos');
                    valveDown = valveDown.addClass('valve4way_2-pos');

                } else {

                    valveUp = valveUp.addClass('valve4way_1-pos');
                    valveRight = valveRight.addClass('valve4way_1-pos');

                    valveLeft = valveLeft.addClass('valve4way_2-pos');
                    valveDown = valveDown.addClass('valve4way_2-pos');
                }
            }

            if (this._data.type === 2) {

                if (this._data.state === true) {
                    valveLeft = valveLeft.addClass('valve4way_1-pos');
                    valveRight = valveRight.addClass('valve4way_1-pos');

                    valveUp = valveUp.addClass('valve4way_2-pos');
                    valveDown = valveDown.addClass('valve4way_2-pos');

                } else {

                    valveUp = valveUp.addClass('valve4way_1-pos');
                    valveRight = valveRight.addClass('valve4way_1-pos');

                    valveLeft = valveLeft.addClass('valve4way_2-pos');
                    valveDown = valveDown.addClass('valve4way_2-pos');
                }
            }



        }
    }

    // export
    window.FourWayValveWidget = FourWayValveWidget;

})();