(function () {

    "use strict";


    /**
     * Draw relay widget on svg, component for svg.js
     */
    class RelayWidget {
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

            // Name
            let relayName = this._subSVG.text(this._data.name)
                .move(16 + this._data.x, this._data.y)
                .addClass('relay__name');

            let relayIconRect = this._subSVG.rect(20, 20)
                .move(5 + this._data.x, 20 + this._data.y)
                .addClass('relay__icon');
            
            
            switch(this._data.state)
            {
                case 0:
                    relayIconRect = relayIconRect.addClass('relay_off');
                    break;
                
                case 1:
                    relayIconRect = relayIconRect.addClass('relay_on');
                    break;

                case 2:
                    relayIconRect = relayIconRect.addClass('relay_alarm');
                    break;
                    
            }

        }
    }

    // export
    window.RelayWidget = RelayWidget;

})();