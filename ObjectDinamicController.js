export default class ObjectDinamicController {

    #runtime;

    #_dict;
    playerConfig;
    levelConfig;
    yandexSDC;
    globalVar;
    
    Functions
    GameConfig;
    UISelectCargo;
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

    #point = {points:[[80,800],[80,1000]], position:0};

    constructor(runtime) {
        this.#runtime = runtime;
    }

    init(level)
    {
        switch(level)
        {
            case 3:
                console.log(level);
                let inst = this.#runtime.getInstanceByUid(35)
                inst.behaviors.ДвижениеК.addEventListener("arrived", e =>
                {
                    console.log(e.instance.uid);
                    let inst = this.#runtime.getInstanceByUid(e.instance.uid)
                    this.moveTo(inst);
                });
        
                this.moveTo(inst);
                break;
        }


    }

    moveTo(inst)
    {
        if(this.#point.position == this.#point.points.length-1)
            this.#point.position=0;
        else
            this.#point.position++; 

            console.log(this.#point.position);
            console.log(this.#point.points[this.#point.position]);

        inst.effects[0].isActive = false;
        inst.behaviors.ДвижениеК.moveToPosition(this.#point.points[this.#point.position][0], this.#point.points[this.#point.position][1]);
    }

}
