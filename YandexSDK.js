export class YandexSDC {

    #controlActivation = false;

    #platform = 'mobile';

    constructor(control = false)
    {
        this.#controlActivation = control;
    }

    async init()
    {
        if (this.#controlActivation)
        {
            this.#addYandexSDK(); 
            await this.#expectationInitSDK()
        }
        return this.isActivation;
    }

    get isActivation()
    {
        if(typeof window.ysdk !== "undefined") 
            return true
        return false;
    }

    get isMobile()
    {
        if(this.#platform == 'mobile')
            return true;
        return false;
    }

    set Mobile(value)
    {
        this.#platform = value
    }

    #addYandexSDK(d = document) {
        var t = d.getElementsByTagName('script')[0];
        var s = d.createElement('script');
        s.src = 'https://yandex.ru/games/sdk/v2';
        s.async = false;
        t.parentNode.insertBefore(s, t);
       	s.onload = this.#initSDK;
    }

    #initSDK() {
        YaGames
		.init()
		.then(ysdk => {
			console.log('Yandex SDK initialized');
			window.ysdk = ysdk;
		});
    }

    async #expectationInitSDK()
    {
        await new Promise((resolve, reject) => {
            setTimeout(function f() {
                if(typeof window.ysdk !== "undefined") {
                    resolve(1)
                } else {
                    setTimeout(f, 1); 
                }
            }, 1);
        });
        return 1;

    }

    async initPlayer() {
        window.ysdk.getPlayer().then(_player => {
            window.player = _player;
        });
        await new Promise((resolve, reject) => {
            setTimeout(function f() {
                if(typeof window.player !== "undefined") {
                    resolve(1)
                } else {
                    setTimeout(f, 1); 
                }
            }, 1);
        });
        return 1;
    }
}
