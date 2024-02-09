

export default class PlayerConfig {
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

	serializeObject() {
		console.log(this);
        return JSON.stringify(this);
    }

    static deserializeObjectPlaer(obj)
	{
        return new this(obj);
    }
}