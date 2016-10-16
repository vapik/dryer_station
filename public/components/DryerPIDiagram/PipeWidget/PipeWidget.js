(function () {

    "use strict";


    /**
     * Видже трубы, компонент над svg.js
     */
    class PipeWidget {
        constructor(options) {

            // SVG box
            this._el = options.el;

            // options
            this._data = options.data;

            this.render();
        }

        render() {

            // coords - массив координат точек вида [[x1,y1],[x2,y2]....]
            let pipe = this._el.polyline(this._data.coords)
                .addClass('pipe');

            pipe = pipe.addClass(this._getPipeStyle(this._data.state));
        }

        /**
         * Возвращает стиль состояния трубы
         * @param state
         * @returns {string}
         * @private
         */
        _getPipeStyle(state) {
            
            
            let prefix = 'pipe_';

            // Состояние трубы
            // 0 - адсорбция, 1 - горячий воздух, 2 - воздух
            
            const STATE_PIPE_STYLE =
                [
                    'off',
                    'adsorptions',
                    'heat',
                    'cool'
                ];

            return prefix + STATE_PIPE_STYLE[state];
        }
        
    }

    // export
    window.PipeWidget = PipeWidget;

})();