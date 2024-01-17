export class UISelectCargo {

    //level parametrs
    #listPriceSelectCargoByLevel = {
        1:[[800,5000],[400,1000],[200,500]],
        2:[[800,5000],[400,1000],[200,500]],
        3:[[800,5000],[400,1000],[200,500]],
        4:[[800,5000],[400,1000],[200,500]],
        5:[[800,5000],[400,1000],[200,500]],
        6:[[800,5000],[400,1000],[200,500]],
        7:[[800,5000],[400,1000],[200,500]],
        8:[[800,5000],[400,1000],[200,500]],
        9:[[800,5000],[400,1000],[200,500]],
        10:[[800,5000],[400,1000],[200,500]],
        11:[[800,5000],[400,1000],[200,500]],
        12:[[800,5000],[400,1000],[200,500]]
    }

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

    #selectLevel

    globalRuntime

    constructor(runtime) {
        this.globalRuntime = runtime
    }

    get Level()
    {
        return this.#selectLevel;
    }

    set Level(value)
    {
        this.#selectLevel = value;
    }

    createUISelectCargoLevel()
    {
        this.#listPriceSelectCargoByLevel[this.#selectLevel].forEach(function(element, index) {
            this.#createUISelectCargoElement(element[0],element[1],index);
            
        });
    }

    #createUISelectCargoElement(weight, price, i=0, is_hide_element=false)
    {
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
        }	
    }

    #setPositionSelectCargoFirstPosition(element, offset=0)
    {
        return {x:this.#UISelectCargoFirstPosition[element][0],y:this.#UISelectCargoFirstPosition[element][1]+this.#UISelectCargoOffset*offset};
    }

}