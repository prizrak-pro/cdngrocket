export default class ObjectDinamicController {

    #runtime;

    #point = {
        61:{type:line, points:[[155.5,56],[155.5,184]], position:0}
    }

    #level_element = {
        2:[61]
    }


    constructor(runtime) {
        this.#runtime = runtime;
    }

    init(level)
    {
        switch(level)
        {
            case 2:
                this.startElements(level);
                break;
            case 3:
                
                let inst = this.#runtime.getInstanceByUid(35)
                console.log(inst);

        
                this.moveTo(inst);
                break;
        }


    }

    startElements(level)
    {
        let inst;
        this.#level_element[level].forEach(function(item, index, array) {
            inst = this.#runtime.getInstanceByUid(item)
            this.addEvent(inst);
            this.moveTo(inst);
        });
    }

    addEvent(inst)
    {
        inst.behaviors.ДвижениеК.addEventListener("arrived", e =>
        {
            let inst = this.#runtime.getInstanceByUid(e.instance.uid)
            this.moveTo(inst);
        });
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
