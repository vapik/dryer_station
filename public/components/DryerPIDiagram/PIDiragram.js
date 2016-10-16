"use strict";

let mainSVG = SVG('drawing').size(830, 530);

/* СТРЕЛКИ */
let arrow1SVG = mainSVG.nested();
let arrow1 = new ArrowWidget({
    el: arrow1SVG,
    data: {
        rotation: 0,
        x: 6, y: 22
    }
});

let arrow2SVG = mainSVG.nested();
let arrow2 = new ArrowWidget({
    el: arrow2SVG,
    data: {
        rotation: 0,
        x: 787, y: 188
    }
});

let arrow3SVG = mainSVG.nested();
let arrow3 = new ArrowWidget({
    el: arrow3SVG,
    data: {
        rotation: 90,
        x: 207, y: 264
    }
});

let arrow4SVG = mainSVG.nested();
let arrow4 = new ArrowWidget({
    el: arrow4SVG,
    data: {
        rotation: 180,
        x: 815, y: 427
    }
});

/* ТРУБЫ */

let pipe1SVG = mainSVG.nested();
let pipe1 = new PipeWidget({
    el: pipe1SVG,
    data: {
        state: 1,
        coords: [[30, 30], [200, 30], [200, 70]]
    }
});

let pipe2SVG = mainSVG.nested();
let pipe2 = new PipeWidget({
    el: pipe2SVG,
    data: {
        state: 2,
        coords: [[187, 85], [55, 85], [55, 125]]
    }
});

let pipe3SVG = mainSVG.nested();
let pipe3 = new PipeWidget({
    el: pipe3SVG,
    data: {
        state: 1,
        coords: [[217, 85], [318, 85], [318, 125]]
    }
});

let pipe4SVG = mainSVG.nested();
let pipe4 = new PipeWidget({
    el: pipe4SVG,
    data: {
        state: 2,
        coords: [[200, 90], [200, 170]]
    }
});

let pipe5SVG = mainSVG.nested();
let pipe5 = new PipeWidget({
    el: pipe5SVG,
    data: {
        state: 2,
        coords: [[200, 200], [200, 260]]
    }
});

let pipe6SVG = mainSVG.nested();
let pipe6 = new PipeWidget({
    el: pipe6SVG,
    data: {
        state: 0,
        coords: [[200, 90], [200, 130], [127, 130],[127, 170]]
    }
});

let pipe7SVG = mainSVG.nested();
let pipe7 = new PipeWidget({
    el: pipe7SVG,
    data: {
        state: 0,
        coords: [[127, 200], [127, 230], [200, 230], [200, 260]]
    }
});

let pipe8SVG = mainSVG.nested();
let pipe8 = new PipeWidget({
    el: pipe8SVG,
    data: {
        state: 2,
        coords: [[55, 255], [55, 371], [185, 371]]
    }
});

let pipe9SVG = mainSVG.nested();
let pipe9 = new PipeWidget({
    el: pipe9SVG,
    data: {
        state: 1,
        coords: [[318, 255], [318, 330], [200, 330], [200, 360]]
    }
});

let pipe10SVG = mainSVG.nested();
let pipe10 = new PipeWidget({
    el: pipe10SVG,
    data: {
        state: 1,
        coords: [[218, 370], [390, 370], [390, 195], [785, 195]]
    }
});

let pipe11SVG = mainSVG.nested();
let pipe11 = new PipeWidget({
    el: pipe11SVG,
    data: {
        state: 2,
        coords: [[200, 388], [200, 421], [497, 421]]
    }
});

let pipe12SVG = mainSVG.nested();
let pipe12 = new PipeWidget({
    el: pipe12SVG,
    data: {
        state: 2,
        coords: [[535, 421], [680, 421]]
    }
});

let pipe13SVG = mainSVG.nested();
let pipe13 = new PipeWidget({
    el: pipe13SVG,
    data: {
        state: 2,
        coords: [[710, 421], [790, 421]]
    }
});

let pipe14SVG = mainSVG.nested();
let pipe14 = new PipeWidget({
    el: pipe14SVG,
    data: {
        state: 0,
        coords: [[567, 195], [567, 240]]
    }
});

let pipe15SVG = mainSVG.nested();
let pipe15 = new PipeWidget({
    el: pipe15SVG,
    data: {
        state: 0,
        coords: [[567, 273], [567, 421], [535, 421]]
    }
});

let pipe16SVG = mainSVG.nested();
let pipe16 = new PipeWidget({
    el: pipe16SVG,
    data: {
        state: 0,
        coords: [[638, 195], [638, 240]]
    }
});

let pipe17SVG = mainSVG.nested();
let pipe17 = new PipeWidget({
    el: pipe17SVG,
    data: {
        state: 0,
        coords: [[638, 273], [638, 421], [535, 421]]
    }
});

