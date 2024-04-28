export default class UIMainGame {

    #globalRuntime;

    #line_fuel;
    #line_strength;

    #max_fuel;
    #max_strength;

    #value_fuel;
    #value_strength;


    constructor(runtime, max_fuel, max_strength) {
        this.#globalRuntime = runtime;
        this.#init();

        this.#max_fuel = this.#value_fuel = max_fuel;
        this.#max_strength = this.#value_strength = max_strength;

    }

    // 48/306 20

    // 57/315 44

    #init()
    {

        let panel_bg = this.#globalRuntime.objects.UILevelPanel.createInstance(1,177,18);
        panel_bg.animationFrame = 1

        panel_bg = this.#globalRuntime.objects.UILevelPanel.createInstance(1,186,44);
        panel_bg.animationFrame = 1

        this.#line_fuel = this.#globalRuntime.objects.UILevelPanel.createInstance(1,306,18);
        this.#line_fuel.animationFrame = 2

        this.#line_strength = this.#globalRuntime.objects.UILevelPanel.createInstance(1,57,44);
        this.#line_strength.animationFrame = 3

        let panel = this.#globalRuntime.objects.UILevelPanel.createInstance(1,180,32);
        panel.animationFrame = 0
    }

    #calculation()
    {
        let piont =  Math.round((this.#value_fuel*258)/this.#max_fuel);
        console.log(this.#max_fuel);
        this.#line_fuel.x = 48+piont;

        console.log(this.#max_strength);
        let piont_s =  Math.round((this.#value_strength*258)/this.#max_strength);
        console.log(piont_s);
        this.#line_strength.x = 315-piont_s;

    }

    setFuel(value)
    {
        this.#value_fuel = value;
        this.#calculation();
    }

    setStrength(value)
    {
        this.#value_strength = value;
        console.log(this.#value_strength);
        console.log(value);
        this.#calculation();
    }

}
