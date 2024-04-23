export class YandexSDC {

    #controlActivation = false;


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
        setTimeout(function f() {
            if(typeof window.ysdk !== "undefined") {
                console.log("EDNTIME");
                resolve(1)
            } else {
                console.log("STARTTIME");
                setTimeout(f, 1); 
            }
        }, 1);
    }

    async #controlInitSDK(){
		// let promise = new Promise((resolve, reject) => {
        //     setTimeout(function f() {
        //         console.log(this.constructor.controlActivation)
        //         if(this.constructor.controlActivation) {
        //             console.log("EDNTIME");
        //             resolve(1)
        //         } else {
        //             console.log("STARTTIME");
        //             setTimeout(f, 1); 
        //         }
        //     }, 1);
        //   });
        let t = await this.#expectationInitSDK();
        console.log('controlInitSDK');
    }


}
