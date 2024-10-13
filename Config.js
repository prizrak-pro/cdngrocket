export class PlayerConfig {
	#maxOpenLevel = 3;

	#money = 0;

	#ship = {
		type: 0,
		levelMass: 0,
		levelFuel: 0,
		levelShuntingEngine: 0,
		levelStrength: 0
	};

	#currentShip;

	#showHelpMobile = true;
	#showHelpDesktop = true;

	constructor(obj)
	{
		if(obj){
			this.#maxOpenLevel = obj.maxOpenLevel;
			this.#money = obj.money;
			this.#ship = obj.ship;

			this.#showHelpMobile = obj.showHelpMobile;
			this.#showHelpDesktop = obj.showHelpDesktop;
		}
	}

	get HelpMobile()
	{
		if(this.#showHelpMobile){
			this.#showHelpMobile = false;
			return true;
		}
		return false;
	}

	get HelpDesktop()
	{
		if(this.#showHelpDesktop){
			this.#showHelpDesktop = false;
			return true;
		}
		return false;
	}

	get maxOpenLevel() {
		return this.#maxOpenLevel;
	}
	set maxOpenLevel(_maxOpenLevel) {
		this.#maxOpenLevel = _maxOpenLevel;
	}

	get money() {
		return this.#money;
	}
	set money(_money) {
		this.#money += _money;
	}

	get currentShip() {
		return this.#currentShip;
	}
	set currentShip(_currentShip) {
		this.#currentShip = _currentShip;
	}

	isShowHelp(mobile=false)
	{
		if(mobile)
			return this.#showHelpMobile;
		return this.#showHelpDesktop;
	}

	shownHelp(mobile=false)
	{
		if(mobile)
			this.#showHelpMobile = true;
		else
			this.#showHelpDesktop = true;
	}

	updateMassCargo() {
		if(this.#currentShip.priceUpdateMassCargo > 0 && this.#money >= this.#currentShip.priceUpdateMassCargo)
		{
			this.#money -= this.#currentShip.priceUpdateMassCargo;
			if(this.#money >=0 )
			{
				this.#ship.levelMass++;
				return true;				
			}
		}
		return false;
	}

	updateFuel() {
		if(this.#currentShip.priceUpdateFuel > 0 && this.#money >= this.#currentShip.priceUpdateFuel)
		{
			this.#money -= this.#currentShip.priceUpdateFuel;
			if(this.#money >=0 )
			{
				this.#ship.levelFuel++;
				return true;				
			}
		}
		return false;
	}

	updateFuel() {
		if(this.#currentShip.priceUpdateFuel > 0 && this.#money >= this.#currentShip.priceUpdateFuel)
		{
			this.#money -= this.#currentShip.priceUpdateFuel;
			if(this.#money >=0 )
			{
				this.#ship.levelFuel++;
				return true;				
			}
		}
		return false;
	}

	updateShuntingEngine() {
		if(this.#currentShip.priceUpdateShuntingEngine > 0 && this.#money >= this.#currentShip.priceUpdateShuntingEngine)
		{
			this.#money -= this.#currentShip.priceUpdateShuntingEngine;
			if(this.#money >=0 )
			{
				this.#ship.levelShuntingEngine++;
				return true;				
			}
		}
		return false;
	}

	updateStrength() {
		if(this.#currentShip.priceUpdateStrength > 0 && this.#money >= this.#currentShip.priceUpdateStrength)
		{
			this.#money -= this.#currentShip.priceUpdateStrength;
			if(this.#money >=0 )
			{
				this.#ship.levelStrength++;
				return true;				
			}
		}
		return false;
	}

	creatShip(classShip)
	{
		console.log(this.#ship);
		this.#currentShip = new classShip(this.#ship);
	}

	stringSerialize() {
		let obj = {};
		obj.maxOpenLevel = this.#maxOpenLevel
		obj.money = this.#money
		obj.ship = this.#ship

		obj.showHelpMobile = this.#showHelpMobile
		obj.showHelpDesktop = this.#showHelpDesktop

		obj.className = this.constructor.name;
        //return JSON.stringify(obj);
		return obj;
    }

	static deserializeObject(obj) {
        //let obj = JSON.parse(string)
        return new PlayerConfig(obj);
    }

	

}

export class GameConfig {
	static maxLevel = 4;

	static cargoLevel = {
		1:[[600,300],[400,200],[200,100]],
        2:[[600,600],[400,400],[200,200]],
        3:[[800,700],[600,500],[400,300]],
        4:[[800,800],[600,600],[400,400]],

        5:[[800,5000],[600,1000],[400,500]],
        6:[[800,5000],[600,1000],[400,500]],
        7:[[1000,5000],[800,1000],[600,500]],
        8:[[1000,5000],[800,1000],[600,500]],
        9:[[1000,5000],[800,1000],[600,500]],
        10:[[1200,5000],[1000,1000],[800,500]],
        11:[[1200,5000],[1000,1000],[800,500]],
        12:[[1200,5000],[1000,1000],[800,501]]
	}

	static listBonusPrice = {
		1:10,
		2:20,
		3:40,
		4:60,
		5:100
	};
}

export class LevelConfig {

	level = -1;
	countCargo = -1;
	numberMassCargo = -1;

	#total = 0;

	listBonus = {
		1:0,
		2:0,
		3:0,
		4:0,
		5:0
	};

	levelStatus = 'in_process'

	constructor(level)
	{
		this.level = level;
	}

	addBonus(type) {
		this.listBonus[type]++;
	}

	sumBonus(type) {
		 let s = this.listBonus[type]*GameConfig.listBonusPrice[type];
		 this.#total += s;
		 return s;
	}

	sumCargo(sum) {
		this.#total += sum;
		return sum;
   }

	getTotal()
	{
		return this.#total;
	}

	increase3Total()
	{
		this.#total*=3;
	}

	getTotalZero()
	{
		const total = this.#total;
		this.#total = 0;
		return total;
	}

	getMoneyCargo()
	{
		return GameConfig.cargoLevel[this.level][this.numberMassCargo][0];
	}
}