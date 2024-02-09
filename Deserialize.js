export default class Deserialize {

    static classMap = {
        'PlayerConfig': PlayerConfig
    }

    static deserializeObject(string) {
        let obj = JSON.parse(string)
        return new Functions.classMap[obj.className](obj);
    }
}