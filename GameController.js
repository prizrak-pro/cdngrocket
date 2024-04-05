export default class GameController {

    runtime;
    #_ship;
    playerConfig;
    levelConfig;




    constructor() {

	}

    get ship() {
		return this.#_ship;
	}
	set ship(_ship) {
		this.#_ship = _ship;
	}

    

}