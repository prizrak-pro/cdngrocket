export default class Ship {

	#_levelShop = 0;
	#_coefMainEngine = [1.02, 1.04, 1.06, 1.1, 1.02, 1.002];
	#_maxMass=[200, 400, 600, 800, 1000, 1200];

	#_levelShuntingEngine = 0;
	#_coefShuntingEngine = [1.06, 1.1, 1.4, 1.8, 2, 2.4];

	#_levelFuel = 0;
	#_maxFuel = [1000, 2000, 4000, 6000, 8000, 12000];
	#_fuel = 0;

	#_coefMainPower = 30;
	#_coefShuntingPower = 4;
	#_consumptionEngine = 0.0028;

	#_levelStrength = 0;
	#_massShip = [800, 900, 1000, 1100, 1200, 1400];
	#_strengthShip = [100, 200, 300, 400, 600, 800];
	
	#_massCargo=0;
	

	#_powerMain;
	#_powerShunting;

	constructor(fuel, massCargo=200, level=0) {
		this.#_fuel = fuel;
		this.#_levelShop = level;
		this.#_massCargo = massCargo;
		
		this.#_powerMain = this.calcPowerMain();
		this.#_powerShunting = this.calcPowerShunting();
	}
	
	calcPowerMain(){
		return Math.round( (this.#_massShip+this.#_maxMass[this.#_levelShop]+this.#_fuel/100)/100*this.#_coefMainPower*this.#_coefMainEngine[this.#_levelShop] );
	}
	
	calcPowerShunting(){
		return Math.round( (this.#_massShip+this.#_maxMass[this.#_levelShop]+this.#_fuel/100)/100*this.#_coefShuntingPower*this.#_coefShuntingEngine[this.#_levelShuntingEngine] );
	}
	
	get powerMain(){
		return Math.round(this.#_powerMain);
	}
	
	get powerShunting(){
		return Math.round(this.#_powerShunting);
	}
	
	get massShip(){
		return this.#_massShip+this.#_massCargo+(this.#_fuel/100);
	}
	
	get massCargo(){
		this.#_massCargo;
	}
	
	set massCargo(value){
		this.#_massCargo = value;
	}

	get maxMassCargo(){
		this.#_massCargo;
	}

	get fuel(){
		return  Math.round(this.#_fuel);
	}
	
	set fuel(value){
		this.#_fuel += value;
		if (this.#_fuel > this.maxFuel)
			this.#_fuel = this.maxFuel;
	}

	get maxFuel(){
		this.#_maxFuel[this.#_levelFuel];
	}

	set level(value){
		this.#_levelShop = value;
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