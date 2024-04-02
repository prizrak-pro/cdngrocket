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

    constructor(runtime, playerConfig, levelConfig) {
        this.globalRuntime = runtime
        this.playerConfig = playerConfig
        this.gameConfig = playerConfig.GameConfig
        this.levelConfig = levelConfig
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

    createdUIModalTransfMoney()
    {
        let overflow_element = this.globalRuntime.objects.ModalWindowOverflow.createInstance(0,180,320);
        overflow_element.width = 360;
        overflow_element.height = 640;
        let title_element = this.globalRuntime.objects.UITextTitle.createInstance(0,0,180);
        title_element.text = "вы получили!!!";

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