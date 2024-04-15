export class UISelectCargo {

    //level parametrs
    #listPriceSelectCargoByLevel;


    #UISelectCargoFirstPosition = {
        oj1:[139,59],
        oj2:[24,23],
        oj3:[166,36.5],
        oj4:[176,20],
        oj5:[315,43]
    }

    #UISelectCargoOffset = 116;
    #colorTextYelloHide = [0.7490196078431373, 0.7490196078431373, 0.2509803921568627];
    #colorTextYello = [1,1,0];
    #select_point;

    #selectLevel

    globalRuntime
    playerConfig
    levelConfig
    gameConfig

    gameController

    constructor(gameController) {
        this.globalRuntime = gameController.runtime
        this.playerConfig = gameController.playerConfig
        this.gameConfig = gameController.playerConfig.GameConfig
        this.levelConfig = gameController.levelConfig
        this.gameController = gameController;
    }

    get Level()
    {
        return this.#selectLevel;
    }

    set Level(value)
    {
        this.#selectLevel = value;
    }

    get listPriceSelectCargoByLevel() {
		return this.#listPriceSelectCargoByLevel;
	}
	set listPriceSelectCargoByLevel(_listPriceSelectCargoByLevel) {
		this.#listPriceSelectCargoByLevel = _listPriceSelectCargoByLevel;
	}

    createUISelectCargoLevel()
    {
        this.gameConfig.cargoLevel[this.levelConfig.level].forEach(function(element, index) {
            this.#createUISelectCargoElement(element[0],element[1],index);
        }, this);
    }

    createdUIModalTransfMoney(value)
    {
        value = 20;
        let overflow_element = this.globalRuntime.objects.ModalWindowOverflow.createInstance(0,180,320);
        overflow_element.width = 360;
        overflow_element.height = 640;

        let image_element = this.globalRuntime.objects.UIImages.createInstance(0,180,200);
        image_element.animationFrame = 1
        image_element.width = 180;
        image_element.height = 87;
        
        // let title_element = this.globalRuntime.objects.UITextTitle.createInstance(0,0,180);
        // title_element.text = "вы получили!!!";
        
        // let text_element = this.globalRuntime.objects.UIText.createInstance(0,180,285);
        // text_element.sizePt = 22;
        // text_element.text = '1000';
        // this.globalRuntime.objects.Money.createInstance(0,210,292);

        const text_element = this.globalRuntime.objects.UITextTitle.createInstance(0, 0, 290);
        text_element.text = String(value);

        let offset = 0;
        if(String(value).length<3)
        {
            offset = (String(value).length*15)
        } else {
            offset = (String(value).length*12)
        }
        this.globalRuntime.objects.Money.createInstance(0, 180+offset, 313);
        
        let buttom_element = this.globalRuntime.objects.MainButtonUI.createInstance(0,180,380);
        buttom_element.instVars.Type = 3;
        buttom_element.setAnimation('en')
        buttom_element.animationFrame = 4;
        
    }

    #createUISelectCargoElement(weight, price, i=0)
    {
        let is_hide_element=false
        if(weight>this.playerConfig.currentShip.maxMassCargo)
            is_hide_element=true

        let create_element;
        let position_oj = this.#setPositionSelectCargoFirstPosition('oj1',i);
        create_element = this.globalRuntime.objects.displayCargoWeight.createInstance(0,position_oj.x,position_oj.y)
        if(is_hide_element) {
            create_element.animationFrame = 1;
        }

        position_oj = this.#setPositionSelectCargoFirstPosition('oj2',i);
        create_element = this.globalRuntime.objects.textCargoWeight.createInstance(0,position_oj.x,position_oj.y);
        create_element.text = weight+'T';
        if(is_hide_element) {
            create_element.fontColor = this.#colorTextYelloHide;
        }

        position_oj = this.#setPositionSelectCargoFirstPosition('oj3',i);
        create_element = this.globalRuntime.objects.Money.createInstance(0,position_oj.x,position_oj.y)
        if(is_hide_element) {
            create_element.setAnimation("0");
        }

        position_oj = this.#setPositionSelectCargoFirstPosition('oj4',i);
        create_element = this.globalRuntime.objects.textCargoPrice.createInstance(0,position_oj.x,position_oj.y);
        create_element.text = price.toString();
        if(is_hide_element) {
            create_element.fontColor = this.#colorTextYelloHide;
        }

        position_oj = this.#setPositionSelectCargoFirstPosition('oj5',i);
        create_element = this.globalRuntime.objects.btnSelectCargoWeight.createInstance(0,position_oj.x,position_oj.y)
        create_element.instVars.IndexElement = i;
        this.gameController.levelConfig.numberMassCargo = i;
        create_element.animationFrame = 0;
        if(is_hide_element) {
            create_element.animationFrame = 2;
        }else{
            if(this.#select_point)
                this.#select_point.animationFrame = 0;
            create_element.animationFrame = 1;
            this.#select_point = create_element;
        }
    }

    #setPositionSelectCargoFirstPosition(element, offset=0)
    {
        return {x:this.#UISelectCargoFirstPosition[element][0],y:this.#UISelectCargoFirstPosition[element][1]+this.#UISelectCargoOffset*offset};
    }

}