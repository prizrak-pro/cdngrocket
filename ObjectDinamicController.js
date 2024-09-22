export default class ObjectDinamicController {

    #runtime;

    #point = {
        61:{type:'line', points:[[155.5,56],[155.5,184]], position:1},
        68:{type:'line', points:[[283.5,56],[283.5,184]], position:1},
        69:{type:'line', points:[[427.5,56],[427.5,232]], position:1},
        70:{type:'line', points:[[515.5,56],[515.5,232]], position:1},

        89:{type:'cicle', points:[[600,520],[752,520]], position:1},
        90:{type:'cicle', points:[[984,520],[832,520]], position:1},
        91:{type:'cicle', points:[[410,376],[710,376]], position:1},
        92:{type:'cicle', points:[[1170,376],[870,376]], position:1},

        110:{type:'cicle', points:[[728,1520],[728,1936]], position:1},
        109:{type:'cicle', points:[[552,1520],[552,1936]], position:1},
        108:{type:'cicle', points:[[376,1392],[376,1824]], position:1},
        107:{type:'cicle', points:[[200,1520],[200,1936]], position:1},
        129:{type:'cicle', points:[[456,415],[904,415]], position:1},
        130:{type:'cicle', points:[[456,385],[904,385]], position:0},
        131:{type:'cicle', points:[[456,190],[904,190]], position:1},
        132:{type:'cicle', points:[[456,225],[904,225]], position:0}
    }

    #level_element = {
        2:[61,68,69,70],
        3:[89,90,91,92],
        4:[110,109,108,107,129,130,131,132]
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
                this.startElements(level);
                break;
            case 4:
                this.startElements(level);
                break;
                //let inst = this.#runtime.getInstanceByUid(35)
                //console.log(inst);

        
                //this.moveTo(inst);
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