let pipe18SVG = mainSVG.nested();
let pipe18 = new PipeWidget({
    el: pipe18SVG,
    data: {
        state: 0,
        coords: [[470, 421], [470, 486], [558, 486], [558, 421]]
    }
});

/* КЛАПАНА */

// BK1
let BK1_valveSVG = mainSVG.nested();
let BK1_valve = new ValveWidget({
    el: BK1_valveSVG,
    type: 1,
    data: {name: "BK1", x: 120, y: 170, state: false}
});

// BK2
let BK2_valveSVG = mainSVG.nested();
let BK2_valve = new ValveWidget({
    el: BK2_valveSVG,
    type: 1,
    data: {name: "BK2", x: 192, y: 170, state: false}
});

// BK3
let BK3_valveSVG = mainSVG.nested();
let BK3_valve = new ValveWidget({
    el: BK3_valveSVG,
    type: 1,
    data: {name: "BK3", x: 560, y: 240, state: false}
});

// BK4
let BK4_valveSVG = mainSVG.nested();
let BK4_valve = new ValveWidget({
    el: BK4_valveSVG,
    type: 1,
    data: {name: "BK4", x: 630, y: 240, state: false}
});

// BK5
let BK5_valveSVG = mainSVG.nested();
let BK5_valve = new ValveWidget({
    el: BK5_valveSVG,
    type: 0,
    data: {name: "BK5", x: 680, y: 368, state: true}
});

// 4-ходовой клапана
let valve4waySVG1 = mainSVG.nested();
let valve4way1 = new FourWayValveWidget({
    el: valve4waySVG1,
    data: {
        name: "ЧПК1-1",
        type: 1,
        state: true,
        x: 185, y: 60
    }
});

let valve4waySVG2 = mainSVG.nested();
let valve4way2 = new FourWayValveWidget({
    el: valve4waySVG2,
    data: {
        name: "ЧПК1-2",
        type: 2,
        state: true,
        x: 185, y: 345
    }
});


/* КОЛОННЫ */

// КОЛОННА 1
let tankSVG1 = mainSVG.nested();
let tank1 = new TankWidget({
    el: tankSVG1,
    data: {
        name: "КОЛОННА 1",
        timer: "00:34:55",
        state: 5,
        x: 10, y: 125
    }

});

// КОЛОННА 2
let tankSVG2 = mainSVG.nested();
let tank2 = new TankWidget({
    el: tankSVG2,
    data: {
        name: "КОЛОННА 2",
        timer: "00:34:55",
        state: 2,
        x: 275, y: 125
    }

});

// НАГНЕТАТЕЛЬ

let H1_fanSVG = mainSVG.nested();
let H1_fan = new FanWidget({
    el: H1_fanSVG,
    data: {name: "H1", x: 725, y: 385, state: 1}
});


// НАГРЕВАТЕЛЬ

let heaterSVG = mainSVG.nested();
let heater = new HeaterWidget({
    el: heaterSVG,
    data: {name: "VP1", x: 490, y: 390, state: 1}
});


// Реле давления
let PDT_relaySVG = mainSVG.nested();
let PDT_relay = new RelayWidget({
    el: PDT_relaySVG,
    data: {name: "PDT", x: 500, y: 455, state: 2}
});

/* ИНДИКАТОРЫ ДАТЧИКОВ */

// Dew point
let dewPointBarSVG = mainSVG.nested();
let dewPointBar = new SensorBarWidget({
    el: dewPointBarSVG,
    data: {
        name: "Роса",
        maxValue: -20,
        minValue: 0,
        value: -10,
        eu: "C",
        x: 390, y: 25
    }
});

// P out
let pOutSVG = mainSVG.nested();
let pOutBar = new SensorBarWidget({
    el: pOutSVG,
    data: {
        name: "P сброс",
        maxValue: 1000,
        minValue: 0,
        value: 250,
        eu: "кПа",
        x: 450, y: 25
    }
});

// t out
let tOutSVG = mainSVG.nested();
let tOutBar = new SensorBarWidget({
    el: tOutSVG,
    data: {
        name: "t сброс",
        maxValue: 250,
        minValue: 0,
        value: 100,
        eu: "C",
        x: 510, y: 25
    }
});


// t after
let tAfterSVG = mainSVG.nested();
let tAfterBar = new SensorBarWidget({
    el: tAfterSVG,
    data: {
        name: "t возд.",
        maxValue: 250,
        minValue: 0,
        value: 90,
        eu: "C",
        x: 570, y: 25
    }
});

// t heater
let tHeaterSVG = mainSVG.nested();
let tHeaterBar = new SensorBarWidget({
    el: tHeaterSVG,
    data: {
        name: "t нагр.",
        maxValue: 250,
        minValue: 0,
        value: 200,
        eu: "C",
        x: 630, y: 25
    }
});


