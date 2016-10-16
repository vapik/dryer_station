(function () {

    "use strict";


    /**
     * Draw relay widget on svg, component for svg.js
     */
    class RelayWidget {
        constructor(options) {

            // SVG box
            this._el = options.el;

            // options
            this._data = options.data;

            this.render();
        }

        render() {

            // Name
            let relayName = this._el.text(this._data.name)
                .move(16 + this._data.x, this._data.y)
                .addClass('relay__name');

            let relayIconRect = this._el.rect(20, 20)
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