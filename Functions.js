export default class Functions {
	static serializeObject(obj) {
        return JSON.parse(JSON.stringify(rook));
    }

    static deserializeObjectPlaer = (obj) => {
        return new Rook(obj);
    }
}