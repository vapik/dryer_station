(function () {

    "use strict";


    /**
     * Draw fan widget on svg, component for svg.js
     */
    class HeaterWidget {
        constructor(options) {

            // SVG box
            this._el = options.el;

            // options
            this._data = options.data;

            this.render();
        }

        render() {

            // Arrow
            let arrowDefs= this._el.defs();
            let marker = arrowDefs.marker('end', 1, 3, function(add) {
                add.path("M 0 0 L 6 3 L 0 6 z");
            });


            // Name
            let heaterName = this._el.text(this._data.name)
                .move(48 + this._data.x, this._data.y)
                .addClass('heater__name');
            
            
            // Rotated rectangle
            let heaterIconRect = this._el.rect(30, 30)
                .move(this._data.x,this._data.y)
                .rotate(-45, this._data.x + 40, this._data.y + 10)
                .addClass('heater__icon');

            // Line down
            let heaterLine1 = this._el.polyline('0,0 0,21')
                .addClass('heater__icon')
                .move(26 + this._data.x, 10 + this._data.y)
                .marker('end', 6, 6, function(add) {
                    add.path("M 0 0 L 6 3 L 0 6 z")
                        .move(-3, 0);
                });

            // Line up
            let heaterLine2 = this._el.polyline('0,21 0,0')
                .addClass('heater__icon')
                .move(26 + this._data.x, 32 + this._data.y)
                .marker('end', 6, 6, function(add) {
                    add.path("M 0 0 L 6 3 L 0 6 z")
                        .move(-3, 0);
                });

            // Set state style
            switch(this._data.state)
            {
                case 0:
                    heaterIconRect = heaterIconRect.addClass('heater_off');
                    break;

                case 1:
                    heaterIconRect = heaterIconRect.addClass('heater_on');
                    break;

                case 2:
                    heaterIconRect = heaterIconRect.addClass('heater_alarm');
                    break;

            }

        }
    }

    // export
    window.HeaterWidget = HeaterWidget;

})();