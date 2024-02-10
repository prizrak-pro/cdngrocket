export class PlayerConfig {
	#maxOpenLevel = 1;

	#selectLevel = -1;	

	#money = 0;

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
			this.#money = obj.money;
			this.#ship = obj.ship
		}
	}

	get selectLevel() {
		return this.#selectLevel;
	}
	set selectLevel(_selectLevel) {
		this.#selectLevel = _selectLevel;
	}

	get maxOpenLevel() {
		return this.#maxOpenLevel;
	}
	set maxOpenLevel(_maxOpenLevel) {
		this.#maxOpenLevel = _maxOpenLevel;
	}

	get money() {
		return this.money;
	}
	set money(_money) {
		this.money =+ _money;
	}

	stringSerialize() {
		let obj = {};
		obj.maxOpenLevel = this.#maxOpenLevel
		obj.money = this.#money
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

	static cargoLevel = {
		1:[[600,400],[400,200],[200,100]],
        2:[[600,600],[400,400],[200,200]],
        3:[[600,750],[400,500],[200,250]],
        4:[[800,5000],[600,1000],[400,600]],
        5:[[800,5000],[600,1000],[400,500]],
        6:[[800,5000],[600,1000],[400,500]],
        7:[[1000,5000],[800,1000],[600,500]],
        8:[[1000,5000],[800,1000],[600,500]],
        9:[[1000,5000],[800,1000],[600,500]],
        10:[[1200,5000],[1000,1000],[800,500]],
        11:[[1200,5000],[1000,1000],[800,500]],
        12:[[1200,5000],[1000,1000],[800,501]]
	}
}