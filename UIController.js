export class UISelectCargo {

    //level parametrs
    #listPriceSelectCargoByLevel;


    #UISelectCargoFirstPosition = {
        oj1:[139,59],
        oj2:[22,23],
        oj3:[168,36.5],
        oj4:[176,20],
        oj5:[315,43]
    }

    #UISelectCargoOffset = 116;
    #colorTextYelloHide = [0.7490196078431373, 0.7490196078431373, 0.2509803921568627];
    #colorTextYello = [1,1,0];
    #select_point;

    #selectLevel;

    globalRuntime
    playerConfig
    levelConfig
    gameConfig

    gameController

    constructor(gameController) {
        this.globalRuntime = gameController.runtime
        this.playerConfig = gameController.playerConfig
        this.gameConfig = gameController.GameConfig
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
        text_element.width = 360;
        text_element.horizontalAlign = "center";
        text_element.text = String(value);

        let offset = 0;
        if (String(value).length == 1)
            offset = 27
        else if(String(value).length<3)
            offset = (String(value).length*17)
        else if(String(value).length<4)
            offset = (String(value).length*15)
        else 
            offset = (String(value).length*12)
        
        this.globalRuntime.objects.Money.createInstance(0, 180+offset, 313);
        
        let buttom_element = this.globalRuntime.objects.UIMainButton.createInstance(0,180,380);
        buttom_element.instVars.Type = 3;
        buttom_element.setAnimation('en')
        buttom_element.animationFrame = 4;
        
    }

    /* и показ и начисление*/ 
    createEndTotal()
    {
        let cargoCount = 0;
        let cargoPrice = 0;
        if(this.levelConfig.levelStatus == "end_success")
        {
            const title = this.globalRuntime.objects.UITextTitle.getFirstInstance();
            title.text = this.gameController.dict('successful_mission');
            cargoCount = 1;
            cargoPrice = this.gameController.levelConfig.getMoneyCargo();
        } else {
            const title = this.globalRuntime.objects.UITextTitle.getFirstInstance();
            title.text = this.gameController.dict('mission_failed');

        }
        
        let i = 0;
        let total = 0;
        let totalObj;
        let self = this;
        this.globalRuntime.objects.UIText.getAllInstances().forEach(function(element) {
            i++;
            switch(element.uid)
            {
                case 411:
                    element.text = cargoCount + " x";
                    break;
                case 401:
                    element.text = "x " + cargoPrice;
                    break;
                case 402:
                    element.text = String(self.gameController.levelConfig.sumCargo(cargoPrice));
                    break;
                case 399:
                    element.text = self.gameConfig.listBonusPrice['1'] + " x";
                    break;
                case 403:
                    element.text = "x " + self.gameController.levelConfig.listBonus['1'];
                    break;
                case 381:
                    element.text = String(self.gameController.levelConfig.sumBonus(1));
                    break;
                case 314:
                    element.text =  self.gameConfig.listBonusPrice['2'] + " x";
                    break;
                case 362:
                    element.text = "x " + (self.gameController.levelConfig.listBonus['2']);
                    break;
                case 398:
                    element.text = String(self.gameController.levelConfig.sumBonus(2));
                    break;
                case 404:
                    element.text =  self.gameConfig.listBonusPrice['3'] + " x";
                    break;
                case 405:
                    element.text = "x " + (self.gameController.levelConfig.listBonus['3']);
                    break;
                case 410:
                    element.text = String(self.gameController.levelConfig.sumBonus(3));
                    break;
                case 413:
                    element.text =  self.gameConfig.listBonusPrice['4'] + " x";
                    break;
                case 414:
                    element.text = "x " + (self.gameController.levelConfig.listBonus['4']);
                    break;
                case 415:
                    element.text = String(self.gameController.levelConfig.sumBonus(4));
                    break;
                case 406:
                    totalObj = element;
                    break;
                case 407:
                    element.text = String(self.gameController.dict('total'));
                    break;

            }
        });
        totalObj.text = String(this.gameController.levelConfig.getTotal());
    }

    shipUpdate()
    {
        //Заголовок
        let self = this;
        
        this.globalRuntime.getInstanceByUid(8).text = this.#numberWithSpaces(this.gameController.playerConfig.money);

        const but = this.globalRuntime.getInstanceByUid(18);
        but.setAnimation(this.gameController.Language)
        but.animationFrame = 5;

        this.globalRuntime.getInstanceByUid(8).text = this.#numberWithSpaces(this.gameController.playerConfig.money);
        this.globalRuntime.objects.Text.getAllInstances().forEach(function(element) {
            element.text = "";
            switch(element.uid)
            {
                case 301:
                    element.text =  self.gameController.dict('cargo') + ": " + self.#numberWithSpaces(self.gameController.ship.maxMassCargo);
                    break;
                case 312:
                    element.text =  self.gameController.dict('fuel') + ": " + self.#numberWithSpaces(self.gameController.ship.maxFuel);
                    break;
                case 313:
                    element.text =  self.gameController.dict('shunting') + ": " + self.#numberWithSpaces(self.gameController.ship.currentShuntingEngine);
                    break;
                case 316:
                    element.text =  self.gameController.dict('strength') + ": " + self.#numberWithSpaces(self.gameController.ship.maxStrength);
                    break;

                case 12:
                    element.text =  self.gameController.ship.nextMassCargo>0?self.#numberWithSpaces(self.gameController.ship.nextMassCargo):self.gameController.dict('max');
                    break;
                case 5:
                    element.text =  self.gameController.ship.nextFuel>0?self.#numberWithSpaces(self.gameController.ship.nextFuel):self.gameController.dict('max');
                    break;
                case 13:
                    element.text =  self.gameController.ship.nextShuntingEngine>0?self.#numberWithSpaces(self.gameController.ship.nextShuntingEngine):self.gameController.dict('max');
                    break;
                case 14:
                    element.text =  self.gameController.ship.nextStrength>0?self.#numberWithSpaces(self.gameController.ship.nextStrength):self.gameController.dict('max');
                    break;
            }
        });

        this.globalRuntime.objects.UpdatePrice.getAllInstances().forEach(function(element) {
            element.text = "";
            switch(element.uid)
            {
                case 7:
                    if (self.gameController.ship.priceUpdateMassCargo>0)
                        element.text = self.#numberWithSpaces(self.gameController.ship.priceUpdateMassCargo)
                    else
                        self.globalRuntime.getInstanceByUid(6).destroy();
                    break;
                case 17:
                    if (self.gameController.ship.priceUpdateFuel>0)
                        element.text = self.#numberWithSpaces(self.gameController.ship.priceUpdateFuel)
                    else
                        self.globalRuntime.getInstanceByUid(15).destroy();
                    break;
                case 20:
                    if (self.gameController.ship.priceUpdateShuntingEngine>0)
                        element.text = self.#numberWithSpaces(self.gameController.ship.priceUpdateShuntingEngine)
                    else
                        self.globalRuntime.getInstanceByUid(19).destroy();
                    break;
                case 10:
                    if (self.gameController.ship.priceUpdateStrength>0)
                        element.text = self.#numberWithSpaces(self.gameController.ship.priceUpdateStrength)
                    else
                        self.globalRuntime.getInstanceByUid(9).destroy();
                    break;
            }
        });

        this.globalRuntime.objects.UpdateShipPanel.getAllInstances().forEach(function(element) {
            switch(element.uid)
            {
                case 275:
                    element.animationFrame = self.gameController.ship.levelMassCargo;
                    break;
                case 253:
                    element.animationFrame = self.gameController.ship.levelFuel;
                    break;
                case 231:
                    element.animationFrame = self.gameController.ship.levelShuntingEngine;
                    break;
                case 209:
                    element.animationFrame = self.gameController.ship.levelStrength;
                    break;
            }
        });
        //this.runtime.getObjectByUID(uid)
    }

    authDialog()
    {
        this.globalRuntime.getInstanceByUid(44).text = this.gameController.dict('authdialog');

        let buttom_element = this.globalRuntime.getInstanceByUid(42);
        buttom_element.setAnimation(this.gameController.Language)
        buttom_element.animationFrame = 6;

        buttom_element = this.globalRuntime.getInstanceByUid(43);
        buttom_element.setAnimation(this.gameController.Language)
        buttom_element.animationFrame = 4;

    }

    beginDialog()
    {
        this.globalRuntime.getInstanceByUid(77).text = this.gameController.dict('begin_gialog');
        this.globalRuntime.getInstanceByUid(46).text = this.gameController.dict('begin_but');
        let buttom_element = this.globalRuntime.getInstanceByUid(36);
        buttom_element.setAnimation(this.gameController.Language)
        buttom_element.animationFrame = 6;
    }

    #numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    #createUISelectCargoElement(weight, price, i=0)
    {
        let is_hide_element=false
        if(weight>this.playerConfig.currentShip.maxMassCargo)
        {
            is_hide_element=true
        } else {
            this.globalRuntime.getInstanceByUid(298).y = 600;
        }
            

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