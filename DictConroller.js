export default class DictConroller {

    #lang='en'

    #dictionary = 
    {
        'en':{
            'cargo': "Cargo",
            'fuel': "Fuel",
            'shunting':"Maneuverability",
            'strength':"Strength",
            'authdialog':"please authorize!\n\nthis will allow you to save achievements and progress in the game.\n\nas well as continue the game on another device."
        },
        'ru':{
            'cargo': "Груз",
            'fuel': "Топливо",
            'shunting':"Маневренность",
            'strength':"Прочность",
            'authdialog':"пожалуйста авторизируйте!\n\nэто позволить сохранить достижения и прогресс в игре.\n\nа так же продолжить игру на другом устройстве."
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
