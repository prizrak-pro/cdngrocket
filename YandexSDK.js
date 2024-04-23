export class YandexSDC {

    static controlActivation = false;


    constructor(control = false)
    {
        if (control)
        {
            this.#addYandexSDK();
            this.#controlInitSDK();
        }    
    }

    #addYandexSDK(d = document) {
        var t = d.getElementsByTagName('script')[0];
        var s = d.createElement('script');
        s.src = 'https://yandex.ru/games/sdk/v2';
        s.async = false;
        t.parentNode.insertBefore(s, t);
       	s.onload = this.#initSDK;s
    }

    #initSDK() {
        YaGames
		.init()
		.then(ysdk => {
			console.log('Yandex SDK initialized');
			console.log(ysdk)
			window.ysdk = ysdk;
			yaInitFlag = true;
            this.constructor.controlActivation = false;
		});
    }


    async #controlInitSDK(){
		let promise = new Promise((resolve, reject) => {
            setTimeout(function f() {
                if(this.constructor.controlActivation) {
                    console.log("EDNTIME");
                    resolve(1)
                } else {
                    console.log("STARTTIME");
                    setTimeout(f, 1); 
                }
            }, 1);
          });
        await promise;
    }


}
