export default class LocalStorage {

    get(key) {
        try{
            JSON.parse(localStorage.getItem(key));
        }
        catch(e) {
            return localStorage.getItem(key);
        }
    }

    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
