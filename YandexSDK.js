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
        //return this.isActivation;
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
        if(!this.isActivation)
            return false;
        window.ysdk.getPlayer().then(_player => {
            window.player = _player;
        });
        await new Promise((resolve, reject) => {
            setTimeout(async function f() {
                if(typeof window.player !== "undefined") {

                    console.log(window.player.getMode());
                    if (window.player.getMode() === 'lite') {
                        // Игрок не авторизован.
                        await window.ysdk.auth.openAuthDialog().then(() => {
                                
                                console.log('Игрок успешно авторизован');
                                
                            }).catch(() => {
                                console.log('Игрок не авторизован');
                                
                            });
                    }

                    resolve(1)
                } else {
                    setTimeout(f, 1); 
                }
            }, 1);
        });
        return 1;
    }

    async initPlayerTest() 
    {
        if(!this.isActivation)
            return false;

        window.player = await window.ysdk.getPlayer()
        if (!this.isAuth) {
            await window.ysdk.auth.openAuthDialog().then(() => {
                    console.log('Игрок успешно авторизован');
                }).catch(() => {
                    console.log('Игрок не авторизован');
                });
        } 
        
        return 1;
    }

    get isAuth()
    {
        if(!this.isActivation)
            return false;

        return window.player.getMode() !== 'lite';
    }

    async setData(obj={})
    {
        let result = false;
        if(!this.isActivation || !this.isAuth)
            return result;

        await window.player.setData(obj, true).then(() => {
            result = true; 
        });

        return result;
    }

    async getData(keys=[])
    {
        let result = false;
        if(!this.isActivation || !this.isAuth)
            return result;

        await window.player.getData(keys).then(_data => {
            result = _data; 
        });

        return result;
    }

    async setStats(obj={})
    {
        let result = false;
        if(!this.isActivation || !this.isAuth)
            return result;

        await window.player.setStats(obj).then(() => {
            result = true; 
        });

        return result;
    }

    async getStats(keys=[])
    {
        let result = false;
        if(!this.isActivation || !this.isAuth)
            return result;

        await window.player.getStats(keys).then(_data => {
            result = _data; 
        });

        return result;
    }
    
}
