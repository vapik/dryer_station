"use strict";

class DryerPIDiagram {

    constructor(options)
    {
        this._el = options.el;
        this._data = options.data;

        this.render();

        this._initEvents();
    }


    /**
     * Инициализация
     * @private
     */
    _initEvents() {
        this._el.addEventListener('click', this._onClick.bind(this));
    }

    /**
     * Обработка кликов
     * @param {Event} event
     * @private
     */
    _onClick(event) {
        event.preventDefault();

        let target = event.target;

    //    TODO: Доделать

    }










}

