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
    controlMainPower(run=false)
    {
        if(run) {
			this.#_shipVisual.behaviors.physics.applyForce(0, -1*PlayShip.powerMain);
			this.#_shipVisual.behaviors.physics.isImmovable=false;
			const Fire = this.runtime.objects.Fire.getFirstInstance();
			Fire.setAnimation("1", "beginning");
			this.fuelConsumptionMainEngine();
            this.globalVar.instVars.powerMain1 = 1;
        } else {
            const Fire = this.runtime.objects.Fire.getFirstInstance();
			Fire.setAnimation("2", "beginning");
            this.globalVar.instVars.powerMain1 = 0;
        }
    }

    //задаю временные параметры
    addVisualObjectShip(value)
    {
        this.#_shipVisual = value;
    }

    setUIMainGames(value)
    {
        this.#_uiMainGame = value;
    }
}