export default class ObjectDinamicController {

    #runtime;

    #point = {points:[[80,800],[80,1000]], position:0};

    constructor(runtime) {
        this.#runtime = runtime;
    }

    init(level)
    {
        switch(level)
        {
            case 3:
                
                let inst = this.#runtime.getInstanceByUid(35)
                console.log(inst);
                inst.behaviors.ДвижениеК.addEventListener("arrived", e =>
                {
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

        inst.effects[0].isActive = false;


        inst.x = this.#point.points[0][0];
        inst.y = this.#point.points[0][1];
        this.#point.position = 1;
        inst.behaviors.ДвижениеК.moveToPosition(this.#point.points[this.#point.position][0], this.#point.points[this.#point.position][1]);
    }

}
