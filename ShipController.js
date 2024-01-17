export default class Ship {

	#_levelMain = 0;

	#_coefMainEngine = [1.02, 1.04, 1.06, 1.1, 1.02, 1.002];
	#_coefShuntingEngine = [1.06, 1.1, 1.4, 1.8, 2, 2.4];
	#_maxMass=[200, 400, 600, 800, 1000, 1200]

	#_coefMainPower = 30;
	#_coefShuntingPower = 4;
	#_consumptionEngine = 0.0028;

	#_massShip = 1000;
	
	#_massCargo;
	#_fuel;

	#_powerMain;
	#_powerShunting;

	constructor(fuel, massCargo=200, level=0) {
		this.#_fuel = fuel;
		this.#_levelMain = level;
		this.#_massCargo = massCargo;
		
		this.#_powerMain = this.calcPowerMain();
		this.#_powerShunting = this.calcPowerShunting();
	}
	
	calcPowerMain(){
		return Math.round( (this.#_massShip+this.#_maxMass[this.#_levelMain]+this.#_fuel/100)/100*this.#_coefMainPower*this.#_coefMainEngine[this.#_levelMain] );
	}
	
	calcPowerShunting(){
		return Math.round( (this.#_massShip+this.#_maxMass[this.#_levelMain]+this.#_fuel/100)/100*this.#_coefShuntingPower*this.#_coefShuntingEngine[this.#_levelMain] );
	}
	
	get powerMain(){
		return Math.round(this.#_powerMain);
	}
	
	get powerShunting(){
		return Math.round(this.#_powerShunting);
	}
	
	get mass(){
		return this.#_massShip+this.#_massCargo+(this.#_fuel/100);
	}
	
	get massCargo(){
		this.#_massCargo;
	}
	
	set massCargo(value){
		this.#_massCargo = value;
	}
	
	get fuel(){
		return  Math.round(this.#_fuel);
	}
	
	set fuel(value){
		this.#_fuel = value;
	}
	
	set level(value){
		this.#_levelMain = value;
	}
	
	fuelConsumptionMainEngine()
	{
		this.#_fuel -= this.#_consumptionEngine * this.#_powerMain;
	}

	fuelConsumptionShuntingEngine()
	{
		this.#_fuel -= this.#_consumptionEngine * this.#_powerShunting;
	}
}git commit -m "$"