export default class LocalStorage {

    get(key) {
        try{
            return JSON.parse(localStorage.getItem(key));
        }
        catch(e){
            return localStorage.getItem(key);
        }
    }

    set(key, value) {
        window.localStorage.setItem(key, value);
    }
};