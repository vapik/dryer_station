(function () {

    "use strict";


    /**
     * Стрелка направления воздуха, компонента над svg.js
     */
    class ArrowWidget {
        constructor(options) {

            // SVG box
            this._el = options.el;

            // На поле стрелок создаем подэлемент
            this._subSVG = this._el.nested();

            // options
            this._data = options.data;

            this.render();
        }

        render() {

            // Перед рендером очищаем подэлемент
            this._subSVG.clear();

            let arr = [[0, 5], [17, 5], [17, 0], [23,7], [17, 14], [17, 9], [0, 9]];

            let arrow = this._subSVG.polygon(arr)
                .rotate(this._data.rotation, this._data.x, this._data.y)
                .dmove(this._data.x, this._data.y)
                .addClass('arrow');


        }
    }

    // export
    window.ArrowWidget = ArrowWidget;

})();