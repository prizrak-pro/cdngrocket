export default class GameController {

    runtime;
    #_ship;
    playerConfig;
    levelConfig;




    constructor() {

	}

    get ship() {
		return this.#_ship;
	}
	set ship(_ship) {
		this.#_ship = _ship;
	}

    mouseDownMainPage(e)
    {
        const currentLayer = this.runtime.layout.getLayer(0);
        const mouseXYAr = currentLayer.cssPxToLayer(e.clientX, e.clientY, 0);
        const sprites = this.runtime.objects.MainButtonUI.getAllInstances();
        if(sprites[0].containsPoint(mouseXYAr[0], mouseXYAr[1])){
            this.runtime.goToLayout("SelectLevel")
        }
    }

}