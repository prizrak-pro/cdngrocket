

export default class Functions {

    static classMap = {
        PlayerConfig: PlayerConfig,
    }

    static deserializeObjectPlayer = (string) => {
        let obj = JSON.parse(string)
        return new classMap[obj.className](JSON.parse(obj));
    }
}