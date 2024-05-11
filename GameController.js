export default class GameController {

    runtime;
    #_dict;
    playerConfig;
    levelConfig;
    yandexSDC;
    globalVar;
    
    GameConfig;
    #LevelConfig;
    #DictConroller;
    #PlayerConfig;
    #Ship;

    //временные
    #_shipVisual;
    #_uiMainGame;
    #_powerState = [false, false, false];
    #_mobButUi = [null, null, null];
    #_engine_shutdown = true;

    constructor(LevelConfig, GameConfig, DictConroller, PlayerConfig, Ship) {
        this.#LevelConfig = LevelConfig;
        this.GameConfig = GameConfig;
        this.#DictConroller = DictConroller;
        this.#PlayerConfig = PlayerConfig;
        this.#Ship = Ship;
	}

    init(runtime, yandexSDC, globalVar)
    {
        this.runtime = runtime;
        this.yandexSDC = yandexSDC;
        this.globalVar = globalVar;

        this.playerConfig = new this.#PlayerConfig();
        this.playerConfig.creatShip(this.#Ship);

        this.#_dict = new this.#DictConroller();
    }

    get ship() {
		return this.playerConfig.currentShip;
	}
	set ship(_ship) {
        this.playerConfig.currentShip = _ship;
	}

    dict(value)
    {
        return this.#_dict.dict(value);
    }

    get Language()
	{
        return this.#_dict.Language;
	}

    get Money()
    {
        return this.playerConfig.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    mouseDownMainPage(e)
    {
        const currentLayer = this.runtime.layout.getLayer(0);
        const mouseXYAr = currentLayer.cssPxToLayer(e.clientX, e.clientY, 0);
        const sprites = this.runtime.objects.UIMainButton.getAllInstances();
        if(sprites[0].containsPoint(mouseXYAr[0], mouseXYAr[1])){
            this.runtime.goToLayout("SelectLevel")
        }
    }

    mouseDownSelectLevel(e)
    {
        const currentLayer = this.runtime.layout.getLayer(0);
        const mouseXYAr = currentLayer.cssPxToLayer(e.clientX, e.clientY, 0);
        const sprites = this.runtime.objects.btnSelectLevel.getAllInstances();
        const buttonUI = this.runtime.objects.UIMainButton.getAllInstances();
        
        if(buttonUI[0].containsPoint(mouseXYAr[0], mouseXYAr[1])){
            this.runtime.goToLayout("UpdateShip")	
        }
        
        for(var i = 0; i < sprites.length; i++) {
            if(sprites[i].containsPoint(mouseXYAr[0], mouseXYAr[1])){
                this.levelConfig = new this.#LevelConfig(sprites[i].instVars.level);
                if (this.levelConfig.level <= this.playerConfig.maxOpenLevel)
                    this.runtime.goToLayout("SelectCargoLevel")	
            }
        }
    }

    mouseDownSelectCargoLevel(e)
    {
        const currentLayer = this.runtime.layout.getLayer(0);
        const mouseXYAr = currentLayer.cssPxToLayer(e.clientX, e.clientY, 0);
        
        
        const btnStart = this.runtime.objects.UIMainButton.getAllInstances()
        for(var i = 0; i < btnStart.length; i++) {
            if(btnStart[i].containsPoint(mouseXYAr[0], mouseXYAr[1])){
                switch(btnStart[i].instVars.Type)
                {
                    case 1:
                        this.runtime.goToLayout("Level"+this.levelConfig.level)
                        return;
                    case 2:
                        this.runtime.goToLayout("SelectLevel")
                        return;
                }
            }
        }
        
        const sprites = this.runtime.objects.btnSelectCargoWeight.getAllInstances();
        let select_cur;
        let select_new;
        for(var i = 0; i < sprites.length; i++) {
            if (sprites[i].animationFrame==1)
                select_cur = i;
            if (sprites[i].animationFrame!=2)
                sprites[i].animationFrame=0;
            if(sprites[i].containsPoint(mouseXYAr[0], mouseXYAr[1]))
                select_new = i;
            
        }
        if (sprites[select_new].animationFrame!=2) {
            sprites[select_new].animationFrame=1;
            this.levelConfig.numberMassCargo = sprites[select_new].instVars.IndexElement
        } else {
            sprites[select_cur].animationFrame=1;
            this.levelConfig.numberMassCargo = sprites[select_cur].instVars.IndexElement;
        }
            
    }

    mouseDownUpdateShip(e)
    {
        console.log('mouseDownUpdateShip');
        const currentLayer = this.runtime.layout.getLayer(0);
        const mouseXYAr = currentLayer.cssPxToLayer(e.clientX, e.clientY, 0);
        const sprites = this.runtime.objects.UIMainButton.getAllInstances();
        
        for(var i = 0; i < sprites.length; i++) {
            if(sprites[i].containsPoint(mouseXYAr[0], mouseXYAr[1])){
                switch(sprites[i].instVars.Type)
                {
                    case 1:
                        if (this.playerConfig.updateMassCargo())
                            this.playerConfig.creatShip(this.#Ship);
                        break;
                    case 2:
                        if (this.playerConfig.updateFuel())
                            this.playerConfig.creatShip(this.#Ship);
                        break;
                    case 3:
                        if (this.playerConfig.updateShuntingEngine())
                            this.playerConfig.creatShip(this.#Ship);
                        break;
                    case 4:
                        if (this.playerConfig.updateStrength())
                            this.playerConfig.creatShip(this.#Ship);
                        break;
                    case 5:
                        this.runtime.goToLayout("SelectLevel")
                        break;
                        
                }

                if(sprites[i].instVars.Type != 5)
                    this.runtime.goToLayout("UpdateShip");
            }
        }
    }



    setUIButton(level)
    {
        switch(level)
        {
            case 1:
                const but1 = this.runtime.objects.UIMainButton.getFirstInstance();
                but1.setAnimation(this.Language)
                but1.animationFrame = 0;
                break;
            case 2:
                const but2 = this.runtime.objects.UIMainButton.getFirstInstance();
                but2.setAnimation(this.Language)
                but2.animationFrame = 1;
                break;
            case 3:
                let but = this.runtime.getInstanceByUid(298)
                but.setAnimation(this.Language)
                but.animationFrame = 2;

                but = this.runtime.getInstanceByUid(21)
                but.setAnimation(this.Language)
                but.animationFrame = 5;
                break;
            case 4:
                let self = this;
                this.runtime.objects.UIMainButton.getAllInstances().forEach(function(element) {
                    if(element.uid == 422)
                    {
                        element.setAnimation(self.Language)
                        element.animationFrame = 3;
                    }
                });
                break;
        }
    }

    //работа с визуалом корабля
    allStopAnim()
    {
        const Fire = this.runtime.objects.Fire.getFirstInstance();
        const FireMiniLeft = this.runtime.objects.FireMiniLeft.getFirstInstance();
        const FireMiniRight = this.runtime.objects.FireMiniRight.getFirstInstance();
        Fire.stopAnimation();
        FireMiniLeft.stopAnimation();
        FireMiniRight.stopAnimation();
    }

    setParametrsShip()
    {
        this.#_shipVisual.instVars.PowerMainEngine = this.playerConfig.currentShip.powerMain;
        this.#_shipVisual.instVars.PowerShuntingEngine = this.playerConfig.currentShip.powerShunting;
        this.playerConfig.currentShip.repairFull();
        this.#_powerState = [false, false, false];
        this.massCalculation();
    }

    massCalculation()
    {
        this.#_shipVisual.behaviors.physics.density = this.playerConfig.currentShip.massShip;
        this.#_uiMainGame.setFuel(this.playerConfig.currentShip.fuel);
    }

    fuelConsumptionMainEngine()
    {
        this.playerConfig.currentShip.fuelConsumptionMainEngine();
        this.massCalculation();
    }

    fuelConsumptionShuntingEngine()
    {
        this.playerConfig.currentShip.fuelConsumptionShuntingEngine();
        this.massCalculation();
    }

    //двигатель
    controlPower(main, left, right)
    {
        if(main || this.#_powerState[0]) {
            this.controlMainPower(main)
            this.#_powerState[0] = main;
        }

        if(left || this.#_powerState[1]) {
            this.controlShuntingPowerL(left)
            this.#_powerState[1] = left;
        }
        
        if(right || this.#_powerState[2]) {
            this.controlShuntingPowerR(right)
            this.#_powerState[2] = right;
        }
        
    }

    controlMainPower(run=false)
    {
        if(run) {
            if(!this.#_engine_shutdown)
                return;
			this.#_shipVisual.behaviors.physics.applyForce(0, -1*this.playerConfig.currentShip.powerMain);
			this.#_shipVisual.behaviors.physics.isImmovable=false;
			const Fire = this.runtime.objects.Fire.getFirstInstance();
			Fire.setAnimation("1", "beginning");
			this.fuelConsumptionMainEngine();
            this.globalVar.instVars.powerMain1 = (this.globalVar.instVars.powerMain1==0)?2:this.globalVar.instVars.powerMain1;

            this.#_mobButUi[0].animationFrame = 1;
        } else {
            const Fire = this.runtime.objects.Fire.getFirstInstance();
			Fire.setAnimation("2", "beginning");
            this.globalVar.instVars.powerMain1 = (this.globalVar.instVars.powerMain1==1)?3:this.globalVar.instVars.powerMain1;

            this.#_mobButUi[0].animationFrame = 0;
        }
    }

    controlShuntingPowerR(run=false)
    {
        if(run) {
            if(!this.#_engine_shutdown)
                return;
            this.#_shipVisual.behaviors.physics.applyForce(-1*this.playerConfig.currentShip.powerShunting, 0);
			const FireMiniRight = this.runtime.objects.FireMiniRight.getFirstInstance();
			FireMiniRight.setAnimation("1", "beginning");
			this.fuelConsumptionShuntingEngine();
            this.globalVar.instVars.powerShuntingR1 = (this.globalVar.instVars.powerShuntingR1==0)?2:this.globalVar.instVars.powerShuntingR1;

            this.#_mobButUi[1].animationFrame = 1;
        } else {
			const FireMiniRight = this.runtime.objects.FireMiniRight.getFirstInstance();
			FireMiniRight.setAnimation("2", "beginning");
            this.globalVar.instVars.powerShuntingR1 = (this.globalVar.instVars.powerShuntingR1==1)?3:this.globalVar.instVars.powerShuntingR1;

            this.#_mobButUi[1].animationFrame = 0;
        }
    }

    controlShuntingPowerL(run=false)
    {
        if(run) {
            if(!this.#_engine_shutdown)
                return;
            this.#_shipVisual.behaviors.physics.applyForce(this.playerConfig.currentShip.powerShunting, 0);
			const FireMiniLeft = this.runtime.objects.FireMiniLeft.getFirstInstance();
			FireMiniLeft.setAnimation("1", "beginning");
			this.fuelConsumptionShuntingEngine();
            this.globalVar.instVars.powerShuntingL1 = (this.globalVar.instVars.powerShuntingL1==0)?2:this.globalVar.instVars.powerShuntingL1;

            this.#_mobButUi[2].animationFrame = 1;
        } else {
			const FireMiniLeft = this.runtime.objects.FireMiniLeft.getFirstInstance();
			FireMiniLeft.setAnimation("2", "beginning");
            this.globalVar.instVars.powerShuntingL1 = (this.globalVar.instVars.powerShuntingL1==1)?3:this.globalVar.instVars.powerShuntingL1;

            this.#_mobButUi[2].animationFrame = 0;
        }
    }

    actionEngineShutdown(delay)
    {
        this.#_engine_shutdown = false;
        this.controlPower(false, false, false);
        let self = this;
        setTimeout(self.#runEngineShutdown, delay*1000, self);
    }

    #runEngineShutdown(self)
    {
        self.#_engine_shutdown = true;
    }

    //задаю временные параметры
    addVisualObjectShip(value)
    {
        this.#_shipVisual = value;

        const Fire = this.runtime.objects.Fire.getFirstInstance();
        Fire.x = this.#_shipVisual.x
        Fire.y = this.#_shipVisual.y+60;

        const FireMiniLeft = this.runtime.objects.FireMiniLeft.getFirstInstance();
        FireMiniLeft.x = this.#_shipVisual.x-32
        FireMiniLeft.y = this.#_shipVisual.y+15;

        const FireMiniRight = this.runtime.objects.FireMiniRight.getFirstInstance();
        FireMiniRight.x = this.#_shipVisual.x+32
        FireMiniRight.y = this.#_shipVisual.y+15;


        const LandingFireLeft = this.runtime.objects.LandingFireLeft.getFirstInstance();
        LandingFireLeft.x = this.#_shipVisual.x-30;
        LandingFireLeft.y = this.#_shipVisual.y+13;

        const LandingFireRight = this.runtime.objects.LandingFireRight.getFirstInstance();
        LandingFireRight.x = this.#_shipVisual.x+30;
        LandingFireRight.y = this.#_shipVisual.y+13;


        const Collision = this.runtime.objects.Collision.getFirstInstance();
        Collision.x = this.#_shipVisual.x;
        Collision.y = this.#_shipVisual.y;
    }

    setUIMainGames(value)
    {
        this.#_uiMainGame = value;
        this.getMobUIButton();
    }

    getMobUIButton()
    {
        this.#_mobButUi = [this.runtime.objects.BtnUP.getFirstInstance(), this.runtime.objects.BtnLeft.getFirstInstance(), this.runtime.objects.BtnRight.getFirstInstance()];
    }

    //Help Mobil
    showElementHelpMobile()
    {
        let elem;
        elem = this.runtime.objects.Help_Blackout.createInstance(1,185,507);
        elem.width = 400;
        elem.height = 80;
        
        elem = this.runtime.objects.Help_1.createInstance(1,0,470);
        elem.fontFace = "minecraft-ten-font-cyrillic"
        elem.fontColor = [1,1,1,1];
        elem.sizePt = 8;
        elem.horizontalAlign = "center"
        elem.width = 360;
        elem.height = 20;
        elem.text = "управление";

        elem = this.runtime.objects.Help_2.createInstance(1,10,500);
        elem.fontFace = "minecraft-ten-font-cyrillic"
        elem.fontColor = [1,1,1,1];
        elem.sizePt = 8;
        elem.horizontalAlign = "center"
        elem.width = 120;
        elem.height = 45;
        elem.text = "маневры\n\nвлево - вправо";

        elem = this.runtime.objects.Help_3.createInstance(1,242,500);
        elem.fontFace = "minecraft-ten-font-cyrillic"
        elem.fontColor = [1,1,1,1];
        elem.sizePt = 8;
        elem.horizontalAlign = "center"
        elem.width = 120;
        elem.height = 45;
        elem.text = "главная тяга\n\nвверх";

        this.addEventHelpDestroy();
    }

    destroyHelpMobile()
    {
        console.log("destroyHelpMobile")
        let helpVar = this.runtime.objects.Help_1.getFirstInstance();
        if (helpVar)
        {
            helpVar.destroy();
            helpVar = this.runtime.objects.Help_2.getFirstInstance();
            helpVar.destroy();
            helpVar = this.runtime.objects.Help_3.getFirstInstance();
            helpVar.destroy();
            helpVar = this.runtime.objects.Help_Blackout.getFirstInstance();
            helpVar.destroy();
        }

    }

    OnDownHelpDestroy(self)
    {
        self.destroyHelpMobile();
        self.removeEventHelpDestroy();
    }

    addEventHelpDestroy()
    {
        let self = this;
        this.runtime.addEventListener("mousedown", () => this.OnDownHelpDestroy(self));
        this.runtime.addEventListener("pointerdown", () => this.OnDownHelpDestroy(self));
        this.runtime.addEventListener("keydown", () => this.OnDownHelpDestroy(self));
    }

    removeEventHelpDestroy()
    {
        let self = this;
        this.runtime.removeEventListener("mousedown", () => this.OnDownHelpDestroy(self));
        this.runtime.removeEventListener("pointerdown", () => this.OnDownHelpDestroy(self));
        this.runtime.removeEventListener("keydown", () => this.OnDownHelpDestroy(self));
    }
}