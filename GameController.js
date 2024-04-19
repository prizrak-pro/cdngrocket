export default class GameController {

    runtime;
    #_ship;
    playerConfig;
    levelConfig;

    GameConfig;
    LevelConfig;


    constructor(LevelConfig, GameConfig) {
        this.LevelConfig = LevelConfig;
        this.GameConfig = GameConfig;
	}

    get ship() {
		return this.#_ship;
	}
	set ship(_ship) {
		this.#_ship = _ship;
	}

    mouseDownMainPage(e)
    {
        const currentLayer = this.runtime.layout.getLayer(0);
        const mouseXYAr = currentLayer.cssPxToLayer(e.clientX, e.clientY, 0);
        const sprites = this.runtime.objects.MainButtonUI.getAllInstances();
        if(sprites[0].containsPoint(mouseXYAr[0], mouseXYAr[1])){
            this.runtime.goToLayout("SelectLevel")
        }
    }

    mouseDownSelectLevel(e)
    {
        const currentLayer = this.runtime.layout.getLayer(0);
        const mouseXYAr = currentLayer.cssPxToLayer(e.clientX, e.clientY, 0);
        const sprites = this.runtime.objects.btnSelectLevel.getAllInstances();
        const buttonUI = this.runtime.objects.MainButtonUI.getAllInstances();
        
        if(buttonUI[0].containsPoint(mouseXYAr[0], mouseXYAr[1])){
            console.log("Update Ship");
        }
        
        for(var i = 0; i < sprites.length; i++) {
            if(sprites[i].containsPoint(mouseXYAr[0], mouseXYAr[1])){
                this.levelConfig = new this.LevelConfig(sprites[i].instVars.level);
                if (this.levelConfig.level <= this.playerConfig.maxOpenLevel)
                    this.runtime.goToLayout("SelectCargoLevel")	
            }
        }
    }

    mouseDownSelectCargoLevel(e)
    {
        const currentLayer = this.runtime.layout.getLayer(0);
        const mouseXYAr = currentLayer.cssPxToLayer(e.clientX, e.clientY, 0);
        
        
        const btnStart = this.runtime.objects.MainButtonUI.getAllInstances()[0];
        if(btnStart.containsPoint(mouseXYAr[0], mouseXYAr[1])){
            this.runtime.goToLayout("Level"+this.levelConfig.level)
            return;
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

    setUIButton(level)
    {
        switch(level)
        {
            case 1:
                const but1 = this.runtime.objects.MainButtonUI.getFirstInstance();
                but1.setAnimation(this.Language)
                but1.animationFrame = 0;
            case 2:
                const but2 = this.runtime.objects.MainButtonUI.getFirstInstance();
                but2.setAnimation(this.Language)
                but2.animationFrame = 1;
            case 3:
                const but3 = this.runtime.objects.MainButtonUI.getFirstInstance();
                but3.setAnimation(this.Language)
                but3.animationFrame = 2;
        }
    }

    get Language()
	{
		this.GameConfig.listLanguage[this.playerConfig.currentLanguage];
	}

}