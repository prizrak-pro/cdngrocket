export default class DictConroller {

    #lang='en'

    #dictionary = 
    {
        'en':{
            'cargo': "Cargo",
            'fuel': "Fuel",
            'shunting':"Maneuverability",
            'strength':"Strength"
        },
        'ru':{
            'cargo': "Груз",
            'fuel': "Топливо",
            'shunting':"Маневренность",
            'strength':"Прочность"
        }
    }

	constructor(lang = 'en') {
        this.#lang = lang;
	}
    dict(value){
        return this.#dictionary[this.#lang][value];
    }

    get Language()
    {
        return this.#lang;
    }

}
