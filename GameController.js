export default class GameController {

    #_runtime;
    #_ship;
    #_playerConfig;
    #_levelConfig;




    constructor(runtime, playerConfig) {
		this.#_runtime = runtime;
        this.#_playerConfig = playerConfig;
	}

    get runtime() {
		return this.#_runtime;
	}
	set runtime(_runtime) {
		this.#_runtime = _runtime;
	}

    get ship() {
		return this.#_ship;
	}
	set ship(_ship) {
		this.#_ship = _ship;
	}

    get playerConfig() {
		return this.#_playerConfig;
	}
	set playerConfig(_playerConfig) {
		this.#_playerConfig = _playerConfig;
	}

    get levelConfig() {
		return this.#_levelConfig;
	}
	set levelConfig(_levelConfig) {
		this.#_levelConfig = _levelConfig;
	}

    

}