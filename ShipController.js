export default class Ship {

	#_coefMainPower = 48;
	#_coefShuntingPower = 12;
	#_consumptionEngine = 0.0002;

	#_levelShip = 0;
	//#_coefMainEngine = [1.8, 1.7, 1.6, 1.5, 1.4, 1.2];
	#_coefMainEngine = [1.8, 1.7, 1.6, 1.5, 1.4, 1.2];
	#_maxMass=[200, 400, 600, 800, 1000, 1200];
	#_priceLevelShip=[400, 4000, 12000, 28000, 44000];
	#_massCargo=0;

	#_levelShuntingEngine = 0;
	//#_coefShuntingEngine = [6.6, 6.2, 5.8, 5.4, 5, 4.6];
	#_coefShuntingEngine = [4.6, 5, 5.4, 5.8, 6.2, 6.6];
	#_priceLevelShuntingEngine=[600, 6000, 18000, 32000, 48000];

	#_levelFuel = 0;
	#_maxFuel = [2000, 4000, 6000, 8000, 10000, 12000];
	#_priceLevelFuel=[500, 5000, 16000, 60000, 46000];
	#_fuel = 0;

	#_levelStrength = 0;
	#_massShip = [700, 900, 1000, 1100, 1200, 1400];
	#_maxStrength = [150, 200, 250, 300, 350, 400];
	#_priceLevelStrength=[800, 8000, 20000, 34000, 50000];
	#_strength = 0

	#_massCoefficient = 0.46;

	#_powerMain;
	#_powerShunting;

	constructor(shop_config) {
		this.#_levelShip = shop_config.levelMass;
		this.#_levelFuel = shop_config.levelFuel;
		this.#_levelShuntingEngine = shop_config.levelShuntingEngine;
		this.#_levelStrength = shop_config.levelStrength;

		// this.#_fuel = fuel;
		// this.#_levelShip = level;
		// this.#_massCargo = massCargo;
		
		this.#_powerMain = this.calcPowerMain();
		this.#_powerShunting = this.calcPowerShunting();
	}
	
	calcPowerMain(){
		return Math.round( (this.#_massShip[this.#_levelStrength]+this.#_maxMass[this.#_levelShip]+(this.#_maxFuel[this.#_levelFuel]/100))/100 * this.#_coefMainPower * this.#_coefMainEngine[this.#_levelShip] );
	}
	
	calcPowerShunting(){
		return Math.round( (this.#_massShip[this.#_levelStrength]+this.#_maxMass[this.#_levelShip]+this.#_maxFuel[this.#_levelFuel]/100)/100*this.#_coefShuntingPower*this.#_coefShuntingEngine[this.levelShuntingEngine] );
	}
	
	get powerMain(){
		return Math.round(this.#_powerMain);
	}
	
	get powerShunting(){
		return Math.round(this.#_powerShunting);
	}
	
	get massShip(){
		return this.#_massShip[this.#_levelStrength]*this.#_massCoefficient+this.#_massCargo*this.#_massCoefficient+Math.round(this.#_fuel/100)*this.#_massCoefficient;
	}
	
	get massCargo(){
		return this.#_massCargo;
	}
	
	get maxMassCargo(){
		return this.#_maxMass[this.#_levelShip];
	}

	get fuel(){
		return Math.round(this.#_fuel);
	}
	
	get maxFuel(){
		return this.#_maxFuel[this.#_levelFuel];
	}
	
	set massCargo(value){
		if (value>this.maxMassCargo)
			this.#_massCargo = this.maxMassCargo;

		this.#_massCargo = value;
	}

	set fuel(value){
		this.#_fuel += value;
		if (this.#_fuel > this.maxFuel)
			this.#_fuel = this.maxFuel;
	}

	get strength(){
		return this.#_strength;
	}

	get maxStrength(){
		return this.#_maxStrength[this.#_levelStrength];
	}

	repairFull(){
		this.#_strength = this.#_maxStrength[this.#_levelStrength];
	}

	damage(value){
		this.#_strength -= value;
		return (this.#_strength > 0)?true:false;
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

	//Update ship
	get nextMassCargo()
	{
		if (this.#_levelShip == 5)
			return 0;
		return this.#_maxMass[this.#_levelShip+1];
	}
	get levelMassCargo()
	{
		return this.#_levelShip;
	}
	get priceUpdateMassCargo()
	{
		if (this.#_levelShip == 5)
			return 0;
		return this.#_priceLevelShip[this.#_levelShip];
	}

	get currentShuntingEngine()
	{	
		return this.#_coefShuntingEngine[this.levelShuntingEngine];
	}
	get nextShuntingEngine()
	{
		if (this.levelShuntingEngine == 5)
			return 0;
		return this.#_coefShuntingEngine[this.levelShuntingEngine+1];
	}
	get levelShuntingEngine()
	{
		let level = 5-(this.#_levelShip-this.#_levelShuntingEngine);
		return (level>5)?5:level;
	}
	get priceUpdateShuntingEngine()
	{
		if (this.levelShuntingEngine == 5)
			return 0;
		return this.#_priceLevelShuntingEngine[this.#_levelShuntingEngine];
	}

	get nextFuel()
	{
		if (this.#_levelFuel == 5)
			return 0;
		return this.#_maxFuel[this.#_levelFuel+1];
	}
	get levelFuel()
	{
		return this.#_levelFuel;
	}
	get priceUpdateFuel()
	{
		if (this.#_levelFuel == 5)
			return 0;
		return this.#_priceLevelFuel[this.#_levelFuel];
	}

	get nextStrength()
	{
		if (this.#_levelStrength == 5)
			return 0;
		return this.#_maxStrength[this.#_levelStrength+1];
	}
	get levelStrength()
	{
		return this.#_levelStrength;
	}
	get priceUpdateStrength()
	{
		if (this.#_levelStrength == 5)
			return 0;
		return this.#_priceLevelStrength[this.#_levelStrength];
	}
}