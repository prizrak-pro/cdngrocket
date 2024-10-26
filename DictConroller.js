export default class DictConroller {

    #lang='en'

    #dictionary = 
    {
        'en':{
            'cargo': "Cargo",
            'fuel': "Fuel",
            'shunting':"Maneuverability",
            'strength':"Strength",
            'authdialog':"please authorize!\n\nthis will allow you to save achievements and progress in the game.\n\nas well as continue the game on another device.",
            'control': "control",
            'maneuversLR':"maneuvers\n\nleft - right",
            'maneuvers':"- maneuvers",
            'main_thrust_up':"main thrust\n\nup",
            'main_thrust':"- main thrust",
            'successful_mission':"successful mission",
            'mission_failed':"mission failed",
            'max':"max",
            'total':"total",
            'begin_gialog':"do you want to start the level from the last platform you landed on?",
            'begin_but':"begin"
        },
        'ru':{
            'cargo': "Груз",
            'fuel': "Топливо",
            'shunting':"Маневренность",
            'strength':"Прочность",
            'authdialog':"пожалуйста авторизируйте!\n\nэто позволить сохранить достижения и прогресс в игре.\n\nа так же продолжить игру на другом устройстве.",
            'control': "управление",
            'maneuversLR':"маневры\n\nвлево - вправо",
            'maneuvers':"- маневры",
            'main_thrust_up':"главная тяга\n\nвверх",
            'main_thrust':"- главная тяга",
            'successful_mission':"успешная миссия",
            'mission_failed':"миссия провалена",
            'max':"макс",
            'total':"общий",
            'begin_gialog':"хотите начать уровень с последней платформы, на которой вы приземлились?",
            'begin_but':"начать"
        }
    }

	constructor(lang = 'en') {
        switch(lang) {
            case "be":
            case "kk":
            case "uk":
            case "uz":
            case "ru":
                lang = 'ru';
                break;
            default:
                lang = 'en'; 
        }
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
