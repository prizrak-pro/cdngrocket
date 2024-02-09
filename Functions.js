

export default class Functions {

    static classMap = {
        PlayerConfig: PlayerConfig,
    }

    static deserializeObjectPlaer = (string) => {
        let obj = JSON.parse(string)
        return new classMap[obj.className](JSON.parse(obj));
    }
}