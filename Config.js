export class PlayerConfig {
	#maxOpenLevel = 1;

	#selectLevel = -1;	


	#ship = {
		type: 1,
		levelMass: 0,
		levelFuel: 0,
		levelEfficiency: 0,
		levelManeuver: 0,
		levelStrength: 0
	};

	constructor(obj)
	{
		if(obj){
			this.#maxOpenLevel = obj.maxOpenLevel;
			this.#selectLevel = obj.selectLevel;
			this.#ship = obj.ship
		}
	}

	get maxOpenLevel() {
		return this.maxOpenLevel;
	}
	set maxOpenLevel(_maxOpenLevel) {
		this.maxOpenLevel = _maxOpenLevel;
	}

	stringSerialize() {
		let obj = {};
		obj.maxOpenLevel = this.#maxOpenLevel
		obj.selectLevel = this.#selectLevel
		obj.ship = this.#ship
		obj.className = this.constructor.name;
        return JSON.stringify(obj);
    }

	static deserializeObject(string) {
        let obj = JSON.parse(string)
        return new PlayerConfig(obj);
    }
}

export class GameConfig {
	static maxLevel = 12;
}