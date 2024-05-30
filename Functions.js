

export default class Functions {

    static classMap = {
        PlayerConfig: PlayerConfig,
    }

    static deserializeObjectPlayer = (string) => {
        let obj = JSON.parse(string)
        return new classMap[obj.className](JSON.parse(obj));
    }

    static isEmptyObject(obj) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    }
}