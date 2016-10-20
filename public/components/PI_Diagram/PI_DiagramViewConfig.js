(function () {

    "use strict";

    let PI_DiagramViewConfig = {
        arrowDataList: new Set(),
        pipeDataList: new Set(),
        valveDataList: new Set(),
        valve4wayDataList: new Set(),
        tankDataList: new Set(),
        fanDataList: new Set(),
        heaterDataList: new Set(),
        relayDataList: new Set(),
        sensorDataList: new Set()
    };

// Стрелки направления движения потока
    PI_DiagramViewConfig.arrowDataList
        .add({
        rotation: 0,
        x: 6, y: 22
    })
        .add({
            rotation: 0,
            x: 787, y: 188
        })
        .add({
            rotation: 90,
            x: 207, y: 264
        })
        .add({
            rotation: 180,
            x: 815, y: 427
        });

// Трубы

    PI_DiagramViewConfig.pipeDataList
        .add({
        state: 0,
        coords: [[30, 30], [200, 30], [200, 70]]
    })
        .add({
            state: 0,
            coords: [[187, 85], [55, 85], [55, 125]]
        })
        .add({
            state: 0,
            coords: [[217, 85], [318, 85], [318, 125]]
        })
        .add({
            state: 0,
            coords: [[200, 90], [200, 170]]
        })
        .add({
            state: 0,
            coords: [[200, 200], [200, 260]]
        })
        .add({
            state: 0,
            coords: [[200, 90], [200, 130], [127, 130], [127, 170]]
        })
        .add({
            state: 0,
            coords: [[127, 200], [127, 230], [200, 230], [200, 260]]
        })
        .add({
            state: 0,
            coords: [[55, 255], [55, 371], [185, 371]]
        })
        .add({
            state: 0,
            coords: [[318, 255], [318, 330], [200, 330], [200, 360]]
        })
        .add({
            state: 0,
            coords: [[218, 370], [390, 370], [390, 195], [785, 195]]
        })
        .add({
            state: 0,
            coords: [[200, 388], [200, 421], [497, 421]]
        })
        .add({
            state: 0,
            coords: [[535, 421], [680, 421]]
        })
        .add({
            state: 0,
            coords: [[710, 421], [790, 421]]
        })
        .add({
            state: 0,
            coords: [[567, 195], [567, 240]]
        })
        .add({
            state: 0,
            coords: [[567, 273], [567, 421], [535, 421]]
        })
        .add({
            state: 0,
            coords: [[638, 195], [638, 240]]
        })
        .add({
            state: 0,
            coords: [[638, 273], [638, 421], [535, 421]]
        })
        .add({
            state: 0,
            coords: [[470, 421], [470, 486], [558, 486], [558, 421]]
        });

// Клапана
    PI_DiagramViewConfig.valveDataList
        .add({
        name: "BK1", type: 1, x: 120, y: 170, state: false
    })
        .add({
            name: "BK2", type: 1, x: 192, y: 170, state: false
        })
        .add({
            name: "BK3", type: 1, x: 560, y: 240, state: false
        })
        .add({
            name: "BK4", type: 1, x: 630, y: 240, state: false
        })
        .add({
            name: "BK5", type: 0, x: 680, y: 368, state: true
        });

// 4х ходовые клапана
    PI_DiagramViewConfig.valve4wayDataList
        .add({
        name: "ЧПК1-1",
        type: 1,
        state: true,
        x: 185, y: 60
    })
        .add({
            name: "ЧПК1-2",
            type: 2,
            state: true,
            x: 185, y: 345
        });

// Колонны
    PI_DiagramViewConfig.tankDataList
        .add({
            name: "КОЛОННА 1",
            timer: "00:34:55",
            state: 5,
            x: 10, y: 125})
        .add({
            name: "КОЛОННА 2",
            timer: "00:34:55",
            state: 2,
            x: 275, y: 125});

// Нагнетатели
    PI_DiagramViewConfig.fanDataList
        .add({
            name: "H1", x: 720, y: 385, state: 1
    });

// Нагреватели
    PI_DiagramViewConfig.heaterDataList
        .add({
        name: "VP1", x: 490, y: 390, state: 1
    });

// Дискретные датчики
    PI_DiagramViewConfig.relayDataList
        .add({
        name: "PDT", x: 500, y: 455, state: 2
    });

// Аналоговые датчики
    PI_DiagramViewConfig.sensorDataList
        .add({
        name: "Роса",
        maxValue: -20,
        minValue: 0,
        value: -10,
        eu: "C",
        x: 390, y: 25
    })
        .add({
            name: "P сброс",
            maxValue: 1000,
            minValue: 0,
            value: 250,
            eu: "кПа",
            x: 450, y: 25
        })
        .add({
            name: "t сброс",
            maxValue: 250,
            minValue: 0,
            value: 100,
            eu: "C",
            x: 510, y: 25
        })
        .add({
            name: "t возд.",
            maxValue: 250,
            minValue: 0,
            value: 90,
            eu: "C",
            x: 570, y: 25
        })
        .add({
            name: "t нагр.",
            maxValue: 250,
            minValue: 0,
            value: 200,
            eu: "C",
            x: 630, y: 25
        });


    // export
    window.PI_DiagramVieConfig = PI_DiagramViewConfig;

})();