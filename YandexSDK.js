export class YandexSDC {

    #controlActivation = false;


    constructor(control = false)
    {
        console.log(this.#controlActivation);
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
			console.log(ysdk)
			window.ysdk = ysdk;
			//yaInitFlag = true;
            this.#controlActivation = true;
            console.log(this.#controlActivation)
		});
    }

    async #expectationInitSDK()
    {
        let self = this;
        console.log(this.#controlActivation)
        setTimeout(function f() {
            //console.log(self.#controlActivation)
            if(self.#controlActivation) {
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
