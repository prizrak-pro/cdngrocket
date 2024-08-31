export default class ObjectDinamicController {

    #runtime;

    #point = {
        61:{type:'line', points:[[155.5,56],[155.5,184]], position:1},
        68:{type:'line', points:[[283.5,56],[283.5,184]], position:1},
        69:{type:'line', points:[[427.5,56],[427.5,232]], position:1}
    }

    #level_element = {
        2:[61, 68, 69]
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
        let self = this;
        this.#level_element[level].forEach(function(item, index, array) {
            inst = self.#runtime.getInstanceByUid(item)
            self.addEvent(inst);
            self.moveTo(inst, true);
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

    moveTo(inst, isFirst = false)
    {
        let uid = inst.uid;
        let element_data = this.#point[uid];

        switch(element_data.type)
        {
            case 'line':
                if(!isFirst)
                {
                    inst.x = element_data.points[0][0];
                    inst.y = element_data.points[0][1];
    
                }
                element_data.position = 1;
                break;
            case 'cicle':
                if(element_data.position == element_data.points.length-1)
                    element_data.position=0;
                else
                element_data.position++; 
                break;
        }

        inst.effects[0].isActive = false;
        inst.behaviors.ДвижениеК.moveToPosition(element_data.points[element_data.position][0], element_data.points[element_data.position][1]);
    }

}
