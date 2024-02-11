export default class Ship {

	#_levelShip = 0;
	#_coefMainEngine = [1.02, 1.04, 1.06, 1.1, 1.02, 1.002];
	#_maxMass=[200, 400, 600, 800, 1000, 1200];

	#_levelShuntingEngine = 0;
	#_coefShuntingEngine = [1.06, 1.1, 1.4, 1.8, 2, 2.4];

	#_levelFuel = 0;
	#_maxFuel = [1000, 2000, 4000, 6000, 8000, 12000];
	#_fuel = 0;

	#_coefMainPower = 30;
	#_coefShuntingPower = 4;
	#_consumptionEngine = 0.0022;

	#_levelStrength = 0;
	#_massShip = [800, 900, 1000, 1100, 1200, 1400];
	#_strengthShip = [100, 200, 300, 400, 600, 800];
	
	#_massCargo=0;
	

	#_powerMain;
	#_powerShunting;

	constructor(shop_config) {
		this.#_levelShip = shop_config.levelMass;
		this.#_levelFuel = shop_config.levelFuel;
		this.#_levelShuntingEngine = shop_config.levelManeuver;
		this.#_levelStrength = shop_config.levelStrength;

		// this.#_fuel = fuel;
		// this.#_levelShip = level;
		// this.#_massCargo = massCargo;
		
		this.#_powerMain = this.calcPowerMain();
		this.#_powerShunting = this.calcPowerShunting();
	}
	
	calcPowerMain(){
		return Math.round( (this.#_massShip[this.#_levelStrength]+this.#_maxMass[this.#_levelShip]+this.#_fuel/100)/100*this.#_coefMainPower*this.#_coefMainEngine[this.#_levelShip] );
	}
	
	calcPowerShunting(){
		return Math.round( (this.#_massShip[this.#_levelStrength]+this.#_maxMass[this.#_levelShip]+this.#_fuel/100)/100*this.#_coefShuntingPower*this.#_coefShuntingEngine[this.#_levelShuntingEngine] );
	}
	
	get powerMain(){
		return Math.round(this.#_powerMain);
	}
	
	get powerShunting(){
		return Math.round(this.#_powerShunting);
	}
	
	get massShip(){
		return this.#_massShip[this.#_levelStrength]+this.#_massCargo+Math.round(this.#_fuel/100);
	}
	
	get massCargo(){
		this.#_massCargo;
	}
	
	get maxMassCargo(){
		return this.#_maxMass[this.#_levelShip];
	}

	get fuel(){
		return  Math.round(this.#_fuel);
	}
	
	get maxFuel(){
		this.#_maxFuel[this.#_levelFuel];
	}
	
	set massCargo(value){
		if (value>this.maxMassCargo)
		this.#_massCargo = this.maxMassCargo;
	}

	set fuel(value){
		this.#_fuel += value;
		if (this.#_fuel > this.maxFuel)
			this.#_fuel = this.maxFuel;
	}

	fullFuelUp()
	{
		this.#_fuel = this.maxFuel;
	}

	fuelConsumptionMainEngine()
	{
		this.#_fuel -= this.#_consumptionEngine * this.#_powerMain;
	}

	fuelConsumptionShuntingEngine()
	{
		this.#_fuel -= this.#_consumptionEngine * this.#_powerShunting;
	}
}