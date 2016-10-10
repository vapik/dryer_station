"use strict";

class MainMenu {
    constructor(options)
    {
        this._el = options.el;

        this.render();
        this._initEvents();
    }

    /**
     * Подписываемся на событие
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

        // Перейти на главный экран
        if (target.matches('.main-menu-list__main'))
        {
            let openMainWindowEvent = new CustomEvent("OpenMainWindow", {
                bubbles: true
            });

            this._el.dispatchEvent(openMainWindowEvent);
        }

        // Перейти на экран настроек
        if (target.matches('.main-menu-list__setting'))
        {
            let openSettingsWindowEvent = new CustomEvent("OpenSettingsWindow", {
                bubbles: true
            });

            this._el.dispatchEvent(openSettingsWindowEvent);
        }

    }

    render() {
        this._el.innerHTML = `
            <ul class="main-menu-list w3-navbar w3-black">
                <li><a class="main-menu-list__main tablink">Главное окно</a></li>
                <li><a class="main-menu-list__setting tablink">Настройки</a></li>
            </ul>`;
    }


}


